"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  ShieldCheck, 
  Database, 
  Lock, 
  Layout, 
  Activity, 
  BarChart3, 
  Target, 
  Users 
} from "lucide-react";
import { BrandText } from "./BrandText";

interface SolutionHubProps {
  layers: any[];
  lang: string;
}

export function SolutionBrowser({ layers, lang }: SolutionHubProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const isAr = lang === "ar";

  const icons = [
    <ShieldCheck key="01" className="h-6 w-6" />,
    <Database key="02" className="h-6 w-6" />,
    <Lock key="03" className="h-6 w-6" />,
    <Layout key="04" className="h-6 w-6" />,
    <Activity key="05" className="h-6 w-6" />,
    <BarChart3 key="06" className="h-6 w-6" />,
    <Target key="07" className="h-6 w-6" />,
    <Users key="08" className="h-6 w-6" />,
  ];

  const activeLayer = layers[activeIdx];
  const layerNumber = (activeIdx + 1).toString().padStart(2, "0");

  return (
    <div className="flex flex-col lg:flex-row min-h-[700px] bg-white border border-ssk-border shadow-ssk-layered overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
      <div className={cn(
        "w-full lg:w-[320px] bg-ssk-navy border-ssk-border/10 shrink-0 z-20",
        isAr ? "lg:border-l" : "lg:border-r"
      )}>
        <div className="sticky top-24 lg:h-[calc(100vh-120px)] flex flex-col overflow-y-auto no-scrollbar py-8">
          <div className="px-8 mb-10">
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-cyan/40">
               {isAr ? "نطاق المواءمة المؤسسية" : "Institutional Alignment Scope"}
             </p>
          </div>
          
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar px-4 lg:px-0">
            {layers.map((layer, i) => {
              const isActive = activeIdx === i;
              const num = (i + 1).toString().padStart(2, "0");
              return (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "flex-none lg:w-full flex items-center gap-6 px-4 lg:px-10 py-6 lg:py-8 transition-all relative group",
                    isActive 
                      ? "text-ssk-cyan bg-white/5" 
                      : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                  )}
                >
                  {/* Active Indicator Line */}
                  <div className={cn(
                    "absolute top-0 h-full w-[4px] bg-ssk-cyan transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-30",
                    isAr ? "right-0" : "left-0"
                  )} />

                  <div className={cn(
                    "shrink-0 transition-transform duration-500",
                    isActive && "scale-110 shadow-ssk-glow"
                  )}>
                    {icons[i]}
                  </div>

                  <div className="text-left flex flex-col items-start">
                    <span className="text-[10px] font-black italic opacity-30 mb-1">LAYER {num}</span>
                    <span className={cn(
                      "text-[15px] font-bold tracking-wider leading-tight text-left",
                      isAr && "font-[var(--font-arabic)] tracking-normal"
                    )}>
                      {layer.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* CONTENT VIEWER */}
      <div className="flex-1 bg-ssk-surface/20 flex flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden">
        <div 
          key={activeIdx} 
          className="relative z-10 w-full max-w-[800px] animate-in fade-in slide-in-from-bottom-6 duration-700"
        >
          <div className="flex items-center gap-6 mb-12">
             <div className="w-16 h-1 bg-ssk-cyan shadow-ssk-glow" />
             <span className="text-[14px] font-black italic text-ssk-cyan tracking-widest uppercase">Layer {layerNumber}</span>
          </div>

          <h2 className={cn(
            "font-[var(--font-display)] text-[48px] font-bold text-ssk-navy leading-[1.1] tracking-[-0.03em] mb-10 lg:text-[72px]",
            isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {activeLayer.title}
          </h2>

          <div className="h-px w-full bg-ssk-border/30 mb-10" />

          <p className="text-[22px] leading-relaxed text-ssk-text-soft font-medium max-w-[700px]">
             <BrandText text={activeLayer.desc} logoVariant="color" />
          </p>
          
          <div className="mt-20 flex items-center gap-4 text-ssk-cyan font-bold text-[12px] uppercase tracking-[0.3em] opacity-40">
             <span>Institutional Delivery Standards</span>
             <div className="h-px flex-1 bg-ssk-cyan/20" />
          </div>
        </div>

        {/* Backdrop Decorative ID */}
        <div className={cn(
          "absolute text-[24vw] font-black text-ssk-navy/[0.02] pointer-events-none select-none leading-none z-0",
          isAr ? "left-10 bottom-10" : "right-10 bottom-10"
        )}>
          {layerNumber}
        </div>
      </div>
    </div>
  );
}
