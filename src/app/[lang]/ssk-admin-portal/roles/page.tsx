import { Shield, Key, Component } from "lucide-react";

export default function RolesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Roles & Permissions Matrix</h1>
        <p className="text-slate-400">Institutional enforcement of Read/Write/Execute clearance layers.</p>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {[
          { title: "Super Admin", scope: "Global Read/Write/Execute", users: 1, active: true },
          { title: "Director", scope: "Department Write, Global Read", users: 4, active: true },
          { title: "Manager", scope: "Team Local Write, Global Read", users: 12, active: true },
          { title: "Auditor", scope: "Global Read, Logs Export", users: 2, active: false },
        ].map((r, i) => (
           <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-[#1d9cf0]/30 transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Shield className="w-16 h-16 text-[#1d9cf0]" />
             </div>
             <h3 className="text-lg font-bold text-white mb-1">{r.title}</h3>
             <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">{r.scope}</p>
             <div className="space-y-3 relative z-10">
               <div className="flex items-center justify-between text-sm">
                 <span className="text-slate-400">Assigned Identities</span>
                 <span className="font-mono text-[#1d9cf0]">{r.users}</span>
               </div>
               <div className="flex items-center justify-between text-sm pt-3 border-t border-white/5">
                 <span className="text-slate-400">Clearance Status</span>
                 <span className={r.active ? "text-green-500" : "text-slate-500"}>{r.active ? 'Enforced' : 'Archived'}</span>
               </div>
             </div>
           </div>
        ))}
      </div>
    </div>
  );
}