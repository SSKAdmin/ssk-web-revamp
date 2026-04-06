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
  
  const title = isAr ? job.titleAr : job.titleEn;
  
  return {
    title: `${isAr ? "تقديم:" : "Apply:"} ${title} | SSK`,
    description: isAr ? `نموذج التقديم لوظيفة ${title} في قطاع ${job.department}` : `Application form for ${title} in ${job.department}`,
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { id, lang } = await params;
  const job = await getJobById(id);

  if (!job || job.status !== "published") {
    notFound();
  }

  const isAr = lang === "ar";
  const title = isAr ? job.titleAr : job.titleEn;

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
          <p className="text-[18px] text-white/90 font-bold leading-relaxed mb-4">
            {isAr ? "تأكيد الترشيح لشغل دور استراتيجي في منظومة SSK التنفيذية." : "Confirm candidacy for a strategic deployment within the SSK execution matrix."}
          </p>
          <div className="inline-flex flex-col bg-white/5 border border-white/10 px-6 py-4 mt-4">
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ssk-cyan mb-2">{isAr ? "الدور المستهدف" : "Target Role"}</span>
             <span className={cn("text-white font-bold text-xl", isAr && "font-[var(--font-arabic)]")}>{title}</span>
          </div>
        </div>
      </section>

      {/* 2. FORM GRID */}
      <section className="py-24 max-w-4xl mx-auto px-6 lg:px-10">
         <div className="p-10 md:p-14 bg-white border-2 border-ssk-border hover:border-ssk-cyan/50 transition-colors">
            <ApplicationForm jobId={job.id} jobTitle={title} lang={lang} />
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
