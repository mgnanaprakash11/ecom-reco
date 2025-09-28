import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootEnvPath = path.resolve(__dirname, "../../.env");
config({ path: rootEnvPath });
config(); // fall back to local .env if present

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set. Set it in the root .env before running migrations.");
  process.exit(1);
}

const migrationsFolder = path.resolve(__dirname, "../drizzle");
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client);

try {
  await migrate(db, { migrationsFolder });
  console.log("✅ Migrations applied successfully");
} catch (error) {
  console.error("❌ Migration failed:", error);
  process.exitCode = 1;
} finally {
  await client.end();
}
