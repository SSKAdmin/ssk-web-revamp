"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, FileSignature, HardHat, Cog } from "lucide-react";

interface DemandDeliveryComparisonProps {
  lang: "en" | "ar";
}

export function DemandDeliveryComparison({ lang }: DemandDeliveryComparisonProps) {
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const content = {
    header: {
      en: "IT Demand & Delivery Lifecycle",
      ar: "دورة حياة الطلبات والتسليم التقني"
    },
    whatWeDo: {
      title: { en: "What We Do", ar: "ماذا نقدم؟" },
      desc: { 
        en: "We establish a seamless, end-to-end operational pipeline that captures business needs, builds them with precision, and fully operates them under strict SLA standards.",
        ar: "نؤسس مسار تشغيلي سلس ومترابط لاستقبال الطلبات الفنية، وتنفيذها بدقة عالية، وصولاً إلى تشغيلها بكفاءة تحت قيود ومعايير (SLA) صارمة."
      }
    },
    howWeDoIt: {
      title: { en: "How We Do It", ar: "كيف نعمل؟" },
      desc: {
        en: "By physically separating the lifecycle into three distinct, specialized pillars: Intake (Demand), Build (PMO), and Run (SMO).",
        ar: "من خلال الفصل الهيكلي لدورة حياة الخدمة إلى ثلاثة ركائز متخصصة: الاستقبال (إدارة الطلب)، التنفيذ البنائي (PMO)، والتشغيل المستدام (SMO)."
      }
    },
    pillars: [
      {
        id: "demand",
        icon: FileSignature,
        title: { en: "IT Demand & Delivery", ar: "إدارة الطلبات التقنية" },
        role: { en: "The Gatekeeper (Intake)", ar: "بوابة التحكم (الاستقبال)" },
        desc: {
          en: "Captures business needs, qualifies budgets, scopes the requirements, and acts as the official bridge between the business and IT execution.",
          ar: "استقبال احتياجات الأعمال، تقدير الميزانيات، تحديد نطاق المتطلبات، والعمل كجسر رسمي وتجاري بين المتطلبات وبدء التنفيذ الفني."
        },
        bullets: {
          en: ["Business Relationship Management", "Requirement Scoping", "Budget & Resource Allocation"],
          ar: ["إدارة علاقات الأعمال", "تحديد النطاق والمتطلبات", "تخصيص الميزانية والموارد"]
        }
      },
      {
        id: "pmo",
        icon: HardHat,
        title: { en: "PMO", ar: "مكتب إدارة المشاريع (PMO)" },
        role: { en: "The Builder (Build)", ar: "ذراع التنفيذ (البناء)" },
        desc: {
          en: "Takes over the approved demand to physically build and deliver the project on time, within budget, and to the exact architectural specifications.",
          ar: "يتولى استلام الطلب المعتمد للبدء في البناء الفعلي وتسليم المشروع في الوقت المحدد، ضمن الميزانية، وبناءً على المعمارية المطلوبة."
        },
        bullets: {
          en: ["Project Execution & SDLC", "Risk & Schedule Management", "Go-Live & Handover"],
          ar: ["الالتزام بدورة حياة التطوير (SDLC)", "إدارة المخاطر والجداول الزمنية", "إطلاق النظام والتسليم النهائي"]
        }
      },
      {
        id: "smo",
        icon: Cog,
        title: { en: "SMO", ar: "مكتب إدارة الخدمات (SMO)" },
        role: { en: "The Operator (Run)", ar: "تشغيل الخدمات (Run)" },
        desc: {
          en: "Takes ownership of the completed project from PMO to manage day-to-day operations, ensure reliability, and handle IT service incidents (ITIL).",
          ar: "يستلم عهدة المشروع المکتمل من الـ PMO لإدارة العمليات اليومية، ضمان والموثوقية، ومعالجة أحداث ومشاكل النظام بناءً على (ITIL)."
        },
        bullets: {
          en: ["Service Desk & Ticketing", "Incident & Change Management", "Continuous SLA Monitoring"],
          ar: ["مكتب المساعدة وإدارة التذاكر", "إدارة التغيير والحوادث", "المراقبة المستمرة لمستوى الخدمة (SLA)"]
        }
      }
    ]
  };

  return (
    <section className="bg-white py-32 border-t-8 border-ssk-cyan relative overflow-hidden">
      
      {/* BACKGROUND NOISE & DECORATION */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/noise.png')] pointer-events-none" />
      <div className={cn(
        "absolute top-0 w-1/3 h-full bg-ssk-surface/40 pointer-events-none",
        isAr ? "right-0" : "left-0"
      )} />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
        
        {/* TOP SECTION: WHAT & HOW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
           <div className="lg:col-span-12">
              <h2 className={cn(
                "font-[var(--font-display)] text-[40px] md:text-[64px] font-bold text-ssk-navy leading-[1.1] tracking-[-0.03em] mb-4",
                isAr && "font-[var(--font-arabic)] tracking-normal"
              )}>
                {isAr ? content.header.ar : content.header.en}
              </h2>
              <div className="w-24 h-1.5 bg-ssk-cyan" />
           </div>

           <div className="lg:col-span-6 bg-ssk-surface p-12 border border-ssk-border shadow-sm">
             <h3 className={cn(
               "text-[24px] font-bold text-ssk-navy uppercase tracking-widest mb-6",
               isAr && "font-[var(--font-arabic)] tracking-normal mb-8"
             )}>
               {isAr ? content.whatWeDo.title.ar : content.whatWeDo.title.en}
             </h3>
             <p className={cn(
                "text-[18px] text-ssk-text-soft leading-relaxed font-medium",
                isAr && "text-[20px]"
             )}>
               {isAr ? content.whatWeDo.desc.ar : content.whatWeDo.desc.en}
             </p>
           </div>

           <div className="lg:col-span-6 bg-ssk-navy p-12 shadow-ssk-layered">
             <h3 className={cn(
               "text-[24px] font-bold text-ssk-cyan uppercase tracking-widest mb-6",
               isAr && "font-[var(--font-arabic)] tracking-normal mb-8"
             )}>
               {isAr ? content.howWeDoIt.title.ar : content.howWeDoIt.title.en}
             </h3>
             <p className={cn(
                "text-[18px] text-white/80 leading-relaxed font-medium",
                isAr && "text-[20px] text-white/90"
             )}>
               {isAr ? content.howWeDoIt.desc.ar : content.howWeDoIt.desc.en}
             </p>
           </div>
        </div>

        {/* BOTTOM SECTION: THE 3 PILLARS COMPARISON */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-ssk-border bg-white shadow-xl relative">
          
          {/* Connecting Line Desktop */}
          <div className="hidden lg:block absolute top-[110px] left-0 w-full h-[2px] bg-ssk-border/60 z-0" />

          {content.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isLast = idx === content.pillars.length - 1;

            return (
              <div 
                key={pillar.id}
                className={cn(
                  "p-10 relative z-10 group hover:bg-ssk-surface transition-colors duration-300",
                  !isLast && (isAr ? "border-b lg:border-b-0 lg:border-l border-ssk-border" : "border-b lg:border-b-0 lg:border-r border-ssk-border")
                )}
              >
                {/* Visual Arrow Indicator between steps */}
                {!isLast && (
                  <div className={cn(
                    "hidden lg:flex absolute top-[94px] w-8 h-8 rounded-full bg-ssk-cyan items-center justify-center text-ssk-navy z-20 shadow-md",
                    isAr ? "-left-4" : "-right-4"
                  )}>
                     <Arrow className="w-4 h-4" strokeWidth={3} />
                  </div>
                )}

                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 bg-white border border-ssk-border flex items-center justify-center shadow-sm mb-8 z-10 relative group-hover:border-ssk-cyan transition-colors">
                     <Icon className="w-8 h-8 text-ssk-navy" />
                  </div>
                  
                  <div className="mb-4">
                     <span className={cn(
                       "inline-block px-3 py-1 bg-ssk-navy text-ssk-cyan text-[11px] font-bold uppercase tracking-widest mb-4",
                       isAr && "font-[var(--font-arabic)] tracking-normal"
                     )}>
                       {isAr ? pillar.role.ar : pillar.role.en}
                     </span>
                     <h4 className={cn(
                       "text-[28px] font-[var(--font-display)] font-bold text-ssk-navy leading-tight",
                       isAr && "font-[var(--font-arabic)]"
                     )}>
                       {isAr ? pillar.title.ar : pillar.title.en}
                     </h4>
                  </div>

                  <p className={cn(
                    "text-[16px] text-ssk-text-soft leading-relaxed font-medium mb-8 grow",
                    isAr && "text-[17px]"
                  )}>
                    {isAr ? pillar.desc.ar : pillar.desc.en}
                  </p>

                  <ul className="space-y-3 mt-auto pt-6 border-t border-ssk-border/60">
                    {(isAr ? pillar.bullets.ar : pillar.bullets.en).map((bullet, bIdx) => (
                      <li key={bIdx} className={cn(
                        "flex items-start text-[14px] text-ssk-navy font-bold leading-tight",
                        isAr && "font-[var(--font-arabic)]"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full bg-ssk-cyan shrink-0 mt-1.5", isAr ? "ml-3" : "mr-3")} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
