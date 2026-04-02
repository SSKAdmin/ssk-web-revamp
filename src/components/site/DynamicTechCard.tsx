"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { TechSolution } from "@/content/techSolutions";
import { Settings, Server, ArrowUpRight, Activity, DollarSign, ShieldCheck, CheckCircle2, Cpu, Archive, Network, Route } from "lucide-react";
import { BrandText } from "./BrandText";

const ICON_MAP: Record<string, any> = {
  Settings,
  Server,
  ArrowUpRight,
  Activity,
  DollarSign,
  ShieldCheck,
};

interface DynamicTechCardProps {
  solution: TechSolution;
  lang: "en" | "ar";
}

export function DynamicTechCard({ solution, lang }: DynamicTechCardProps) {
  const isAr = lang === "ar";
  const Icon = ICON_MAP[solution.icon] || Settings;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [alignMode, setAlignMode] = useState<"left" | "center" | "right">("center");

  // A light collision detection to ensure the massive horizontal popup never bleeds off screen
  const detectAlignment = () => {
    if (cardRef.current && window.innerWidth >= 1024) {
      const rect = cardRef.current.getBoundingClientRect();
      const screenW = window.innerWidth;
      
      // If card constitutes the left 33% of the screen
      if (rect.left < screenW * 0.3) {
        setAlignMode("left");
      } 
      // If card constitutes the right 33% of the screen
      else if (rect.right > screenW * 0.7) {
        setAlignMode("right");
      } 
      else {
        setAlignMode("center");
      }
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={detectAlignment}
      className={cn(
        "relative w-full h-[250px] lg:h-[280px] group/card cursor-pointer",
        isAr && "text-right"
      )}
    >
      
      {/* MOBILE DIRECT NAVIGATOR OVERLAY */}
      <a href={`/${lang}/framework`} className="lg:hidden absolute inset-0 z-[60] touch-manipulation block" />

      {/* RESTING STATE (Base Card) */}
      <div className="absolute inset-0 bg-white border border-ssk-border rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm transition-all duration-300">
        <Icon className="absolute -left-5 -top-5 w-40 h-40 text-ssk-cyan opacity-[0.03] pointer-events-none" />
        
        <div className="w-16 h-16 mb-6 bg-ssk-surface border border-ssk-border flex items-center justify-center rounded-full text-ssk-cyan">
          <Icon className="w-7 h-7" strokeWidth={1.5} />
        </div>

        <h3 className={cn(
          "font-[var(--font-display)] text-[22px] font-bold text-ssk-navy tracking-tight mb-2",
          isAr && "font-[var(--font-arabic)] text-[24px]"
        )}>
          <BrandText text={solution.title} logoVariant="color" />
        </h3>

        <p className={cn(
          "text-[10px] text-ssk-text-soft font-bold uppercase tracking-[0.2em]",
          isAr && "font-[var(--font-arabic)] tracking-normal normal-case text-[12px]"
        )}>
          <BrandText text={isAr ? solution.subtitle.ar : solution.subtitle.en} logoVariant="color" />
        </p>
      </div>

      {/* MASSIVE HORIZONTAL POP-UP OVERLAY (Hidden on mobile) */}
      {/* 
        This is an incredibly wide popup (950px on desktop) that anchors based on 'alignMode' 
        so it flawlessly covers the grid without creating a horizontal scrollbar or bleeding off screen.
      */}
      <div className={cn(
        "hidden lg:flex lg:flex-col absolute -top-10 h-max min-h-[420px] bg-ssk-navy rounded-[2rem] shadow-[0_80px_150px_-20px_rgba(2,28,42,0.95)] border border-ssk-cyan/40 z-[100] p-8 lg:p-12 opacity-0 pointer-events-none scale-[0.95] group-hover/card:opacity-100 group-hover/card:pointer-events-auto group-hover/card:scale-100 transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
        "w-[940px] xl:w-[1000px]", // Massive precise width
        
        // Smart Alignment anchoring
        alignMode === "left" && "-left-4 lg:-left-12 origin-top-left",
        alignMode === "center" && "left-1/2 -translate-x-1/2 origin-top",
        alignMode === "right" && "-right-4 lg:-right-12 origin-top-right",
        
        isAr && "text-right"
      )}>
         {/* Beautiful Popup Header */}
         <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-8 shrink-0">
           <div>
              <div className="text-[12px] text-ssk-cyan font-bold uppercase tracking-[0.2em] mb-3">
                <BrandText text={isAr ? solution.subtitle.ar : solution.subtitle.en} logoVariant="white" />
              </div>
              <h4 className={cn(
                "text-[32px] lg:text-[40px] font-bold text-white leading-none",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}><BrandText text={solution.title} logoVariant="white" /></h4>
           </div>
           <div className="w-16 h-16 bg-ssk-cyan/10 flex items-center justify-center rounded-2xl border border-ssk-cyan/30 shrink-0 transform rotate-3">
              <Icon className="w-8 h-8 text-ssk-cyan" />
           </div>
         </div>

         {/* 3-COLUMN HORIZONTAL DATA GRID (Fits all details cleanly without vertical scrolling) */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 grow items-start">
            
            {/* COLUMN 1: Description & Business Impact */}
            <div className="flex flex-col gap-6">
              <p className={cn(
                "text-[15px] leading-relaxed text-white/80 font-medium",
                isAr && "font-[var(--font-arabic)] text-[16px]"
              )}>
                <BrandText text={isAr ? solution.description.ar : solution.description.en} logoVariant="white" />
              </p>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex-grow">
                 <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-ssk-cyan" />
                    <h5 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                      {isAr ? "القيمة المتوقعة" : "Business Value"}
                    </h5>
                 </div>
                 <ul className="space-y-3">
                   {(isAr ? solution.businessImpact.ar : solution.businessImpact.en).map((impact, idx) => (
                     <li key={idx} className={cn("flex items-start gap-3 text-[13px] text-white/90 font-medium", isAr && "font-[var(--font-arabic)]")}>
                       <span className="w-1.5 h-1.5 bg-white/30 rounded-full shrink-0 flex mt-1.5"></span>
                       <span><BrandText text={impact} logoVariant="white" /></span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

            {/* COLUMN 2: Tech Scope & Use Cases */}
            <div className="flex flex-col gap-6">
              <div className="bg-ssk-cyan/5 rounded-2xl p-6 border border-ssk-cyan/20 flex-grow">
                 <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-4 h-4 text-ssk-cyan" />
                    <h5 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                      {isAr ? "النطاق التقني" : "Technical Scope"}
                    </h5>
                 </div>
                 <ul className="space-y-3 mb-6">
                   {(isAr ? solution.technicalScope.ar : solution.technicalScope.en).map((scope, idx) => (
                     <li key={idx} className={cn("flex items-start gap-3 text-[13px] text-white/90 font-medium", isAr && "font-[var(--font-arabic)]")}>
                       <span className="w-1.5 h-1.5 bg-ssk-cyan rounded-full flex mt-1.5"></span>
                       <span><BrandText text={scope} logoVariant="white" /></span>
                     </li>
                   ))}
                 </ul>

                 {solution.useCases && (
                   <>
                     <div className="flex items-center gap-3 mb-4 pt-4 border-t border-ssk-cyan/20">
                        <Network className="w-4 h-4 text-ssk-cyan" />
                        <h5 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                          {isAr ? "حالات الاستخدام" : "Use Cases"}
                        </h5>
                     </div>
                     <ul className="space-y-3">
                       {(isAr ? solution.useCases.ar : solution.useCases.en).map((uc, idx) => (
                         <li key={idx} className={cn("flex items-start gap-3 text-[13px] text-white/90 font-medium", isAr && "font-[var(--font-arabic)]")}>
                           <span className="w-1.5 h-1.5 bg-white/20 rounded-full flex mt-1.5"></span>
                           <span><BrandText text={uc} logoVariant="white" /></span>
                         </li>
                       ))}
                     </ul>
                   </>
                 )}
              </div>
            </div>

            {/* COLUMN 3: Deliverables & Timeline */}
            <div className="flex flex-col gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex-grow">
                 <div className="flex items-center gap-3 mb-4">
                    <Archive className="w-4 h-4 text-white/60" />
                    <h5 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                      {isAr ? "المخرجات المتوقعة" : "Key Deliverables"}
                    </h5>
                 </div>
                 <ul className="space-y-3 mb-6">
                   {(solution.deliverables ? (isAr ? solution.deliverables.ar : solution.deliverables.en) : []).map((deliverable, idx) => (
                     <li key={idx} className={cn("flex items-start gap-3 text-[13px] text-white/90 font-medium", isAr && "font-[var(--font-arabic)]")}>
                       <span className="text-ssk-cyan text-[10px] font-bold shrink-0 mt-0.5">0{idx+1}</span>
                       <span><BrandText text={deliverable} logoVariant="white" /></span>
                     </li>
                   ))}
                 </ul>
                 
                 {solution.highLevelPlans && (
                   <>
                     <div className="flex items-center gap-3 mb-4 pt-4 border-t border-white/10">
                        <Route className="w-4 h-4 text-white/60" />
                        <h5 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                          {isAr ? "خطط التنفيذ" : "Execution Plan"}
                        </h5>
                     </div>
                     <ul className="space-y-3">
                       {(isAr ? solution.highLevelPlans.ar : solution.highLevelPlans.en).map((plan, idx) => (
                         <li key={idx} className={cn("flex items-start gap-3 text-[13px] text-white/90 font-medium", isAr && "font-[var(--font-arabic)]")}>
                           <span className="w-1.5 h-1.5 border border-white/50 rounded-full flex mt-1.5"></span>
                           <span><BrandText text={plan} logoVariant="white" /></span>
                         </li>
                       ))}
                     </ul>
                   </>
                 )}
              </div>
            </div>

         </div>
      </div>
    </div>
  );
}
