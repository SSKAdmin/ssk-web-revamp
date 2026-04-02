"use client";

import { useState } from "react";
import { updateSystemSetting, deleteSystemSetting } from "@/lib/actions/settings";
import { Save, AlertCircle, Key, Cpu, Mail, Plus, Trash2 } from "lucide-react";

export function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  // Pre-fill essential defaults if they don't exist in DB yet
  const defaultKeys = ["OPENAI_API_KEY", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
  
  const [settings, setSettings] = useState<Record<string, string>>(() => {
    const s = { ...initialSettings };
    defaultKeys.forEach(k => { if (!(k in s)) s[k] = ""; });
    return s;
  });

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });

  const handleUpdate = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: "" });

    try {
      let hasError = false;
      // Save all keys that have values, or are default keys
      for (const [key, value] of Object.entries(settings)) {
        if (value.trim() !== "" || defaultKeys.includes(key)) {
           const res = await updateSystemSetting(key, value);
           if (!res.success) hasError = true;
        }
      }
      
      if (!hasError) {
        setStatus({ type: "success", msg: "All configurations synchronized." });
      } else {
        setStatus({ type: "error", msg: "Some configurations failed to update." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    if (!newKey.trim()) return;
    setSettings(prev => ({ ...prev, [newKey.toUpperCase()]: newValue }));
    setNewKey("");
    setNewValue("");
  };

  const handleDelete = async (key: string) => {
    if (defaultKeys.includes(key)) return; // Cannot delete core keys visually
    
    setLoading(true);
    try {
      await deleteSystemSetting(key);
      setSettings(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setStatus({ type: "success", msg: `Deleted hook ${key}` });
    } catch {
      setStatus({ type: "error", msg: "Failed to delete from DB" });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-8">
      {status.type && (
        <div className={`p-4 border font-black uppercase tracking-widest text-[10px] flex items-center gap-3 ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-[#1CC8C8]/10 border-[#1CC8C8]/20 text-[#1CC8C8]'}`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{status.msg}</p>
        </div>
      )}

      {/* CORE: AI INTEGRATION */}
      <div className="bg-white/5 border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Cpu className="w-5 h-5 text-[#1CC8C8]" />
          <div>
            <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Neural Engine Configs</h2>
            <p className="text-[9px] uppercase tracking-widest text-white/50 mt-1">Manage LLM APIs and Generation Context</p>
          </div>
        </div>
        <div className="p-6">
           <label className="block text-[10px] font-black uppercase tracking-widest text-white/60 mb-3">
             OPENAI_API_KEY
           </label>
           <input
             type="password"
             value={settings["OPENAI_API_KEY"] || ""}
             onChange={(e) => handleUpdate("OPENAI_API_KEY", e.target.value)}
             placeholder="sk-proj-..."
             className="w-full bg-black/20 border border-white/10 rounded-none px-4 py-3 text-white text-xs font-mono focus:border-[#1CC8C8] focus:ring-1 focus:ring-[#1CC8C8] outline-none transition-all"
           />
        </div>
      </div>

      {/* CORE: SMTP MAIL RELAY */}
      <div className="bg-white/5 border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Mail className="w-5 h-5 text-[#1CC8C8]" />
          <div>
            <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">SMTP Transport Relay</h2>
            <p className="text-[9px] uppercase tracking-widest text-white/50 mt-1">Configure automated mailing channels</p>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="block text-[10px] font-black uppercase tracking-widest text-white/60 mb-3">SMTP_HOST</label>
             <input type="text" value={settings["SMTP_HOST"] || ""} onChange={(e) => handleUpdate("SMTP_HOST", e.target.value)} placeholder="smtp.office365.com" className="w-full bg-black/20 border border-white/10 rounded-none px-4 py-3 text-white text-xs font-mono focus:border-[#1CC8C8] outline-none" />
           </div>
           <div>
             <label className="block text-[10px] font-black uppercase tracking-widest text-white/60 mb-3">SMTP_PORT</label>
             <input type="text" value={settings["SMTP_PORT"] || ""} onChange={(e) => handleUpdate("SMTP_PORT", e.target.value)} placeholder="587" className="w-full bg-black/20 border border-white/10 rounded-none px-4 py-3 text-white text-xs font-mono focus:border-[#1CC8C8] outline-none" />
           </div>
           <div>
             <label className="block text-[10px] font-black uppercase tracking-widest text-white/60 mb-3">SMTP_USER</label>
             <input type="text" value={settings["SMTP_USER"] || ""} onChange={(e) => handleUpdate("SMTP_USER", e.target.value)} placeholder="no-reply@ssk.local" className="w-full bg-black/20 border border-white/10 rounded-none px-4 py-3 text-white text-xs font-mono focus:border-[#1CC8C8] outline-none" />
           </div>
           <div>
             <label className="block text-[10px] font-black uppercase tracking-widest text-white/60 mb-3">SMTP_PASS</label>
             <input type="password" value={settings["SMTP_PASS"] || ""} onChange={(e) => handleUpdate("SMTP_PASS", e.target.value)} placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-none px-4 py-3 text-white text-xs font-mono focus:border-[#1CC8C8] outline-none" />
           </div>
        </div>
      </div>

      {/* DYNAMIC: THIRD PARTY KEYS */}
      <div className="bg-white/5 border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Key className="w-5 h-5 text-[#1CC8C8]" />
          <div>
            <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Dynamic Webhooks & API Keys</h2>
            <p className="text-[9px] uppercase tracking-widest text-white/50 mt-1">Extend platform integration (0-Coding deployment)</p>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
           {Object.keys(settings).filter(k => !defaultKeys.includes(k)).map(key => (
              <div key={key} className="flex items-center gap-4">
                 <div className="w-1/3">
                   <input type="text" value={key} readOnly className="w-full bg-black/40 border border-white/5 px-4 py-3 text-white/50 text-[10px] font-black uppercase tracking-widest cursor-not-allowed" />
                 </div>
                 <div className="flex-1 relative">
                   <input 
                     type={key.includes("KEY") || key.includes("SECRET") || key.includes("PASS") ? "password" : "text"} 
                     value={settings[key]} 
                     onChange={(e) => handleUpdate(key, e.target.value)} 
                     className="w-full bg-black/20 border border-white/10 px-4 py-3 text-white text-xs font-mono focus:border-[#1CC8C8] outline-none" 
                   />
                 </div>
                 <button type="button" onClick={() => handleDelete(key)} className="p-3 text-white/30 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/20 bg-black/20">
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
           ))}

           {/* ADD NEW INLINE */}
           <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-4">
              <div className="w-1/3">
                 <input type="text" value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="NEW_HOOK_ID" className="w-full bg-black/20 border border-[#1CC8C8]/30 px-4 py-3 text-[#1CC8C8] text-[10px] font-black uppercase tracking-widest focus:border-[#1CC8C8] outline-none" />
              </div>
              <div className="flex-1">
                 <input type="text" value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Integration Endpoint or Value..." className="w-full bg-black/20 border border-white/10 px-4 py-3 text-white text-xs font-mono outline-none" />
              </div>
              <button type="button" onClick={handleAddNew} className="p-3 text-[#1CC8C8] hover:bg-[#1CC8C8] hover:text-black transition-colors border border-[#1CC8C8]/30">
                 <Plus className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1CC8C8] text-black px-8 py-4 text-[10px] uppercase font-black tracking-[0.3em] hover:bg-white transition-colors flex items-center gap-3 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? "Synchronizing..." : "Initialize Configurations"}
        </button>
      </div>
    </form>
  );
}
