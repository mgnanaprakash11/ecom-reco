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
)
select *
from combined
union all
select
  null as data_upload_batch_id,
  null as tenant_id,
  0 as rows_loaded,
  0 as reported_row_count,
  'noop' as status,
  null as processing_started_at,
  null as processing_completed_at,
  null as last_row_created_at,
  current_timestamp as processed_at,
  '{{ invocation_id }}'::text as dbt_invocation_id,
  'dbt-placeholder'::text as triggered_by
from (select 1) as _placeholder
where not exists (select 1 from combined);
