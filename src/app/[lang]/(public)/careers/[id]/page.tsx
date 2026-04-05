import { SectionShell } from "@/components/site/SectionShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Workflow,
  Cpu
} from "lucide-react";
import { getJobById } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

interface ApplyPageProps {
  params: Promise<{ id: string; lang: string }>;
}

export async function generateMetadata({ params }: ApplyPageProps) {
  const { id, lang } = await params;
  const job = await getJobById(id);
  const isAr = lang === "ar";
  
  if (!job) return { title: isAr ? "تفاصيل الوظيفة | SSK" : "Role Specifications | SSK" };
  
  return {
    title: `${job.title} | SSK ${isAr ? "للتوظيف" : "Careers"}`,
    description: job.description,
  };
}

export default async function JobDetailsPage({ params }: ApplyPageProps) {
  const { id, lang } = await params;
  const job = await getJobById(id);
  const isAr = lang === "ar";

  if (!job || job.status !== "published") {
    notFound();
  }

  const title = job.title;
  const description = job.description;
  
  // Normalize arrays if they exist, else empty array
  const responsibilities = job.responsibilities || [];
  const requirements = job.requirements || [];

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO — INSTITUTIONAL NAVY */}
      <section className="bg-ssk-navy pt-40 pb-24 border-b border-white border-b-4">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Link href={`/${lang}/careers`} className="inline-flex text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-cyan mb-10 hover:text-white transition-colors items-center">
            <ArrowLeft className={cn("h-4 w-4 mr-3", isAr && "rotate-180 mr-0 ml-3")} /> 
            {isAr ? "العودة لقائمة الشواغر" : "Return to Deployments Index"}
          </Link>
          
          <h1 className={cn(
             "text-[40px] md:text-[64px] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-10 max-w-[900px]",
             isAr ? "font-[var(--font-arabic)] tracking-normal" : "font-[var(--font-display)]"
          )}>
            {title}
          </h1>
          
          <div className="flex flex-wrap gap-4">
             <div className="flex items-center text-[11px] font-bold uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-5 py-3 text-white">
                <MapPin className="h-4 w-4 mr-3 rtl:mr-0 rtl:ml-3 text-ssk-cyan" /> {job.location}
             </div>
             <div className="flex items-center text-[11px] font-bold uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-5 py-3 text-white">
                <Workflow className="h-4 w-4 mr-3 rtl:mr-0 rtl:ml-3 text-ssk-cyan" /> {job.type}
             </div>
             <div className="flex items-center text-[11px] font-bold uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-5 py-3 text-white">
                <Building2 className="h-4 w-4 mr-3 rtl:mr-0 rtl:ml-3 text-ssk-cyan" /> {job.department}
             </div>
          </div>
        </div>
      </section>

      {/* 2. DESCRIPTION — CLINICAL GRID */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-20">
             
             {/* CONTEXT */}
             <div>
                <h2 className={cn(
                  "text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-cyan mb-6 flex items-center",
                  isAr && "tracking-normal text-[14px]"
                )}>
                  <Briefcase className="w-4 h-4 mr-3 rtl:mr-0 rtl:ml-3" />
                  {isAr ? "الإطار التشغيلي (السياق)" : "Operational Context"}
                </h2>
                <div className="w-12 h-1 bg-ssk-navy mb-8"></div>
                <p className="text-[18px] text-ssk-navy font-bold leading-relaxed">
                  {description}
                </p>
             </div>

             {/* RESPONSIBILITIES */}
             {(responsibilities as string[]).length > 0 && (
               <div>
                  <h3 className={cn(
                    "text-[28px] font-bold text-ssk-navy mb-8 tracking-tight",
                    isAr && "font-[var(--font-arabic)] tracking-normal text-[32px]"
                  )}>
                    {isAr ? "نطاق المسؤوليات الاستراتيجي" : "Strategic Responsibilities"}
                  </h3>
                  <div className="w-12 h-1 bg-ssk-cyan mb-8"></div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {(responsibilities as string[]).map((resp: string, i: number) => (
                       <li key={i} className="flex flex-col p-6 border-l-2 border-ssk-border bg-[#f7f9fb] group hover:border-ssk-cyan transition-all rtl:border-l-0 rtl:border-r-2">
                          <span className="text-[20px] font-bold text-ssk-navy/20 mb-3 group-hover:text-ssk-cyan transition-colors">0{i+1}</span>
                          <p className="text-[15px] font-medium text-ssk-navy leading-relaxed">{resp}</p>
                       </li>
                     ))}
                  </ul>
               </div>
             )}

             {/* REQUIREMENTS */}
             {(requirements as string[]).length > 0 && (
               <div>
                  <h3 className={cn(
                    "text-[28px] font-bold text-ssk-navy mb-8 tracking-tight",
                    isAr && "font-[var(--font-arabic)] tracking-normal text-[32px]"
                  )}>
                    {isAr ? "معايير الكفاءة والقبول" : "Execution Credentials"}
                  </h3>
                  <div className="w-12 h-1 bg-ssk-cyan mb-8"></div>
                  <ul className="space-y-4">
                     {(requirements as string[]).map((req: string, i: number) => (
                       <li key={i} className="flex items-start bg-white border border-ssk-border p-5 group hover:border-ssk-cyan transition-colors">
                          <div className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-ssk-navy/5 flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 group-hover:bg-ssk-cyan/10 transition-colors">
                             <CheckCircle2 className="h-3 w-3 text-ssk-navy group-hover:text-ssk-cyan transition-colors" />
                          </div>
                          <p className="text-[16px] font-bold text-ssk-navy">{req}</p>
                       </li>
                     ))}
                  </ul>
               </div>
             )}
          </div>

          {/* SIDEBAR: ACTION */}
          <div className="lg:col-span-4">
             <div className="sticky top-40 bg-[#f7f9fb] border-2 border-ssk-border p-10 hover:border-ssk-cyan/50 transition-colors">
                <div className="flex items-center justify-between mb-8">
                   <h4 className={cn(
                     "text-[14px] font-bold uppercase tracking-[0.2em] text-ssk-navy",
                     isAr && "tracking-normal text-[16px]"
                   )}>
                     {isAr ? "بوابة التقديم" : "Application Gateway"}
                   </h4>
                   <Cpu className="text-ssk-cyan w-6 h-6" />
                </div>
                
                <p className="text-[15px] text-ssk-navy font-bold mb-10 leading-relaxed">
                   {isAr 
                     ? "يتطلب تفعيل هذا الدور التحقق الدقيق من خبراتك وسجلك المهني. تأكد من أن ملفاتك متوافقة مع المعايير المؤسسية."
                     : "Initialization of this role requires strict clinical verification of your execution history. Ensure documentation is executive-ready."}
                </p>
                
                <div className="space-y-6">
                   <Link href={`/${lang}/careers/${job.id}/apply`} className="block w-full">
                      <Button className="w-full min-h-[64px] bg-ssk-navy text-ssk-cyan font-bold uppercase tracking-[0.2em] text-[12px] h-auto rounded-none hover:bg-ssk-cyan hover:text-ssk-navy transition-all border-none">
                         {isAr ? "بدء عملية الترشيح" : "INITIALIZE DEPLOYMENT"} <ArrowRight className={cn("ml-3 h-4 w-4", isAr && "rotate-180 mr-3 ml-0")} />
                      </Button>
                   </Link>
                   
                   <div className="flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
                      <ShieldCheck className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 text-ssk-cyan" /> 
                      {isAr ? "نظام مشفر ومؤمن بالكامل" : "Secured Processing"}
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 3. FINAL CTA MAP */}
      <section className="bg-ssk-surface py-20 border-t border-ssk-border text-center">
        <h2 className={cn(
          "text-[32px] font-bold text-ssk-navy mb-8",
          isAr ? "font-[var(--font-arabic)]" : "font-[var(--font-display)]"
        )}>
          {isAr ? "هل أنت جاهز للمهمة الاستراتيجية؟" : "Ready to Drive Execution?"}
        </h2>
        <Link href={`/${lang}/careers/${job.id}/apply`}>
           <Button className="bg-ssk-cyan text-ssk-navy hover:bg-ssk-navy hover:text-white font-bold uppercase tracking-[0.2em] text-[12px] px-16 py-8 h-auto rounded-none transition-colors border-none shadow-ssk-glow">
             {isAr ? "المضي قدماً والتسجيل" : "Proceed to Application"}
           </Button>
        </Link>
      </section>
    </main>
  );
}
