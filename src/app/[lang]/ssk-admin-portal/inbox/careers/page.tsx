import { Briefcase, FileText, Download } from "lucide-react";

export default function CareersInboxPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Recruitment Hub</h1>
        <p className="text-slate-400">Manage talent acquisition submissions.</p>
      </header>

      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
         <div className="grid grid-cols-4 p-4 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-black/50">
            <span>Candidate Name</span>
            <span>Applied Position</span>
            <span>Date Received</span>
            <span className="text-right">Resume</span>
         </div>
         {[
           { name: "John Doe", role: "Senior Solutions Architect", date: "April 1, 2026" },
           { name: "Faisal Al-Amri", role: "ITSM Consultant", date: "March 30, 2026" },
           { name: "Noura Saud", role: "Project Manager (PMO)", date: "March 29, 2026" }
         ].map((c, i) => (
            <div key={i} className="grid grid-cols-4 p-4 items-center border-b border-white/5 last:border-0 hover:bg-black/20 transition-colors">
               <span className="text-sm font-medium text-white">{c.name}</span>
               <span className="text-xs text-[#1d9cf0]">{c.role}</span>
               <span className="text-xs text-slate-400">{c.date}</span>
               <div className="text-right">
                  <button className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded border border-white/10 text-slate-300 inline-flex items-center gap-2 transition-all">
                     <FileText className="w-3 h-3" /> View CV
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}