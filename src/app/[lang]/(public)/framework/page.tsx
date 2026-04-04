import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.metadata.framework.title,
    description: dict.metadata.framework.description,
  };
}

import { 
  ShieldCheck, 
  Database, 
  Lock, 
  Layout, 
  Activity, 
  BarChart3, 
  Target, 
  Users 
} from "lucide-react";
import { techSolutions } from "@/content/techSolutions";
import { DynamicTechCard } from "@/components/site/DynamicTechCard";

export default async function FrameworkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const h = dict.home;
  const f = dict.framework_page;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* HERO SECTION */}
      <section className="bg-ssk-navy pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[20vw] font-bold text-ssk-cyan tracking-tighter uppercase select-none opacity-20">{isAr ? "الحلول" : "SOLUTIONS"}</span>
        </div>
        
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
          <p className="mb-8 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
             {f.hero.eyebrow}
           </p>
           <h1 className={cn(
              "font-[var(--font-display)] text-[48px] font-bold text-white lg:text-[84px] leading-[1] tracking-[-0.04em] mb-12 max-w-[900px]",
              isAr && "font-[var(--font-arabic)] tracking-normal text-[72px]"
           )}>
             {f.hero.title}
           </h1>
           <p className="text-[24px] text-white/50 leading-relaxed font-medium max-w-[700px]">
              {f.hero.description}
           </p>
        </div>
      </section>

      {/* REAL DIGITAL SOLUTIONS CATALOG */}
      <section className="bg-ssk-surface py-32 border-t border-white border-t-4">
         <div className="mx-auto max-w-[1280px] px-6 lg:px-10 mb-16">
            <h2 className={cn(
               "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold leading-[1] tracking-[-0.04em] text-ssk-navy lg:text-[64px]",
               isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "كتالوج الحلول الرقمية الكامل" : "The SSK Digital Capability Catalog"}
            </h2>
            <p className="mt-8 text-[18px] text-ssk-text-soft leading-relaxed font-medium max-w-[800px]">
              {isAr 
                ? "نقدم حزمة من الحلول التقنية الجاهزة والموثوقة في السوق الرقمي، مدعومة بخبرات مؤسسية ومقاييس أداء دقيقة لضمان العائد الاستثماري وحوكمة المخاطر."
                : "We deliver a suite of proven, market-ready digital solutions supported by deep institutional expertise and rigorous performance metrics to secure ROI and govern risk."}
            </p>
         </div>

         <div className="mx-auto max-w-[1280px] px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techSolutions.map((solution) => (
              <DynamicTechCard key={solution.id} solution={solution} lang={lang as "en" | "ar"} />
            ))}
         </div>
      </section>

      {/* FOOTER-STYLE CTA FROM SERVICES (Visual Consistency) */}
      <section className="bg-[#f7f9fb] py-56 border-t border-ssk-border">
         <div className="mx-auto max-w-[1100px] text-center px-6">
            <h2 className={cn(
              "font-[var(--font-display)] text-[56px] font-bold text-ssk-navy leading-[1] mb-16 lg:text-[84px] tracking-[-0.04em]",
              isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "حوكمة ذكية لنتائج ملموسة." : "Institutional Clarity. Proven Outcomes."}
            </h2>
            <div className="flex justify-center flex-wrap gap-10">
              <a
                href={`/${lang}/engagement`}
                className="inline-flex min-h-[84px] items-center justify-center bg-ssk-navy px-20 text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-cyan transition-all hover:bg-ssk-cyan hover:text-ssk-navy active:scale-95 shadow-ssk-layered"
              >
                {isAr ? "ابدأ المواءمة الآن" : "Start Alignment Now"}
              </a>
            </div>
         </div>
      </section>
    </div>
  );
}
