"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Database, 
  LogOut, 
  ChevronRight,
  Globe,
  Settings,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Global Overview" },
  { id: "dashboard/presentation", icon: FileText, label: "Architecture Handover" },
  { id: "dashboard/jobs", icon: FileText, label: "Jobs" },
  { id: "dashboard/applications", icon: Database, label: "Applications" },
  { id: "dashboard/contacts", icon: Database, label: "Contacts" },
  { id: "dashboard/documents", icon: ShieldCheck, label: "Documentation Center" },
];

export function Sidebar({ lang }: { lang: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-80 h-screen sticky top-0 bg-[#021C2A] border-r border-white/5 flex flex-col z-50">
      {/* 1. BRANDING HEADER */}
      <div className="p-10 border-b border-white/5">
        <Link href={`/${lang}/dashboard`} className="flex items-center space-x-4 rtl:space-x-reverse group">
          <div className="w-10 h-10 bg-[#1CC8C8]/10 border border-[#1CC8C8]/20 flex items-center justify-center transition-all group-hover:bg-[#1CC8C8] group-hover:text-black">
            <ShieldCheck className="h-5 w-5 text-[#1CC8C8] group-hover:text-black" />
          </div>
          <div>
            <span className="text-lg font-black text-white tracking-widest block leading-none">SSK</span>
            <span className="text-[7px] font-black tracking-[0.4em] text-[#1CC8C8] uppercase opacity-60">Control Center</span>
          </div>
        </Link>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 p-6 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 px-4">Executive Modules</p>
        {menuItems.map((item) => {
          const isActive = item.id === "dashboard" ? pathname === `/${lang}/dashboard` : pathname.includes(`/${item.id}`);
          return (
            <Link 
              key={item.id} 
              href={`/${lang}/${item.id}`}
              className={cn(
                "flex items-center justify-between p-4 transition-all group border",
                isActive 
                  ? "bg-white/5 border-white/10 text-white" 
                  : "border-transparent text-white/40 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <item.icon className={cn("h-4 w-4", isActive ? "text-[#1CC8C8]" : "opacity-40")} />
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </div>
              <ChevronRight className={cn("h-3 w-3 opacity-20 transition-transform", isActive && "translate-x-1 opacity-100 text-[#1CC8C8]")} />
            </Link>
          );
        })}
      </nav>

      {/* 3. UTILITIES */}
      <div className="p-6 border-t border-white/5 space-y-4">
        <Link 
          href={`/${lang}`}
          className="flex items-center space-x-4 rtl:space-x-reverse p-4 text-white/40 hover:text-[#1CC8C8] transition-all"
        >
          <Globe className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Public Domain</span>
        </Link>
        <button 
          onClick={async () => {
             await signOut({ callbackUrl: `/${lang}/login` });
          }}
          className="w-full flex items-center space-x-4 rtl:space-x-reverse p-4 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all text-left group"
        >
          <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-widest">Logout (Sign Out)</span>
        </button>
      </div>
    </aside>
  );
}
