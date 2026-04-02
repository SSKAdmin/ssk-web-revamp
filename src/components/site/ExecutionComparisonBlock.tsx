"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  X, 
  ShieldCheck, 
  Activity,
  Layers,
  ArrowRight
} from "lucide-react";
import { BrandText } from "./BrandText";

interface ExecutionComparisonBlockProps {
  positioning: any;
  isAr: boolean;
}

export function ExecutionComparisonBlock({ positioning, isAr }: ExecutionComparisonBlockProps) {
  const trad = positioning.comparison.traditional;
  const ssk = positioning.comparison.ssk;

  return (
    <section className="bg-ssk-navy py-40 relative overflow-hidden font-sans perspective-[2000px]">
      
      {/* 3D BACKGROUND AURA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ssk-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-[900px] mx-auto mb-32">
           <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
              {positioning.eyebrow}
           </p>
           <h2 className={cn(
             "font-[var(--font-display)] text-[36px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-white lg:text-[72px]",
             isAr && "font-[var(--font-arabic)] tracking-normal"
           )}>
             <BrandText text={positioning.title} logoVariant="white" />
           </h2>
        </div>

        {/* 3D INFOGRAPHIC ARENA */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 mt-16 max-w-[1100px] mx-auto">
          
          {/* TRADITIONAL ADVISORY (FLAT, FRACTURED 2D) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 opacity-70">
             <div className="mb-8 border-b-2 border-red-500/30 pb-4">
                <h4 className="text-[14px] font-bold uppercase tracking-[0.3em] text-white">
                  <BrandText text={trad.title} logoVariant="white" />
                </h4>
             </div>

             <div className="grid grid-cols-1 gap-4">
                {trad.points.map((p: string, i: number) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-lg flex items-center gap-5">
                     <div className="bg-red-500/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                        <X className="h-4 w-4 text-red-400" />
                     </div>
                     <span className={cn(
                       "text-[15px] text-white/60 font-medium leading-tight",
                       isAr && "text-[16px] font-[var(--font-arabic)]"
                     )}>
                       <BrandText text={p} logoVariant="white" />
                     </span>
                  </div>
                ))}
             </div>
          </div>

          {/* 3D DIRECTIONAL HUD */}
          <div className="hidden lg:flex flex-col items-center justify-center relative w-[10%] opacity-50">
             <div className="w-px h-24 bg-gradient-to-b from-transparent to-ssk-cyan/50 mb-4" />
             <div className="animate-bounce">
                <ArrowRight className={cn("w-10 h-10 text-ssk-cyan", isAr && "rotate-180")} />
             </div>
             <div className="w-px h-24 bg-gradient-to-t from-transparent to-ssk-cyan/50 mt-4" />
          </div>

          {/* THE SSK MODEL (GLASSMORPHISM, 3D ELEVATED ISOMETRIC LOGIC) */}
          <div className="w-full lg:w-[50%] relative">
             <div className="mb-12 absolute -top-16 left-0 right-0 text-center lg:text-left">
                <h4 className="text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
                  {ssk.title}
                </h4>
             </div>

             {/* Dynamic Elevated Core */}
             <div className="relative z-10 grid grid-cols-1 gap-6 perspective-[1000px]">
                {ssk.points.map((p: string, i: number) => {
                  const icons = [ShieldCheck, Layers, Activity, ShieldCheck];
                  const Icon = icons[i % icons.length];
                  // Calculate dynamic translation to create an overlapping staggered 3D staircase effect
                  const translateX = i * 20;
                  const translateZ = i * 40;
                  
                  return (
                    <div 
                      key={i} 
                      className="bg-[#032537]/80 backdrop-blur-xl border border-ssk-cyan/40 p-6 rounded-xl shadow-[0_20px_40px_rgba(10,186,181,0.15)] flex items-center gap-6 group transition-all duration-700 hover:scale-105 hover:bg-[#04334c] transform-none lg:[transform:translate3d(var(--tx),0,var(--tz))]"
                      style={{ 
                        '--tx': `${isAr ? -translateX : translateX}px`,
                        '--tz': `${translateZ}px`,
                        zIndex: 10 - i 
                      } as React.CSSProperties}
                    >
                       <div className="w-12 h-12 bg-ssk-cyan shadow-[0_0_15px_rgba(10,186,181,0.4)] rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-ssk-navy" />
                       </div>
                       <span className={cn(
                         "text-[18px] text-white font-bold leading-relaxed",
                         isAr && "text-[19px] font-[var(--font-arabic)] leading-[1.6]"
                       )}>
                         <BrandText text={p} logoVariant="white" />
                       </span>
                    </div>
                  );
                })}
             </div>
             
             {/* Glowing floor base to anchor the 3D items */}
             <div className="absolute -bottom-10 left-10 w-full h-20 bg-ssk-cyan/20 blur-3xl rounded-full pointer-events-none" />

          </div>
        </div>

      </div>
    </section>
  );
}
