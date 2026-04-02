import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const m = dict.metadata.privacy;
  return {
    title: m.title,
    description: m.description,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const legal = dict.legal.privacy;

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
           <div className="prose prose-xl max-w-[800px] text-ssk-text-soft font-medium leading-relaxed">
              <p>
                 {isAr 
                    ? "تلتزم SSK بأعلى معايير السرية والخصوصية المؤسسية في التعامل مع كافة البيانات والمعلومات التي يتم جمعها."
                    : "SSK is committed to the highest standards of confidentiality and institutional privacy in handling all data and information collected."}
              </p>
              <p>
                 {isAr
                    ? "نحن نجمع البيانات فقط لدعم احتياجات التواصل المهني والتعاقدي، ونضمن تشفيرها وحمايتها وفقاً لأفضل الممارسات العالمية."
                    : "We collect data only to support professional and contractual communication needs, ensuring it is encrypted and protected according to global best practices."}
              </p>
           </div>
        </div>
      </section>
    </div>
  );
}
