import { Key, Lock, CheckCircle2 } from "lucide-react";

export default function CompliancePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Compliance & Security</h1>
        <p className="text-slate-400">Automated Data Residency & Policy verification matrix.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/5 rounded-xl p-6 relative overflow-hidden">
           <Lock className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
           <h3 className="font-bold text-white mb-6 relative z-10">Encryption Standards</h3>
           <ul className="space-y-4 relative z-10 text-sm">
             <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-400">At-Rest Cypher</span><span className="text-green-500 font-mono">AES-256-GCM</span></li>
             <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-400">In-Transit Limit</span><span className="text-green-500 font-mono">TLS 1.3 Strict</span></li>
             <li className="flex justify-between"><span className="text-slate-400">JWT Sign Algorithm</span><span className="text-green-500 font-mono">HS256</span></li>
           </ul>
        </div>
        
        <div className="bg-white/5 border border-white/5 rounded-xl p-6">
           <h3 className="font-bold text-white mb-6">ISO 27001 Controls</h3>
           <div className="space-y-3">
             {[
               "A.9 - Access Control Maintained",
               "A.10 - Cryptography Operational",
               "A.12 - Operations Security Hardened"
             ].map((ctrl, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded border border-white/5">
                   <CheckCircle2 className="w-4 h-4 text-[#1d9cf0] shrink-0" />
                   <span className="text-sm text-slate-300 font-semibold">{ctrl}</span>
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}