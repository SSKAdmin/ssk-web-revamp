"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Terminal, Users, Component, FileKey2, FileCog, ShieldCheck, 
  Database, Briefcase, Mail, MessageSquare, Target, GraduationCap, 
  Lightbulb, LayoutTemplate, Settings, Key, HardDrive
} from "lucide-react";

const GROUPS = [
  {
    title: "Platform Administration",
    items: [
      { name: "System Overview", url: "/ssk-admin-portal", icon: Terminal },
      { name: "User Management", url: "/ssk-admin-portal/users", icon: Users },
      { name: "Roles & Permissions", url: "/ssk-admin-portal/roles", icon: FileKey2 },
      { name: "Activity Logs", url: "/ssk-admin-portal/audit", icon: ShieldCheck },
    ]
  },
  {
    title: "Strategic Assets",
    items: [
      { name: "Executive Presentation", url: "/ssk-admin-portal/presentation", icon: Component },
    ]
  },
  {
    title: "Portfolio Management",
    items: [
      { name: "Service Portfolio", url: "/ssk-admin-portal/portfolio/services", icon: Briefcase },
      { name: "Strategic Solutions", url: "/ssk-admin-portal/portfolio/solutions", icon: Target },
    ]
  },
  {
    title: "Communications Hub",
    items: [
      { name: "Client Inquiries", url: "/ssk-admin-portal/inbox/contact", icon: Mail },
      { name: "Client Feedback", url: "/ssk-admin-portal/feedback", icon: MessageSquare },
      { name: "Service Requests", url: "/ssk-admin-portal/opportunities?type=service_request", icon: Lightbulb },
      { name: "Recruitment Hub", url: "/ssk-admin-portal/inbox/careers", icon: Users },
    ]
  },
  {
    title: "Knowledge & Content",
    items: [
      { name: "Knowledge Hub", url: "/ssk-admin-portal/knowledge", icon: GraduationCap },
      { name: "Market Intelligence", url: "/ssk-admin-portal/insights", icon: FileCog },
      { name: "Platform Content", url: "/ssk-admin-portal/cms", icon: LayoutTemplate },
    ]
  },
  {
    title: "System Operations",
    items: [
      { name: "Configurations Matrix", url: "/ssk-admin-portal/settings", icon: Settings },
      { name: "Backup & Recovery", url: "/ssk-admin-portal/settings/backup", icon: HardDrive },
      { name: "Compliance & Security", url: "/ssk-admin-portal/settings/compliance", icon: Key },
    ]
  }
];

export function Sidebar({ lang }: { lang: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-[#050a14] border-r border-white/5 flex flex-col h-screen text-slate-300 font-sans overflow-hidden">
      <div className="px-6 py-8 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
          <div className="w-2 h-2 rounded-sm bg-[#1d9cf0] animate-pulse shadow-[0_0_10px_#1d9cf0]"></div>
          SSK Command
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-[#1d9cf0] mt-2 opacity-80">
          Institutional OS
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-8 p-6 custom-scrollbar">
        {GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-2">
              {group.title}
            </h2>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const href = `/${lang}${item.url}`;
                // Exact match for overview, startsWith for subsections to keep active state when nested
                const isActive = item.url === "/ssk-admin-portal" 
                  ? pathname === `/${lang}/ssk-admin-portal`
                  : pathname.startsWith(href) || pathname.includes(item.url);
                
                return (
                  <Link
                    key={item.url}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 font-medium",
                      isActive 
                        ? "bg-[#1d9cf0]/10 text-[#1d9cf0] border border-[#1d9cf0]/20 shadow-[0_0_15px_rgba(29,156,240,0.05)]" 
                        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", isActive ? "text-[#1d9cf0]" : "text-slate-500")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center font-bold text-xs text-white border border-white/10">
            A
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Administrator</p>
            <p className="text-[10px] text-slate-400 uppercase">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
