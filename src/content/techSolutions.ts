export type TechSolution = {
  id: string;
  partnerName: string;
  domain: string; // Used for fetching the authentic logo dynamically
  category: {
    en: string;
    ar: string;
  };
  title: string;
  subtitle: {
    en: string;
    ar: string;
  };
  features: {
    en: string[];
    ar: string[];
  };
};

export const techSolutions: TechSolution[] = [
  {
    id: "infraon",
    partnerName: "Infraon",
    domain: "infraon.io",
    category: {
      en: "OPERATIONS",
      ar: "العمليات"
    },
    title: "ITSM & ITOM",
    subtitle: {
      en: "Unified platform for IT Service Management and Operations. Monitor, predict, and automate across hybrid infrastructure.",
      ar: "منصة موحدة لإدارة وحوكمة خدمات تقنية المعلومات والعمليات. تتيح المراقبة والتنبؤ والأتمتة الشاملة للبيئات الهجينة."
    },
    features: {
      en: [
        "Unified ITSM & ITOM",
        "AI Anomaly Detection",
        "Auto Remediation"
      ],
      ar: [
        "إدارة خدمات وعمليات موحدة (ITSM & ITOM)",
        "اكتشاف الحالات الشاذة بالذكاء الاصطناعي",
        "المعالجة والتصحيح التلقائي"
      ]
    }
  },
  {
    id: "ternary",
    partnerName: "Ternary",
    domain: "ternary.app",
    category: {
      en: "FINOPS",
      ar: "الحوكمة المالية"
    },
    title: "CLOUD FINOPS",
    subtitle: {
      en: "Maximize cloud value with precision. Gain complete visibility, optimize spending, and enable collaboration.",
      ar: "تعظيم القيمة السحابية بدقة عالية. احصل على رؤية شاملة، وقم بتحسين النفقات، وتمكين التعاون المؤسسي."
    },
    features: {
      en: [
        "Multi-Cloud Visibility",
        "Budgeting & Alerts",
        "Cost Optimization"
      ],
      ar: [
        "رؤية شاملة للسحابات المتعددة",
        "الميزانيات والتنبيهات الاستباقية",
        "التحسين الدقيق للتكاليف"
      ]
    }
  },
  {
    id: "sahl-grc",
    partnerName: "Sahl GRC",
    domain: "sahlgrc.com",
    category: {
      en: "GOVERNANCE",
      ar: "الحوكمة"
    },
    title: "AI COMPLIANCE",
    subtitle: {
      en: "Navigate complex regulatory landscapes (SAMA, NCA, PDPL) with AI-driven policy generation.",
      ar: "التنقل بثقة في البيئات التنظيمية المعقدة (SAMA, NCA, PDPL) باستخدام إنشاء السياسات المدعوم بالذكاء الاصطناعي."
    },
    features: {
      en: [
        "AI Policy Generation",
        "Auto Risk Assessment",
        "MENA Frameworks"
      ],
      ar: [
        "توليد السياسات التشريعية بالذكاء الاصطناعي",
        "تقييم المخاطر السيبرانية المؤتمت",
        "أطر الالتزام في الشرق الأوسط (MENA)"
      ]
    }
  },
  {
    id: "unirsal",
    partnerName: "Unirsal",
    domain: "unirsal.com",
    category: {
      en: "AI CHAT",
      ar: "الذكاء الحواري"
    },
    title: "CONVERSATIONAL OS",
    subtitle: {
      en: "Transform customer engagement with an advanced conversational OS. Orchestrate operations via chat.",
      ar: "تحويل تفاعل العملاء الجذري من خلال نظام تشغيل حواري متقدم. تنسيق العمليات ودعم المستفيدين عبر المحادثة."
    },
    features: {
      en: [
        "Intelligent Chatbots",
        "Op. Orchestration",
        "Omnichannel Support"
      ],
      ar: [
        "روبوتات المحادثة الذكية المتقدمة",
        "تنسيق وأتمتة العمليات (Orchestration)",
        "دعم الاتصال متعدد القنوات (Omnichannel)"
      ]
    }
  },
  {
    id: "fanruan",
    partnerName: "FanRuan",
    domain: "fanruan.com",
    category: {
      en: "ANALYTICS",
      ar: "التحليلات"
    },
    title: "BUSINESS INTELLIGENCE",
    subtitle: {
      en: "Powerful data integration, visualization, and dashboarding solutions for enterprise-grade decision making.",
      ar: "حلول قوية لدمج البيانات، التمثيل البصري للمعلومات، وإنشاء لوحات القياس لاتخاذ قرارات مؤسسية دقيقة."
    },
    features: {
      en: [
        "Advanced Reporting",
        "Self-Service BI",
        "Data Visualization"
      ],
      ar: [
        "التقارير المؤسسية المتقدمة",
        "ذكاء الأعمال بالخدمة الذاتية",
        "التمثيل البصري للبيانات المعقدة"
      ]
    }
  },
  {
    id: "consulting",
    partnerName: "Consulting",
    domain: "ssk.sa", // Default to SSK placeholder for Consulting since it's internal
    category: {
      en: "ADVISORY",
      ar: "الاستشارات"
    },
    title: "STRATEGY & TRANSFORM",
    subtitle: {
      en: "Expert guidance to align technology with business goals. From digital strategy to process re-engineering.",
      ar: "توجيه استشاري لخبراء لمواءمة التقنية مع أهداف الأعمال. بدءاً من استراتيجية التحول الرقمي وصولاً إلى إعادة هندسة الإجراءات."
    },
    features: {
      en: [
        "Digital & IT Strategy",
        "Enterprise Architecture",
        "Process Re-engineering"
      ],
      ar: [
        "استراتيجية تقنية المعلومات والتحول الرقمي",
        "معمارية المؤسسات الشاملة (EA)",
        "إعادة هندسة وحوكمة الإجراءات (BPR)"
      ]
    }
  }
];
