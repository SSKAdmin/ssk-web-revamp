import { cn } from "@/lib/utils";
import { BrandText } from "./BrandText";

type Props = {
  number: string;
  title: string;
  subtitle: string;
  intro: string;
  bullets: string[];
  deliverables: string[];
  outcome: string;
  lang: "en" | "ar";
};

export function ServiceSlideToWebBlock({
  number,
  title,
  subtitle,
  intro,
  bullets,
  deliverables,
  outcome,
  lang,
}: Props) {
  const isAr = lang === "ar";

  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 overflow-hidden border border-ssk-border lg:grid-cols-[360px_1fr]">
      {/* Dark left block (Service Number/Category) */}
      <div className="relative flex min-h-[480px] flex-col items-center justify-center bg-ssk-navy p-12 lg:min-h-[600px]">
        <div className="absolute left-0 top-0 h-[6px] w-full bg-ssk-cyan" />
        
        {/* Decorative background number */}
        <div className={cn(
          "absolute bottom-10 text-[160px] font-bold leading-none text-white/5 select-none pointer-events-none",
          isAr ? "left-10" : "right-10"
        )}>
          {number}
        </div>
        
        <div className="relative z-10 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-ssk-cyan opacity-80">
            {isAr ? "نطاق الخدمات الاستراتيجية" : "Strategic Service Scope"}
          </p>
          <div className="h-px w-12 bg-white/20 mx-auto" />
        </div>
      </div>

      {/* Light right content area */}
      <div className="flex flex-col bg-white">
        <div className="flex-1 px-8 pb-10 pt-12 lg:px-16 lg:pb-16 lg:pt-16">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-ssk-cyan/60">
            {isAr ? `الخدمة ${number}` : `Service ${number}`}
          </p>
          
          <h3 className={cn(
            "font-[var(--font-display)] text-[44px] font-bold leading-[1.05] tracking-[-0.03em] text-ssk-navy lg:text-[52px]",
            isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {title}
          </h3>
          
          <p className={cn(
            "mt-4 text-[18px] font-bold text-ssk-cyan/80",
            isAr && "font-[var(--font-arabic)]"
          )}>
            {subtitle}
          </p>
          
          <div className="mt-8 h-px w-full bg-ssk-border/50" />
          
          <p className="mt-10 max-w-[820px] text-[19px] leading-[1.8] text-ssk-text-soft font-medium">
            <BrandText text={intro} logoVariant="color" />
          </p>

          <ul className="mt-10 space-y-5">
            {bullets.map((item, idx) => (
              <li key={idx} className="flex gap-4 text-[18px] leading-[1.7] text-ssk-navy font-medium">
                <span className="mt-2.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-ssk-cyan shadow-ssk-glow" />
                <span><BrandText text={item} logoVariant="color" /></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables Strip */}
        <div className="bg-ssk-surface px-8 py-6 text-[14px] text-ssk-text-soft flex items-center gap-6 lg:px-16 border-y border-ssk-border font-medium">
          <span className="font-bold uppercase tracking-[0.2em] text-ssk-navy whitespace-nowrap opacity-60">
            {isAr ? "المخرجات:" : "Deliverables:" }
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {deliverables.map((d, i) => (
              <span key={i} className="flex items-center gap-4">
                {i > 0 && <span className="opacity-20 text-ssk-cyan">|</span>}
                <span className={cn(isAr && "font-[var(--font-arabic)]")}><BrandText text={d} logoVariant="color" /></span>
              </span>
            ))}
          </div>
        </div>

        {/* Outcome Bar */}
        <div className="bg-ssk-cyan px-8 py-6 lg:px-16 shadow-ssk-glow relative">
          <p className="text-[15px] font-bold uppercase tracking-[0.16em] text-ssk-navy flex flex-col md:flex-row gap-2 md:items-center">
            <span className="text-ssk-navy/40 text-[11px] font-bold tracking-[0.2em]">{isAr ? "النتيجة النهائية:" : "Final Outcome:"}</span> 
            <span className={cn(isAr && "font-[var(--font-arabic)] tracking-normal text-[16px]")}>
               <BrandText text={outcome} logoVariant="color" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
