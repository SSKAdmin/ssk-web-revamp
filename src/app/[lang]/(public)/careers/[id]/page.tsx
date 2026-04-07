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
  Cpu,
  Linkedin,
  Link2,
  MessageCircle
} from "lucide-react";
import { getJobById } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface JobDetailsProps {
  params: Promise<{ id: string; lang: string }>;
}

export async function generateMetadata({ params }: JobDetailsProps) {
  const { id, lang } = await params;
  const job = await getJobById(id);
  const isAr = lang === "ar";
  
  if (!job) return { title: isAr ? "تفاصيل الوظيفة | SSK" : "Role Specifications | SSK" };
  
  const optimizedTitle = `${isAr ? job.titleAr : job.titleEn} | SSK ${isAr ? "للتوظيف" : "Careers"}`;
  const extractedDesc = (isAr ? job.descriptionAr : job.descriptionEn).substring(0, 160) + "...";
  
  return {
    title: optimizedTitle,
    description: extractedDesc,
    openGraph: {
      title: optimizedTitle,
      description: extractedDesc,
      url: `https://www.ssk.sa/${lang}/careers/${job.slug || job.id}`,
      siteName: "SSK Consulting Platform",
      images: [{ url: 'https://www.ssk.sa/logo.png', width: 1200, height: 630, alt: 'SSK Sovereign Strategy Consulting' }],
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: extractedDesc,
      images: ['https://www.ssk.sa/logo.png'],
    }
  };
}

// Custom Markdown Parser for the DB Text Block
function StructuredJobDescription({ text, isAr }: { text: string, isAr: boolean }) {
  if (!text) return null;
  
  // Split based on common Arabic/English Headers to give them visual weight
  // or simply split by double newline.
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim() !== "");

  return (
    <div className="space-y-10">
      {paragraphs.map((block, index) => {
        // Detect if this block is a header or list of bullets
        const lines = block.split('\n');
        
        // If it starts with a known header keyword or is very short, treat as Header + Content
        const isHeader = lines[0].includes(":") || lines[0].includes("المسؤوليات") || lines[0].includes("المؤهلات") || lines[0].includes("Requirements") || lines[0].includes("Responsibilities");

        if (isHeader && lines.length > 1) {
           return (
             <div key={index}>
               <h3 className={cn(
                 "text-[20px] font-bold text-ssk-navy mb-6 tracking-tight",
                 isAr && "font-[var(--font-arabic)] tracking-normal text-[24px]"
               )}>
                 {lines[0].replace(":", "")}
               </h3>
               {/* Check for dashed lines */}
               <ul className="space-y-4">
                 {lines.slice(1).map((line, liIdx) => {
                   const cleanLine = line.replace(/^-/, "").trim();
                   if (!cleanLine) return null;
                   return (
                     <li key={liIdx} className="flex items-start bg-white border border-ssk-border p-4 group hover:border-ssk-cyan transition-colors">
                        <div className="mt-1 flex-shrink-0 h-4 w-4 rounded-full bg-ssk-navy/5 flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 group-hover:bg-ssk-cyan/10 transition-colors">
                           <CheckCircle2 className="h-2 w-2 text-ssk-navy group-hover:text-ssk-cyan transition-colors" />
                        </div>
                        <p className="text-[15px] font-medium text-ssk-navy leading-relaxed">{cleanLine}</p>
                     </li>
                   )
                 })}
               </ul>
             </div>
           )
        }

        // Just regular paragraphs or dashed lists without a clear header
        return (
          <div key={index} className="text-[16px] text-ssk-navy leading-[2.2] font-medium text-justify">
             {lines.map((line, lIdx) => {
               if (line.trim().startsWith("-")) {
                 return (
                   <div key={lIdx} className="flex items-start mb-3">
                     <span className="mr-3 rtl:mr-0 rtl:ml-3 text-ssk-cyan font-bold">•</span>
                     <span>{line.replace(/^-/, "").trim()}</span>
                   </div>
                 );
               }
               return <p key={lIdx} className="mb-4">{line}</p>;
             })}
          </div>
        )
      })}
    </div>
  );
}

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
// Client Side Share Component since window.location requires 'use client'
import { ShareJobPanel } from "./ShareJobPanel";

export default async function JobDetailsPage({ params }: JobDetailsProps) {
  const { id, lang } = await params;
  const job = await getJobById(id);
  const isAr = lang === "ar";

  if (!job || job.status !== "published") {
    notFound();
  }

  // Asynchronously increment view metric without blocking the render
  db.update(schema.jobs).set({ views: sql`${schema.jobs.views} + 1` }).where(eq(schema.jobs.id, job.id))
    .catch(err => console.error("Failed to increment job view telemetry", err));

  const title = isAr ? job.titleAr : job.titleEn;
  const description = isAr ? job.descriptionAr : job.descriptionEn;

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
          <div className="lg:col-span-8">
             <div>
                <h2 className={cn(
                  "text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-cyan mb-6 flex items-center",
                  isAr && "tracking-normal text-[14px]"
                )}>
                  <Briefcase className="w-4 h-4 mr-3 rtl:mr-0 rtl:ml-3" />
                  {isAr ? "النطاق الإداري والوظيفي" : "Role Specifications"}
                </h2>
                <div className="w-12 h-1 bg-ssk-navy mb-12"></div>
                
                {/* Structured Professional Markdown Rendering */}
                <StructuredJobDescription text={description} isAr={isAr} />
             </div>
          </div>

          {/* SIDEBAR: ACTION & SHARING */}
          <div className="lg:col-span-4 space-y-8">
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
                   
                   <div className="flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-ssk-navy border-b border-ssk-border pb-6">
                      <ShieldCheck className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 text-ssk-cyan" /> 
                      {isAr ? "نظام مشفر ومؤمن بالكامل" : "Secured Processing"}
                   </div>
                   
                   {/* Share Component Hook */}
                   <ShareJobPanel isAr={isAr} title={title} jobId={job.id} />
                   
                </div>
             </div>
          </div>

        </div>
      </section>
    </main>
  );
}
