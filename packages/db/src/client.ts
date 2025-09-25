import { drizzle } from "drizzle-orm/node-postgres";
import { createRequire } from "module";
import * as schema from "./schema/index.ts";

const require = createRequire(import.meta.url);
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Avoid crashing at import time inside tools; throw only when used
  console.warn("[db] DATABASE_URL is not set.\nSet it in .env or the environment.");
}

const pool = new Pool({ connectionString });

export const db = drizzle(pool, { schema });
export { schema };
