import "dotenv/config";
import { db, schema } from "./src/lib/db";

async function test() {
  try {
    const data = await db.select().from(schema.websiteAnalytics);
    console.log("Analytics Total rows:", data.length);
    console.log("Analytics data:", data.slice(0, 5));
  } catch (e) {
    console.error("Error reading from db:", e);
  }
}
test();
