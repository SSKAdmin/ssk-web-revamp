import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const m = dict.metadata.dataProtection;
  return {
    title: m.title,
    description: m.description,
  };
}

export default async function DataProtectionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const legal = dict.legal.data_protection;

  return (
    <div className="flex flex-col bg-white">
      {/* INSTITUTIONAL HERO */}
      <section className="pt-32 pb-24 border-b border-ssk-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="max-w-[800px]">
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
              {legal.eyebrow}
            </p>
            <h1 className={cn(
              "font-[var(--font-display)] text-[48px] font-bold text-ssk-navy lg:text-[72px] leading-[1.1] tracking-[-0.04em] mb-12",
              isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {legal.title}
            </h1>
            <p className="text-[20px] text-ssk-text-soft leading-relaxed font-medium">
              {legal.description}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-16 max-w-[900px]">
             {legal.sections.map((section: any, idx: number) => (
                <div key={idx} className="group flex items-start gap-10">
                   <div className="flex flex-col items-center shrink-0">
                      <span className="text-[14px] font-bold text-ssk-cyan">0{idx + 1}</span>
                      <div className="w-[1px] h-12 bg-ssk-border mt-4 group-hover:h-24 transition-all duration-700" />
                   </div>
                   <div className="flex-1">
                      <h2 className={cn(
                        "text-[28px] font-bold text-ssk-navy mb-6 group-hover:text-ssk-cyan transition-colors",
                        isAr && "font-[var(--font-arabic)]"
                      )}>
                        {section.title}
                      </h2>
                      <p className="text-[19px] leading-[1.8] text-ssk-text-soft font-medium pl-10 border-l-2 border-ssk-surface group-hover:border-ssk-cyan transition-colors">
                        {section.content}
                      </p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
