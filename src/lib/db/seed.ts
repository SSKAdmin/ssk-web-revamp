import "dotenv/config";
import { db } from "@/lib/db";
import { users, jobs } from "@/lib/db/schema";
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

  const jobsList = [
    {
      titleEn: "Senior Digital Strategist",
      titleAr: "خبير استراتيجيات رقمية كبير",
      department: "Strategy",
      location: "Riyadh, KSA",
      type: "Full-time",
      descriptionEn: "Lead digital transformation strategy for key government clients.",
      descriptionAr: "قيادة استراتيجية التحول الرقمي للعملاء الحكوميين الرئيسيين."
    }
  ];

  for (const job of jobsList) {
    await db.insert(jobs).values(job);
  }

  console.log("Seed completed successfully.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
