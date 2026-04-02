import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/utils";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
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

          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
                  {e.form.labels.org_name}
                </label>
                <input 
                  type="text" 
                  placeholder={e.form.placeholders.org_name}
                  className="w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan outline-none transition-colors"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
                  {e.form.labels.contact_person}
                </label>
                <input 
                  type="text" 
                  placeholder={e.form.placeholders.contact_person}
                  className="w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
                  {e.form.labels.initiative_type}
                </label>
                <select className="w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan outline-none transition-colors appearance-none">
                  <option>{e.form.options.transformation}</option>
                  <option>{e.form.options.national}</option>
                  <option>{e.form.options.infrastructure}</option>
                  <option>{e.form.options.other}</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
                  {e.form.labels.timeline}
                </label>
                <input 
                  type="text" 
                  placeholder={e.form.placeholders.timeline}
                  className="w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
                {e.form.labels.requirement_description}
              </label>
              <textarea 
                rows={5}
                placeholder={e.form.placeholders.description}
                className="w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="inline-flex min-h-[72px] items-center justify-center bg-ssk-navy px-16 text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-cyan shadow-ssk-glow transition-all hover:bg-ssk-cyan hover:text-ssk-navy hover:scale-105 active:scale-95 group gap-4"
            >
              {e.form.submit}
              <Send className={cn("h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform", isAr && "rotate-180")} />
            </button>
          </form>
        </div>
      </SectionShell>
    </div>
  );
}
