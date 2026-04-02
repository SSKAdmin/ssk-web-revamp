import { HardDrive, RefreshCw, DownloadCloud } from "lucide-react";

export default function BackupRecoveryPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Backup & Recovery</h1>
        <p className="text-slate-400">Database snapshot synchronization layer.</p>
      </header>

      <div className="bg-[#050a14] border border-[#1d9cf0]/20 rounded-xl p-8 text-center flex flex-col items-center">
         <div className="w-20 h-20 rounded-full bg-[#1d9cf0]/10 flex items-center justify-center mb-6">
           <HardDrive className="w-10 h-10 text-[#1d9cf0]" />
         </div>
         <h2 className="text-2xl font-bold text-white mb-2">Manual Snapshot</h2>
         <p className="text-sm text-slate-400 mb-8 max-w-md">Instantly capture the entire PostgreSQL state vector including all users, configurations, and logs.</p>
         <button className="flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-lg font-bold transition-all"><DownloadCloud className="w-5 h-5"/> Initiate Backup</button>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl p-6">
        <h3 className="font-bold text-white mb-4">Recent Snapshots</h3>
         <div className="space-y-2">
           <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-white/5">
             <span className="text-sm font-mono text-[#1d9cf0]">SSK_DB_FULL_2026_04_01</span>
             <span className="text-xs text-slate-500">24.1 MB</span>
             <button className="text-xs text-white hover:text-[#1d9cf0] flex items-center gap-1 transition-colors"><RefreshCw className="w-3 h-3"/> Restore</button>
           </div>
         </div>
      </div>
    </div>
  );
}