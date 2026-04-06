import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, cmsSections, jobs, serviceCategories, services, solutionSectors, solutions, crmAccounts } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.searchParams.get("token") !== "ssk-unblock-db" && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. SEED ADMIN USER (If not exists)
    const existingAdmins = await db.select().from(users).where(eq(users.email, "admin@ssk.local"));
    if (existingAdmins.length === 0) {
      const passwordHash = await hashPassword("Admin@123456");
      await db.insert(users).values({
        name: "Fahad Meshal",
        email: "admin@ssk.local",
        passwordHash,
        role: "admin",
        isActive: true,
      });
    }

    // 2. SEED CMS SECTIONS (English & Arabic Base)
    await db.insert(cmsSections).values([
      {
        page: "home",
        lang: "en",
        sectionKey: "hero",
        title: "Strategy. Precision. Results.",
        subtitle: "Execution Excellence",
        body: "Transforming ambitious visions into sustainable realities through rigorous institutional engineering.",
        sortOrder: 0,
      },
      {
        page: "home",
        lang: "ar",
        sectionKey: "hero",
        title: "الاستراتيجية. الدقة. النتائج.",
        subtitle: "التميز في التنفيذ المؤسسي",
        body: "نحن نمكن الجهات الرائدة من تحويل الرؤى الطموحة إلى واقع ملموس ومستدام.",
        sortOrder: 0,
      }
    ]);

    // 3. SEED JOBS
    await db.insert(jobs).values({
      titleEn: "Senior Digital Strategist",
      titleAr: "خبير استراتيجيات رقمية كبير",
      department: "Strategy",
      location: "Riyadh, KSA",
      type: "Full-time",
      descriptionEn: "Lead digital transformation strategy for key government clients. Advise C-level executives on adopting disruptive technologies.",
      descriptionAr: "قيادة استراتيجية التحول الرقمي للعملاء الحكوميين. تقديم المشورة للقيادات العليا بشأن تبني التقنيات الحديثة.",
      status: "published",
    });

    // 4. SEED SERVICE CATEGORIES
    const [cat1] = await db.insert(serviceCategories).values({
      nameEn: "Digital Transformation",
      nameAr: "التحول الرقمي",
      descriptionEn: "End-to-end digital enablement",
      descriptionAr: "تمكين رقمي شامل",
    }).returning();

    // 5. SEED SERVICES
    await db.insert(services).values({
      categoryId: cat1.id,
      titleEn: "IT Operating Model Design",
      titleAr: "تصميم النماذج التشغيلية لتقنية المعلومات",
      descriptionEn: "Re-engineering IT departments to align with corporate strategy.",
      descriptionAr: "إعادة هندسة إدارات تقنية المعلومات لتتوافق مع استراتيجية الشركة.",
      isActive: true,
    });

    return NextResponse.json({ success: true, message: "CRITICAL SEED DATA INJECTED SUCCESSFULLY" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
