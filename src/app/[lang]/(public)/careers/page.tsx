import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SectionShell } from "@/components/site/SectionShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Briefcase, Cpu, ShieldCheck, Users, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { getJobs } from "@/lib/admin-actions";

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
  const isAr = lang === "ar";

  const allJobs = await getJobs();
  const activeJobs = allJobs.filter((j: any) => j.status === "published").map((j: any) => ({
    ...j,
    title: isAr ? j.titleAr : j.titleEn,
    description: isAr ? j.descriptionAr : j.descriptionEn
  }));

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* SECTION A: CAREERS HERO */}
      <section className="bg-ssk-navy pt-40 pb-24 border-b border-white border-b-4">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
             {isAr ? "استقطاب المواهب التنفيذية" : "Executive Talent Acquisition"}
          </p>
          <h1 className={cn(
             "font-[var(--font-display)] text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-white lg:text-[72px] max-w-[900px]",
             isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {isAr ? "ساهم في صياغة مستقبل التنفيذ الاستراتيجي." : "Shaping the Future of Strategic Execution."}
          </h1>
          <p className="mt-8 max-w-[700px] text-[20px] leading-relaxed text-white/60 font-medium">
            {isAr ? "نحن نبحث عن الكفاءات الطموحة للانضمام إلى فريقنا المتميز في قيادة التحول المؤسسي." : "We are seeking ambitious talent to join our elite team in driving institutional transformation."}
          </p>
        </div>
      </section>

      {/* SECTION B: CORE VALUES (FLAT GRID) */}
      <SectionShell className="bg-white py-32 border-b border-ssk-border/30">
        <div className="max-w-[900px] mb-20">
           <h2 className={cn(
             "font-[var(--font-display)] text-[36px] font-bold text-ssk-navy lg:text-[54px] tracking-[-0.03em] leading-[1.1]",
             isAr && "font-[var(--font-arabic)] tracking-normal"
           )}>
             {isAr ? "تكوين القيادات وبناء الأثر." : "Forging Leaders & Institutional Impact."}
           </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-ssk-border pt-12">
           {[
             { en: "High Impact Delivery", ar: "أثر تنفيذي ملموس", desc: isAr ? "المساهمة في مشاريع وطنية ومؤسسية كبرى تعمل على تشكيل المستقبل الرقمي للمنظومة." : "Contributing to major national and corporate projects that shape the digital posture." },
             { en: "Continuous Competence", ar: "كفاءة مستمرة", desc: isAr ? "توفير مسارات تطوير مهني واضحة ومكثفة تقود للتميز التكنولوجي وتطابق معايير الجودة العالمية." : "Providing clear and intensive professional development cycles aligned with global tech benchmarks." },
             { en: "Elite Ecosystem", ar: "نخبة الخبراء", desc: isAr ? "العمل جنباً إلى جنب مع نخبة المبدعين والمستشارين الفنيين وصناع القرار المؤسسيين." : "Deploying alongside an elite network of tech architects, consultants, and decision-makers." }
           ].map((pillar: any, i: number) => {
             const icons = [<Cpu key="1" />, <ShieldCheck key="2" />, <Users key="3" />];
             return (
              <div key={i} className="group relative border-l-2 border-ssk-border hover:border-ssk-cyan pl-8 rtl:pl-0 rtl:border-l-0 rtl:border-r-2 rtl:pr-8 py-2 transition-all">
                 <div className="text-ssk-navy mb-6 group-hover:text-ssk-cyan transition-colors">
                    {icons[i] && <div className="h-6 w-6">{icons[i]}</div>}
                 </div>
                 <h4 className={cn(
                   "text-[16px] font-bold text-ssk-navy uppercase tracking-widest mb-4 group-hover:text-ssk-cyan transition-colors", 
                   isAr && "font-[var(--font-arabic)] tracking-normal text-[18px]"
                 )}>
                   {isAr ? pillar.ar : pillar.en}
                 </h4>
                 <p className="text-[15px] text-ssk-text-soft leading-relaxed font-medium">
                   {pillar.desc}
                 </p>
              </div>
             );
           })}
        </div>
      </SectionShell>

      {/* SECTION C: DYNAMIC OPEN VACANCIES */}
      <SectionShell className="bg-ssk-surface py-32">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16">
             <h2 className={cn(
               "font-[var(--font-display)] text-[36px] md:text-[54px] font-bold text-ssk-navy leading-tight tracking-[-0.03em] mb-6",
               isAr && "font-[var(--font-arabic)] tracking-normal"
             )}>
               {isAr ? "الشواغر المتاحة للتوظيف الاستراتيجي" : "Active Strategic Deployments"}
             </h2>
             <p className="max-w-[700px] text-[18px] leading-relaxed text-ssk-text-soft font-medium">
               {isAr ? "قائمة الاحتياجات التخصصية النشطة في محركات التوظيف." : "Our active index of specialized talent requirements and active job requisitions."}
             </p>
          </div>

          {activeJobs.length === 0 ? (
            <div className="bg-white border-2 border-ssk-border p-12 text-center flex flex-col items-center">
               <Briefcase className="w-10 h-10 text-ssk-cyan mb-6" />
               <h3 className="text-xl font-bold text-ssk-navy mb-4 uppercase tracking-widest">{isAr ? "لا توجد متطلبات تخصصية نشطة" : "Zero Active Deployments"}</h3>
               <p className="text-ssk-text-soft font-medium max-w-lg mx-auto">
                 {isAr ? "خارطة الشواغر مكتفية حالياً. نرحب دائماً باستقبال سيركم الذاتية ضمن النموذج العام للمسارات المستقبلية." : "The operational index is currently fulfilled. You may submit a generalized profile sequence below for future integration."}
               </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {activeJobs.map((job: any) => (
                 <div key={job.id} className="bg-white border-2 border-ssk-border hover:border-ssk-cyan hover:shadow-ssk-glow p-10 flex flex-col justify-between transition-all group">
                   <div>
                     <div className="flex flex-wrap gap-4 mb-8">
                       <span className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-ssk-navy bg-ssk-surface px-4 py-2 border border-ssk-border">
                         <Briefcase className="w-3 h-3 mr-2 rtl:mr-0 rtl:ml-2 text-ssk-cyan" /> {job.department}
                       </span>
                       <span className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-ssk-navy bg-ssk-surface px-4 py-2 border border-ssk-border">
                         <MapPin className="w-3 h-3 mr-2 rtl:mr-0 rtl:ml-2 text-ssk-cyan" /> {job.location}
                       </span>
                       <span className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-ssk-navy bg-ssk-surface px-4 py-2 border border-ssk-border">
                         <Clock className="w-3 h-3 mr-2 rtl:mr-0 rtl:ml-2 text-ssk-cyan" /> {job.type}
                       </span>
                     </div>
                     
                     <h3 className={cn(
                       "text-[24px] font-bold text-ssk-navy mb-4 leading-tight group-hover:text-ssk-cyan transition-colors",
                       isAr ? "font-[var(--font-arabic)] tracking-normal text-[28px]" : "font-[var(--font-display)] tracking-tight"
                     )}>
                       {job.title}
                     </h3>
                     
                     <p className={cn(
                       "text-ssk-text-soft leading-relaxed font-medium mb-10 h-20 overflow-hidden line-clamp-3",
                       isAr && "text-[16px]"
                     )}>
                       {job.description}
                     </p>
                   </div>
                   
                   <div className="pt-6 border-t border-ssk-border mt-auto flex justify-between items-center">
                     <span className="text-[10px] font-bold text-ssk-navy uppercase tracking-[0.3em]">REF: {job.id}</span>
                     <Link href={`/${lang}/careers/${job.id}`} className="group-hover:translate-x-2 transition-transform inline-flex items-center text-[12px] font-bold text-ssk-cyan uppercase tracking-[0.2em]">
                       {isAr ? "التفاصيل الوظيفية" : "View Sequence"} <ArrowRight className={cn("w-4 h-4 ml-2", isAr && "rotate-180 mr-2 ml-0")} />
                     </Link>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </SectionShell>

      {/* SECTION D: APPLICATION PROCESS */}
      <SectionShell dark id="apply-section" className="bg-ssk-navy py-32 border-t-4 border-ssk-cyan">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
           <div className="lg:col-span-4">
              <h3 className={cn(
                "font-[var(--font-display)] text-[36px] font-bold text-white leading-[1.1] mb-8 lg:text-[48px] tracking-[-0.03em]",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                {isAr ? "الانضمام للمنظومة التنفيذية." : "Register Your Framework."}
              </h3>
              <p className="text-[18px] text-white/60 font-medium leading-relaxed mb-12">
                {isAr ? "للترشح لشواغر غير مدرجة، يمكنك إرسال ملفك التعريفي العام لمراجعته من قبل إدارة الاستقطاب." : "For off-cycle deployments, execute a generic application workflow below to be cataloged in our acquisition matrix."}
              </p>

              <div className="border-l-4 border-ssk-cyan pl-6 py-2 rtl:pl-0 rtl:border-l-0 rtl:border-r-4 rtl:pr-6">
                 <p className="text-sm font-bold uppercase tracking-widest text-ssk-cyan mb-2 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {isAr ? "بروتوكول السرية" : "Confidentiality Protocol"}
                 </p>
                 <p className="text-xs text-white/50 leading-relaxed font-medium">
                    {isAr 
                      ? "كافة الملفات تعامل بسرية تامة وسيتم التواصل معك مباشرة في حال المطابقة."
                      : "All submissions are isolated under strict operational secrecy parameters."
                    }
                 </p>
              </div>
           </div>
           <div className="lg:col-span-8 bg-white p-10 border-2 border-ssk-cyan shadow-xl">
              <ApplicationForm jobId="general" jobTitle={isAr ? "طلب توظيف عام" : "General Open Application"} lang={lang} />
           </div>
        </div>
      </SectionShell>

    </div>
  );
}
