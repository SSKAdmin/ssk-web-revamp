import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { techSolutions } from "@/content/techSolutions";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { BrandText } from "@/components/site/BrandText";
import { InstitutionalServiceCard } from "@/components/site/InstitutionalServiceCard";
import { DynamicTechCard } from "@/components/site/DynamicTechCard";
import { DemandDeliveryComparison } from "@/components/site/DemandDeliveryComparison";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.metadata.services.title,
    description: dict.metadata.services.description,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const s = dict.services_page;

  return (
    <div className="flex flex-col overflow-hidden">
      {/* HERO SECTION */}
      <section className="bg-ssk-navy pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[20vw] font-bold text-ssk-cyan tracking-tighter uppercase select-none opacity-20">{isAr ? "الخدمات" : "SERVICES"}</span>
        </div>
        
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
          <p className="mb-8 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
            {s.hero.eyebrow}
          </p>
          <h1 className={cn(
            "font-[var(--font-display)] text-[48px] font-bold leading-[1] tracking-[-0.04em] text-white lg:text-[84px] max-w-[900px]",
            isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {s.hero.title}
          </h1>
          <p className="mt-12 max-w-[800px] text-[24px] leading-relaxed text-white/50 font-medium">
            {s.hero.description}
          </p>
        </div>
      </section>

      {/* IT DEMAND & DELIVERY (PMO vs SMO Lifecycle) */}
      <DemandDeliveryComparison lang={lang as "en" | "ar"} />

      {/* CORE TECHNICAL CAPABILITIES (Simple grid replaces complex tabs) */}
      <SectionShell className="bg-ssk-surface py-32 border-t-4 border-white">
         <div className="mx-auto max-w-[1280px] px-6 lg:px-10 mb-16">
            <h2 className={cn(
               "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold leading-[1] tracking-[-0.04em] text-ssk-navy lg:text-[64px]",
               isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "مجالاتنا التقنية الأساسية" : "Core Technical Capabilities"}
            </h2>
         </div>

         <div className="mx-auto max-w-[1280px] px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techSolutions.map((solution) => (
              <DynamicTechCard key={solution.id} solution={solution} lang={lang as "en" | "ar"} />
            ))}
         </div>
      </SectionShell>

      {/* SYSTEMIC ALIGNMENT BAR */}
      <SectionShell dark className="bg-ssk-navy py-56 border-y border-white/5">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-12 items-center">
           <div className="lg:col-span-12 mb-16">
              <p className="mb-8 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
                {isAr ? "المواءمة الاستراتيجية" : "Strategic Alignment"}
              </p>
              <h2 className={cn(
                "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold leading-[1] tracking-[-0.04em] text-white lg:text-[72px]",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                {isAr ? "المعمارية المؤسسية" : "Institutional Architecture"}
              </h2>
           </div>
           
           <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[2000px]">
              {[
                { 
                  en: "Business Layer", ar: "طبقة الأعمال", 
                  desc_en: "Translating strategic objectives into actionable policies.",
                  desc_ar: "تحويل الأهداف الاستراتيجية إلى سياسات قابلة للتنفيذ.",
                  details_en: ["Business Capabilities Mapping", "Value Stream Architecture", "Process Re-engineering"],
                  details_ar: ["تخطيط القدرات المؤسسية", "هندسة سلاسل القيمة", "إعادة هندسة وحوكمة العمليات"]
                },
                { 
                  en: "Data Layer", ar: "طبقة البيانات", 
                  desc_en: "Governing information assets to serve decision efficiency.",
                  desc_ar: "حوكمة الأصول المعلوماتية لخدمة كفاءة القرار.",
                  details_en: ["Master Data Management", "Data Mesh / Fabric Design", "Governance & Quality"],
                  details_ar: ["إدارة البيانات الرئيسية (MDM)", "تصميم شبكات البيانات المعمارية", "حوكمة وضمان جودة المعلومات"]
                },
                { 
                  en: "Application Layer", ar: "طبقة التطبيقات", 
                  desc_en: "Engineering technical solutions to meet institutional requirements.",
                  desc_ar: "هندسة الحلول التقنية لتلبية المتطلبات المؤسسية.",
                  details_en: ["Microservices Architecture", "API Management & Integration", "Legacy Modernization"],
                  details_ar: ["معمارية الخدمات المصغرة", "إدارة وتكامل واجهات البرمجة (API)", "تحديث وتأهيل الأنظمة المتقادمة"]
                },
                { 
                  en: "Technology Layer", ar: "طبقة التقنية", 
                  desc_en: "Securing infrastructure and ensuring operational continuity.",
                  desc_ar: "تأمين البناء التحتي وضمان استمرارية العمليات.",
                  details_en: ["Cloud Native Infrastructure", "Zero-Trust Security Models", "High-Availability Deployment"],
                  details_ar: ["البنى التحتية السحابية المدمجة", "النماذج الأمنية الصفرية الثقة", "النشر المستمر وعالي التوافر"]
                },
              ].map((layer, i) => (
                <div key={i} className="group relative w-full h-[400px] z-10 transition-all duration-700 hover:z-50 cursor-pointer">
                  <div className="w-full h-full relative duration-[800ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    
                    {/* FRONT FACE (Dark Navy) */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white/5 p-10 border border-white/10 shadow-ssk-glow flex flex-col justify-between rounded-xl">
                      <div>
                        <div className="text-ssk-cyan font-bold text-[14px] flex items-center justify-between mb-8 opacity-60">
                           <span>0{i+1}</span>
                           <span>{isAr ? "قلب لقراءة التفاصيل" : "Flip for Details"}</span>
                        </div>
                        <h4 className={cn(
                          "text-[24px] font-bold text-white leading-tight uppercase tracking-wider",
                          isAr && "font-[var(--font-arabic)] tracking-normal text-[26px]"
                        )}>
                         {isAr ? layer.ar : layer.en}
                        </h4>
                      </div>
                      <p className="text-white/60 text-[15px] leading-relaxed font-medium">
                         {isAr ? layer.desc_ar : layer.desc_en}
                      </p>
                    </div>

                    {/* BACK FACE (Cyan Color Flip) */}
                    <div className={cn(
                      "absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-ssk-cyan p-10 border border-ssk-cyan/50 shadow-[0_0_50px_rgba(10,186,181,0.3)] flex flex-col rounded-xl",
                      isAr && "text-right"
                    )}>
                      <h4 className={cn(
                        "text-[20px] font-bold text-ssk-navy mb-6 uppercase tracking-widest border-b border-ssk-navy/20 pb-4",
                        isAr && "font-[var(--font-arabic)] tracking-normal text-[22px]"
                      )}>
                       {isAr ? "التفاصيل التقنية" : "Technical Scope"}
                      </h4>
                      
                      <ul className="space-y-5">
                         {(isAr ? layer.details_ar : layer.details_en).map((detail, idx) => (
                           <li key={idx} className="flex items-start gap-4 text-ssk-navy font-bold text-[14px] leading-snug">
                              <span className="w-2 h-2 rounded-full bg-ssk-navy shrink-0 mt-1"></span>
                              <span>{detail}</span>
                           </li>
                         ))}
                      </ul>

                      <div className="mt-auto text-ssk-navy font-bold text-[11px] tracking-[0.2em] uppercase opacity-70">
                         {isAr ? "جاهز للتنفيذ" : "Execution Ready"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </SectionShell>

      {/* FINAL CALL */}
      <SectionShell className="bg-[#f7f9fb] py-56">
         <div className="mx-auto max-w-[1100px] text-center">
            <h2 className={cn(
              "font-[var(--font-display)] text-[36px] md:text-[56px] font-bold text-ssk-navy leading-[1] mb-16 lg:text-[84px] tracking-[-0.04em]",
              isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "هل تتطلب مشاريعكم دقة في التنفيذ؟" : "Focusing on Execution Excellence."}
            </h2>
            <div className="flex justify-center flex-wrap gap-10">
              <Link
                href={`/${lang}/engagement`}
                className="inline-flex min-h-[84px] items-center justify-center bg-ssk-navy px-20 text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-cyan transition-all hover:bg-ssk-cyan hover:text-ssk-navy active:scale-95 shadow-ssk-layered"
              >
                {dict.navigation.engagement}
              </Link>
               <Link
                href={`/${lang}/about`}
                className="inline-flex min-h-[84px] items-center justify-center border-2 border-ssk-navy px-20 text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-navy transition-all hover:bg-ssk-navy hover:text-white active:scale-95"
              >
                <BrandText text={isAr ? "عن SSK" : "About SSK"} logoVariant="color" />
              </Link>
            </div>
         </div>
      </SectionShell>
    </div>
  );
}
