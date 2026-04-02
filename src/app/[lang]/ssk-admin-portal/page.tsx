import { ShieldCheck, Activity, Users, Database } from "lucide-react";

export default function AdminPortalOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">System Overview</h1>
        <p className="text-slate-400">Institutional Command OS Status & Overview</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric Cards adhering to transparent dashboard aesthetic */}
        {[
          { title: "Active Sessions", value: "2", icon: Users, color: "text-[#1d9cf0]" },
          { title: "System Load", value: "14%", icon: Activity, color: "text-green-500" },
          { title: "Security State", value: "Secure", icon: ShieldCheck, color: "text-[#1d9cf0]" },
          { title: "DB Sync", value: "Normal", icon: Database, color: "text-green-500" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">{item.title}</h3>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Recent Audit Activity</h2>
          <div className="space-y-4">
             {/* Abstracted table without grid lines matching constraints */}
             <div className="border-b border-white/5 pb-2 grid grid-cols-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
               <span>Action</span>
               <span>User</span>
               <span>IP Address</span>
               <span>Timestamp</span>
             </div>
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="grid grid-cols-4 text-sm py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-default">
                 <span className="text-slate-300">LOGIN_SUCCESS</span>
                 <span className="text-[#1d9cf0]">admin@ssksaudi.com</span>
                 <span className="text-slate-500">127.0.0.1</span>
                 <span className="text-slate-500 font-mono">Just now</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">System Health</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">API Latency</span>
                <span className="text-[#1d9cf0] font-mono">42ms</span>
              </div>
              <div className="w-full bg-black/50 rounded-full h-1.5">
                <div className="bg-[#1d9cf0] h-1.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Storage Capacity</span>
                <span className="text-[#1d9cf0] font-mono">68%</span>
              </div>
              <div className="w-full bg-black/50 rounded-full h-1.5">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
