import { SectionShell } from "@/components/site/SectionShell";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Lock,
  Search,
  CheckCircle2
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
  
  if (!job) return { title: isAr ? "تقديم طلب | SSK" : "Apply | SSK" };
  
  return {
    title: `${isAr ? "تقديم:" : "Apply:"} ${job.title} | SSK`,
    description: isAr ? `نموذج التقديم لوظيفة ${job.title} في قطاع ${job.department}` : `Application form for ${job.title} in ${job.department}`,
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { id, lang } = await params;
  const job = await getJobById(id);

  if (!job || job.status !== "published") {
    notFound();
  }

  const isAr = lang === "ar";
  const title = job.title;

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO — FLAT INSTITUTIONAL */}
      <section className="bg-ssk-navy pt-40 pb-24 border-b border-white border-b-4">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Link href={`/${lang}/careers/${job.id}`} className="inline-flex text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-cyan mb-10 hover:text-white transition-colors items-center">
            <ArrowLeft className={cn("h-4 w-4 mr-3", isAr && "rotate-180 mr-0 ml-3")} /> 
            {isAr ? "العودة لتفاصيل الوظيفة" : "Return to Role Specifications"}
          </Link>
          
          <h1 className={cn(
             "text-[40px] md:text-[54px] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-6 max-w-[900px]",
             isAr ? "font-[var(--font-arabic)] tracking-normal" : "font-[var(--font-display)]"
          )}>
            {isAr ? "تفعيل إجراءات التقديم." : "Initialize Deployment Protocol."}
          </h1>
          <p className="text-[18px] text-white/60 font-medium leading-relaxed mb-4">
            {isAr ? "تأكيد الترشيح لشغل دور استراتيجي في منظومة SSK التنفيذية." : "Confirm candidacy for a strategic deployment within the SSK execution matrix."}
          </p>
          <div className="inline-flex flex-col bg-white/5 border border-white/10 px-6 py-4 mt-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ssk-cyan mb-2">{isAr ? "شفرة الوظيفة المستهدفة" : "Target Role Reference"}</span>
             <span className={cn("text-white font-bold text-xl", isAr && "font-[var(--font-arabic)]")}>{title} <span className="opacity-40 text-sm ml-2">({job.id})</span></span>
          </div>
        </div>
      </section>

      {/* 2. FORM GRID */}
      <section className="py-24 max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-8">
             <div className="p-10 md:p-14 bg-white border-2 border-ssk-border hover:border-ssk-cyan/50 transition-colors">
                <ApplicationForm jobId={job.id} jobTitle={title} lang={lang} />
             </div>
          </div>

          <div className="lg:col-span-4 space-y-16">
             <div className="sticky top-40">
                <h4 className={cn(
                  "text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-navy mb-8 border-b-2 border-ssk-navy pb-4 inline-block",
                  isAr && "tracking-normal text-[14px]"
                )}>
                  {isAr ? "الإطار التشغيلي للفرز" : "Evaluation Matrix"}
                </h4>
                
                <div className="space-y-6">
                   {[
                     { 
                       t: isAr ? "1. المراجعة الفنية" : "1. Technical Review", 
                       d: isAr ? "يتم تقييم مطابقة خبراتك بدقة مع متطلباتنا التشغيلية الصارمة." : "Precise congruence mapping between your execution history and our operational requirements." 
                     },
                     { 
                       t: isAr ? "2. التقييم المؤسسي" : "2. Matrix Evaluation", 
                       d: isAr ? "إجراء مناقشة استراتيجية مع فريق الإدارة لتحديد فرص التوافق." : "Strategic alignment discourse with management to define synergy potential." 
                     },
                     { 
                       t: isAr ? "3. التكليف المباشر" : "3. Direct Deployment", 
                       d: isAr ? "بدء إجراءات الانضمام للفريق وتوقيع عقود الامتثال التنفيذية." : "Initiation of onboarding mechanics and execution of compliance contracts." 
                     }
                   ].map((step, i) => (
                     <div key={i} className="flex flex-col p-6 border border-ssk-border bg-[#f7f9fb]">
                        <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-ssk-navy mb-3 flex items-center">
                           <CheckCircle2 className="w-4 h-4 mr-3 rtl:mr-0 rtl:ml-3 text-ssk-cyan" />
                           {step.t}
                        </p>
                        <p className="text-[13px] text-ssk-text-soft font-medium leading-relaxed pl-7 rtl:pl-0 rtl:pr-7">{step.d}</p>
                     </div>
                   ))}
                </div>

                <div className="mt-10 p-6 bg-ssk-surface border-l-4 border-ssk-cyan rtl:border-l-0 rtl:border-r-4">
                   <div className="flex items-center space-x-3 mb-4">
                      <Lock className="h-4 w-4 text-ssk-cyan rtl:ml-3" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{isAr ? "حماية البيانات" : "Data Protection"}</span>
                   </div>
                   <p className="text-[12px] font-medium leading-relaxed text-ssk-navy/60">
                      {isAr 
                       ? "كافة المدخلات تخضع لتشفير مؤسسي ولا يتم مشاركتها خارج نطاق فرق التقييم المعتمدة."
                       : "All telemetry is subjected to institutional-grade encryption algorithms and strictly siloed."
                      }
                   </p>
                </div>
             </div>
          </div>
          
        </div>
      </section>

      {/* 3. RETURN INDEX */}
      <section className="bg-ssk-surface py-24 border-t border-ssk-border">
         <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 lg:px-10 text-center md:text-left rtl:md:text-right">
            <div>
               <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-cyan mb-4">{isAr ? "الشواغر المتاحة" : "Active Requisitions"}</h4>
               <p className={cn("text-[24px] font-bold text-ssk-navy", isAr && "font-[var(--font-arabic)]")}>{isAr ? "هل ترغب باستعراض إدارة مختلفة؟" : "Seeking an alternate trajectory?"}</p>
            </div>
            <Link href={`/${lang}/careers`}>
               <Button className="font-bold uppercase tracking-[0.2em] text-[11px] px-12 h-[64px] rounded-none bg-ssk-navy hover:bg-ssk-cyan text-white hover:text-ssk-navy transition-colors">
                  {isAr ? "تصفح كافة المهام النشطة" : "BROWSE ALL DEPLOYMENTS"} <Search className={cn("h-4 w-4 ml-3", isAr && "rtl:mr-3 rtl:ml-0")} />
               </Button>
            </Link>
         </div>
      </section>
    </main>
  );
}
