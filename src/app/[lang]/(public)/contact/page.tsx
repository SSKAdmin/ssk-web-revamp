import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SectionShell } from "@/components/site/SectionShell";
import { ContactForm } from "@/components/site/ContactForm";
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, Clock, Map } from "lucide-react";
import { SSKLogo } from "@/components/site/SSKLogo";
import { BrandText } from "@/components/site/BrandText";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const m = dict.metadata.contact;
  return {
    title: m.title,
    description: m.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const isAr = lang === "ar";
  const c = dict.contact_page;

  return (
    <div className="flex flex-col overflow-hidden">
      {/* SECTION A: EXECUTIVE LIAISON HERO */}
      <section className="bg-ssk-navy pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[18vw] font-bold text-ssk-cyan tracking-tighter uppercase select-none opacity-20 whitespace-nowrap">Get in Touch</span>
        </div>
        
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
          <p className="mb-8 text-[13px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">
            {c.hero.eyebrow}
          </p>
          <h1 className={cn(
             "font-[var(--font-display)] text-[48px] font-bold leading-[1] tracking-[-0.04em] text-white lg:text-[84px] max-w-[900px]",
             isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {c.hero.title}
          </h1>
          <p className="mt-12 max-w-[720px] text-[24px] leading-relaxed text-white/50 font-medium">
            {c.hero.description}
          </p>
        </div>
      </section>

      {/* SECTION B: ENGAGEMENT ARCHITECTURE */}
      <SectionShell className="bg-white py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
           
           {/* STRATEGIC BRIEF FORM */}
           <div className="lg:col-span-7 bg-[#f7f9fb] p-12 lg:p-20 border border-ssk-border shadow-ssk-layered relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-ssk-cyan shadow-ssk-glow" />
              <div className="mb-16">
                 <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-navy/40 mb-6">{isAr ? "تفاصيل الاستفسار" : "Inquiry Details"}</p>
                 <h2 className={cn(
                   "font-[var(--font-display)] text-[44px] font-bold text-ssk-navy leading-[1.1] tracking-tight",
                   isAr && "font-[var(--font-arabic)] tracking-normal"
                 )}>
                   {c.form.title}
                 </h2>
              </div>
              
              <ContactForm dict={dict} isRtl={isAr} />
           </div>

           {/* CONNECTIVITY DOCTRINE */}
           <div className="lg:col-span-5 space-y-20 pt-8">
              <div className="space-y-10">
                 <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan">{isAr ? "الحضور المؤسسي" : "Institutional Presence"}</p>
                 <h3 className={cn(
                   "font-[var(--font-display)] text-[48px] font-bold text-ssk-navy leading-[1.1] tracking-[-0.02em]",
                   isAr && "font-[var(--font-arabic)] tracking-normal"
                 )}>
                   {c.details.title}
                 </h3>
                 <p className="text-[20px] text-ssk-text-soft font-medium leading-relaxed">
                   {c.details.description}
                 </p>
              </div>

              <div className="space-y-12 border-t-2 border-ssk-border pt-16">
                 {/* PREMIUM MAP & LOCATION DISPLAY */}
                 <div className="relative w-full h-[560px] border border-ssk-border rounded-none overflow-hidden shadow-2xl group">
                    {/* Raw Beautiful Map Background with Pin */}
                    <div className="absolute inset-0">
                       <iframe 
                         src="https://maps.google.com/maps?q=6116+Anas+Ibn+Malik+Rd,+Al+Malqa,+Riyadh&t=m&z=16&ie=UTF8&iwloc=&output=embed" 
                         width="100%" 
                         height="100%" 
                         frameBorder="0" 
                         style={{ border: 0 }} 
                         allowFullScreen
                         aria-hidden="false" 
                         tabIndex={0}
                         className="w-full h-full pointer-events-auto"
                       />
                    </div>
                    
                    {/* Ultra-Premium Floating Data Card (Glassmorphism) */}
                    <div className="absolute top-6 left-6 md:w-[420px] bg-white/95 backdrop-blur-2xl border border-white/20 shadow-[0_30px_60px_rgba(11,31,58,0.2)] p-8 z-10">
                        <div className="flex items-center gap-5 border-b border-ssk-border/60 pb-5 mb-6">
                           <div className="w-14 h-14 bg-ssk-navy shadow-lg flex items-center justify-center shrink-0">
                              <MapPin className="h-6 w-6 text-ssk-cyan" />
                           </div>
                           <div>
                              <p className="text-[11px] font-bold text-ssk-navy/60 uppercase tracking-[0.3em] mb-1">{isAr ? "المكتب الرئيسي" : "Headquarters"}</p>
                              <h3 className="font-[var(--font-display)] text-[24px] font-bold text-ssk-navy tracking-tight leading-none">
                                 SSK, Office 27-A
                              </h3>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div>
                              <p className="text-[15px] font-bold text-ssk-navy mb-1 leading-tight">Office Gardens</p>
                              <p className="text-[14px] font-medium text-ssk-text-soft leading-relaxed">
                                 6116 Anas Ibn Malik Rd, Al Malqa, 2952<br />
                                 Riyadh 13524, Saudi Arabia
                              </p>
                           </div>

                           <div className="p-5 bg-ssk-surface border border-ssk-border/50 flex flex-col gap-4">
                             <div className="flex items-center gap-4">
                               <Phone className="h-4 w-4 text-ssk-cyan shrink-0" />
                               <span className="text-[14px] font-bold text-ssk-navy tracking-wide" dir="ltr">+966 54 9001 511</span>
                             </div>
                             <div className="h-px w-full bg-ssk-border/50" />
                             <div className="flex items-start gap-4">
                               <Clock className="h-4 w-4 text-ssk-cyan shrink-0 mt-0.5" />
                               <span className="text-[13px] font-medium text-ssk-navy leading-relaxed">
                                 {isAr ? "مغلق · يفتح 9 صباحاً حتى 6 مساءً" : "Closed · Opens 9 AM till 6 PM"}<br/>
                                 <span className="text-ssk-text-soft">{isAr ? "الأحد إلى الخميس" : "Sun to Thu"}</span>
                               </span>
                             </div>
                           </div>
                           
                           <a 
                             href="https://share.google/j3qkp1jTwxqVrUAkk" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="flex items-center justify-between w-full p-4 bg-ssk-navy text-white hover:bg-ssk-cyan transition-colors group/btn shadow-md"
                           >
                              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{isAr ? "افتح في خرائط جوجل" : "Open in Google Maps"}</span>
                              <Map className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                           </a>
                        </div>
                    </div>
                 </div>
                 <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-white border border-ssk-border flex items-center justify-center shrink-0 group-hover:border-ssk-cyan transition-all shadow-ssk-layered">
                       <Mail className="h-6 w-6 text-ssk-cyan" />
                    </div>
                    <div>
                       <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-cyan mb-3">{isAr ? "تواصل معنا" : "Contact Us"}</p>
                       <p className="text-[19px] font-bold text-ssk-navy select-all tracking-tight">info@ssksaudi.com</p>
                    </div>
                 </div>

                 {/* SECURITY PROTOCOL FOOTNOTE */}
                 <div className="bg-ssk-navy p-12 relative overflow-hidden shadow-ssk-glow">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-ssk-cyan shadow-ssk-glow" />
                    <div className="flex items-start gap-8">
                       <ShieldCheck className="h-8 w-8 text-ssk-cyan shrink-0 mt-1" />
                       <div className="space-y-4">
                          <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-cyan">{isAr ? "الخصوصية والسرية" : "Confidentiality"}</p>
                          <p className="text-[16px] font-medium text-white/50 leading-relaxed italic">
                            {isAr ? "تخضع جميع المراسلات لبروتوكولات سرية واستمرارية بيانات صارمة لضمان خصوصية معلوماتكم المؤسسية." : "All submissions are handled under strict professional confidentiality and data security protocols to ensure institutional privacy."}
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </SectionShell>

      {/* SECTION C: INTEGRITY VERIFICATION */}
      <SectionShell dark className="bg-ssk-navy py-40 border-t border-white/5">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 items-center">
            {[
              { en: "Direct Execution", ar: "تنفيذ مباشر" },
              { en: "Internal Oversight", ar: "إشراف داخلي" },
              { en: "Radical Transparency", ar: "شفافية مطلقة" },
              { en: "National Parity", ar: "مواءمة وطنية" }
            ].map((check, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-8 group">
                 <div className="h-20 w-20 rounded-none bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-ssk-cyan/10 group-hover:border-ssk-cyan/30 transition-all shadow-ssk-glow relative">
                    <CheckCircle2 className="h-8 w-8 text-ssk-cyan" />
                    <div className="absolute inset-0 border border-ssk-cyan/0 group-hover:border-ssk-cyan/20 transition-all -m-2" />
                 </div>
                 <span className={cn(
                    "text-[13px] font-bold text-white/60 uppercase tracking-[0.3em] group-hover:text-ssk-cyan transition-colors",
                    isAr && "font-[var(--font-arabic)] tracking-normal"
                 )}>
                   {isAr ? check.ar : check.en}
                 </span>
              </div>
            ))}
         </div>
      </SectionShell>
    </div>
  );
}
