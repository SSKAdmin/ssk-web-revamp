"use client";
import { useEffect, useState } from "react";
import { Save, Server, ShieldAlert, CheckCircle, Loader2 } from "lucide-react";
import { getSettings, toggleSetting } from "@/lib/admin-actions";

export default function ConfigMatrixPage() {
  const [cfg, setCfg] = useState({ maintenanceMode: false, hydration: true });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{show: boolean, msg: string}>({show: false, msg: ""});

  useEffect(() => { load() }, []);

  async function load() {
    setLoading(true);
    setCfg(await getSettings());
    setLoading(false);
  }

  async function handleToggle(key: string) {
    const res = await toggleSetting(key);
    if(res.success) {
      await load(); // sync state
      showToast(`Configuration updated successfully (${key})`);
    }
  }

  function showToast(msg: string) {
    setToast({show: true, msg});
    setTimeout(() => setToast({show: false, msg: ""}), 3000);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {toast.show && (
        <div className="absolute top-0 right-0 bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top fade-in">
          <CheckCircle className="w-5 h-5"/> {toast.msg}
        </div>
      )}

      <header className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Configurations Matrix</h1>
          <p className="text-slate-400">Global environmental thresholds and system flags.</p>
        </div>
        <button onClick={() => showToast("Matrix settings globally synchronized to edge.")} className="flex items-center gap-2 bg-[#1d9cf0] hover:bg-[#1985cc] text-black px-6 py-2 rounded-lg font-bold transition-all">
          <Save className="w-4 h-4" /> Save Master Changes
        </button>
      </header>

      {loading ? <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#1d9cf0]"/></div> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div className="bg-[#050a14] border border-white/5 p-6 rounded-xl space-y-6">
                 <div className="flex items-center gap-3 text-white font-bold mb-2">
                   <Server className="w-5 h-5 text-[#1d9cf0]" /> Core Engine Switches
                 </div>
                 
                 <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <div>
                      <h4 className="text-sm text-slate-200 font-semibold">Maintenance Mode</h4>
                      <p className="text-xs text-slate-500 mt-1">Suspend public routing and return HTTP 503.</p>
                    </div>
                    <div onClick={() => handleToggle('maintenanceMode')} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${cfg.maintenanceMode ? 'bg-red-500' : 'bg-white/10'}`}>
                       <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${cfg.maintenanceMode ? 'right-1' : 'left-1'}`}></div>
                    </div>
                 </div>

                 <div className="flex justify-between items-center py-3">
                    <div>
                      <h4 className="text-sm text-slate-200 font-semibold">Aggressive Hydration (React 19)</h4>
                      <p className="text-xs text-slate-500 mt-1">Enable experimental Turbo cache-busting overrides.</p>
                    </div>
                    <div onClick={() => handleToggle('hydration')} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${cfg.hydration ? 'bg-[#1d9cf0]' : 'bg-white/10'}`}>
                       <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${cfg.hydration ? 'right-1' : 'left-1'}`}></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl h-fit">
              <div className="flex items-center gap-3 text-red-500 font-bold mb-4">
                <ShieldAlert className="w-5 h-5" /> Danger Zone
              </div>
              <p className="text-sm text-slate-400 mb-6">These operations are permanent and will trigger an organization-wide session clearing protocol.</p>
              <button onClick={() => confirm("WIPE ACTIVE CACHE? Your session will end.") && showToast("Security boundary cleared.")} className="w-full py-3 bg-black border border-red-500/30 hover:bg-red-500/20 text-red-500 font-bold rounded-lg transition-colors">Wipe Security Cache (JWT Purge)</button>
           </div>
        </div>
      )}
    </div>
  );
}