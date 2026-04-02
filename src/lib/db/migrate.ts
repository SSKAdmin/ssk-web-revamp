import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function runMigrate() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  // Create a dedicated connection for migrations (max 1 connection)
  const isProd = process.env.NODE_ENV === "production";
  const connection = postgres(dbUrl, { 
    max: 1,
    ssl: isProd ? "require" : false
  });
  const db = drizzle(connection);

  console.log("⏳ Running migrations...");
  const start = Date.now();

  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    const end = Date.now();
    console.log(`✅ Migrations completed in ${end - start}ms`);
  } catch (err) {
    console.error("❌ Migration failed", err);
    process.exit(1);
  }

  await connection.end();
  process.exit(0);
}

runMigrate();
