import { MonitorPlay, Download, UploadCloud } from "lucide-react";

export default function PresentationPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Executive Presentations</h1>
        <p className="text-slate-400">Manage and deploy standard slide decks for boardroom engagements.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#050a14] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#1d9cf0]/50 transition-all">
          <div className="w-16 h-16 rounded-full border border-dashed border-slate-500 flex items-center justify-center mb-4 group-hover:border-[#1d9cf0] group-hover:text-[#1d9cf0] text-slate-500 transition-colors">
             <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold mb-2">Upload Master Deck</h3>
          <p className="text-xs text-slate-500">Only PDF / PPTX allowed. Max 50MB.</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-2">Active Deployments</h3>
          {[
            { title: "SSK_Corporate_Deck_Q2_v1.pdf", size: "12.4 MB", date: "April 2026" },
            { title: "B2B_ITSM_Consulting_Overview.pptx", size: "8.1 MB", date: "March 2026" }
          ].map((doc, idx) => (
             <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
               <div className="flex items-center gap-4">
                 <MonitorPlay className="w-8 h-8 text-[#1d9cf0]" />
                 <div>
                   <h4 className="text-sm font-medium text-slate-200">{doc.title}</h4>
                   <p className="text-xs text-slate-500">{doc.date} — {doc.size}</p>
                 </div>
               </div>
               <button className="p-2 bg-black rounded border border-white/10 hover:text-[#1d9cf0] transition-colors"><Download className="w-4 h-4" /></button>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}