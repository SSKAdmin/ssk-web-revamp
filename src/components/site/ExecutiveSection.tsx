import { cn } from "@/lib/utils";
import * as React from "react";

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function ExecutiveSection({
  eyebrow,
  title,
  body,
  dark = false,
  className,
  children,
}: Props) {
  return (
    <section className={cn(
      dark ? "bg-ssk-navy text-white" : "bg-ssk-surface text-ssk-navy", 
      "py-24 lg:py-40 relative overflow-hidden",
      className
    )}>
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 relative z-10">
        {eyebrow ? (
          <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
            {eyebrow}
          </p>
        ) : null}
        <h2 className={cn(
          "max-w-[1000px] font-[var(--font-display)] text-[48px] font-bold tracking-[-0.04em] lg:text-[72px] leading-[1.1]",
          dark ? "text-white" : "text-ssk-navy"
        )}>
          {title}
        </h2>
        {body ? (
          <p className={cn(
            "mt-10 max-w-[800px] text-[20px] lg:text-[22px] leading-relaxed font-medium", 
            dark ? "text-white/60" : "text-ssk-text-soft"
          )}>
            {body}
          </p>
        ) : null}
        {children ? <div className="mt-20">{children}</div> : null}
      </div>
      
      {/* Structural Accent for Dark Sections */}
      {dark && (
        <div className="absolute top-0 right-0 w-1/3 h-full bg-ssk-navy-soft/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
      )}
    </section>
  );
}
