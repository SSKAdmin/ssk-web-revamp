import { Section } from "@/components/site/Section";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ShieldCheck,
  Lock,
  Target,
  Search
} from "lucide-react";
import { getJobById } from "@/lib/db/queries";

interface ApplyPageProps {
  params: Promise<{ id: string; lang: string }>;
}

export async function generateMetadata({ params }: ApplyPageProps) {
  const { id, lang } = await params;
  const job = await getJobById(id);
  const isAr = lang === "ar";
  
  if (!job) return { title: isAr ? "تقديم طلب | SSK" : "Apply | SSK" };
  
  return {
    title: `${isAr ? "التقديم:" : "Apply:"} ${job.title} | SSK`,
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

  return (
    <main className="min-h-screen pt-24 md:pt-32">
      {/* 1. HERO */}
      <Section className="bg-ssk-navy text-white py-32 md:py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-ssk-cyan/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-4xl relative z-10">
          <Link href={`/${lang}/careers/${job.id}`} className="text-[10px] font-bold uppercase tracking-[0.4em] text-ssk-cyan mb-12 flex items-center hover:translate-x-[-10px] transition-transform">
            <ArrowLeft className="h-3 w-3 mr-4" /> {isAr ? "العودة لتفاصيل الوظيفة" : "Return to Role Specifications"}
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 uppercase">
            {isAr ? "نموذج" : "Submit Your"} <br /> {isAr ? "التقديم" : "Application"}.
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-xl leading-relaxed">
            {isAr ? "الوظيفة:" : "Role:"} <span className="text-white">{job.title}</span> <br />
            {isAr ? "القسم:" : "Department:"} {job.department}.
          </p>
        </div>
      </Section>

      {/* 2. FORM */}
      <Section className="bg-white py-40 -mt-12 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8">
             <div className="p-12 md:p-20 bg-white border border-ssk-border shadow-ssk-layered relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                   <Target className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                   <h2 className="text-3xl font-bold uppercase tracking-tight mb-12">{isAr ? "طلب انضمام احترافي" : "Professional Application"}</h2>
                   <ApplicationForm jobId={job.id} lang={lang} />
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-16">
             <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ssk-cyan mb-8">{isAr ? "مراحل الطلب" : "Process Overview"}</p>
                <div className="space-y-12">
                   {[
                     { 
                       t: isAr ? "المراجعة" : "Initial Review", 
                       d: isAr ? "تتم مراجعة طلبكم من قِبل فريق الموارد البشرية والمدير المسؤول عن القسم." : "Your application will be reviewed by our talent team and the respective department head." 
                     },
                     { 
                       t: isAr ? "التقييم الفني" : "Technical Evaluation", 
                       d: isAr ? "قد يُطلب منكم إجراء مقابلة فنية أو تقديم عرض لمناقشة خبراتكم المهنية." : "You may be invited for a technical discussion or requested to provide a professional case study." 
                     },
                     { 
                       t: isAr ? "السرية والخصوصية" : "Professional Privacy", 
                       d: isAr ? "يتم التعامل مع كافة بياناتكم بسرية واحترافية تامة خلال كافة مراحل التوظيف." : "All application data is handled with the highest level of professional confidentiality through the hiring lifecycle." 
                     }
                   ].map((step, i) => (
                     <div key={i} className="flex items-start space-x-6">
                        <div className="w-10 h-10 bg-ssk-surface border border-ssk-border flex items-center justify-center text-ssk-cyan text-[10px] font-bold">
                           0{i+1}
                        </div>
                        <div className={isAr ? "pr-6 space-x-0" : ""}>
                           <p className="text-xs font-bold uppercase tracking-widest text-ssk-navy mb-2">{step.t}</p>
                           <p className="text-sm text-ssk-text-soft font-medium leading-relaxed">{step.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="p-10 bg-ssk-surface border-l-4 border-ssk-cyan">
                <div className="flex items-center space-x-4 mb-6">
                   <Lock className="h-4 w-4 text-ssk-cyan" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">{isAr ? "إرسال آمن" : "Secured Submission"}</span>
                </div>
                <p className="text-xs font-bold leading-relaxed text-ssk-navy/60 italic">
                   {isAr 
                    ? "\"نحن لا نبحث عن مستشارين فقط، بل عن شركاء يسعون لتحقيق نتائج ملموسة وتغيير إيجابي.\""
                    : "\"We look for professionals who are driven by outcomes and committed to creating tangible strategic impact.\""
                   }
                </p>
             </div>
          </div>
        </div>
      </Section>

      <Section className="bg-ssk-surface py-32 border-t border-ssk-border">
         <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left px-6 lg:px-10">
            <div>
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-ssk-cyan mb-4">{isAr ? "الفرص المتاحة" : "Active Opportunities"}</h4>
               <p className="text-xl font-bold uppercase tracking-tight">{isAr ? "هل تبحث عن دور آخر؟" : "Looking for other roles?"}</p>
            </div>
            <Link href={`/${lang}/careers`}>
               <Button className="font-bold uppercase tracking-widest text-[10px] px-12 py-6 h-[64px] rounded-none bg-ssk-navy hover:bg-ssk-cyan text-white hover:text-ssk-navy transition-all shadow-xl">
                  {isAr ? "عرض كافة الوظائف" : "BROWSE ALL ROLES"} <Search className="ml-3 h-3 w-3" />
               </Button>
            </Link>
         </div>
      </Section>
    </main>
  );
}
