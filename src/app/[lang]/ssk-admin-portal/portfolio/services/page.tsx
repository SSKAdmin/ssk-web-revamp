"use client";
import { useEffect, useState } from "react";
import { Briefcase, Settings2, Power, Loader2, X, Save } from "lucide-react";
import { getServices, toggleService, updateServiceConfig } from "@/lib/admin-actions";

export default function ServicesPortfolioPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<any | null>(null);

  useEffect(() => { load() }, []);

  async function load() {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  }

  async function handleToggle(id: string) {
    await toggleService(id);
    await load();
  }

  async function handleSaveConfig(e: any) {
    e.preventDefault();
    if(activeService) {
      await updateServiceConfig(activeService.id, activeService.desc);
      setModalOpen(false);
      await load();
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Service Portfolio</h1>
        <p className="text-slate-400">Command module for the core consultancy architectures.</p>
      </header>

      {loading ? <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[#1d9cf0] animate-spin"/></div> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((svc: any) => (
            <div key={svc.id} className="bg-[#050a14] border border-white/5 rounded-xl p-6 flex flex-col justify-between group transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#1d9cf0]/10 border border-[#1d9cf0]/20 flex items-center justify-center text-[#1d9cf0]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {svc.active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${svc.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest ${svc.active ? 'text-green-500' : 'text-red-500'}`}>
                    {svc.active ? 'Live' : 'Suspended'}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{svc.name}</h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2 min-h-[40px]">{svc.desc}</p>
                <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4">
                  <button onClick={() => { setActiveService(svc); setModalOpen(true); }} className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded text-slate-300 flex items-center gap-2 transition-colors">
                    <Settings2 className="w-3 h-3" /> Config Layer
                  </button>
                  <button onClick={() => handleToggle(svc.id)} className={`text-xs px-3 py-1.5 rounded flex items-center gap-2 transition-colors ${svc.active ? 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'}`}>
                    <Power className="w-3 h-3" /> {svc.active ? 'Suspend Gateway' : 'Restore Operations'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-out Drawer simulation using Modal */}
      {modalOpen && activeService && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
           <div className="w-[400px] h-full bg-[#0E1522] border-l border-white/10 p-8 animate-in slide-in-from-right duration-300 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                 <h2 className="text-xl font-bold text-white tracking-tight">Configuration Matrix</h2>
                 <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5"/></button>
              </div>
              <h3 className="text-[#1d9cf0] font-bold mb-6">{activeService.name}</h3>
              <form onSubmit={handleSaveConfig} className="flex-1 flex flex-col justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Service Description Payload</label>
                  <textarea 
                    value={activeService.desc} 
                    onChange={e => setActiveService({...activeService, desc: e.target.value})}
                    className="w-full bg-[#050a14] border border-white/10 rounded-lg p-4 text-sm text-slate-300 focus:outline-none focus:border-[#1d9cf0] min-h-[200px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">Changes apply immediately to public facing schemas natively.</p>
                </div>
                <button type="submit" className="w-full bg-[#1d9cf0] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1985cc] transition-colors mt-8">
                  <Save className="w-4 h-4"/> Commit Changes
                </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}