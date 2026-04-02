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

      {/* ADVANCED INTERACTIVE SOLUTIONS GRID */}
      <section className="bg-[#f7f9fb] py-32 relative">
         <div className="absolute inset-0 bg-ssk-surface/50 clip-path-slant pointer-events-none"></div>
         <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
            <h2 className={cn(
               "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.04em] text-ssk-navy lg:text-[64px] mb-6",
               isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "نطاق المواءمة المؤسسية" : "Institutional Alignment Scope"}
            </h2>
            <p className="text-ssk-text-soft text-[18px] max-w-[800px] mb-16 font-medium leading-relaxed">
              {isAr 
                ? "تعتمد منهجية الإنجاز لدينا على 8 طبقات استراتيجية تعمل بتزامن كامل، حيث يتم هيكلة وحوكمة كل طبقة لتوفير أساس صلب يمنع الانحراف ويثبت مسار التنفيذ المؤسسي." 
                : "Our execution methodology relies on 8 synchronized strategic layers. Each layer is architected and governed to provide a rigid foundation that prevents deviation and stabilizes institutional delivery."}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {h.protocol.layers.map((layer: any, i: number) => {
                  const icons = [ShieldCheck, Database, Lock, Layout, Activity, BarChart3, Target, Users];
                  const Icon = icons[i % icons.length];
                  
                  return (
                     <div key={i} className="group bg-white border border-ssk-border hover:border-ssk-cyan transition-all duration-300 hover:shadow-ssk-glow flex flex-col lg:flex-row overflow-hidden relative">
                        {/* Hover Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-1 lg:w-1 lg:h-full bg-ssk-border group-hover:bg-ssk-cyan transition-colors duration-500 z-20"></div>
                        
                        {/* BRANDING STRIP (1/3 width) */}
                        <div className="w-full lg:w-[35%] bg-[#fcfdfd] p-8 lg:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-e border-ssk-border relative z-10 transition-colors group-hover:bg-ssk-surface/50">
                           <div className="w-14 h-14 bg-white flex items-center justify-center border border-ssk-border shadow-sm mb-8 group-hover:border-ssk-cyan group-hover:bg-ssk-navy transition-all duration-300">
                              <Icon className="w-7 h-7 text-ssk-navy group-hover:text-ssk-cyan transition-colors" />
                           </div>
                           <span className="text-ssk-cyan font-bold text-[11px] uppercase tracking-[0.2em] mb-3 block">
                              Layer {(i + 1).toString().padStart(2, "0")}
                           </span>
                           <h3 className={cn(
                              "text-[22px] font-bold text-ssk-navy leading-tight",
                              isAr && "font-[var(--font-arabic)] text-[24px]"
                           )}>
                              {layer.title}
                           </h3>
                        </div>

                        {/* CONTENT STRIP (2/3 width) */}
                        <div className="w-full lg:w-[65%] p-8 lg:p-10 flex flex-col relative z-10 bg-white">
                           {/* Short Definition / Subtitle */}
                           <h4 className={cn(
                              "text-[16px] text-ssk-navy font-bold mb-3 leading-relaxed",
                              isAr && "font-[var(--font-arabic)] text-[18px]"
                           )}>
                              {layer.desc}
                           </h4>

                           {/* Deep Description */}
                           <p className={cn(
                              "text-[14px] text-ssk-text-soft leading-relaxed font-medium mb-8",
                              isAr && "font-[var(--font-arabic)] text-[15px]"
                           )}>
                              {layer.deep_desc}
                           </p>

                           {/* Features Grid */}
                           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-auto pt-6 border-t border-ssk-border/50">
                              {layer.features?.map((feat: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3">
                                   <ShieldCheck className="w-4 h-4 text-ssk-cyan shrink-0 mt-0.5" />
                                   <span className={cn(
                                      "text-[13px] font-bold text-ssk-navy leading-snug",
                                      isAr && "font-[var(--font-arabic)] text-[14px]"
                                   )}>
                                     {feat}
                                   </span>
                                </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  );
               })}
            </div>
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
