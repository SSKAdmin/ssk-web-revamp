import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Target, 
  ShieldCheck, 
  Users, 
  Workflow,
  Cpu,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BrandText } from "@/components/site/BrandText";
import { ClientGrid } from "@/components/site/ClientGrid";
import { IsoCredentials } from "@/components/site/IsoCredentials";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.metadata.about.title,
    description: dict.metadata.about.description,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const a = dict.about_page;

  return (
    <div className="flex flex-col overflow-hidden">
      {/* SECTION A: MANIFESTO HERO */}
      <section className="bg-ssk-navy pt-48 pb-32 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute right-0 top-0 w-[45%] h-full bg-ssk-navy/50 hidden lg:block" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-ssk-cyan opacity-5 blur-[120px] rounded-full" />
        
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
          <p className="mb-8 text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
            {a.hero.eyebrow}
          </p>
          <h1 className={cn(
             "font-[var(--font-display)] text-[48px] font-bold leading-[1] tracking-[-0.04em] text-white lg:text-[84px] max-w-[900px]",
             isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            <BrandText text={a.hero.title} logoVariant="color" />
          </h1>
          <p className="mt-12 max-w-[700px] text-[24px] leading-relaxed text-white/50 font-medium">
            <BrandText text={a.hero.description} logoVariant="white" />
          </p>
          
          <div className="mt-16 flex items-center gap-8">
             <div className="h-px w-24 bg-ssk-cyan shadow-ssk-glow" />
             <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/30">
                {isAr ? "المرحلة الأولى / الأهداف" : "Phase 01 / Objectives"}
             </span>
          </div>
        </div>
      </section>

      {/* SECTION B: CORE STRATEGY */}
      <SectionShell className="bg-white">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-12 items-start">
           <div className="lg:col-span-12">
              <p className="mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
                {isAr ? "إطار العمل" : "Strategic Framework"}
              </p>
              <h2 className={cn(
                "font-[var(--font-display)] text-[44px] font-bold text-ssk-navy leading-[1.1] lg:text-[64px] tracking-tight",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                <BrandText text={a.philosophy.title} logoVariant="color" />
              </h2>
           </div>
           
           <div className="lg:col-span-4 space-y-8 group">
              <div className="h-1.5 w-16 bg-ssk-surface group-hover:bg-ssk-cyan transition-all duration-500" />
              <h3 className={cn("text-[26px] font-bold text-ssk-navy", isAr && "font-[var(--font-arabic)]")}>
                {isAr ? "تكامل العمليات" : "Operational Integration"}
              </h3>
              <p className="text-[17px] text-ssk-text-soft leading-relaxed font-medium">
                {isAr ? "نعمل على مزامنة كافة مسارات العمل لضمان تدفق المعلومات والنتائج بسلاسة." : "Synchronizing all workstreams to ensure seamless information flow and result delivery."}
              </p>
           </div>

           <div className="lg:col-span-4 space-y-8 group">
              <div className="h-1.5 w-16 bg-ssk-surface group-hover:bg-ssk-cyan transition-all duration-500" />
              <h3 className={cn("text-[26px] font-bold text-ssk-navy", isAr && "font-[var(--font-arabic)]")}>
                {isAr ? "إدارة الإنجاز" : "Delivery Management"}
              </h3>
              <p className="text-[17px] text-ssk-text-soft leading-relaxed font-medium">
                {isAr ? "توفير الرقابة المهنية والتحقق المستمر لضمان الالتزام بالخطط الزمنية." : "Providing professional oversight and continuous validation to ensure schedule adherence."}
              </p>
           </div>

           <div className="lg:col-span-4 space-y-8 group">
              <div className="h-1.5 w-16 bg-ssk-surface group-hover:bg-ssk-cyan transition-all duration-500" />
              <h3 className={cn("text-[26px] font-bold text-ssk-navy", isAr && "font-[var(--font-arabic)]")}>
                {isAr ? "استدامة الأداء" : "Performance Metrics"}
              </h3>
              <p className="text-[17px] text-ssk-text-soft leading-relaxed font-medium">
                {isAr ? "تمكين الجهات من قياس أداء مبادراتها بشكل دقيق ومستقبلي." : "Enabling entities to measure initiative performance with forward-looking precision."}
              </p>
           </div>
        </div>
      </SectionShell>

      {/* SECTION C: THE EXECUTION EDGE */}
      <SectionShell dark className="bg-ssk-navy py-40">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2 items-center">
           <div>
              <p className="mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
                {isAr ? "ميزة التنفيذ" : "The Execution Edge"}
              </p>
              <h2 className={cn(
                "font-[var(--font-display)] text-[44px] font-bold leading-[1.1] text-white lg:text-[72px] tracking-tight",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                {isAr ? "التنفيذ الواقعي القائم على البيانات." : "Real-World Execution Informed by Data."}
              </h2>
              <p className="mt-10 text-[22px] text-white/50 leading-relaxed font-medium max-w-[540px]">
                {isAr ? "نحن نتجاوز الاستشارات التقليدية لنكون شريكاً فاعلاً في إدارة الإنجاز الميداني." : "Moving beyond traditional advisory to become an active partner in operational delivery management."}
              </p>
           </div>
           
           <div className="grid grid-cols-1 gap-1">
              {[
                { en: "High Velocity", ar: "السرعة العالية", desc: isAr ? "تحقيق النتائج بوتيرة متسارعة ومهنية." : "Achieving results with an accelerated professional pace." },
                { en: "Professional Rigor", ar: "الدقة المهنية", desc: isAr ? "الالتزام الكامل بأعلى المعايير العالمية في التنفيذ." : "Full commitment to the highest international execution standards." },
                { en: "Scalable Operations", ar: "عمليات قابلة للتوسع", desc: isAr ? "بناء نماذج عمل تدعم النمو المؤسسي المستدام." : "Building operating models that support sustainable institutional growth." }
              ].map((item: any, i: number) => (
                <div key={i} className="bg-white/5 p-12 border-l-2 border-transparent hover:border-ssk-cyan hover:bg-white/10 transition-all group shadow-ssk-glow">
                   <h4 className={cn(
                     "text-[20px] font-bold text-ssk-cyan mb-4 uppercase tracking-widest",
                     isAr && "font-[var(--font-arabic)]"
                   )}>
                    {isAr ? item.ar : item.en}
                   </h4>
                   <p className="text-[17px] text-white/40 leading-relaxed group-hover:text-white/60 transition-colors font-medium">
                    {item.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </SectionShell>

      {/* SECTION D: EXECUTIVE LEADERSHIP */}
      <SectionShell className="bg-ssk-surface">
         <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 relative group">
               <div className="aspect-[4/5] bg-ssk-border overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 shadow-ssk-layered">
                  <div className="absolute inset-0 bg-ssk-navy/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center text-ssk-navy opacity-5">
                     <Building2 size={320} />
                  </div>
               </div>
               <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-ssk-navy flex items-center justify-center p-6 shadow-ssk-glow group">
                  <span className={cn(
                    "text-ssk-cyan font-bold text-center leading-tight text-[12px] uppercase tracking-widest",
                    isAr && "font-[var(--font-arabic)] tracking-normal"
                  )}>
                     {isAr ? "معايير الإدارة العليا" : "Boardroom Standard Execution"}
                  </span>
               </div>
            </div>

            <div className="lg:col-span-7 lg:pl-16">
               <div className="mb-12">
                  <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
                    {isAr ? "القيادة التنفيذية" : "Executive Leadership"}
                  </p>
                  <h2 className={cn(
                    "font-[var(--font-display)] text-[44px] font-bold text-ssk-navy lg:text-[64px] tracking-tight leading-[1.05]",
                    isAr && "font-[var(--font-arabic)] tracking-normal"
                  )}>
                    {isAr ? "منهجية مهنية مبنية على النتائج." : "A Professional Outcome-Driven Methodology."}
                  </h2>
               </div>

               <div className="bg-white p-12 shadow-ssk-layered border-l-[6px] border-ssk-cyan mb-12">
                  <p className="text-[22px] leading-relaxed text-ssk-navy font-bold">
                    {isAr ? "التنفيذ ليس مجرد خطة، بل هو الالتزام الصارم بتحقيق المستهدفات بجودة استثنائية." : "Execution is not just a plan; it is the rigid commitment to achieving targets with exceptional quality."}
                  </p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-16">
                  {[
                    { en: "Strategic Focus", ar: "التركيز الاستراتيجي", desc: isAr ? "مواءمة كافة الجهود مع الرؤية الكلية للجهة." : "Aligning all efforts with the overall institutional vision." },
                    { en: "Outcome Accountability", ar: "المسؤولية عن النتائج", desc: isAr ? "الالتزام بتحويل الخطط إلى نتائج ملموسة." : "Commitment to transforming plans into tangible outcomes." }
                  ].map((area: any, i: number) => (
                    <div key={i} className="space-y-4">
                       <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-ssk-cyan" />
                          <h6 className={cn("text-[16px] font-bold text-ssk-navy uppercase tracking-wide", isAr && "font-[var(--font-arabic)]")}>
                             {isAr ? area.ar : area.en}
                          </h6>
                       </div>
                       <p className="text-[14px] text-ssk-text-soft leading-relaxed font-medium">
                          {area.desc}
                       </p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </SectionShell>

      {/* SECTION E: INSTITUTIONAL PARTNERS */}
      <section className="bg-white py-40 border-t border-ssk-border">
         <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <p className="mb-12 text-[12px] font-bold uppercase tracking-[0.4em] text-ssk-cyan text-center opacity-60">
               {isAr ? "شركاء الإنجاز" : "Our Institutional Partners"}
            </p>
            <ClientGrid isAr={isAr} />
         </div>
      </section>

      {/* SECTION F: ISO CREDENTIALS */}
      <IsoCredentials lang={lang as "en" | "ar"} />

      {/* FINAL CTA: ENGAGEMENT LIAISON */}
      <section className="bg-ssk-navy py-24 text-center relative overflow-hidden flex items-center justify-center">
         {/* Background Detail */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
            <span className="text-[20vw] font-bold text-ssk-cyan tracking-tighter uppercase whitespace-nowrap">Excellence</span>
          </div>

         <div className="mx-auto max-w-[900px] px-6 relative z-10">
             <p className="mb-8 text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
                {isAr ? "تواصل معنا" : "Connect with Us"}
             </p>
            <h2 className={cn(
               "font-[var(--font-display)] text-[44px] font-bold text-white leading-tight mb-12 lg:text-[72px] tracking-tight",
               isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
               {a.cta.title}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Link 
               href={`/${lang}/engagement`}
               className="inline-flex min-h-[80px] items-center justify-center bg-ssk-cyan px-16 text-[14px] font-bold uppercase tracking-[0.2em] text-ssk-navy transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-ssk-glow"
              >
                {dict.navigation.engagement}
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
