"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ServiceSlideToWebBlock } from "./ServiceSlideToWebBlock";
import { 
  Cloud, 
  Database, 
  ShieldCheck, 
  Network, 
  Zap, 
  BarChart3, 
  Settings, 
  UserCheck 
} from "lucide-react";

interface ServiceHubProps {
  services: any[];
  lang: string;
}

export function ServiceBrowser({ services, lang }: ServiceHubProps) {
  const [activeId, setActiveId] = useState(services[0].id);
  const isAr = lang === "ar";

  const icons = [
    <Cloud key="01" className="h-5 w-5" />,
    <Database key="02" className="h-5 w-5" />,
    <ShieldCheck key="03" className="h-5 w-5" />,
    <Network key="04" className="h-5 w-5" />,
    <Zap key="05" className="h-5 w-5" />,
    <BarChart3 key="06" className="h-5 w-5" />,
    <Settings key="07" className="h-5 w-5" />,
    <UserCheck key="08" className="h-5 w-5" />,
  ];

  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <div className="flex flex-col lg:flex-row min-h-[800px] bg-white border border-ssk-border shadow-ssk-layered overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
      <div className={cn(
        "w-full lg:w-[320px] bg-ssk-navy border-ssk-border/10 shrink-0 z-20",
        isAr ? "lg:border-l" : "lg:border-r"
      )}>
        <div className="sticky top-24 lg:h-[calc(100vh-120px)] flex flex-col overflow-y-auto no-scrollbar py-8">
          <div className="px-8 mb-10">
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-cyan/40">
               {isAr ? "قائمة الخدمات" : "Service Directory"}
             </p>
          </div>
          
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar px-4 lg:px-0">
            {services.map((svc, i) => {
              const isActive = activeId === svc.id;
              return (
                <button
                  key={svc.id}
                  onClick={() => setActiveId(svc.id)}
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
                    <span className="text-[10px] font-black italic opacity-30 mb-1">SERVICE {svc.number}</span>
                    <span className={cn(
                      "text-[15px] font-bold tracking-wider leading-tight text-left",
                      isAr && "font-[var(--font-arabic)] tracking-normal"
                    )}>
                      {isAr ? svc.title.ar : svc.title.en}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* CONTENT VIEWER */}
      <div className="flex-1 bg-ssk-surface/30 relative overflow-hidden">
        <div 
          key={activeId} 
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <ServiceSlideToWebBlock
            lang={lang as "en" | "ar"}
            number={activeService.number}
            title={isAr ? activeService.title.ar : activeService.title.en}
            subtitle={isAr ? activeService.subtitle.ar : activeService.subtitle.en}
            intro={isAr ? activeService.intro.ar : activeService.intro.en}
            bullets={isAr ? activeService.bullets.ar : activeService.bullets.en}
            deliverables={isAr ? activeService.deliverables.ar : activeService.deliverables.en}
            outcome={isAr ? activeService.outcome.ar : activeService.outcome.en}
          />
        </div>

        {/* Branding Background Element (Faint) */}
        <div className="absolute top-0 right-0 h-full w-full pointer-events-none opacity-[0.02] flex items-center justify-center overflow-hidden">
          <span className="text-[30vw] font-black tracking-tighter uppercase whitespace-nowrap">
             {activeService.id}
          </span>
        </div>
      </div>
    </div>
  );
}
