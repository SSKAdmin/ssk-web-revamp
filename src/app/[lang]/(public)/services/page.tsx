import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { techSolutions } from "@/content/techSolutions";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { BrandText } from "@/components/site/BrandText";
import { DynamicTechCard } from "@/components/site/DynamicTechCard";
import { DemandDeliveryComparison } from "@/components/site/DemandDeliveryComparison";
import { BOTFlow } from "@/components/site/BOTFlow";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.metadata.services.title,
    description: dict.metadata.services.description,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const s = dict.services_page;

  return (
    <div className="flex flex-col overflow-hidden">
      {/* HERO SECTION */}
      <section className="bg-ssk-navy pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[20vw] font-bold text-ssk-cyan tracking-tighter uppercase select-none opacity-20">{isAr ? "الخدمات" : "SERVICES"}</span>
        </div>
        
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
          <p className="mb-8 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
            {s.hero.eyebrow}
          </p>
          <h1 className={cn(
            "font-[var(--font-display)] text-[48px] font-bold leading-[1] tracking-[-0.04em] text-white lg:text-[84px] max-w-[900px]",
            isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {s.hero.title}
          </h1>
          <p className="mt-12 max-w-[800px] text-[24px] leading-relaxed text-white/50 font-medium">
            {s.hero.description}
          </p>
        </div>
      </section>

      {/* NEW: ENTERPRISE ARCHITECTURE (EA) OFFICES (E2E) */}
      <section className="bg-white py-32 border-b border-ssk-border relative overflow-hidden">
        {/* Subtle Background Mark */}
        <div className="absolute -right-20 -top-20 opacity-[0.03] pointer-events-none select-none">
           <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M14 15v-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4"/><path d="M10 15v4a2 2 0 0 0 2 2h4"/></svg>
        </div>

        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             
             {/* Text Content */}
             <div>
                <p className="mb-6 text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-cyan flex items-center gap-3">
                   <span className="w-8 h-px bg-ssk-cyan shrink-0"></span>
                   {isAr ? "تحكم تنفيذي شامل (E2E)" : "E2E EXECUTIVE CONTROL"}
                </p>
                <h2 className={cn(
                  "font-[var(--font-display)] text-[36px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-ssk-navy mb-8",
                  isAr && "font-[var(--font-arabic)] tracking-normal"
                )}>
                  {isAr ? "تأسيس وتشغيل مكاتب العائلة والبنية المؤسسية (EA Offices)" : "Establishing & Operating Enterprise Architecture (EA) Offices"}
                </h2>
                <div className="space-y-6">
                  <p className="text-[18px] text-ssk-text-soft leading-relaxed font-medium">
                    {isAr 
                      ? "إدارة البنية المؤسسية (EA) هي العقل المدبر والحاكم الاستراتيجي لكافة استثماراتك التقنية ومشاريعك التطويرية. نحن لا نكتفي بوضع المخططات؛ نحن نبني مكتب الـ EA بالكامل ونشغّله لضمان حوكمة جميع القرارات التقنية وتطابقها التام مع استراتيجية الأعمال للشركة عبر إطارات عالمية مثل (TOGAF)."
                      : "Enterprise Architecture (EA) is the strategic governing mind behind all tech investments. We don't just draw blueprints; we fully establish and operate your EA Office, ensuring every operational decision perfectly aligns with business objectives through frameworks like TOGAF."
                    }
                  </p>
                  <p className="text-[18px] text-ssk-text-soft leading-relaxed font-medium">
                    {isAr 
                      ? "نقوم بتغطية هذه الخدمة من البداية إلى النهاية (E2E): من دراسة الفجوة وتصميم مكتب البنية، إلى تشغيله فعلياً ليلعب دور المنظم لحقائب التقنية وتوجيه التحول الرقمي بأعلى درجات النضج المؤسسي."
                      : "We execute this End-to-End (E2E): covering the initial gap analysis, establishing the physical office, and continuously operating it to orchestrate tech portfolios and steer digital transformation with unparalleled institutional maturity."
                    }
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {[
                     { 
                       tAr: "حوكمة الاستثمارات التقنية", 
                       tEn: "Tech Investment Governance",
                       dAr: "ضبط العوائد والميزانيات.",
                       dEn: "ROI & Budget Control." 
                     },
                     { 
                       tAr: "مواءمة الأعمال (Business Alignment)", 
                       tEn: "Business Edge Alignment",
                       dAr: "توجيه التقنية لخدمة أهداف الشركة.",
                       dEn: "Steering tech to serve core ops." 
                     },
                     { 
                       tAr: "التصميم الشامل (E2E Blueprint)", 
                       tEn: "Holistic E2E Blueprint",
                       dAr: "ربط طبقات الأعمال والبيانات والتطبيقات.",
                       dEn: "Linking Business, Data, & Apps." 
                     },
                     { 
                       tAr: "إدارة التغيير ودورة الحياة", 
                       tEn: "Lifecycle & Change Mgmt",
                       dAr: "متابعة النضج المستمر لخدماتك التقنية.",
                       dEn: "Assuring continuous service maturity." 
                     }
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-ssk-surface border border-ssk-border flex items-center justify-center shrink-0">
                           <span className="text-[13px] font-bold text-ssk-cyan border-b-2 border-ssk-cyan">0{idx+1}</span>
                        </div>
                        <div>
                           <h4 className={cn("text-[15px] font-bold text-ssk-navy mb-1", isAr && "font-[var(--font-arabic)]")}>{isAr ? item.tAr : item.tEn}</h4>
                           <p className="text-[13px] font-medium text-ssk-text-soft">{isAr ? item.dAr : item.dEn}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Visual / Info Box */}
             <div className="bg-ssk-navy p-12 lg:p-14 shadow-2xl relative border-t-8 border-ssk-cyan">
                {/* Decorative Dots */}
                <div className="absolute top-6 right-6 flex gap-2 rtl:left-6 rtl:right-auto">
                   <div className="w-1.5 h-1.5 rounded-full bg-ssk-cyan/30"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-ssk-cyan/60"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-ssk-cyan"></div>
                </div>

                <h3 className={cn(
                  "text-[28px] font-bold text-white leading-tight mb-8",
                  isAr && "font-[var(--font-arabic)] text-[32px]"
                )}>
                  {isAr ? "لماذا تحتاجون إلى مكتب البنية المؤسسية (EA)؟" : "Why Require an Autonomous EA Office?"}
                </h3>

                <ul className="space-y-6">
                   {[
                     isAr ? "يمنع تكرار الجهود والميزانيات المهدورة في المشاريع التقنية المعزولة." : "Prevents effort duplication and wasted budgets in siloed IT projects.",
                     isAr ? "يؤسس لمعايير مؤسسية صلبة وموحدة تقود مكاتب التخطيط والتنفيذ (PMO/SMO)." : "Establishes a solid, unified standard driving all PMO & SMO delivery nodes.",
                     isAr ? "يضمن انتقال سلس وآمن للتقنيات السحابية والسيادية." : "Guarantees secure and seamless transitions to sovereign & cloud-native tech."
                   ].map((point, i) => (
                     <li key={i} className="flex gap-4 items-start">
                        <div className="mt-1 w-6 h-6 rounded-sm bg-ssk-cyan/10 flex items-center justify-center shrink-0 border border-ssk-cyan/20">
                           <div className="w-2 h-2 bg-ssk-cyan rotate-45"></div>
                        </div>
                        <p className={cn("text-[16px] text-white/80 font-medium leading-relaxed", isAr && "text-[17px]")}>{point}</p>
                     </li>
                   ))}
                </ul>

                <hr className="my-10 border-white/10" />

                <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                   <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan mb-2">{isAr ? "المنهجية القياسية المتبعة" : "Standardized Methodology"}</p>
                   <p className={cn("text-white font-[var(--font-display)] tracking-wider text-[20px]", isAr && "font-[var(--font-arabic)] tracking-normal")}>TOGAF® & ITIL® 4 Aligned</p>
                </div>
             </div>

           </div>
        </div>
      </section>

      {/* INSTITUTIONAL ARCHITECTURE (EXECUTIVE FLAT DESIGN) - MERGED INTO EA */}
      <SectionShell dark className="bg-ssk-navy py-32 border-t border-ssk-cyan/30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ssk-cyan/[0.05] via-transparent to-transparent">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
           <div className="mb-20 text-center lg:text-start max-w-[800px]">
              <p className="mb-6 text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
                {isAr ? "نطاق التنفيذ المؤسسي" : "Enterprise Execution Scope"}
              </p>
              <h2 className={cn(
                "font-[var(--font-display)] text-[36px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.04em] text-white",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                {isAr ? "المعمارية المؤسسية المتكاملة" : "Holistic Institutional Architecture"}
              </h2>
              <p className="mt-8 text-[18px] text-white/50 leading-relaxed font-medium">
                {isAr 
                  ? "منهجية صلبة لضمان عدم وجود فجوات بين الأهداف الاستراتيجية والتنفيذ التقني الفعلي. نقوم ببناء وتنفيذ معمارية شاملة تضمن التوافق التام." 
                  : "A rigid methodology eliminating gaps between strategic objectives and deployment. We architect and execute a unified framework guaranteeing alignment."}
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  en: "Business Layer", ar: "طبقة الأعمال", 
                  desc_en: "Strategic Capability Mapping",
                  desc_ar: "تخطيط وبناء القدرات الاستراتيجية",
                  details_en: ["Value Stream Execution", "Operating Model Design", "Process Optimization"],
                  details_ar: ["تنفيذ سلاسل القيمة", "تصميم النماذج التشغيلية", "حوكمة مسارات العمل"]
                },
                { 
                  en: "Data Layer", ar: "طبقة البيانات", 
                  desc_en: "Information Governance",
                  desc_ar: "حوكمة الأصول المعلوماتية",
                  details_en: ["Master Data (MDM)", "Data Mesh / Fabric", "Analytic Models"],
                  details_ar: ["إدارة البيانات الرئيسية", "تصميم شبكات البيانات", "مصفوفات التحليل المعقدة"]
                },
                { 
                  en: "Application", ar: "طبقة التطبيقات", 
                  desc_en: "Ecosystem Integration",
                  desc_ar: "تكامل الأنظمة والتطبيقات",
                  details_en: ["Microservices Architecture", "Legacy Modernization", "API Gateways"],
                  details_ar: ["معمارية الخدمات المصغرة", "تحديث الأنظمة المتقادمة", "بوابات الربط البرمجي (API)"]
                },
                { 
                  en: "Technology", ar: "البنية التقنية", 
                  desc_en: "Sovereign Infrastructure",
                  desc_ar: "البنية التحتية السيادية",
                  details_en: ["Cloud Native Operations", "Zero-Trust Security", "High-Availability Nodes"],
                  details_ar: ["التشغيل السحابي المدمج", "النماذج الأمنية السيادية", "عقد التوافر العالي للبيانات"]
                },
              ].map((layer, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col h-full hover:bg-white/10 hover:border-ssk-cyan/50 transition-all duration-300 shadow-ssk-layered">
                   {/* Header Area */}
                   <div className="mb-6 border-b border-white/10 pb-6">
                      <div className="text-ssk-cyan font-bold text-[16px] mb-4 font-mono tracking-widest bg-ssk-cyan/10 w-fit px-3 py-1 rounded">
                         0{i+1}
                      </div>
                      <h4 className={cn(
                        "text-[22px] font-bold text-white uppercase tracking-wider mb-2",
                        isAr && "font-[var(--font-arabic)] tracking-normal text-[24px]"
                      )}>
                       {isAr ? layer.ar : layer.en}
                      </h4>
                      <p className="text-white/60 text-[14px] leading-relaxed font-medium">
                         {isAr ? layer.desc_ar : layer.desc_en}
                      </p>
                   </div>

                   {/* Execution Points */}
                   <div className="mt-auto">
                      <h5 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                        {isAr ? "نطاق التنفيذ" : "Execution Scope"}
                      </h5>
                      <ul className="space-y-3">
                         {(isAr ? layer.details_ar : layer.details_en).map((detail, idx) => (
                           <li key={idx} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-ssk-cyan shrink-0 mt-1.5"></span>
                              <span className={cn(
                                "text-[13px] font-bold text-white/80 leading-snug",
                                isAr && "font-[var(--font-arabic)] text-[14px]"
                              )}>
                                {detail}
                              </span>
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </SectionShell>

      {/* IT DEMAND & DELIVERY (PMO vs SMO Lifecycle) */}
      <DemandDeliveryComparison lang={lang as "en" | "ar"} />

      {/* STRATEGIC B.O.T MODEL */}
      <SectionShell className="bg-ssk-navy py-32 border-t border-white/5 overflow-hidden">
         <div className="mx-auto max-w-[1280px] px-6 lg:px-10 mb-16 text-center">
            <h2 className={cn(
               "font-[var(--font-display)] text-[36px] md:text-[48px] font-bold leading-[1] tracking-[-0.04em] text-white lg:text-[64px]",
               isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "نموذج البناء والتشغيل والنقل (B.O.T)" : "Build, Operate, Transfer (B.O.T)"}
            </h2>
            <p className="mt-6 text-[18px] text-white/50 max-w-[800px] mx-auto font-medium">
               {isAr ? "نوفر قدرات مؤسسية متكاملة تبدأ من البناء الاستراتيجي، مروراً بالتشغيل بكفاءة عالية، وصولاً إلى مرحلة النقل والاستقلالية التامة لمنظومتك." : "We establish, run, and ultimately transfer highly mature operational capacities back into your organizational control."}
            </p>
         </div>
         <BOTFlow isRtl={isAr} />
      </SectionShell>

      {/* FINAL CALL */}
      <SectionShell className="bg-[#f7f9fb] py-56">
         <div className="mx-auto max-w-[1100px] text-center">
            <h2 className={cn(
              "font-[var(--font-display)] text-[36px] md:text-[56px] font-bold text-ssk-navy leading-[1] mb-16 lg:text-[84px] tracking-[-0.04em]",
              isAr && "font-[var(--font-arabic)] tracking-normal"
            )}>
              {isAr ? "هل تتطلب مشاريعكم دقة في التنفيذ؟" : "Focusing on Execution Excellence."}
            </h2>
            <div className="flex justify-center flex-wrap gap-10">
              <Link
                href={`/${lang}/engagement`}
                className="inline-flex min-h-[84px] items-center justify-center bg-ssk-navy px-20 text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-cyan transition-all hover:bg-ssk-cyan hover:text-ssk-navy active:scale-95 shadow-ssk-layered"
              >
                {dict.navigation.engagement}
              </Link>
               <Link
                href={`/${lang}/about`}
                className="inline-flex min-h-[84px] items-center justify-center border-2 border-ssk-navy px-20 text-[14px] font-bold uppercase tracking-[0.3em] text-ssk-navy transition-all hover:bg-ssk-navy hover:text-white active:scale-95"
              >
                <BrandText text={isAr ? "عن SSK" : "About SSK"} logoVariant="color" />
              </Link>
            </div>
         </div>
      </SectionShell>
    </div>
  );
}
