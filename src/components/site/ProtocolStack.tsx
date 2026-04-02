"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProtocolStackProps {
  isRtl?: boolean;
}

export function ProtocolStack({ isRtl = false }: ProtocolStackProps) {
  const layers = [
    { id: "08", en: "Digital Infrastructure", ar: "البنية التحتية الرقمية" },
    { id: "07", en: "Unified Data Layer", ar: "طبقة البيانات الموحدة" },
    { id: "06", en: "Security & Compliance", ar: "الأمن السيبراني والالتزام" },
    { id: "05", en: "Enterprise Architecture", ar: "معمارية الأنظمة (EA)" },
    { id: "04", en: "Program Performance", ar: "إيقاع وأداء البرامج" },
    { id: "03", en: "Managed Execution (MEO)", ar: "مكتب التنفيذ المدار" },
    { id: "02", en: "Decision Intelligence", ar: "ذكاء القرار والدعم" },
    { id: "01", en: "Success & Value realized", ar: "تحقيق النجاح والقيمة" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <svg viewBox="0 0 1200 1600" className="w-full h-auto drop-shadow-ssk-glow">
        <defs>
          <filter id="stack-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {layers.map((layer, i) => {
          const yBase = i * 165 + 150;
          return (
            <g key={layer.id} className="group transition-all duration-700 hover:-translate-y-8">
              {/* Supreme Layer Base Shape */}
              <path 
                d={`M 150 ${yBase} L 1050 ${yBase} L 1150 ${yBase + 75} L 250 ${yBase + 75} Z`}
                fill={i === 0 ? "var(--color-ssk-cyan)" : "var(--color-ssk-navy)"} 
                stroke="var(--color-ssk-cyan)" 
                strokeWidth={i === 0 ? "0" : "4"}
                strokeOpacity="0.5"
                className="transition-all duration-500 group-hover:fill-ssk-cyan group-hover:stroke-none"
              />
              
              {/* Supreme Layer Top Surface Highlight */}
              <path 
                d={`M 150 ${yBase} L 1050 ${yBase} L 1010 ${yBase - 35} L 110 ${yBase - 35} Z`}
                fill={i === 0 ? "var(--color-ssk-cyan)" : "var(--color-ssk-navy)"}
                fillOpacity="0.7"
                stroke="var(--color-ssk-cyan)"
                strokeWidth={i === 0 ? "0" : "2"}
                strokeOpacity="0.4"
              />

              {/* Text - ID (Supreme) */}
              <text 
                x={isRtl ? 1100 : 100} 
                y={yBase + 45} 
                className="fill-ssk-cyan/60 text-[28px] font-[900] italic"
                textAnchor={isRtl ? "end" : "start"}
              >
                {layer.id}
              </text>

              {/* Text - Label (Supreme Boardroom Typography) */}
              <text 
                x="650" 
                y={yBase + 45} 
                textAnchor="middle" 
                className={cn(
                   "fill-white text-[42px] font-[900] tracking-[0.18em] uppercase transition-colors group-hover:fill-ssk-navy",
                   isRtl && "font-[var(--font-arabic)] tracking-normal normal-case text-[40px]"
                )}
                style={{ filter: i === 0 ? "url(#stack-glow)" : "none" }}
              >
                {isRtl ? layer.ar : layer.en}
              </text>

              {/* Connector lines (Supreme Visibility) */}
              {i < layers.length - 1 && (
                <line 
                  x1="650" y1={yBase + 75} 
                  x2="650" y2={yBase + 130} 
                  stroke="var(--color-ssk-cyan)" 
                  strokeWidth="4" 
                  strokeDasharray="12 12" 
                  strokeOpacity="0.7"
                />
              )}
            </g>
          );
        })}
      </svg>
      
      <div className="mt-24 text-center">
         <p className="text-ssk-cyan text-[18px] font-black uppercase tracking-[0.8em] opacity-30">
           {isRtl ? "مصفوفة الخدمات المتكاملة" : "Integrated Service Model"}
         </p>
      </div>
    </div>
  );
}
