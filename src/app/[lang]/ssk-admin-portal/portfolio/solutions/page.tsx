import { Target, Layers } from "lucide-react";

export default function SolutionsPortfolioPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Strategic Solutions</h1>
        <p className="text-slate-400">Map overarching business capabilities to underlying service vectors.</p>
      </header>

      <div className="space-y-4">
        {[
          { name: "Digital Transformation Readiness", vectors: 4 },
          { name: "Operational Efficiency Audit", vectors: 2 },
          { name: "Sovereign Data Compliance", vectors: 3 },
          { name: "Executive PMO Deployment", vectors: 5 }
        ].map((sol, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
               <div className="p-3 bg-black rounded-lg border border-white/10 text-slate-400"><Target className="w-5 h-5" /></div>
               <div>
                 <h3 className="text-base font-bold text-slate-200">{sol.name}</h3>
                 <p className="text-xs text-slate-500">B2B Core Capability</p>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-center">
                 <p className="text-2xl font-mono text-[#1d9cf0] font-bold">{sol.vectors}</p>
                 <p className="text-[10px] uppercase tracking-widest text-slate-500">Vectors</p>
               </div>
               <button className="border border-white/10 bg-black hover:bg-white/5 px-4 py-2 rounded text-sm font-semibold text-slate-300 transition-colors">Edit Matrix</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}