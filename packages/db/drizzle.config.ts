import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/**/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: ["public", "raw"],
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  verbose: true,
  strict: false,
});
