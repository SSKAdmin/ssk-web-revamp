import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NODE_ENV === "production" 
      ? (process.env.DATABASE_URL?.includes("sslmode=require") ? process.env.DATABASE_URL : `${process.env.DATABASE_URL}?sslmode=require`)
      : (process.env.DATABASE_URL || ""),
  },
});
