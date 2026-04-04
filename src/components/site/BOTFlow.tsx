"use client";

import { cn } from "@/lib/utils";
import { HardHat, Cog, ShieldCheck, ChevronRight, Settings, Users, MonitorSmartphone, HandHeart } from "lucide-react";
import { motion } from "framer-motion";

interface BOTFlowProps {
  isRtl?: boolean;
}

export function BOTFlow({ isRtl = false }: BOTFlowProps) {
  const content = {
    phases: [
      {
        id: "build",
        icon: HardHat,
        number: "01",
        titleEn: "BUILD (Establish)",
        titleAr: "التأسيس والبناء (Build)",
        descEn: "We construct your organizational units, technology stacks, and operational policies from ground zero.",
        descAr: "نؤسس قدراتك التقنية والتنظيمية من الصفر، متضمنةً البنية التحتية والسياسات وأدوات التشغيل الأساسية.",
        deliverablesEn: [
          "Infrastructure & Cloud Environment Provisioning",
          "Team Recruitment & Onboarding",
          "Process & Policy Design",
          "Toolchain Implementation",
        ],
        deliverablesAr: [
          "تجهيز بيئات الاستضافة والبنى التحتية",
          "استقطاب وتوظيف وتدريب الكفاءات التقنية",
          "تصميم وحوكمة السياسات والعمليات",
          "تفعيل أنظمة وأدوات التشغيل القياسية",
        ],
        color: "border-ssk-cyan",
        bgIcon: "text-ssk-cyan",
      },
      {
        id: "operate",
        icon: Cog,
        number: "02",
        titleEn: "OPERATE (Manage)",
        titleAr: "الإدارة والتشغيل (Operate)",
        descEn: "We run the established capabilities reliably, stabilizing performance and executing day-to-day operations.",
        descAr: "نشغل القدرات التي تم بناؤها بكفاءة وموثوقية عالية، ونضمن تحقيق المتطلبات التنفيذية بشكل يومي.",
        deliverablesEn: [
          "Service Desk & Level 1/2/3 Support",
          "Continuous Performance Optimization",
          "Strict SLA & KRA Enforcement",
          "Incident & Crisis Management",
        ],
        deliverablesAr: [
          "دعم فني متدرج (مستويات ١-٢-٣)",
          "التحسين المستمر لجودة الأداء والخدمات",
          "فرض التزام صارم بمعايير (SLA) المؤسسية",
          "إدارة الحوادث التقنية وحل المشاكل الجذرية",
        ],
        color: "border-[#0abac8]",
        bgIcon: "text-[#0abac8]",
      },
      {
        id: "transfer",
        icon: ShieldCheck,
        number: "03",
        titleEn: "TRANSFER (Handover)",
        titleAr: "النقل والاستقلالية (Transfer)",
        descEn: "A secure, documented transition of full operational capability and autonomy back to your internal teams.",
        descAr: "عملية نقل آمنة ومدروسة لكامل القدرات التشغيلية والمعرفية لتمكين فرقك الداخلية من الإدارة باستقلالية تامة.",
        deliverablesEn: [
          "Extensive Knowledge Transfer Programs",
          "Asset & Intellectual Property Handover",
          "Shadowing & Parallel Run Phases",
          "Final Sign-off & Autonomy Declaration",
        ],
        deliverablesAr: [
          "برامج التدريب المكثفة ونقل المعرفة",
          "تسليم الأصول البرمجية وحقوق الإدارة التامة",
          "المرحلة الانتقالية وفترات التشغيل المتوازي",
          "الاعتماد النهائي وإعلان الاستقلالية",
        ],
        color: "border-[#8EADEA]",
        bgIcon: "text-[#8EADEA]",
      },
    ]
  };

  return (
    <div className="w-full relative py-6">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative">
        
        {/* Connection Line Behind Cards (Desktop Only) */}
        <div className="hidden lg:block absolute top-[180px] w-[calc(100%-80px)] left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-ssk-cyan/20 via-[#0abac8]/50 to-[#8EADEA]/20 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10 w-full mb-12">
          {content.phases.map((phase, idx) => {
            const Icon = phase.icon;
            
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-ssk-navy/50 backdrop-blur-md border border-white/10 rounded-2xl relative overflow-hidden flex flex-col h-full hover:border-white/30 transition-all duration-500 shadow-2xl group"
              >
                 {/* Top Glowing Edge representing Phase Color */}
                 <div className={cn("absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r opacity-80", 
                   idx === 0 ? "from-ssk-cyan to-[#0abac8]" : 
                   idx === 1 ? "from-[#0abac8] to-[#8EADEA]" : 
                   "from-[#8EADEA] to-blue-300"
                 )} />

                 {/* Giant Watermark Background Number */}
                 <div className="absolute -bottom-10 -right-10 text-[180px] font-bold text-white/[0.02] pointer-events-none font-mono leading-none z-0 rtl:-right-auto rtl:-left-10">
                   {phase.number}
                 </div>

                 {/* Phase Header */}
                 <div className="p-8 relative z-10 border-b border-white/5 flex items-start gap-6">
                    <div className={cn("w-16 h-16 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center border", phase.color)}>
                       <Icon className={cn("h-8 w-8", phase.bgIcon)} />
                    </div>
                    <div>
                       <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2 block">{isRtl ? `المرحلة ${phase.number}` : `PHASE ${phase.number}`}</span>
                       <h3 className={cn(
                         "text-[24px] font-bold text-white",
                         isRtl ? "font-[var(--font-arabic)] text-[28px] tracking-normal" : "font-[var(--font-display)] tracking-wide"
                       )}>
                         {isRtl ? phase.titleAr : phase.titleEn}
                       </h3>
                    </div>
                 </div>

                 {/* Phase Description */}
                 <div className="p-8 relative z-10 flex-grow flex flex-col">
                    <p className={cn(
                      "text-[16px] text-white/60 font-medium leading-relaxed mb-10 h-[80px]",
                      isRtl && "text-[18px]"
                    )}>
                      {isRtl ? phase.descAr : phase.descEn}
                    </p>

                    {/* Operational Deliverables List */}
                    <div className="mt-auto">
                       <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-cyan mb-6 block border-b border-white/10 pb-3">{isRtl ? "مخرجات التنفيذ الرئيسية" : "Key Execution Deliverables"}</h4>
                       <ul className="space-y-4">
                          {(isRtl ? phase.deliverablesAr : phase.deliverablesEn).map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start">
                              <ChevronRight className={cn("w-4 h-4 mt-0.5 text-ssk-cyan shrink-0 mr-3", isRtl && "mr-0 ml-3 rotate-180")} />
                              <span className={cn(
                                "text-[14px] text-white/90 font-medium",
                                isRtl && "text-[15px]"
                              )}>
                                {d}
                              </span>
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>

              </motion.div>
            );
          })}
        </div>

        {/* B.O.T Strategic Footer Message */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.8 }}
           className="w-full text-center mt-12 bg-white/5 border border-white/10 py-6 px-10 rounded-xl"
        >
           <p className="text-[14px] md:text-[16px] font-bold text-white/80 tracking-wide">
             {isRtl 
               ? "تم تصميم هذا النموذج لإلغاء مخاطر التشغيل، وضمان كفاءة البنية، ثم نقل المعرفة بسلاسة تامة لمؤسستك لتبدأ القيادة الذاتية." 
               : "This model is engineered to eliminate execution risk, guarantee operational velocity, and ensure a seamless handover to your autonomous teams."
             }
           </p>
        </motion.div>

      </div>
    </div>
  );
}
