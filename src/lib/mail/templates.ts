export function getContactConfirmationTemplate(name: string, isAr: boolean) {
  if (isAr) {
    return `
      <div style="font-family: sans-serif; dir: rtl; text-align: right; color: #001F3F; border-top: 4px solid #00FFFF; padding: 40px; background: #F5F5F5;">
        <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 20px;">تم استلام طلب التواصل الاستراتيجي</h1>
        <p style="font-size: 16px; line-height: 1.6;">السيد/السيدة ${name} المحترم،</p>
        <p style="font-size: 16px; line-height: 1.6;">نقر باستلام طلب التواصل الخاص بكم عبر منصة SSK. نحن نقوم حالياً بمراجعة المتطلبات المذكورة لضمان المواءمة مع المعايير المهنية والتشغيلية لدينا.</p>
        <p style="font-size: 16px; line-height: 1.6;">سيتم التواصل معكم من قبل فريق الخدمات التنفيذية خلال 24-48 ساعة عمل كحد أقصى.</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #CBD5E0;">
          <p style="font-size: 14px; color: #4A5568;">الاستراتيجية، التنفيذ، والمعرفة — SSK Strategy, Execution, and Knowledge</p>
          <p style="font-size: 12px; color: #00FFFF;">سرية وخصوصية البيانات مضمونة وفق المعايير المؤسسية.</p>
        </div>
      </div>
    `;
  }
  
  return `
    <div style="font-family: sans-serif; color: #001F3F; border-top: 4px solid #00FFFF; padding: 40px; background: #F5F5F5;">
      <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 20px;">Strategic Inquiry Received</h1>
      <p style="font-size: 16px; line-height: 1.6;">Dear ${name},</p>
      <p style="font-size: 16px; line-height: 1.6;">This confirmation acknowledges the receipt of your strategic request brief via the SSK Institutional Platform. We are currently analyzing the provided requirements to ensure alignment with our operational standards.</p>
      <p style="font-size: 16px; line-height: 1.6;">Our Executive Strategic Services team will initiate contact through professional channels within 24-48 business hours.</p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #CBD5E0;">
        <p style="font-size: 14px; color: #4A5568;">Strategy, Execution, and Knowledge — SSK Portfolio Service</p>
        <p style="font-size: 12px; color: #00FFFF;">Data integrity and privacy are secured under institutional frameworks.</p>
      </div>
    </div>
  `;
}

export function getApplicationConfirmationTemplate(name: string, isAr: boolean) {
  if (isAr) {
    return `
      <div style="font-family: sans-serif; dir: rtl; text-align: right; color: #001F3F; border-top: 4px solid #00FFFF; padding: 40px; background: #F5F5F5;">
        <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 20px;">تم تسجيل طلب الانضمام بنجاح</h1>
        <p style="font-size: 16px; line-height: 1.6;">عزيزنا ${name}،</p>
        <p style="font-size: 16px; line-height: 1.6;">نشكرك على اهتمامك بالانضمام إلى فريق العمل المتميز في SSK. لقد تم أرشفة بياناتك المهنية في قاعدة بيانات الكفاءات لدينا بنجاح.</p>
        <p style="font-size: 16px; line-height: 1.6;">في حال توافق ملفك المهني مع متطلباتنا الحالية، سيتم التواصل معك لمتابعة إجراءات التقييم.</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #CBD5E0;">
          <p style="font-size: 14px; color: #4A5568;">إدارة المواهب — SSK Strategy, Execution, and Knowledge</p>
        </div>
      </div>
    `;
  }
  
  return `
    <div style="font-family: sans-serif; color: #001F3F; border-top: 4px solid #00FFFF; padding: 40px; background: #F5F5F5;">
      <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 20px;">Application Successfully Logged</h1>
      <p style="font-size: 16px; line-height: 1.6;">Dear ${name},</p>
      <p style="font-size: 16px; line-height: 1.6;">Thank you for your interest in joining the SSK team. Your professional credentials have been successfully logged within our talent registry.</p>
      <p style="font-size: 16px; line-height: 1.6;">Should your professional profile align with our current requirements, our Talent Management team will initiate contact for further evaluation.</p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #CBD5E0;">
        <p style="font-size: 14px; color: #4A5568;">Talent Management — SSK Strategy, Execution, and Knowledge</p>
      </div>
    </div>
  `;
}
