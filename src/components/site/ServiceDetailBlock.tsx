import { cn } from "@/lib/utils";
import * as React from "react";
import { 
  ArrowRight, 
  Workflow, 
  Target, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Settings, 
  Navigation, 
  Shield, 
  Search,
  Zap,
  CheckCircle2,
  Box,
  BarChart3,
  Globe
} from "lucide-react";
import { sskTokens } from "@/design/tokens";

type ServiceDetailBlockProps = {
  discipline: string;
  title: string;
  definition: string;
  scope: string[];
  inputs: string[];
  outputs: string[];
  impact: string;
  id?: string;
  isArabic?: boolean;
};

const ICON_MAP: Record<string, any> = {
  meo: Workflow,
  rhythm: Target,
  intelligence: Navigation,
  architecture: Layers,
  "data-ai": Cpu,
  cyber: ShieldCheck,
  infrastructure: Globe,
  "managed-ops": Settings,
};

export function ServiceDetailBlock({
  discipline,
  title,
  definition,
  scope,
  inputs,
  outputs,
  impact,
  id,
  isArabic = false,
}: ServiceDetailBlockProps) {
  // Extract icon key from ID or use default
  const iconKey = id?.replace(/-[^-]+$/,'') || 'meo'; 
  const Icon = ICON_MAP[id || ''] || ICON_MAP[iconKey] || Workflow;

  return (
    <section 
      id={id} 
      className={cn(
        "py-24 lg:py-40 bg-ssk-surface border-b border-ssk-border last:border-0 relative overflow-hidden",
        isArabic ? "text-right" : "text-left"
      )}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10 relative z-10">
        
        {/* Left Column: Context & Definition */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-ssk-cyan" />
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
              {discipline}
            </p>
          </div>
          
          <h3 className={cn(
             "font-[var(--font-display)] text-5xl font-bold tracking-[-0.04em] text-ssk-navy lg:text-7xl leading-[1] mb-12",
             isArabic && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {title}
          </h3>

          <div className="mt-12 rounded-none border-l-4 border-ssk-cyan bg-white p-10 shadow-ssk-layered">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-cyan/60">
              {isArabic ? "التعريف التنفيذي" : "Executive Definition"}
            </p>
            <p className={cn(
              "text-[20px] lg:text-[24px] leading-relaxed text-ssk-navy font-bold",
              isArabic && "font-[var(--font-arabic)]"
            )}>
              {definition}
            </p>
          </div>
        </div>

        {/* Right Column: Scope & Logic */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {scope.map((item, i) => (
              <div 
                key={i} 
                className="group rounded-none border border-ssk-border bg-white px-8 py-6 text-[16px] font-bold text-ssk-navy hover:border-ssk-cyan transition-all flex items-center justify-between"
              >
                <span className={isArabic ? "font-[var(--font-arabic)]" : ""}>{item}</span>
                <Icon className="h-4 w-4 text-ssk-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
                {isArabic ? "المدخلات الحيوية" : "Critical Inputs"}
              </p>
              <ul className="space-y-4">
                {inputs.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[17px] font-bold text-ssk-text-soft">
                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-ssk-cyan" />
                    <span className={isArabic ? "font-[var(--font-arabic)]" : ""}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">
                {isArabic ? "المخرجات الأساسية" : "Primary Outputs"}
              </p>
              <ul className="space-y-4">
                {outputs.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[17px] font-bold text-ssk-cyan">
                    <ArrowRight className={cn("mt-1.5 h-4 w-4 shrink-0", isArabic && "rotate-180")} />
                    <span className={isArabic ? "font-[var(--font-arabic)]" : ""}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Impact Banner */}
          <div className="mt-16 bg-ssk-navy p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
              <Icon className="h-48 w-48 text-white rotate-12" />
            </div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
              {isArabic ? "الأثر التشغيلي المتوقع" : "Expected Operational Impact"}
            </p>
            <p className={cn(
               "text-[24px] lg:text-[32px] leading-[1.2] text-white font-bold tracking-tight italic relative z-10",
               isArabic && "font-[var(--font-arabic)]"
            )}>
              {impact}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
