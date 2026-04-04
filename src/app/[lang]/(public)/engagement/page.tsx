import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ClientEngagementForm } from "@/components/site/ClientEngagementForm";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.metadata.engagement.title,
    description: dict.metadata.engagement.description,
  };
}

export default async function EngagementPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const e = dict.engagement_page;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <SectionShell className="pt-32 pb-40">
        <div className="max-w-[800px] mx-auto">
          <Link 
            href={`/${lang}`}
            className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-ssk-text-soft hover:text-ssk-navy mb-12 group"
          >
            <ArrowLeft className={cn("h-4 w-4 group-hover:-translate-x-1 transition-transform", isAr && "rotate-180 group-hover:translate-x-1")} />
            {e.hero.back_to_home}
          </Link>

          <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
            {e.hero.eyebrow}
          </p>
          <h1 className={cn(
            "font-[var(--font-display)] text-[48px] font-bold leading-[1.1] tracking-[-0.04em] text-ssk-navy lg:text-[72px] mb-12",
            isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {e.hero.title}
          </h1>
          <p className="text-[22px] text-ssk-text-soft leading-relaxed mb-16 font-medium">
            {e.hero.description}
          </p>

          <ClientEngagementForm 
            lang={lang}
            labels={e.form.labels}
            placeholders={e.form.placeholders}
            options={e.form.options}
            submitText={e.form.submit}
          />
        </div>
      </SectionShell>
    </div>
  );
}
