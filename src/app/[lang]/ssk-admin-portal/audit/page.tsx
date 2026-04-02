import { Activity, Search, Filter } from "lucide-react";

export default function AuditPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white">System Activity Logs</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -transform-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search event IDs..." className="bg-black border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#1d9cf0] w-64" />
          </div>
          <button className="p-2 border border-white/10 rounded-lg bg-black text-slate-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="bg-white/5 border border-white/5 rounded-xl">
         <div className="grid grid-cols-6 p-4 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="col-span-2">Event Origin</span>
            <span>Type</span>
            <span>IP / Region</span>
            <span>Timestamp</span>
            <span className="text-right">Integrity</span>
         </div>
         {Array.from({length: 8}).map((_, i) => (
           <div key={i} className="grid grid-cols-6 p-4 border-b border-white/5 last:border-0 items-center text-sm hover:bg-white/5 transition-colors font-mono">
             <span className="col-span-2 text-slate-300">urn:ssk:auth:login_{Math.floor(Math.random()*9000)+1000}</span>
             <span className="text-[#1d9cf0]">AUTH_SUCCESS</span>
             <span className="text-slate-500">192.168.1.{Math.floor(Math.random()*200)}</span>
             <span className="text-slate-500">{new Date(Date.now() - i*3600000).toLocaleTimeString()}</span>
             <span className="text-right text-green-500">VERIFIED</span>
           </div>
         ))}
      </div>
    </div>
  );
}