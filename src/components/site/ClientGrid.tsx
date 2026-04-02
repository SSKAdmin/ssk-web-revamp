"use client";

import React from "react";
import { cn } from "@/lib/utils";

// High-fidelity SVG recreations of the partner logos to ensure absolute transparency and crispness
const logos = [
  {
    name: "Tawuniya",
    arName: "التعاونية",
    svg: (
      <svg viewBox="0 0 200 60" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity">
        <circle cx="30" cy="30" r="15" fill="none" stroke="#6D28D9" strokeWidth="8" strokeDasharray="30 10" />
        <circle cx="30" cy="30" r="15" fill="none" stroke="#3B82F6" strokeWidth="8" strokeDasharray="10 30" strokeDashoffset="15" />
        <text x="60" y="38" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#374151">Tawuniya</text>
      </svg>
    )
  },
  {
    name: "Council of Health Insurance",
    arName: "مجلس الضمان الصحي",
    svg: (
      <svg viewBox="0 0 240 60" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity">
        <path d="M10,40 Q20,20 30,40 T50,40" fill="none" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" />
        <circle cx="30" cy="15" r="5" fill="#10B981" />
        <text x="65" y="40" fontFamily="sans-serif" fontWeight="900" fontSize="32" fill="#0EA5E9" letterSpacing="-1.5">CHI</text>
        <text x="135" y="40" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#4B5563">ضمان</text>
      </svg>
    )
  },
  {
    name: "TECHNOSAT",
    arName: "تكنوسات",
    svg: (
      <svg viewBox="0 0 220 60" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity">
        <rect x="10" y="20" width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="5" transform="rotate(45 20 30)" />
        <rect x="25" y="20" width="20" height="20" fill="none" stroke="#001F3F" strokeWidth="5" transform="rotate(45 35 30)" />
        <text x="65" y="38" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="#001F3F" letterSpacing="1">TECHNOSAT</text>
      </svg>
    )
  },
  {
    name: "Ministry of Communications",
    arName: "وزارة الاتصالات",
    svg: (
      <svg viewBox="0 0 200 60" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity">
        <polygon points="30,10 50,40 10,40" fill="none" stroke="#0EA5E9" strokeWidth="3" />
        <polygon points="30,20 40,40 20,40" fill="none" stroke="#10B981" strokeWidth="2" />
        <text x="65" y="38" fontFamily="sans-serif" fontWeight="bold" fontSize="22" fill="#1E3A8A">MCIT</text>
      </svg>
    )
  },
  {
    name: "Ford",
    arName: "فورد",
    svg: (
      <svg viewBox="0 0 160 60" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity">
        <ellipse cx="80" cy="30" rx="60" ry="24" fill="#003478" />
        <ellipse cx="80" cy="30" rx="56" ry="20" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="80" y="40" fontFamily="serif" fontStyle="italic" fontWeight="bold" fontSize="30" fill="#FFFFFF" textAnchor="middle">Ford</text>
      </svg>
    )
  },
  {
    name: "Holograph",
    arName: "هولوغراف",
    svg: (
      <svg viewBox="0 0 180 60" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity">
        <circle cx="25" cy="30" r="15" fill="none" stroke="#3B82F6" strokeWidth="6" strokeDasharray="60 20" />
        <text x="55" y="38" fontFamily="sans-serif" fontWeight="bold" fontSize="22" fill="#1F2937">Holograph</text>
      </svg>
    )
  },
  {
    name: "Techkore",
    arName: "تيك كور",
    svg: (
      <svg viewBox="0 0 150 60" className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity">
        <text x="10" y="38" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#111827">Tech<tspan fill="#3B82F6">K</tspan>ore</text>
      </svg>
    )
  },
  {
    name: "Infraon",
    arName: "إنفراون",
    svg: (
      <svg viewBox="0 0 180 60" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity">
        <path d="M 20 40 L 40 10 L 60 40" fill="none" stroke="#0EA5E9" strokeWidth="8" strokeLinejoin="round" />
        <circle cx="20" cy="40" r="4" fill="#1E3A8A" />
        <circle cx="60" cy="40" r="4" fill="#1E3A8A" />
        <text x="75" y="38" fontFamily="sans-serif" fontWeight="900" fontSize="28" fill="#1E3A8A" letterSpacing="-1">infraon</text>
      </svg>
    )
  }
];

export function ClientGrid({ isAr = false }: { isAr?: boolean }) {
  // Duplicate arrays to allow seamless continuous scrolling without gaps
  const marqueeItems = [...logos, ...logos, ...logos];

  return (
    <div className="w-full relative overflow-hidden bg-white py-12 border-y border-ssk-border/30">
      
      {/* Left/Right Fade Masks for smooth entry/exit */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* The scrolling track */}
      <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap items-center w-max">
        {marqueeItems.map((brand, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-12 mx-16 saturate-0 hover:saturate-100 transition-all duration-500 cursor-pointer"
          >
            {brand.svg}
          </div>
        ))}
      </div>
    </div>
  );
}
