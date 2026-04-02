import { getApplications, getContacts, getJobs, getDocuments } from "@/lib/db/queries";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Users, MessageSquare, Briefcase, ShieldCheck, Database, Filter, SlidersHorizontal, Activity, FileText, XCircle } from "lucide-react";
import Link from "next/link";
import { AnalyticsMap } from "@/components/admin/AnalyticsMap";

export default async function AdminDashboard() {
  const [apps, contacts, jobs, docs] = await Promise.all([
    getApplications(),
    getContacts(),
    getJobs(true),
    getDocuments()
  ]);

  const criticalDocs = docs.filter(d => d.requiredForGoLive);
  const criticalMissing = criticalDocs.filter(d => d.status === "missing");
  const completedDocs = docs.filter(d => d.status === "exists");
  const completionPercentage = docs.length > 0 ? Math.round((completedDocs.length / docs.length) * 100) : 0;

  const metrics = [
    { label: "Strategic CRM Leads", value: contacts.length, sub: "Sales & Pre-sales Inquiries", icon: MessageSquare, trend: "+12%", color: "text-[#1CC8C8]" },
    { label: "Talent Pipeline", value: apps.length, sub: "HR & Recruitment Operations", icon: Users, trend: "+5%", color: "text-[#1CC8C8]" },
    { label: "Operational Nodes", value: jobs.length, sub: "Platform Synchronized Assets", icon: Briefcase, trend: "Stable", color: "text-white/40" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* HUD METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 relative overflow-hidden group hover:border-[#1CC8C8]/50 transition-all cursor-default">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <m.icon className="h-16 w-16" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1CC8C8]">{m.label}</p>
                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded-full">{m.trend}</span>
              </div>
              <p className="text-4xl font-black text-white mb-2">{m.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{m.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* GEOSPATIAL MAP & ANALYTICS */}
        <div className="xl:col-span-12">
            <AnalyticsMap />
        </div>

        {/* CRM OPERATIONS DESK */}
        <div className="xl:col-span-8 bg-white/5 border border-white/10 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center space-x-3">
              <Database className="h-4 w-4 text-[#1CC8C8]" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">CRM Operations Desk</h2>
            </div>
            
            <div className="flex gap-2">
               {/* Filtration Mockups for HR, Sales, Presales */}
               <button className="flex items-center gap-2 px-3 py-1.5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:border-[#1CC8C8]/50 transition-all">
                 <Filter className="w-3 h-3" /> Sales / Pre-Sales
               </button>
               <button className="flex items-center gap-2 px-3 py-1.5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:border-[#1CC8C8]/50 transition-all">
                 <SlidersHorizontal className="w-3 h-3" /> HR / Procurement
               </button>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto min-h-[400px]">
             {/* CRM DATA TABLE */}
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-5 text-[9px] font-black uppercase tracking-widest text-white/30">Account / Lead</th>
                  <th className="p-5 text-[9px] font-black uppercase tracking-widest text-white/30">Sector / Intent</th>
                  <th className="p-5 text-[9px] font-black uppercase tracking-widest text-white/30 text-center">Status</th>
                  <th className="p-5 text-[9px] font-black uppercase tracking-widest text-white/30 text-right">SOC Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {contacts.slice(0, 8).map((c: any) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="p-5">
                      <p className="text-xs font-black uppercase text-white group-hover:text-[#1CC8C8] transition-colors line-clamp-1">{c.name}</p>
                      <p className="text-[9px] text-white/40 tracking-tight mt-1">{c.email} {c.phone && `• ${c.phone}`}</p>
                    </td>
                    <td className="p-5">
                      <p className="text-[10px] font-bold text-white/80">{c.organization || 'Direct Interaction'}</p>
                      <p className="text-[9px] text-white/40 line-clamp-1 mt-1">{c.message}</p>
                    </td>
                    <td className="p-5 text-center">
                       <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded inline-flex items-center ${c.status === 'new' ? 'bg-[#1CC8C8]/10 text-[#1CC8C8]' : 'bg-white/5 text-white/50'}`}>
                         {c.status}
                       </span>
                    </td>
                    <td className="p-5 text-right">
                       <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">
                          {new Date(c.createdAt).toLocaleDateString()}
                       </p>
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-[10px] font-black uppercase tracking-widest text-white/20">
                       No active CRM records detected in database grid.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* COMPLIANCE & SOC SECURITY WIDGET */}
        <div className="xl:col-span-4 space-y-6 flex flex-col">
           <div className="bg-white/5 border border-white/10 p-8 relative overflow-hidden">
              <div className="flex items-center space-x-3 mb-8">
                <ShieldCheck className="h-4 w-4 text-[#1CC8C8]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">SOC & GRC Compliance</h2>
              </div>
              <p className="text-[10px] leading-relaxed text-white/50 mb-8">
                All platform modifications, administrative accesses, and API key mutations are End-to-End Encrypted and strictly logged within the immutable footprint database enforcing non-repudiation.
              </p>

              <div className="space-y-3">
                 <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10">
                    <span className="text-[9px] font-black uppercase text-white/40">Data Encryption</span>
                    <span className="text-[9px] font-black uppercase text-[#1CC8C8]">AES-256 GCM</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10">
                    <span className="text-[9px] font-black uppercase text-white/40">Audit Logging</span>
                    <span className="text-[9px] font-black uppercase text-[#1CC8C8]">Strict Footprinting</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10">
                    <span className="text-[9px] font-black uppercase text-white/40">RBAC Controls</span>
                    <span className="text-[9px] font-black uppercase text-white/60">Executive Isolated</span>
                 </div>
              </div>
           </div>

           {/* DOCUMENTATION READINESS WIDGET */}
           <div className="bg-white/5 border border-white/10 p-8 flex-1 relative overflow-hidden group hover:border-[#1CC8C8]/50 transition-all">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center space-x-3">
                   <FileText className="h-4 w-4 text-[#1CC8C8]" />
                   <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Documentation Readiness</h2>
                 </div>
                 <span className="flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#1CC8C8] opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1CC8C8]"></span>
                 </span>
              </div>
              
              <div className="space-y-6">
                 <div>
                   <div className="flex justify-between items-end mb-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Overall Completion</span>
                     <span className="text-2xl font-black text-[#1CC8C8]">{completionPercentage}%</span>
                   </div>
                   <div className="w-full bg-white/5 h-1">
                     <div className="bg-[#1CC8C8] h-1" style={{ width: `${completionPercentage}%` }}></div>
                   </div>
                 </div>

                 <div className="space-y-3 pt-4 border-t border-white/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Critical Missing Blockers</p>
                   {criticalMissing.length === 0 ? (
                      <p className="text-xs text-white/40 italic">All go-live documents exist.</p>
                   ) : (
                     criticalMissing.slice(0, 4).map((doc, idx) => (
                       <div key={idx} className="flex gap-4 p-3 bg-red-400/5 border border-red-400/10">
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-white leading-tight">{doc.name}</p>
                            <p className="text-[9px] text-white/40 uppercase mt-1">{doc.category}</p>
                          </div>
                       </div>
                     ))
                   )}
                   {criticalMissing.length > 4 && (
                     <p className="text-[9px] uppercase text-white/30 text-center pt-2">+{criticalMissing.length - 4} more required</p>
                   )}
                 </div>

                 <Link href="/dashboard/documents" className="block text-center mt-6 border border-[#1CC8C8]/20 bg-[#1CC8C8]/5 text-[#1CC8C8] hover:bg-[#1CC8C8] hover:text-black transition-all py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                   Open Command Center
                 </Link>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
