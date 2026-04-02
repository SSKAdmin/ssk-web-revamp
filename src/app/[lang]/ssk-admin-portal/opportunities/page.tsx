import { LayoutDashboard, ArrowRight } from "lucide-react";

export default function OpportunitiesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Service Requests Pipeline</h1>
        <p className="text-slate-400">Institutional tracking of incoming advisory requests.</p>
      </header>

      <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
        {["Qualification", "Scoping", "Proposal Draft", "Closed Won"].map((stage, i) => (
          <div key={i} className="flex-1 min-w-[280px] bg-white/5 border border-white/5 rounded-xl h-[600px] flex flex-col">
            <div className="p-4 border-b border-white/5 font-bold text-sm tracking-wide text-slate-200">
              {stage}
            </div>
            <div className="p-4 space-y-4">
               {/* Mock Card */}
               <div className="bg-black border border-white/10 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:border-[#1d9cf0]/50 transition-colors">
                 <h4 className="font-bold text-white text-sm mb-1">ERP Implementation Audit</h4>
                 <p className="text-xs text-[#1d9cf0] mb-3">Enterprise Corp.</p>
                 <div className="flex justify-between items-center text-[10px] text-slate-500">
                   <span>Value: Pending</span>
                   <span className="flex items-center gap-1">Move <ArrowRight className="w-3 h-3"/></span>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}