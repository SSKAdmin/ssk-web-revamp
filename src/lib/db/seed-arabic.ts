import { db } from "./index";
import { cmsSections, jobs } from "./schema";

async function seedArabic() {
  console.log("Seeding Institutional Arabic Content...");

  // CMS SECTIONS - ARABIC
  const sections = [
    {
      page: "home" as const,
      lang: "ar" as const,
      sectionKey: "hero",
      title: "الاستراتيجية. الدقة. النتائج.",
      subtitle: "التميز في التنفيذ المؤسسي",
      body: "نحن نمكن الجهات الرائدة من تحويل الرؤى الطموحة إلى واقع ملموس ومستدام من خلال هندسة مؤسسية دقيقة وإدارة تنفيذ احترافية.",
      sortOrder: 0,
    },
    {
      page: "home" as const,
      lang: "ar" as const,
      sectionKey: "challenge",
      title: "تحدي التعقيد التشغيلي.",
      subtitle: "السياق المؤسسي",
      body: "غالبًا ما تواجه برامج التحول عوائق ناتجة عن عدم المواءمة بين الأهداف والقدرات التشغيلية. نحن نعمل على حل هذه التحديات من خلال منهجيات تنفيذية متطورة.",
      sortOrder: 1,
    },
    {
      page: "home" as const,
      lang: "ar" as const,
      sectionKey: "protocol",
      title: "نموذج الخدمات الموحد.",
      subtitle: "منطق الرقابة المؤسسية",
      body: "إطار عمل شامل يضمن المواءمة الكاملة بين كافة مسارات العمل، من البيانات والبنية التحتية إلى الأمن والامتثال والأنظمة الأساسية.",
      sortOrder: 2,
    },
    {
      page: "home" as const,
      lang: "ar" as const,
      sectionKey: "bot",
      title: "البناء. التشغيل. النقل.",
      subtitle: "ضمان الاستدامة التشغيلية",
      body: "ارتباطنا يركز على تحقيق الأثر المستدام. نقوم بتطوير المنظومة، وإدارة العمليات حتى مرحلة النضوج، ثم نقل المعرفة والتشغيل الكامل إلى فريقكم المؤسسي.",
      sortOrder: 3,
    },
  ];

  for (const section of sections) {
    await db.insert(cmsSections).values(section);
  }

  // JOBS - ARABIC (Mapped to Bilingual Properties)
  const jobsList = [
    {
      titleEn: "Strategic Execution Program Manager",
      titleAr: "مدير برنامج التنفيذ الاستراتيجي",
      department: "مكتب إدارة الإنجاز (MEO)",
      location: "الرياض، المملكة العربية السعودية",
      type: "دوام كامل",
      descriptionEn: "Lead institutional transformation through direct monitoring of execution tracks.",
      descriptionAr: "قيادة التحول المؤسسي من خلال الإشراف المهني والمباشر على مسارات التنفيذ.",
    }
  ];

  for (const job of jobsList) {
    await db.insert(jobs).values(job);
  }

  console.log("Arabic Seeding Complete.");
}

seedArabic().catch(console.error);
