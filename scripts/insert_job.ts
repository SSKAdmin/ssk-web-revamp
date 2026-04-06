/* eslint-disable */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL && process.env.POSTGRES_URL) {
  process.env.DATABASE_URL = process.env.POSTGRES_URL;
}

import { db, schema } from '../src/lib/db/index.js';

const descriptionEn = `Company Description

SSK Consulting, based in Riyadh, Saudi Arabia, is a specialized advisory and technology firm dedicated to supporting enterprise clients and government entities. We focus on IT governance, strategic delivery models, and enabling seamless digital transformations to bridge the gap between organizational goals and technology implementation. SSK Consulting provides end-to-end solutions across the technology lifecycle, specializing in key areas such as PMO & SMO operations, IT service and asset management, cloud financial management, and strategic operating models. With a commitment to technical excellence and delivering measurable business value, SSK Consulting ensures clients achieve operational efficiency, compliance, and optimized results.

Role Description

This is a full-time, on-site role based in Riyadh, Saudi Arabia, for an Information Technology Sales Executive. The role involves generating leads, identifying business opportunities, building and managing client accounts, and promoting IT products and services tailored to meet clients' needs. The Sales Executive will collaborate with internal teams to develop strategies, present IT solutions to potential clients, and manage long-term relationships to drive business growth. Key responsibilities also include monitoring industry trends and providing input to align sales efforts with market demands.

Qualifications

Proficiency in IT Sales and Lead Generation, with a strong ability to identify and capitalize on new business opportunities
Experience in Account Management and fostering long-term relationships with enterprise-level clients
Comprehensive understanding of Information Technology and IT-related services to effectively communicate technical solutions
Exceptional Communication skills, including the ability to deliver compelling product presentations and negotiate successfully
Proven ability to meet or exceed sales targets in a competitive environment
Analytical mindset to track market trends and provide valuable feedback
Bachelor’s degree in Business, Computer Science, Information Technology, or a related field
Experience in enterprise IT sales in the GCC region is a strong advantage
Fluency in English; knowledge of Arabic is a plus`;

const descriptionAr = `وصف الشركة

إس إس كيه للاستشارات، ومقرها في الرياض، المملكة العربية السعودية، هي وكالة استشارية تقنية متخصصة في دعم قطاعات الأعمال والهيئات الحكومية. نركز اهتمامنا على حوكمة تكنولوجيا المعلومات وأنظمة التسليم الاستراتيجية، وتمكين التحول الرقمي السلس بهدف سد الفجوة بين الأهداف الاستراتيجية والأدوات التقنية والتنفيذية. توفر إس إس كيه حلولاً شاملة عبر دورة حياة التكنولوجيا.

وصف الوظيفة

هذا دور بدوام كامل وفي الموقع ومقره الرياض، المملكة العربية السعودية، كمدير لمبيعات تكنولوجيا المعلومات. يتضمن الدور توليد فرص محتملة وتحديد فرص الأعمال وبناء وإدارة حسابات العملاء وتعزيز منتجات وخدمات تكنولوجيا المعلومات المصممة لتلبية احتياجات العملاء. سيتعاون مدير المبيعات مع الفرق الداخلية لتطوير الاستراتيجيات وتقديم حلول تكنولوجيا المعلومات للعملاء المحتملين وإدارة علاقات طويلة الأمد لدفع نمو الأعمال. تشمل المسؤوليات الرئيسية أيضًا مراقبة اتجاهات الصناعة.

المؤهلات

- إتقان مبيعات تقنية المعلومات وتوليد العملاء المحتملين، مع قدرة عالية على تحديد فرص الأعمال الجديدة والاستفادة منها
- خبرة في إدارة الحسابات وبناء علاقات طويلة الأمد مع عملاء المؤسسات
- فهم شامل لتقنية المعلومات والخدمات ذات الصلة للتواصل الفعال بشأن الحلول التقنية
- مهارات تواصل استثنائية، بما في ذلك القدرة على تقديم عروض منتجات جذابة والتفاوض بنجاح
- قدرة مثبتة على تلبية أو تجاوز أهداف المبيعات في بيئة تنافسية
- عقلية تحليلية لتتبع اتجاهات السوق وتقديم ملاحظات قيمة
- درجة البكالوريوس في الأعمال التجارية أو علوم الكمبيوتر أو تقنية المعلومات أو مجال ذي صلة
- خبرة في مبيعات تقنية المعلومات للمؤسسات في منطقة دول مجلس التعاون الخليجي ميزة قوية
- الطلاقة في اللغة الإنجليزية؛ معرفة اللغة العربية ميزة إضافية`;

async function run() {
  try {
    await db.insert(schema.jobs).values({
      titleEn: 'Information Technology Sales Executive',
      titleAr: 'مدير مبيعات تكنولوجيا المعلومات',
      department: 'Sales',
      location: 'Riyadh, Saudi Arabia (On-site)',
      type: 'Full-time',
      descriptionEn,
      descriptionAr,
      status: 'published'
    });
    console.log('JOB INSERTED SUCCESSFULLY!');
    process.exit(0);
  } catch (e) {
    console.error('ERROR:', e);
    process.exit(1);
  }
}
run();
