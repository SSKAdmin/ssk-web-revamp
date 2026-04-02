import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SectionShell } from "@/components/site/SectionShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Briefcase, Cpu, ShieldCheck, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ApplicationForm } from "@/components/site/ApplicationForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const m = dict.metadata.careers;
  return {
    title: m.title,
    description: m.description,
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const c = dict.careers_page;

  return (
    <div className="flex flex-col overflow-hidden">
      {/* SECTION A: CAREERS HERO */}
      <section className="bg-ssk-navy pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[18vw] font-bold text-ssk-cyan tracking-tighter uppercase select-none opacity-20">{isAr ? "الانضمام" : "JOIN US"}</span>
        </div>
        
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
          <p className="mb-8 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
             {isAr ? "الفرص الوظيفية" : "Career Opportunities"}
          </p>
          <h1 className={cn(
             "font-[var(--font-display)] text-[48px] font-bold leading-[1] tracking-[-0.04em] text-white lg:text-[84px] max-w-[900px]",
             isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {isAr ? "ساهم في صياغة مستقبل التنفيذ الاستراتيجي." : "Shaping the Future of Strategic Execution."}
          </h1>
          <p className="mt-12 max-w-[720px] text-[24px] leading-relaxed text-white/50 font-medium">
            {isAr ? "نحن نبحث عن الكفاءات الطموحة للانضمام إلى فريقنا المتميز في قيادة التحول المؤسسي." : "We are seeking ambitious talent to join our elite team in driving institutional transformation."}
          </p>
        </div>
      </section>

      {/* SECTION B: CORE VALUES */}
      <SectionShell className="bg-white py-40">
        <div className="max-w-[900px] mb-24">
           <p className="mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
              {isAr ? "لماذا SSK؟" : "Why SSK?"}
           </p>
           <h2 className={cn(
             "font-[var(--font-display)] text-[44px] font-bold text-ssk-navy lg:text-[64px] tracking-tight leading-[1.1]",
             isAr && "font-[var(--font-arabic)] tracking-normal"
           )}>
             {isAr ? "بيئة عمل قائمة على التميز المهني." : "An Environment of Professional Excellence."}
           </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ssk-border border border-ssk-border overflow-hidden shadow-ssk-layered">
           {[
             { en: "High Impact", ar: "تأثير ملموس", desc: isAr ? "المساهمة في مشاريع وطنية ومؤسسية كبرى." : "Contributing to major national and institutional projects." },
             { en: "Continuous Growth", ar: "نمو مستمر", desc: isAr ? "توفير مسارات تطوير مهني واضحة ومكثفة." : "Providing clear and intensive professional development paths." },
             { en: "Expert Community", ar: "مجتمع الخبرات", desc: isAr ? "العمل جنباً إلى جنب مع نخبة المبدعين والمستشارين." : "Working alongside a community of elite experts and consultants." }
           ].map((pillar: any, i: number) => {
             const icons = [<Cpu key="1" />, <ShieldCheck key="2" />, <Users key="3" />];
             return (
              <div key={i} className="bg-white p-12 group transition-all hover:bg-[#f7f9fb] shadow-ssk-layered relative z-10 border-b-4 border-transparent hover:border-ssk-cyan">
                 <div className="text-ssk-cyan mb-10 group-hover:scale-110 transition-transform flex justify-start">
                    {icons[i] && <div className="h-10 w-10">{icons[i]}</div>}
                 </div>
                 <h4 className={cn(
                   "text-[20px] font-bold text-ssk-navy uppercase tracking-wider mb-6 group-hover:text-ssk-cyan transition-colors", 
                   isAr && "font-[var(--font-arabic)] tracking-normal"
                 )}>
                   {isAr ? pillar.ar : pillar.en}
                 </h4>
                 <p className="text-[17px] text-ssk-text-soft leading-relaxed font-medium group-hover:text-ssk-navy transition-colors">
                   {pillar.desc}
                 </p>
              </div>
             );
           })}
        </div>
      </SectionShell>

      {/* SECTION C: APPLICATION PROCESS */}
      <SectionShell dark className="bg-ssk-navy relative py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
           <div className="lg:col-span-5">
              <p className="mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
                 {isAr ? "التقديم" : "Apply Now"}
              </p>
              <h3 className={cn(
                "font-[var(--font-display)] text-[44px] font-bold text-white leading-[1.1] mb-8 lg:text-[64px] tracking-tight",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                {isAr ? "سجل اهتمامك بالانضمام إلينا." : "Register Your Interest."}
              </h3>
              <p className="text-[22px] text-white/50 font-medium leading-relaxed max-w-[500px]">
                {isAr ? "قم بتعبئة النموذج وسيتواصل معك فريق استقطاب المواهب في حال ملاءمة خلفيتك لمتطلباتنا." : "Complete the registration form and our talent acquisition team will reach out if your background aligns."}
              </p>
           </div>
           <div className="lg:col-span-7 bg-white p-12 lg:p-16 shadow-ssk-glow">
              <ApplicationForm jobId="general" lang={lang} />
           </div>
        </div>
      </SectionShell>

      {/* SECTION D: CULTURE OF PRECISION */}
      <SectionShell className="bg-[#f7f9fb] py-56">
         <div className="grid grid-cols-1 gap-24 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
               <p className="mb-8 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
                 {isAr ? "بيئة العمل" : "Operating Environment"}
               </p>
               <h2 className={cn(
                 "font-[var(--font-display)] text-[48px] font-bold leading-[1] text-ssk-navy lg:text-[72px] tracking-[-0.03em]",
                 isAr && "font-[var(--font-arabic)] tracking-normal"
               )}>
                 {isAr ? "ثقافة قائمة على الأثر والنتيجة." : "A Culture of Impact and Accuracy."}
               </h2>
               <p className="mt-10 text-[22px] leading-relaxed text-ssk-text-soft font-medium max-w-[600px]">
                 {isAr ? "نحن نؤمن بأن الدقة في التفاصيل هي ما يصنع الفارق في المشاريع الكبرى." : "We believe that precision in details is what makes the difference in large-scale programs."}
               </p>
            </div>
            <div className="lg:col-span-5 bg-white p-12 lg:p-16 shadow-ssk-layered border-l-4 border-ssk-cyan">
               <ul className="space-y-10">
                  {(isAr ? ["الدقة المهنية", "المسؤولية الكاملة", "النمو الذاتي", "الروح الجماعية"] : ["Professional Rigor", "True Accountability", "Rapid Growth", "Collaborative Spirit"]).map((item: any, i: number) => (
                    <li key={i} className="flex gap-8 items-center group">
                       <span className="text-[32px] font-bold text-ssk-navy/[0.05] group-hover:text-ssk-cyan transition-colors">0{i+1}</span>
                       <span className={cn(
                         "text-[19px] font-bold text-ssk-navy uppercase tracking-wider group-hover:text-ssk-cyan transition-colors",
                         isAr && "font-[var(--font-arabic)] tracking-normal"
                       )}>
                         {item}
                       </span>
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </SectionShell>
    </div>
  );
}
