import "dotenv/config";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

async function main() {
  const passwordHash = await hashPassword("Admin@123456");

  await db.insert(users).values({
    name: "Fahad Meshal",
    email: "admin@ssk.local",
    passwordHash,
    role: "admin",
    isActive: true,
  });

  console.log("Seed completed successfully.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
