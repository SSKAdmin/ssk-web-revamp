import "dotenv/config";
import { db } from "@/lib/db";
import { schema } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { eq } from "drizzle-orm";

async function main() {
  const email = "admin@ssksaudi.com";
  const rawPassword = "SSKAdminPassword2026!";
  const passwordHash = await hashPassword(rawPassword);

  // Check if exists
  const existingRecords = await db.select().from(schema.users).where(eq(schema.users.email, email));

  if (existingRecords.length > 0) {
    // Update existing
    await db.update(schema.users)
      .set({ passwordHash, role: "admin", isActive: true })
      .where(eq(schema.users.email, email));
    console.log(`Updated existing admin: ${email}`);
  } else {
    // Insert new
    await db.insert(schema.users).values({
      name: "Fahad Meshal",
      email: email,
      passwordHash,
      role: "admin",
      isActive: true,
    });
    console.log(`Inserted new admin: ${email}`);
  }

  console.log("Admin credentials seeded successfully.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
