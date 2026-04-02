"use client";

import { cn } from "@/lib/utils";

interface BOTFlowProps {
  isRtl?: boolean;
}

export function BOTFlow({ isRtl = false }: BOTFlowProps) {
  const nodes = [
    { x: 200, label: isRtl ? "تأسيس" : "BUILD" },
    { x: 600, label: isRtl ? "تشغيل" : "OPERATE" },
    { x: 1000, label: isRtl ? "نقل" : "TRANSFER" },
  ];

  return (
    <div className={cn("w-full h-full flex items-center justify-center p-2", isRtl && "flex-row-reverse")}>
      <svg viewBox="0 0 1200 600" className="w-full h-auto drop-shadow-ssk-glow">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Path with Ultra-Visibility */}
        <path
          d="M 100 300 L 1100 300"
          stroke="var(--color-ssk-cyan)"
          strokeWidth="6"
          strokeOpacity="0.25"
        />

        {/* Supreme Execution Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            {/* Supreme Aura (Native Animation) */}
            <circle cx={node.x} cy="300" r="220" fill="var(--color-ssk-navy)" stroke="var(--color-ssk-cyan)" strokeWidth="1" strokeOpacity="0.25">
               <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" begin={`${i * 1}s`} />
            </circle>
            
            {/* Supreme Main Circle */}
            <circle cx={node.x} cy="300" r="160" fill="var(--color-ssk-navy)" stroke="var(--color-ssk-cyan)" strokeWidth="5" filter="url(#glow)">
               <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="5s" repeatCount="indefinite" begin={`${i * 1}s`} />
            </circle>

            <text
              x={node.x}
              y="300"
              textAnchor="middle"
              dominantBaseline="middle"
              className={cn(
                "font-[var(--font-display)] fill-white text-[44px] font-[900] tracking-[0.12em]",
                isRtl && "font-[var(--font-arabic)] tracking-normal text-[48px]"
              )}
            >
              {node.label}
            </text>

            {/* Vertical Connectors (Supreme) */}
            <line x1={node.x} y1="50" x2={node.x} y2="220" stroke="var(--color-ssk-cyan)" strokeWidth="3" strokeDasharray="10 10" strokeOpacity="0.5" />
            <line x1={node.x} y1="380" x2={node.x} y2="550" stroke="var(--color-ssk-cyan)" strokeWidth="3" strokeDasharray="10 10" strokeOpacity="0.5" />
            <circle cx={node.x} cy="50" r="6" fill="var(--color-ssk-cyan)" />
            <circle cx={node.x} cy="550" r="6" fill="var(--color-ssk-cyan)" />
          </g>
        ))}

        {/* Supreme Floating Beams */}
        <circle r="12" fill="var(--color-ssk-cyan)" filter="url(#glow)">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 100 300 L 1100 300"
          />
        </circle>
        <circle r="12" fill="var(--color-ssk-cyan)" filter="url(#glow)">
          <animateMotion
            dur="10s"
            repeatCount="indefinite"
            path="M 1100 300 L 100 300"
          />
        </circle>
      </svg>
    </div>
  );
}
