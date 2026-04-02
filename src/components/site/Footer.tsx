import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { ArrowRight, Mail, MapPin, Shield, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SSKLogo } from "./SSKLogo";

type FooterProps = {
  lang: string;
};

export async function Footer({ lang }: FooterProps) {
  const dict = await getDictionary(lang as Locale);
  const isRtl = lang === "ar";
  const f = dict.footer;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ssk-navy text-white pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-ssk-cyan/20" />
      
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* IDENTITY COLUMN */}
          <div className="lg:col-span-5 space-y-10">
            <Link href={`/${lang}`} className="flex flex-col items-start translate-y-[-10px]">
              <SSKLogo variant="white" width={140} height={45} className="justify-start" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-ssk-cyan uppercase mt-2 opacity-80">
                {isRtl ? "الدقة في الاستراتيجية والتنفيذ" : "Precision in Strategy and Execution"}
              </span>
            </Link>
            <p className="text-[20px] leading-relaxed text-white/50 max-w-[400px] font-medium">
              {f.identity}
            </p>
            
            {/* CERTIFICATION UNIT */}
            <div className="pt-10">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ssk-cyan mb-6 opacity-60">
                 {isRtl ? "الاعتمادات والمعايير الدولية" : "Institutional Standards & ISO Certifications"}
               </p>
               <div className="flex flex-wrap gap-3">
                  {["ISO 9001", "ISO 27001", "ISO 22301", "ISO 20000", "ISO 31000", "NCA", "SDAIA"].map((cert, i) => (
                    <div key={i} className="px-3 py-1.5 border border-white/5 bg-white/[0.02] flex items-center gap-2 group hover:border-ssk-cyan/30 transition-colors">
                       <CheckCircle2 className="h-3 w-3 text-ssk-cyan/40 group-hover:text-ssk-cyan" />
                       <span className="text-[10px] font-bold text-white/30 uppercase group-hover:text-white/60">{cert}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-cyan opacity-60">{f.nav_title}</h4>
            <ul className="space-y-6">
              <li>
                <Link href={`/${lang}/services`} className="text-[15px] font-bold text-white/40 hover:text-ssk-cyan transition-colors">{f.links.services}</Link>
              </li>
              <li>
                <Link href={`/${lang}/framework`} className="text-[15px] font-bold text-white/40 hover:text-ssk-cyan transition-colors">{f.links.framework}</Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-[15px] font-bold text-white/40 hover:text-ssk-cyan transition-colors">{f.links.about}</Link>
              </li>
              <li>
                <Link href={`/${lang}/careers`} className="text-[15px] font-bold text-white/40 hover:text-ssk-cyan transition-colors">{f.links.careers}</Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-[15px] font-bold text-white/40 hover:text-ssk-cyan transition-colors">{f.links.contact}</Link>
              </li>
            </ul>
          </div>

          {/* COMPLIANCE LINKS */}
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-cyan opacity-60">{f.compliance_title}</h4>
            <ul className="space-y-6">
              <li>
                <Link href={`/${lang}/privacy`} className="text-[15px] font-bold text-white/40 hover:text-ssk-cyan transition-colors">{f.links.privacy}</Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="text-[15px] font-bold text-white/40 hover:text-ssk-cyan transition-colors">{f.links.terms}</Link>
              </li>
              <li>
                <Link href={`/${lang}/data-protection`} className="text-[15px] font-bold text-white/40 hover:text-ssk-cyan transition-colors">{f.links.data}</Link>
              </li>
            </ul>
          </div>

          {/* PRESENCE DETAILS */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-cyan opacity-60">{f.presence_title}</h4>
            <div className="space-y-8">
               <div className="flex gap-4">
                  <MapPin className="h-4 w-4 text-ssk-cyan mt-1 shrink-0 opacity-60" />
                  <p className="text-[15px] font-bold text-white/80 leading-relaxed">
                    {(f as { address_line1?: string; address_line2?: string }).address_line1 || "Office Gardens, Anas Ibn Malik Rd"}<br />
                    {(f as { address_line1?: string; address_line2?: string }).address_line2 || "Al Malqa, Riyadh 13524"}
                  </p>
               </div>
                <div className="pt-6">
                  <Link href={`/${lang}/contact`} className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-cyan flex items-center gap-3 group hover:text-white transition-all">
                    {isRtl ? "تواصل معنا" : "Connect with Us"}
                    <ArrowRight className={cn("h-3 w-3 group-hover:translate-x-1 transition-transform", isRtl && "rotate-180 group-hover:-translate-x-1")} />
                  </Link>
                </div>
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[12px] font-bold text-white/20 tracking-wider uppercase">
            {f.copyright.replace("{year}", currentYear.toString())}
          </p>
          <div className="flex items-center gap-10">
             <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em] select-none">Execution Enabled</span>
          </div>
        </div>
      </div>
      
      {/* Structural Watermark */}
      <div className="absolute bottom-[-20px] left-[-20px] opacity-[0.03] select-none pointer-events-none">
         <SSKLogo variant="mono" width={600} height={200} className="scale-150 rotate-[-5deg]" />
      </div>
    </footer>
  );
}
