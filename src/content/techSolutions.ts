export type TechSolution = {
  id: string;
  icon: string;
  title: string;
  subtitle: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  businessImpact: {
    en: string[];
    ar: string[];
  };
  technicalScope: {
    en: string[];
    ar: string[];
  };
  useCases?: {
    en: string[];
    ar: string[];
  };
  deliverables?: {
    en: string[];
    ar: string[];
  };
  highLevelPlans?: {
    en: string[];
    ar: string[];
  };
};

export const techSolutions: TechSolution[] = [
  {
    id: "sap",
    icon: "Settings",
    title: "SAP",
    subtitle: {
      en: "Enterprise Resource Planning Ecosystem",
      ar: "منظومة تخطيط موارد المؤسسات الشاملة",
    },
    description: {
      en: "Orchestrating end-to-end SAP lifecycle execution. From Greenfield implementation and strategic S/4HANA migration to continuous post-go-live optimization and precise service management.",
      ar: "تخطيط وتنفيذ وإدارة دورة حياة أنظمة SAP بالكامل. بدءاً من التأسيس المعماري والترحيل الاستراتيجي إلى S/4HANA، وصولاً إلى التشغيل المستدام والتحسين اللحظي للعمليات لضمان أقصى كفاءة للموارد.",
    },
    businessImpact: {
      en: ["Absolute Financial Transparency", "Accelerated Supply Chain Velocity", "Unified Institutional Governance"],
      ar: ["شفافية مالية مطلقة وحوكمة دقيقة", "تسريع استجابة وكفاءة سلاسل الإمداد", "أتمتة وحوكمة العمليات المؤسسية المركزية"],
    },
    technicalScope: {
      en: ["S/4HANA Strategic Migration", "Fiori UX & Mobility Deployment", "Complex Module Integration & Testing"],
      ar: ["الترحيل الاستراتيجي والآمن إلى S/4HANA", "تطبيق واجهات Fiori لتحسين تجربة المستخدم", "التكامل البرمجي المعقد للوحدات والأنظمة"],
    },
    useCases: {
      en: ["Automated Financial Reconciliation & Auditing", "Real-Time Enterprise Inventory Control"],
      ar: ["الأتمتة الشاملة لعمليات التدقيق والمطابقة المالية", "التحكم والتحليل اللحظي للمخزون وحركة المبيعات"],
    },
    deliverables: {
      en: ["Target Operating Model & Technical Blueprint", "Configured Go-Live Production Environment", "Knowledge Transfer & Support Handover"],
      ar: ["وثيقة المخطط المعماري ونموذج التشغيل المستهدف", "بيئة إنتاجية جاهزة للتشغيل الفعلي (Go-Live)", "نقل المعرفة الشامل وتسليم وثائق الدعم المؤسسي"],
    },
    highLevelPlans: {
      en: ["Phase 1: Deep Enterprise Gap & Readiness Analysis", "Phase 2: Core Engineering, Testing & Deployment"],
      ar: ["المرحلة 1: التحليل العميق للفجوات وتقييم الجاهزية المؤسسية", "المرحلة 2: الهندسة التقنية، الاختبار الصارم، والتدشين الفعلي"],
    },
  },
  {
    id: "itam",
    icon: "Server",
    title: "ITAM, SAM & HAM",
    subtitle: {
      en: "Enterprise Asset Optimization by Infraon",
      ar: "تحسين وحوكمة الأصول المؤسسية عبر Infraon",
    },
    description: {
      en: "Establishing absolute lifecycle control over hardware and software assets powered by Infraon's unified architecture. We enforce SAM/HAM compliance, secure physical infrastructure, and eliminate operational waste seamlessly.",
      ar: "بناء سيطرة مطلقة على دورة حياة الأصول التقنية (SAM / HAM) بالاعتماد على البنية الموحدة لـ Infraon. نفرض الامتثال القانوني، نؤمن البنية التحتية، ونقضي تماماً على الهدر التشغيلي.",
    },
    businessImpact: {
      en: ["Eradicate Technology Sprawl & Waste", "Ensure Uncompromising Audit Readiness", "Scale Infraon Capabilities Instantly"],
      ar: ["التخلص الجذري من الهدر والتكرار التقني", "تحقيق الجهوزية التامة للتدقيق القانوني والمالي", "التوسع الفوري لتقنيات Infraon باحترافية"],
    },
    technicalScope: {
      en: ["Automated Network Asset Discovery (Infraon)", "Complex Software License Harvesting (SAM)", "Physical Hardware Lifecycle Control (HAM)"],
      ar: ["استكشاف الأجهزة والشبكات آلياً (Infraon)", "الاسترداد الآلي وتخصيص الرخص البرمجية (SAM)", "التحكم المادي بدورة حياة عتاد الأجهزة (HAM)"],
    },
    useCases: {
      en: ["Reclaiming Idle Software Licenses Firm-wide", "Hardware Refresh Cycle Synchronization"],
      ar: ["رصد البرمجيات الخاملة وإعادة تخصيص التراخيص", "مزامنة وتخطيط دورات إحلال وتحديث العتاد المؤسسي"],
    },
    deliverables: {
      en: ["Dynamic Central Asset Registry", "Vendor Compliance & Risk Dashboards", "Lifecycle Policy & Governance Framework"],
      ar: ["قاعدة بيانات سجل الأصول المركزي والديناميكي", "لوحات قياس الامتثال وكشف مخاطر الموردين", "إطار شامل لسياسات حوكمة دورة حياة الأصول"],
    },
    highLevelPlans: {
      en: ["Phase 1: Asset Baseline Configuration & Policy Engineering", "Phase 2: Infraon Discovery Rollout & Automated Harvesting"],
      ar: ["المرحلة 1: حصر وتأسيس خط الأساس وهندسة الإجراءات", "المرحلة 2: إطلاق أدوات استكشاف Infraon وأتمتة التتبع الآلي"],
    },
  },
  {
    id: "itsm",
    icon: "ArrowUpRight",
    title: "ITSM",
    subtitle: {
      en: "Execution-Led ITSM by Infraon",
      ar: "إدارة الخدمات التقنية عبر Infraon",
    },
    description: {
      en: "Deploying world-class, ITIL-compliant service management frameworks backed by the Infraon ecosystem. We fundamentally accelerate resolution speed, operational reliability, and user satisfaction.",
      ar: "نشر أطر عمل احترافية مبنية على تقنيات Infraon ومطابقة لمعايير ITIL، لتحقيق قفزة نوعية في سرعة الاستجابة، وموثوقية العمليات، ورضا المستفيدين المستمر.",
    },
    businessImpact: {
      en: ["Guarantee Zero Business Interruption", "Enforce Strict SLA Accountability", "Unleash Workforce Productivity via Infraon ITSM"],
      ar: ["ضمان استمرارية الأعمال وانعدام الانقطاع التشغيلي", "الفرض الصارم لمساءلة مستويات الخدمة (SLA)", "إطلاق القدرة الإنتاجية عبر منصات Infraon لإدارة الخدمات"],
    },
    technicalScope: {
      en: ["Infraon Omnichannel Service Desk", "Frictionless Change & Release Management", "Critical Incident & Problem Resolution Center"],
      ar: ["تشغيل مكاتب المساعدة متعددة القنوات لمنصة Infraon", "هندسة وحوكمة التغيير البرمجي والإصدارات بسلاسة", "إدارة الحوادث الحرجة وتحليل المشاكل الجذرية"],
    },
    useCases: {
      en: ["AI-Driven Ticket Routing & Triage", "Unified Employee Self-Service Catalogs"],
      ar: ["توجيه وتصنيف التذاكر الذكي المعتمد على منصاتنا", "تفعيل بوابة الخدمة الذاتية المتكاملة والموحدة للموظفين"],
    },
    deliverables: {
      en: ["Comprehensive Service Catalog Architecture", "Strict SLA Matrices & Reporting Engine", "Certified ITIL Workflows on Infraon"],
      ar: ["تصميم وبناء معمارية دليل الخدمات الشامل", "مصفوفات اتفاقية مستوى الخدمة ومحركات التقرير", "تهيئة المنصة على مسارات وإجراءات عمل ITIL الموثقة"],
    },
    highLevelPlans: {
      en: ["Phase 1: Process Re-engineering & Workflow Design", "Phase 2: Infraon Platform Integration & Enablement"],
      ar: ["المرحلة 1: إعادة هندسة العمليات وتصميم المسارات الإجرائية", "المرحلة 2: تكامل وتهيئة منصة Infraon وتفعيلها استراتيجياً"],
    },
  },
  {
    id: "itom",
    icon: "Activity",
    title: "ITOM",
    subtitle: {
      en: "Intelligent IT Operations",
      ar: "عمليات البنية التحتية الذكية",
    },
    description: {
      en: "Implementing rigorous, proactive monitoring and robust management of critical IT infrastructure to secure continuous availability and peak operational performance at scale.",
      ar: "تنفيذ نظم المراقبة الاستباقية الصارمة والإدارة المتينة للبنى التحتية الحساسة، لضمان استمرارية التوافر وتقديم أداء عالي الكفاءة يواكب التوسع المستمر للبيئة الرقمية.",
    },
    businessImpact: {
      en: ["Achieve Complete Digital Resilience", "Proactive Systemic Risk Mitigation", "Frictionless Agile Scaling"],
      ar: ["تحقيق المرونة الرقمية الشاملة للأنظمة المركزية", "التقليل الاستباقي للتهديدات ومخاطر الانقطاع التشغيلي", "دعم التوسع المؤسسي السريع بأمان وموثوقية"],
    },
    technicalScope: {
      en: ["Infrastructure Health & Telemetry Logic", "AIOps-Driven Root Cause Analysis", "Automated Capacity & Demand Forecasting"],
      ar: ["منطق قياس ورصد صحة وأداء البنية التحية المعقدة", "تحليل الجذور عبر تقنيات الذكاء الاصطناعي للعمليات", "التنبؤ الآلي والمتقدم بسعات الاستهلاك والطلب المستقبلي"],
    },
    useCases: {
      en: ["Predictive Core Server Outage Prevention", "Dynamic Multi-Cloud Network Topology Mapping"],
      ar: ["التنبؤ بأعطال الخوادم الاستراتيجية ومنعها قبل وقوعها", "رسم الخرائط التفاعلية الديناميكية للشبكات المتعددة السحابات"],
    },
    deliverables: {
      en: ["Centralized Operations Command Center", "Automated Alerting & Escalation Runbooks", "Executive Performance Dashboards"],
      ar: ["تأسيس وتشغيل مركز عمليات المراقبة والتحكم المركزي", "أدلة الاستجابة الفورية وتصعيد التنبيهات الآلية", "شاشات المراقبة اللحظية الشاملة للإدارة التنفيذية"],
    },
    highLevelPlans: {
      en: ["Phase 1: Enterprise Monitoring Toolchain Deployment", "Phase 2: AIOps Rollout & Performance Baselining"],
      ar: ["المرحلة 1: نشر وتكامل سلسلة أدوات المراقبة المؤسسية", "المرحلة 2: إطلاق الذكاء الاصطناعي التشغيلي وتحديد خط الأساس"],
    },
  },
  {
    id: "finops",
    icon: "DollarSign",
    title: "FINOPS",
    subtitle: {
      en: "Cloud Financial Operations",
      ar: "الإدارة المالية السحابية",
    },
    description: {
      en: "Bringing precise financial accountability and performance monitoring to the cloud engineering model to maximize business value and categorically eliminate infrastructure waste.",
      ar: "تطبيق المساءلة المالية الدقيقة ونظم مراقبة الأداء على نماذج الحوسبة السحابية، لتعظيم القيمة التجارية المستردة والقضاء النهائي على الهدر المالي في البنى التحتية.",
    },
    businessImpact: {
      en: ["Cloud ROI Maximization", "Exact Budget Predictability", "Automated Operational Waste Reduction"],
      ar: ["تعظيم العائد على الاستثمار السحابي (ROI)", "دقة وموثوقية بناء الميزانيات التوقعية", "الخفض المنظم والمؤتمت للهدر التشغيلي السحابي"],
    },
    technicalScope: {
      en: ["Granular Cost Allocation & Tagging", "Systematic Instance Rightsizing", "Advanced Billing Analytics & Anomaly Detection"],
      ar: ["توزيع التكاليف الدقيق عبر سياسات الوسوم الصارمة", "التحجيم المنهجي والمتوافق لموارد الحوسبة", "تحليلات الفوترة المتقدمة واكتشاف الحالات الشاذة مالياً"],
    },
    useCases: {
      en: ["Detecting and Dismantling Orphaned Cloud Resources", "Multi-Cloud Billing Unification & Consolidation"],
      ar: ["اكتشاف وتفكيك الموارد السحابية المتروكة وغير المستغلة", "التوحيد والدمج التحليلي لفواتير السحابات المتعددة"],
    },
    deliverables: {
      en: ["Enterprise Cost Allocation Models", "Executive FinOps Control Dashboard", "Continuous Rightsizing Audit Report"],
      ar: ["نماذج ومنهجيات توزيع وتخصيص التكاليف المؤسسية", "شاشة تحكم الإدارة المالية السحابية للإدارة التنفيذية", "تقارير التدقيق المستمرة لتحجيم وتصحيح البنية التحتية"],
    },
    highLevelPlans: {
      en: ["Phase 1: Cloud Visibility, Tagging & Governance Framework", "Phase 2: Aggressive Cost Optimization & Rightsizing Execution"],
      ar: ["المرحلة 1: تحقيق الشفافية وإسناد الوسوم وبناء الحوكمة", "المرحلة 2: التنفيذ الحازم لتحسين التكاليف وتصحيح الأحجام"],
    },
  },
  {
    id: "grc",
    icon: "ShieldCheck",
    title: "GRC",
    subtitle: {
      en: "Governance, Risk & Compliance",
      ar: "الحوكمة والمخاطر والامتثال",
    },
    description: {
      en: "Architecting secure, highly resilient operational structures that guarantee absolute compliance with global standards (ISO) and stringent local regulatory mandates (NCA).",
      ar: "تأسيس وتشغيل هياكل تنظيمية آمنة وعالية المرونة، تضمن الامتثال المطلق للمعايير العالمية (مثل ISO) والتشريعات المحلية الصارمة (مثل متطلبات الهيئة الوطنية للأمن السيبراني NCA).",
    },
    businessImpact: {
      en: ["Flawless Regulatory Alignment", "Unshakable Institutional Trust", "Total Executive Transparency"],
      ar: ["التوافق التنظيمي التام وبلا ثغرات مع التشريعات القانونية", "تعزيز الموثوقية والثقة المؤسسية لدى الشركاء والعملاء", "تحقيق الشفافية المطلقة لوضوح الرؤية لدى الإدارة العليا"],
    },
    technicalScope: {
      en: ["Continuous Risk Assessment Engine", "ISO Audit & Lifecycle Automation", "Strict Policy-to-IT Control Mapping"],
      ar: ["بناء وتشغيل محرك التقييم المستمر وإدارة المخاطر", "أتمتة تدقيق استيفاء وإدارة دورة حياة مواصفات الأيزو", "رسم وربط السياسات والإجراءات بضوابط تقنية المعلومات الصارمة"],
    },
    useCases: {
      en: ["Automated Saudi NCA Compliance Enforcement", "Real-Time Enterprise Risk Scoring Dynamics"],
      ar: ["أتمتة وتدقيق فرض التوافق مع تشريعات الهيئة (NCA)", "تسجيل وتقييم وتحليل الديناميكيات المتغيرة للمخاطر لحظياً"],
    },
    deliverables: {
      en: ["Comprehensive Compliance Matrices", "Dynamic Enterprise Risk Register", "Unified Corporate Governance Policies"],
      ar: ["مصفوفات قياس وتقييم الامتثال الشاملة والموثقة", "سجل المخاطر المؤسسي الديناميكي القابل للتتبع", "صياغة واعتماد سياسات وأدلة الحوكمة المركزية الموحدة"],
    },
    highLevelPlans: {
      en: ["Phase 1: Control Baseline Formulation & Policy Mapping", "Phase 2: Technological Audit Automation Integration"],
      ar: ["المرحلة 1: تصميم وتخطيط السياسات وضوابط خط الأساس", "المرحلة 2: الاستكمال الفني وتكامل أتمتة التدقيق الآلي بفاعلية"],
    },
  }
];

