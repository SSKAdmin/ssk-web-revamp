import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandText } from "./BrandText";
import { SSKLogo } from "./SSKLogo";

export function PresentationHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  lang,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  lang: "en" | "ar";
}) {
  const isAr = lang === "ar";

  return (
    <section className="bg-ssk-navy pt-40 pb-20 relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      {/* Structural Backdrop */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none flex items-center justify-center">
        <SSKLogo variant="mono" width={1000} height={400} className="scale-150 rotate-[-8deg] opacity-20" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10 text-center">
        <div className="flex flex-col items-center mb-12">

           <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-ssk-cyan/60">
             {eyebrow}
           </p>
        </div>

        <h1 className={cn(
          "font-[var(--font-display)] text-[36px] md:text-[56px] lg:text-[84px] font-bold leading-[1.1] tracking-[-0.04em] text-white max-w-[1100px] mb-12",
          isAr && "font-[var(--font-arabic)] tracking-normal text-[42px] md:text-[72px] lg:text-[84px] leading-[1.2]"
        )}>
          <BrandText text={title} logoVariant="white" />
        </h1>

        <p className={cn(
          "mx-auto max-w-[800px] text-[18px] lg:text-[22px] leading-relaxed text-white/60 font-medium mb-16",
          isAr && "font-[var(--font-arabic)]"
        )}>
          <BrandText text={body} logoVariant="white" />
        </p>

          <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full px-4 sm:px-0">
            <Link
              href={`/${lang}/engagement`}
              className={cn(
                "inline-flex min-h-[64px] sm:min-h-[72px] items-center justify-center bg-ssk-cyan px-8 sm:px-14 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-navy transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-ssk-glow w-full sm:w-auto",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}
            >
              {primary}
            </Link>
            <Link
              href={`/${lang}/services`}
              className={cn(
                "inline-flex min-h-[64px] sm:min-h-[72px] items-center justify-center border border-white/20 px-8 sm:px-14 text-[13px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-white/5 w-full sm:w-auto",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}
            >
              {secondary}
            </Link>
          </div>
        </div>
    </section>
  );
}
