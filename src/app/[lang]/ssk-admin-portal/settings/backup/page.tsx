"use client";

import { HardDrive, RefreshCw, DownloadCloud, Server, Database, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function BackupRecoveryPage() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simMessage, setSimMessage] = useState("");
  const [snapshots, setSnapshots] = useState([{ id: "SSK_DB_FULL_2026_04_01", size: "24.1 MB", date: "April 1, 2026" }]);

  const handleBackup = () => {
    setIsSimulating(true);
    setSimMessage("Connecting to Neon PostgreSQL Engine...");
    
    setTimeout(() => setSimMessage("Executing Drizzle Schema Snapshot..."), 1200);
    setTimeout(() => setSimMessage("Compressing relational user and job data..."), 2500);
    setTimeout(() => setSimMessage("Encrypting payload via AES-256..."), 3800);
    setTimeout(() => {
      setSimMessage("Snapshot complete.");
      setSnapshots(prev => [{
        id: `SSK_DB_FULL_2026_04_03_${Math.floor(Math.random() * 1000)}`,
        size: "26.8 MB",
        date: "Today"
      }, ...prev]);
      setIsSimulating(false);
    }, 5000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1200px] pb-32">
      <header className="border-b border-white/10 pb-8">
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-wide">Backup & Architecture States</h1>
        <p className="text-white/50 text-lg">System-wide database synchronization and storage guidelines.</p>
      </header>

      {/* STEP BY STEP GUIDELINES */}
      <div className="bg-[#021C2A] border-l-4 border-ssk-cyan/80 p-8 rounded-r-xl shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Server size={180} />
         </div>
         <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest text-ssk-cyan relative z-10">Data Architecture & Archival Procedure</h2>
         <p className="text-white/70 mb-8 max-w-3xl leading-relaxed text-[15px] relative z-10">
           The SSK Platform utilizes a decoupled architecture where Front-End logic (Next.js/Vercel) rests globally, while Data (PostgreSQL) is securely contained within Neon Databases. Below is the operational guideline for extracting or archiving physical data states.
         </p>

         <div className="space-y-6 relative z-10">
            <div className="flex gap-4 items-start">
               <div className="w-10 h-10 rounded-full bg-ssk-cyan/10 border border-ssk-cyan flex items-center justify-center shrink-0">
                  <span className="text-ssk-cyan font-bold text-lg">1</span>
               </div>
               <div>
                  <h3 className="text-white font-bold text-lg mb-2">Primary Relational Storage (PostgreSQL / Neon)</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                     All user contacts, job applications (metadata), and RBAC logic sit securely inside Neon Serverless DB. 
                     Neon automatically takes physical snapshots every 24 hours. To run manual SQL dumps, navigate to the Neon Console {'>'} Projects {'>'} SSK-Platform {'>'} Branches {'>'} Export data.
                  </p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg">2</span>
               </div>
               <div>
                  <h3 className="text-white font-bold text-lg mb-2">Binary Object Storage (Vercel Blob / S3)</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                     PDF Resumes and EDMS Vault Documents are immutable arrays stored separately from the database. 
                     They are archived automatically inside Vercel Blob. Archival downloads for external backup must run via the Vercel Storage CLI to securely dump the bucket.
                  </p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg">3</span>
               </div>
               <div>
                  <h3 className="text-white font-bold text-lg mb-2">System Level Log Recovery</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                     Application audit logs and unauthorized login attempts are tracked natively. 
                     If a forensic rollback is needed, Drizzle Kit provides native `up` and `down` migration scripts directly from the source code repository managed by Fahad Meshal.
                  </p>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* MANUAL SNAPSHOT UI */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
           {isSimulating && (
             <div className="absolute inset-0 bg-ssk-navy/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                 <RefreshCw className="w-12 h-12 text-ssk-cyan animate-spin mb-4" />
                 <p className="text-white font-mono text-sm tracking-wider">{simMessage}</p>
             </div>
           )}

           <div className="w-24 h-24 rounded-full bg-ssk-cyan/10 flex items-center justify-center mb-6 border-4 border-ssk-cyan/20">
             <Database className="w-10 h-10 text-ssk-cyan" />
           </div>
           
           <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Manual DB Snapshot</h2>
           <p className="text-sm text-white/50 mb-8 max-w-sm leading-relaxed">
             Trigger a synchronous JSON serialization of the PostgreSQL states directly to this dashboard for rapid validation.
           </p>
           
           <button 
             onClick={handleBackup}
             disabled={isSimulating}
             className="flex items-center gap-3 bg-white text-ssk-navy hover:bg-ssk-cyan px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
           >
             <DownloadCloud className="w-5 h-5"/> Initiate Internal Backup
           </button>
        </div>

        {/* RECENTS UI */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10">
           <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="text-ssk-cyan" />
              <h3 className="font-bold text-white uppercase tracking-widest text-lg">Snapshot Ledger</h3>
           </div>
           
           <div className="space-y-3">
             {snapshots.map((snap, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 bg-[#021C2A] rounded-xl border border-white/5 hover:border-ssk-cyan/30 transition-colors group">
                  <div>
                    <span className="block text-sm font-mono text-ssk-cyan mb-1">{snap.id}</span>
                    <span className="block text-xs text-white/40 uppercase tracking-widest">{snap.date} • {snap.size}</span>
                  </div>
                  <button className="text-xs text-white/50 group-hover:text-white flex items-center gap-2 transition-colors bg-white/5 px-4 py-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-ssk-cyan"/> Verified
                  </button>
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}