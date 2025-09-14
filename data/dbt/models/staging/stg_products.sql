select
  id,
  name,
  price_cents,
  created_at
from {{ source('app', 'products') }}

