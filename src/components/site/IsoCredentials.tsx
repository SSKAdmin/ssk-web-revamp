"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface IsoBadgeProps {
  number: string;
  title1: string;
  title2: string;
  title1Ar?: string;
  title2Ar?: string;
  colorHex: string;
  isAr: boolean;
}

function IsoBadge({ number, title1, title2, title1Ar, title2Ar, colorHex, isAr }: IsoBadgeProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ssk-border/40 p-6 flex flex-col items-center justify-center transition-all hover:-translate-y-2 hover:shadow-md group h-full">
      {/* SVG Badge Construction */}
      <div className="relative w-32 h-32 mb-6 transition-transform group-hover:scale-105">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full" 
          style={{ stroke: colorHex, fill: colorHex }}
        >
          {/* Outer Thick Ring */}
          <circle cx="50" cy="50" r="46" fill="transparent" strokeWidth="6" />
          {/* Inner Thin Ring */}
          <circle cx="50" cy="50" r="38" fill="transparent" strokeWidth="1.5" />
          
          {/* Texts */}
          <text 
            x="50" 
            y="32" 
            textAnchor="middle" 
            fontFamily="sans-serif" 
            fontWeight="bold" 
            fontSize="10px"
          >
            ISO
          </text>
          
          <text 
            x="50" 
            y="54" 
            textAnchor="middle" 
            fontFamily="sans-serif" 
            fontWeight="900" 
            fontSize="18px"
            letterSpacing="-0.5px"
          >
            {number}
          </text>
          
          {/* Divider Line */}
          <line x1="28" y1="62" x2="72" y2="62" strokeWidth="1" />
          
          <text 
            x="50" 
            y="74" 
            textAnchor="middle" 
            fontFamily="sans-serif" 
            fontWeight="bold" 
            fontSize="6.5px"
            letterSpacing="0.5px"
          >
            CERTIFIED
          </text>
        </svg>
      </div>

      {/* Title Text */}
      <h4 className={cn(
        "text-[15px] font-bold text-ssk-navy mb-1 text-center leading-tight",
        isAr && "font-[var(--font-arabic)] text-[16px]"
      )}>
        {isAr && title1Ar ? title1Ar : title1}
      </h4>
      <p className={cn(
        "text-[13px] text-ssk-text-soft text-center leading-tight font-medium",
        isAr && "font-[var(--font-arabic)] text-[14px]"
      )}>
        {isAr && title2Ar ? title2Ar : title2}
      </p>
    </div>
  );
}

interface IsoCredentialsProps {
  lang: "en" | "ar";
}

export function IsoCredentials({ lang }: IsoCredentialsProps) {
  const isAr = lang === "ar";
  
  const certs = [
    {
      number: "27001",
      title1: "Information Security",
      title2: "Management System",
      title1Ar: "أمن المعلومات",
      title2Ar: "نظام الإدارة",
      colorHex: "#1E3A8A" // Dark Blue
    },
    {
      number: "9001",
      title1: "Quality Management",
      title2: "System Standard",
      title1Ar: "إدارة الجودة",
      title2Ar: "معيار النظام",
      colorHex: "#0284C7" // Light Blue
    },
    {
      number: "20000",
      title1: "IT Service Mgmt",
      title2: "Service Delivery",
      title1Ar: "إدارة خدمات تقنية المعلومات",
      title2Ar: "توصيل الخدمات",
      colorHex: "#7E22CE" // Purple
    },
    {
      number: "22301",
      title1: "Business Continuity",
      title2: "Resilience System",
      title1Ar: "استمرارية الأعمال",
      title2Ar: "نظام المرونة",
      colorHex: "#D97706" // Orange
    },
    {
      number: "45001",
      title1: "Occupational Safety",
      title2: "Health & Safety",
      title1Ar: "السلامة المهنية",
      title2Ar: "الصحة والسلامة",
      colorHex: "#16A34A" // Green
    }
  ];

  return (
    <section className="bg-ssk-surface py-32 border-t border-ssk-border/30">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        
        <div className="text-center mb-16">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
             {isAr ? "الاعتمادات العالمية والموثوقية" : "Global Standards & Compliance"}
          </p>
          <h2 className={cn(
             "font-[var(--font-display)] text-[32px] md:text-[48px] font-bold text-ssk-navy leading-[1.1] tracking-[-0.03em]",
             isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
             {isAr ? "شهادات اعتماد الأيزو العالمية" : "Certified ISO Execution Standards"}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certs.map((c, idx) => (
             <IsoBadge 
               key={idx}
               number={c.number}
               title1={c.title1}
               title2={c.title2}
               title1Ar={c.title1Ar}
               title2Ar={c.title2Ar}
               colorHex={c.colorHex}
               isAr={isAr}
             />
          ))}
        </div>

      </div>
    </section>
  );
}
