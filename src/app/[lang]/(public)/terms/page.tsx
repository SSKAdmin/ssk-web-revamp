import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const m = dict.metadata.terms;
  return {
    title: m.title,
    description: m.description,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const legal = dict.legal.terms;

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
                    ? "تخضع كافة الارتباطات المهنية عبر هذه المنصة لبروتوكولات التشغيل المعتمدة لدى SSK، بما يضمن أعلى درجات الانضباط والسرية وتكامل المخرجات."
                    : "All professional engagements initiated through this platform are subject to SSK's approved operational protocols, ensuring the highest level of discipline, confidentiality, and output integrity."}
              </p>
              <p>
                 {isAr
                    ? "يعد استخدام المنصة بمثابة موافقة على الالتزام بمعايير الحوكمة والضوابط التشغيلية المحددة لكل مشروع أو تكليف."
                    : "Use of this platform constitutes agreement to adhere to the governance standards and operational controls established for each project or mandate."}
              </p>
           </div>
        </div>
      </section>
    </div>
  );
}
