import { Section } from "@/components/site/Section";
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
  Workflow
} from "lucide-react";
import { getJobById } from "@/lib/db/queries";

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
    description: job.description || (isAr ? `فرصة عمل: ${job.title} في قطاع ${job.department}` : `Career Opportunity: ${job.title} in ${job.department}`),
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job || job.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 md:pt-32">
      {/* 1. HERO — DARK */}
      <Section className="bg-foreground text-background py-32 md:py-48 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-4xl relative z-10">
          <Link href="/careers" className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-12 flex items-center hover:translate-x-[-10px] transition-transform">
            <ArrowLeft className="h-3 w-3 mr-4" /> Return to Talent Pool
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9] mb-12 uppercase">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-8">
             <div className="flex items-center text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-3">
                <MapPin className="h-3 w-3 mr-3 text-accent" /> {job.location}
             </div>
             <div className="flex items-center text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-3">
                <Workflow className="h-3 w-3 mr-3 text-accent" /> {job.type}
             </div>
             <div className="flex items-center text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-3">
                <Building2 className="h-3 w-3 mr-3 text-accent" /> {job.department}
             </div>
          </div>
        </div>
      </Section>

      {/* 2. DESCRIPTION — LIGHT */}
      <Section className="bg-background py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-20">
             <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-10">Operational Context</h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                  {job.description}
                </p>
             </div>

             {/* RESPONSIBILITIES */}
             <div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-12">Clinical Responsibilities.</h3>
                <ul className="space-y-6">
                   {((job.responsibilities as unknown as string[]) || []).map((resp: string, i: number) => (
                     <li key={i} className="flex items-start space-x-6 p-8 border border-border/50 bg-muted/5 group hover:bg-foreground hover:text-background transition-all">
                        <span className="text-[10px] font-black text-accent group-hover:text-accent group-hover:scale-125 transition-all">0{i+1}</span>
                        <p className="text-sm font-bold leading-relaxed">{resp}</p>
                     </li>
                   ))}
                </ul>
             </div>

             {/* REQUIREMENTS */}
             <div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-12">Execution Standards.</h3>
                <ul className="space-y-6">
                   {((job.requirements as unknown as string[]) || []).map((req: string, i: number) => (
                     <li key={i} className="flex items-center space-x-6">
                        <div className="h-2 w-2 bg-accent"></div>
                        <p className="text-sm font-bold uppercase tracking-widest opacity-60">{req}</p>
                     </li>
                   ))}
                </ul>
             </div>
          </div>

          {/* SIDEBAR: ACTION */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
             <div className="p-12 border border-border/50 bg-background shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                   <Briefcase className="h-32 w-32" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground mb-8">Deployment Initialization</h4>
                <p className="text-sm text-muted-foreground font-medium mb-12 leading-relaxed">
                   Initialization of this role requires a clinical verification of your execution history. Ensure all documentation is executive-ready.
                </p>
                <div className="space-y-4">
                   <Link href={`/careers/${job.id}/apply`} className="w-full">
                      <Button className="w-full bg-accent text-white font-black uppercase tracking-widest text-[10px] py-8 h-auto rounded-none hover:scale-[1.02] transition-all border-none">
                         INITIALIZE APPLICATION <ArrowRight className="ml-3 h-4 w-4" />
                      </Button>
                   </Link>
                   <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground text-center opacity-40">
                      <ShieldCheck className="h-3 w-3 mr-2 inline" /> Secured Protocol Deployment
                   </p>
                </div>
             </div>
          </div>
        </div>
      </Section>

      {/* 3. FINAL CTA — DARK */}
      <Section className="bg-foreground text-background py-48 text-center rounded-t-[3rem] shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-16 uppercase">
            Ready for <br /> Deployment?
          </h2>
          <Link href={`/careers/${job.id}/apply`}>
             <Button className="bg-accent text-white hover:bg-accent/90 font-black uppercase tracking-widest text-xs px-20 py-10 h-auto rounded-none border-none shadow-2xl">
               Apply Now
             </Button>
          </Link>
        </div>
      </Section>
    </main>
  );
}
