"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { TechSolution } from "@/content/techSolutions";

interface DynamicTechCardProps {
  solution: TechSolution;
  lang: "en" | "ar";
}

export function DynamicTechCard({ solution, lang }: DynamicTechCardProps) {
  const isAr = lang === "ar";
  const [imgError, setImgError] = useState(false);
  
  // Use Google's High-Res Favicon API since Clearbit DNS is currently blocked/unresolvable.
  const logoUrl = solution.id === "consulting" 
    ? "/images/logo-dark.png" 
    : `https://www.google.com/s2/favicons?domain=${solution.domain}&sz=128`;

  return (
    <div 
      className={cn(
        "relative w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-[6px] border-x border-b border-gray-100 flex flex-col p-6 lg:p-8 min-h-[420px] border-t-ssk-cyan/80",
        isAr ? "text-right" : "text-left"
      )}
    >
      {/* HEADER: Category Badge */}
      <div className="flex items-start justify-between mb-8">
        <div className="w-12 h-12 rounded-xl bg-ssk-navy/5 border border-ssk-navy/10 flex items-center justify-center shrink-0">
          <span className="font-bold text-ssk-navy/40 text-lg">{solution.partnerName.charAt(0)}</span>
        </div>
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-ssk-cyan/10 text-ssk-navy"
        )}>
          {isAr ? solution.category.ar : solution.category.en}
        </div>
      </div>

      {/* BODY: Title & Desc */}
      <div className="mb-6 flex-grow">
        <h3 className={cn(
          "font-bold text-ssk-navy text-[24px] mb-1 -tracking-[0.02em]",
          isAr && "font-[var(--font-arabic)] tracking-normal text-[26px]"
        )}>
          {solution.partnerName}
        </h3>
        <p className="text-[12px] font-bold text-ssk-text-soft uppercase tracking-widest mb-4">
          {solution.title}
        </p>
        <p className={cn(
          "text-[14px] text-gray-600 font-medium leading-[1.6]",
          isAr && "font-[var(--font-arabic)] text-[15px] leading-[1.8]"
        )}>
           {isAr ? solution.subtitle.ar : solution.subtitle.en}
        </p>
      </div>

      {/* BULLETS */}
      <div className="mb-12">
        <ul className="space-y-3">
          {(isAr ? solution.features.ar : solution.features.en).map((feature, idx) => (
            <li key={idx} className={cn("flex items-center gap-3 text-[14px] font-semibold text-gray-700", isAr && "font-[var(--font-arabic)]")}>
              <span className="w-1.5 h-1.5 rounded-full block shrink-0 bg-ssk-cyan"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* BOTTOM LOGO / BRAND MARK */}
      <div className={cn(
        "absolute bottom-6 flex items-center justify-center opacity-70 transition-opacity hover:opacity-100",
        isAr ? "left-6" : "right-6"
      )}>
         {imgError ? (
            <span className="text-xl font-black italic tracking-tighter text-ssk-navy opacity-80 uppercase">
              {solution.partnerName}
            </span>
         ) : (
           <img 
              src={logoUrl} 
              alt={`${solution.partnerName} Logo`}
              className="h-8 w-auto object-contain"
              onError={() => setImgError(true)}
           />
         )}
      </div>

    </div>
  );
}
