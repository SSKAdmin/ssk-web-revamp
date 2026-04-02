"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { SSKLogo } from "./SSKLogo";

type NavProps = {
  lang: string;
};

export function Navbar({ lang }: NavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const isRtl = lang === "ar";

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: isRtl ? "الرئيسية" : "Home", href: `/${lang}` },
    { name: isRtl ? "الخدمات" : "Services", href: `/${lang}/services` },
    { name: isRtl ? "الحلول" : "Solutions", href: `/${lang}/framework` },
    { name: isRtl ? "من نحن" : "About", href: `/${lang}/about` },
    { name: isRtl ? "انضم إلينا" : "Careers", href: `/${lang}/careers` },
    { name: isRtl ? "تواصل معنا" : "Contact", href: `/${lang}/contact` },
  ];

  const switchLang = lang === "en" ? "ar" : "en";
  const switchHref = pathname.replace(`/${lang}`, `/${switchLang}`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[100px] bg-ssk-navy/80 backdrop-blur-xl border-b border-white/5 flex items-center">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 flex items-center justify-between">
        
        {/* BRAND IDENTITY */}
        <Link href={`/${lang}`} className="flex items-center gap-4 group cursor-pointer relative z-[100] touch-manipulation">
          <div className="lg:hidden block">
            <SSKLogo className="transform transition-transform group-hover:scale-105" variant="white" type="logo" width={140} height={45} />
          </div>
          <div className="hidden lg:block">
            <SSKLogo className="transform transition-transform group-hover:scale-105" variant="white" type="logo" width={190} height={55} />
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-ssk-cyan",
                  pathname === item.href || (item.href !== `/${lang}` && pathname.startsWith(item.href))
                    ? "text-ssk-cyan"
                    : "text-white/60"
                )}
              >
                <span className={cn(isRtl && "font-[var(--font-arabic)] tracking-normal text-[14px]")}>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="h-5 w-px bg-white/10 mx-2" />

          {/* LANGUAGE SWITCHER */}
          <Link 
            href={switchHref} 
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 flex items-center justify-center border border-white/10 group-hover:bg-ssk-cyan group-hover:border-ssk-cyan transition-all duration-300">
               <Globe className="h-4 w-4 text-ssk-cyan group-hover:text-ssk-navy" />
            </div>
            <span className={cn(
              "text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors",
              isRtl && "font-[var(--font-arabic)] tracking-normal text-[13px]"
            )}>
               {lang === "en" ? "العربية" : "ENG"}
            </span>
          </Link>

          {/* PRIMARY CTA */}
          <Link href={`/${lang}/engagement`}>
            <Button className={cn(
              "bg-ssk-cyan hover:bg-white text-ssk-navy font-bold uppercase tracking-[0.2em] px-8 h-[48px] rounded-none text-[12px] active:scale-95 transition-all shadow-[0_0_15px_rgba(14,165,164,0.3)]",
              isRtl ? "mr-4" : "ml-4"
            )}>
              <span className={cn(isRtl && "font-[var(--font-arabic)] tracking-normal text-[14px]")}>
                {isRtl ? "بدء التعاقد" : "Start Engagement"}
              </span>
            </Button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="lg:hidden text-white w-12 h-12 flex items-center justify-center border border-white/10 active:bg-white/10 transition-colors cursor-pointer relative z-[100] touch-manipulation"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          type="button"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className={cn(
          "lg:hidden fixed inset-0 top-[100px] h-[calc(100vh-100px)] overflow-y-auto bg-ssk-navy z-[60] p-8 flex flex-col items-start gap-8 animate-in slide-in-from-top duration-300",
          isRtl && "items-end text-right"
        )}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-2xl font-bold uppercase tracking-tight text-white flex items-center justify-between w-full group py-4 border-b border-white/5",
                isRtl && "font-[var(--font-arabic)] flex-row-reverse"
              )}
            >
              <span className={cn(pathname === item.href && "text-ssk-cyan")}>{item.name}</span>
              <ChevronRight className={cn(
                "h-5 w-5 text-ssk-cyan opacity-20 group-hover:opacity-100 transition-all", 
                isRtl && "rotate-180"
              )} />
            </Link>
          ))}
          
          <div className="mt-auto w-full pt-10 space-y-8 pb-12">
              <Link 
                href={switchHref}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest",
                  isRtl && "flex-row-reverse"
                )}
              >
                <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center border border-white/10">
                  <Globe className="h-5 w-5 text-ssk-cyan" />
                </div>
                <span className={cn(isRtl && "font-[var(--font-arabic)]")}>
                  {lang === "en" ? "العربية" : "English"}
                </span>
              </Link>
              <Link href={`/${lang}/engagement`} onClick={() => setIsOpen(false)} className="block w-full">
                <Button className="w-full bg-ssk-cyan text-ssk-navy font-bold uppercase tracking-widest py-8 h-auto rounded-none text-[14px] shadow-ssk-glow">
                  <span className={cn(isRtl && "font-[var(--font-arabic)]")}>
                    {isRtl ? "بدء التعاقد" : "Start Engagement"}
                  </span>
                </Button>
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
