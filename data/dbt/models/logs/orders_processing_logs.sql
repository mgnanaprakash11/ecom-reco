{{ config(
  materialized='table',
  schema='raw',
  alias='orders_processing_logs'
) }}

with batches as (
  select
    id as data_upload_batch_id,
    tenant_id,
    coalesce(row_count, 0) as reported_row_count,
    status,
    processing_started_at,
    processing_completed_at,
    updated_at
  from {{ source('app', 'data_upload_batches') }}
),
orders as (
  select
    data_upload_batch_id,
    tenant_id,
    count(*) as rows_loaded,
    max(created_at) as last_row_created_at
  from {{ source('raw', 'orders') }}
  group by 1, 2
),
combined as (
  select
    coalesce(b.data_upload_batch_id, o.data_upload_batch_id) as data_upload_batch_id,
    coalesce(b.tenant_id, o.tenant_id) as tenant_id,
    coalesce(o.rows_loaded, 0) as rows_loaded,
    coalesce(b.reported_row_count, 0) as reported_row_count,
    coalesce(b.status, 'loaded') as status,
    b.processing_started_at,
    b.processing_completed_at,
    o.last_row_created_at,
    current_timestamp as processed_at,
    '{{ invocation_id }}'::text as dbt_invocation_id,
    'github-actions'::text as triggered_by
  from batches b
  full outer join orders o
    on o.data_upload_batch_id = b.data_upload_batch_id
    and o.tenant_id = b.tenant_id
),
placeholder as (
  select
    data_upload_batch_id,
    tenant_id,
    rows_loaded,
    reported_row_count,
    status,
    processing_started_at,
    processing_completed_at,
    last_row_created_at,
    processed_at,
    dbt_invocation_id,
    triggered_by
  from (
    values (
      cast(null as uuid),
      cast(null as uuid),
      0,
      0,
      'noop',
      cast(null as timestamptz),
      cast(null as timestamptz),
      cast(null as timestamptz),
      current_timestamp,
      '{{ invocation_id }}'::text,
      'dbt-placeholder'::text
    )
  ) as v(
    data_upload_batch_id,
    tenant_id,
    rows_loaded,
    reported_row_count,
    status,
    processing_started_at,
    processing_completed_at,
    last_row_created_at,
    processed_at,
    dbt_invocation_id,
    triggered_by
  )
  where not exists (select 1 from combined)
)
select *
from combined
union all
select *
from placeholder;
