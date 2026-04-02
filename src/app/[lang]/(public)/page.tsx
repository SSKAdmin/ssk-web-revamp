import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { services } from "@/content/services";
import { PresentationHero } from "@/components/site/PresentationHero";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Settings, 
  BarChart3, 
  Database, 
  Cloud, 
  UserCheck, 
  Zap,
  Network,
  ArrowRight,
  ChevronDown,
  X,
  CheckCircle
} from "lucide-react";
import { ClientGrid } from "@/components/site/ClientGrid";
import { techSolutions } from "@/content/techSolutions";
import { InstitutionalServiceCard } from "@/components/site/InstitutionalServiceCard";
import { DynamicTechCard } from "@/components/site/DynamicTechCard";
import { IsoCredentials } from "@/components/site/IsoCredentials";
import { ExecutionComparisonBlock } from "@/components/site/ExecutionComparisonBlock";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "SSK | الاستراتيجية والتنفيذ" : "SSK | Strategy & Execution",
    description: isAr 
      ? "نعمل مع كبرى الجهات والشركات لتحويل الرؤى إلى واقع تنفيذي ملموس." 
      : "Partnering with institutional leaders to transform ambitious visions into sustainable reality.",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  
  const h = dict.home;

  const serviceIcons = [
    <Settings key="01" className="h-6 w-6" />, // MEO
    <Zap key="02" className="h-6 w-6" />, // Rhythm
    <BarChart3 key="03" className="h-6 w-6" />, // Governance
    <Network key="04" className="h-6 w-6" />, // EA
    <Database key="05" className="h-6 w-6" />, // Data
    <ShieldCheck key="06" className="h-6 w-6" />, // Cyber
    <Cloud key="07" className="h-6 w-6" />, // Infra
    <UserCheck key="08" className="h-6 w-6" />, // SAP
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* SECTION A: HERO */}
      <PresentationHero
        lang={lang as "en" | "ar"}
        eyebrow={h.hero.eyebrow}
        title={h.hero.title}
        body={h.hero.description}
        primary={dict.navigation.engagement}
        secondary={dict.navigation.explore}
      />

      {/* SECTION B: THE EXECUTION VOID (CHALLENGE) */}
      <SectionShell dark className="bg-ssk-navy py-40">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
              {h.challenge.eyebrow}
            </p>
            <h2 className={cn(
              "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold leading-[1] tracking-[-0.04em] lg:text-[84px] text-white",
              isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {h.challenge.title}
            </h2>
            <p className="mt-12 text-[24px] leading-relaxed text-white/50 max-w-[650px] font-medium">
              {h.challenge.description}
            </p>
          </div>
          
          <div className="lg:col-span-12 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-24 border-t border-white/10">
            {h.challenge.points.map((point: string, idx: number) => (
              <div key={idx} className="flex flex-col gap-6 group">
                <div className="h-0.5 w-12 bg-ssk-cyan group-hover:w-full transition-all duration-700" />
                <span className={cn(
                   "text-[20px] font-bold text-white uppercase tracking-[0.3em] leading-tight",
                   isAr && "font-[var(--font-arabic)]"
                )}>
                   {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* SECTION C: THE POSITIONING (EXECUTION ENGINE 3D) */}
      <ExecutionComparisonBlock positioning={h.positioning} isAr={isAr} />

      {/* SECTION D: TECHNICAL CAPABILITIES PREVIEW (DYNAMIC FLIP CARDS) */}
      <SectionShell className="bg-ssk-navy py-40 bg-[url('/images/noise.png')] bg-repeat" dark>
          <div className="max-w-[900px] mb-24 px-6 lg:px-0">
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
              {isAr ? "مجالاتنا التقنية" : "Technical Execution Domains"}
            </p>
            <h2 className={cn(
               "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold leading-[1] tracking-[-0.04em] text-white lg:text-[72px]",
               isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "حلول مؤسسية ومنهجية واضحة." : "Direct, specialized solutions for institutional delivery."}
            </h2>
          </div>

          <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-10 mb-12">
             {techSolutions.map((solution) => (
                <DynamicTechCard key={solution.id} solution={solution} lang={lang as "en" | "ar"} />
             ))}
          </div>
      </SectionShell>

      {/* SECTION D: CAPABILITIES PREVIEW (4 CARDS) */}
      <SectionShell className="bg-[#f7f9fb] py-40">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-[700px]">
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
               {dict.services_page.hero.eyebrow}
             </p>
              <h2 className={cn(
                 "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold text-ssk-navy lg:text-[84px] leading-[1] tracking-[-0.04em]",
                 isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                {isAr ? "خدماتنا المتميزة" : "Our Core Services"}
              </h2>
          </div>
          <Link 
            href={`/${lang}/services`}
            className="group flex items-center gap-4 text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-navy border-b-2 border-ssk-cyan pb-2"
          >
             {isAr ? "عرض كافة الخدمات" : "View All Services"}
             <ArrowRight className={cn("h-4 w-4 group-hover:translate-x-2 transition-transform", isAr && "rotate-180 group-hover:-translate-x-2")} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.slice(0, 4).map((svc: any, i) => (
            <div 
              key={svc.id} 
              className="relative w-full h-[250px] lg:h-[280px] group/card cursor-pointer"
            >
              
              {/* MOBILE DIRECT LINK COVER */}
              <Link href={`/${lang}/services#${svc.id}`} className="lg:hidden absolute inset-0 z-[60] touch-manipulation block" />

              {/* RESTING STATE */}
              <div className="absolute inset-0 bg-white border border-ssk-border rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm transition-all duration-300">
                <div className="w-16 h-16 mb-6 bg-ssk-surface border border-ssk-border flex items-center justify-center rounded-full text-ssk-cyan">
                  <div className="text-ssk-cyan scale-125">{serviceIcons[i]}</div>
                </div>
                <h5 className={cn(
                  "text-[20px] font-bold text-ssk-navy mb-2 leading-tight tracking-tight",
                  isAr && "font-[var(--font-arabic)] text-[22px] tracking-normal"
                )}>
                  {isAr ? svc.title.ar : svc.title.en}
                </h5>
                <div className="text-[10px] text-ssk-text-soft font-bold uppercase tracking-[0.2em] opacity-60 mt-2">
                  {isAr ? "انقر للمزيد بقوة" : "Tap for More"}
                </div>
              </div>

              {/* EXPANDED POP-UP OVERLAY (Hidden on Mobile, Hover on Desktop) */}
              <div className={cn(
                "hidden lg:flex absolute -left-4 -right-4 lg:-left-12 lg:-right-12 -top-10 h-max min-h-[450px] bg-ssk-navy rounded-[2rem] shadow-[0_80px_150px_-20px_rgba(2,28,42,0.9)] border border-ssk-cyan/40 z-[100] p-8 lg:p-12 flex-col opacity-0 pointer-events-none scale-[0.9] origin-top group-hover/card:opacity-100 group-hover/card:pointer-events-auto group-hover/card:scale-100 transition-all duration-[500ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                isAr && "text-right"
              )}>
                
                {/* Popup Header */}
                <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-8 shrink-0">
                  <div>
                    <h5 className={cn(
                      "text-[32px] lg:text-[40px] font-bold text-white mb-2 leading-none",
                      isAr && "font-[var(--font-arabic)] tracking-normal"
                    )}>
                      {isAr ? svc.title.ar : svc.title.en}
                    </h5>
                    <div className="text-[12px] text-ssk-cyan font-bold uppercase tracking-[0.2em]">
                      {isAr ? "نطاق الخدمات والتنفيذ" : "Service Scope"}
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-ssk-cyan/10 flex items-center justify-center rounded-2xl border border-ssk-cyan/30 shrink-0 transform rotate-3">
                    <div className="text-ssk-cyan scale-110">{serviceIcons[i]}</div>
                  </div>
                </div>
                
                {/* Unconstrained Details (No Scrollbars) */}
                <div className="flex flex-col gap-8 grow">
                  <p className={cn(
                    "text-[16px] lg:text-[18px] leading-[1.8] text-white/90 font-medium bg-white/5 p-6 lg:p-8 rounded-2xl border border-white/5 shadow-inner",
                    isAr && "font-[var(--font-arabic)] leading-[1.9]"
                  )}>
                    {isAr ? svc.subtitle.ar : svc.subtitle.en}
                  </p>
                  
                  <Link href={`/${lang}/services#${svc.id}`} className="mt-8 flex items-center justify-center w-full bg-ssk-cyan/10 hover:bg-ssk-cyan text-ssk-cyan hover:text-ssk-navy transition-colors py-5 rounded-xl border border-ssk-cyan/30 font-bold uppercase tracking-[0.2em] text-[12px] shadow-[0_0_30px_rgba(10,186,181,0.1)_inset]">
                    {isAr ? "الاطلاع على التفاصيل الكاملة للإجراءات ←" : "Explore Full Execution Details ↗"}
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </SectionShell>


      {/* SECTION H: INSTITUTIONAL PARTNERS */}
      <SectionShell className="bg-white py-40">
        <div className="mx-auto max-w-[1280px]">
           <div className="text-center mb-24">
              <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.4em] text-ssk-cyan">
                {isAr ? "شركاء الإنجاز" : "Our Institutional Partners"}
              </p>
              <h2 className={cn(
                "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold leading-[1] tracking-[-0.04em] text-ssk-navy lg:text-[72px]",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                {isAr ? "نعمل مع كبرى الجهات والشركات." : "Who We Work With"}
              </h2>
           </div>
           
           <ClientGrid isAr={isAr} />

           <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-t border-ssk-border pt-32">
              <div className="max-w-[500px]">
                 <h3 className={cn("text-[32px] font-bold text-ssk-navy mb-8", isAr && "font-[var(--font-arabic)]")}>
                    {isAr ? "التميز في التنفيذ هو أولويتنا." : "Institutional Delivery Excellence."}
                 </h3>
                 <p className="text-[19px] text-ssk-text-soft leading-relaxed font-medium">
                    {isAr ? "نحن مهيؤون لخدمة المتطلبات المهنية للجهات الحكومية، والمكاتب الوطنية للبرامج، والشركات الكبرى التي تتطلب تنفيذاً دقيقاً ونتائج ملموسة." : "SSK is built to serve the professional demands of government entities, national program offices, and large-scale enterprises that require high-precision execution and measurable outcomes."}
                 </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                 {[
                   { en: "Government Entities", ar: "الجهات الحكومية" },
                   { en: "Strategic Initiatives", ar: "المبادرات الاستراتيجية" },
                   { en: "Large-Scale Enterprises", ar: "الشركات والمؤسسات الكبرى" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-6 bg-ssk-surface p-8 group border-l-4 border-transparent hover:border-ssk-cyan transition-all shadow-ssk-layered">
                      <div className="w-10 h-10 border border-ssk-border flex items-center justify-center text-ssk-cyan font-bold text-[14px]">
                         0{i + 1}
                      </div>
                      <span className={cn(
                        "text-[18px] font-bold text-ssk-navy uppercase tracking-widest",
                        isAr && "font-[var(--font-arabic)] tracking-normal"
                      )}>
                        {isAr ? item.ar : item.en}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </SectionShell>

      {/* SECTION I: ISO CREDENTIALS & CAPABILITIES */}
      <IsoCredentials lang={lang as "en" | "ar"} />

      {/* SECTION J: FINAL STRATEGIC CTA */}
      <section className="bg-ssk-navy py-24 text-center relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
            <span className="text-[25vw] font-bold text-ssk-cyan tracking-tighter">EXCELLENCE</span>
         </div>

         <div className="mx-auto max-w-[1000px] px-6 relative z-10">
            <p className="mb-8 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
               {isAr ? "ابدأ رحلة الإنجاز" : "Start Your Delivery Journey"}
            </p>
            <h2 className={cn(
              "font-[var(--font-display)] text-[36px] md:text-[56px] font-bold text-white leading-[1] mb-12 lg:text-[84px] tracking-[-0.04em]",
              isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "الدقة في التنفيذ هي جوهر استراتيجيتنا." : "Excellence in Execution is our Strategy."}
            </h2>
            <p className="text-[26px] text-white/40 mb-20 leading-relaxed font-medium max-w-[800px] mx-auto">
              {isAr ? "نحن نعمل مع الجهات الرائدة لتحويل الرؤى الطموحة إلى واقع مؤسسي مستدام من خلال أطر عمل تنفيذية متكاملة." : "Partnering with institutional leaders to transform ambitious visions into sustainable reality through integrated execution frameworks."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Link
                href={`/${lang}/engagement`}
                className="inline-flex min-h-[84px] items-center justify-center bg-ssk-cyan px-20 text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-navy shadow-ssk-glow transition-all hover:bg-white hover:scale-105 active:scale-95"
              >
                {dict.navigation.engagement}
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
