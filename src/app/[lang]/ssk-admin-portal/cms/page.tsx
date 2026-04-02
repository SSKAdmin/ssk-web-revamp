"use client";
import { useEffect, useState } from "react";
import { LayoutTemplate, Edit3, Save, X, Loader2 } from "lucide-react";
import { getCms, updateCms } from "@/lib/admin-actions";

export default function PlatformContentPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);

  useEffect(() => { load() }, []);

  async function load() {
    setLoading(true);
    setItems(await getCms());
    setLoading(false);
  }

  async function handleSave(e: any) {
    e.preventDefault();
    if(activeItem) {
      await updateCms(activeItem.id, activeItem.valueEn, activeItem.valueAr);
      setEditorOpen(false);
      await load();
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Platform Content (CMS)</h1>
        <p className="text-slate-400">Direct abstraction layer for public-facing route copies.</p>
      </header>

      {loading ? <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#1d9cf0]"/></div> : (
        <div className="bg-white/5 border border-white/5 rounded-xl">
           <div className="grid grid-cols-4 p-4 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-black/50">
              <span className="col-span-2">Page Structure Key</span>
              <span>English Value Preview</span>
              <span className="text-right">Action</span>
           </div>
           {items.map((item) => (
             <div key={item.id} className="grid grid-cols-4 p-4 items-center border-b border-white/5 last:border-0 hover:bg-black/20 transition-colors">
                <span className="col-span-2 text-sm font-semibold text-white">{item.page}</span>
                <span className="text-sm text-slate-400 truncate pr-4">{item.valueEn}</span>
                <div className="text-right">
                   <button onClick={() => { setActiveItem({...item}); setEditorOpen(true); }} className="p-2 border border-white/10 rounded bg-white/5 hover:bg-white/10 hover:text-[#1d9cf0] text-slate-400 transition-colors"><Edit3 className="w-4 h-4"/></button>
                </div>
             </div>
           ))}
        </div>
      )}

      {editorOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form onSubmit={handleSave} className="bg-[#0e1522] border border-white/10 p-8 rounded-xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in-95">
             <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <h2 className="text-xl font-bold text-white">Content Payload Editor</h2>
                <button type="button" onClick={() => setEditorOpen(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5"/></button>
             </div>
             <p className="text-sm text-[#1d9cf0] font-mono mb-6">{activeItem.page}</p>
             <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">English Value</label>
                   <textarea rows={4} value={activeItem.valueEn} onChange={e=>setActiveItem({...activeItem, valueEn: e.target.value})} className="w-full bg-black border border-white/10 rounded p-4 text-sm text-white focus:border-[#1d9cf0]" />
                </div>
                <div dir="rtl">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Arabic Value</label>
                   <textarea rows={4} value={activeItem.valueAr} onChange={e=>setActiveItem({...activeItem, valueAr: e.target.value})} className="w-full bg-black border border-white/10 rounded p-4 text-sm text-white focus:border-[#1d9cf0] font-arabic" />
                </div>
             </div>
             <div className="flex justify-end gap-3 border-t border-white/5 pt-6">
                <button type="button" onClick={() => setEditorOpen(false)} className="px-6 py-2 text-slate-400 bg-white/5 hover:bg-white/10 rounded font-bold transition-colors text-sm">Discard</button>
                <button type="submit" className="px-6 py-2 bg-[#1d9cf0] text-black hover:bg-[#1985cc] rounded font-bold transition-colors text-sm flex gap-2 items-center"><Save className="w-4 h-4"/> Publish Live</button>
             </div>
          </form>
        </div>
      )}
    </div>
  );
}