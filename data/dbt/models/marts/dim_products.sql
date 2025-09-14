select
  id,
  name,
  price_cents as price_cents,
  created_at
from {{ ref('stg_products') }}

