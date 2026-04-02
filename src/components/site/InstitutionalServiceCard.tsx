"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { TechSolution } from "@/content/techSolutions";
import { Settings, Server, ArrowUpRight, Activity, DollarSign, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";
import { BrandText } from "./BrandText";

const ICON_MAP: Record<string, any> = {
  Settings,
  Server,
  ArrowUpRight,
  Activity,
  DollarSign,
  ShieldCheck,
};

interface InstitutionalServiceCardProps {
  solution: TechSolution;
  lang: "en" | "ar";
}

export function InstitutionalServiceCard({ solution, lang }: InstitutionalServiceCardProps) {
  const isAr = lang === "ar";
  const Icon = ICON_MAP[solution.icon] || Settings;

  return (
    <div className="flex flex-col bg-white border border-ssk-border shadow-sm hover:shadow-ssk-layered hover:border-ssk-cyan/50 transition-all duration-300 h-full group">
      
      {/* HEADER: Brand & Identity */}
      <div className="bg-ssk-navy p-8 border-b-4 border-ssk-cyan relative overflow-hidden shrink-0">
        {/* Subtle Watermark */}
        <Icon className="absolute -right-8 -bottom-8 w-40 h-40 text-white/[0.03] pointer-events-none" />
        
        <div className="relative z-10 flex items-start gap-5">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center rounded-lg border border-white/20 shrink-0 group-hover:bg-ssk-cyan/20 transition-colors">
             <Icon className="w-7 h-7 text-ssk-cyan" />
          </div>
          <div className="flex-1">
             <h3 className="font-[var(--font-display)] text-[28px] font-bold text-white tracking-tight leading-none mb-2">
               <BrandText text={solution.title} logoVariant="white" />
             </h3>
             <p className={cn(
               "text-[13px] text-white/70 font-bold uppercase tracking-widest",
               isAr && "font-[var(--font-arabic)] tracking-normal normal-case text-[15px]"
             )}>
               <BrandText text={isAr ? solution.subtitle.ar : solution.subtitle.en} logoVariant="white" />
             </p>
          </div>
        </div>
        
        <p className={cn(
          "relative z-10 mt-6 text-[15px] leading-relaxed text-white/80 font-medium",
          isAr && "font-[var(--font-arabic)] text-[16px]"
        )}>
          <BrandText text={isAr ? solution.description.ar : solution.description.en} logoVariant="white" />
        </p>
      </div>

      {/* BODY: Full Technical & Business Details */}
      <div className="flex flex-col p-8 gap-8 grow">
        
        {/* Pillar 1: Business Impact */}
        <div>
           <div className="flex items-center gap-3 mb-5">
              <CheckCircle2 className="w-5 h-5 text-ssk-cyan" />
              <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
                {isAr ? "الأثر التجاري (Business Value)" : "Business Value"}
              </h4>
           </div>
           <ul className="space-y-3">
             {(isAr ? solution.businessImpact.ar : solution.businessImpact.en).map((impact, idx) => (
               <li key={idx} className={cn(
                 "flex items-start gap-3 text-[15px] text-ssk-text-soft font-medium leading-tight",
                 isAr && "font-[var(--font-arabic)] text-[16px] leading-[1.6]"
               )}>
                 <span className="w-1.5 h-1.5 bg-ssk-navy/20 rounded-full shrink-0 flex mt-1.5"></span>
                 <span><BrandText text={impact} logoVariant="color" /></span>
               </li>
             ))}
           </ul>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-ssk-border/60" />

        {/* Pillar 2: Technical Scope */}
        <div>
           <div className="flex items-center gap-3 mb-5">
              <Cpu className="w-5 h-5 text-ssk-cyan" />
              <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
                {isAr ? "النطاق التقني (Technical Scope)" : "Technical Scope"}
              </h4>
           </div>
           <ul className="space-y-3">
             {(isAr ? solution.technicalScope.ar : solution.technicalScope.en).map((scope, idx) => (
               <li key={idx} className={cn(
                 "flex items-start gap-3 text-[15px] text-ssk-text-soft font-medium leading-tight",
                 isAr && "font-[var(--font-arabic)] text-[16px] leading-[1.6]"
               )}>
                 <span className="w-1.5 h-1.5 bg-ssk-cyan rounded-full shrink-0 flex mt-1.5 shadow-[0_0_5px_rgba(10,186,181,0.5)]"></span>
                 <span><BrandText text={scope} logoVariant="color" /></span>
               </li>
             ))}
           </ul>
        </div>

      </div>
    </div>
  );
}
