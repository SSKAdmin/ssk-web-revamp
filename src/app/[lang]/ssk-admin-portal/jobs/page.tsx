"use client";

import { useState, useEffect } from "react";
import { getJobs, addJob, toggleJob, deleteJob } from "@/lib/admin-actions";
import { Briefcase, Plus, Power, Trash, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ titleEn: "", titleAr: "", department: "", location: "Riyadh, KSA", type: "Full-time", descriptionEn: "", descriptionAr: "" });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
    setLoading(false);
  };

  const handleCreate = async () => {
    if(!formData.titleEn || !formData.titleAr) return;
    await addJob(formData);
    setShowModal(false);
    setFormData({ titleEn: "", titleAr: "", department: "", location: "Riyadh, KSA", type: "Full-time", descriptionEn: "", descriptionAr: "" });
    loadJobs();
  };

  if (loading) return <div className="p-8 text-slate-400">Loading Job Matrix...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#1d9cf0]" /> Recruitment Control Header
          </h1>
          <p className="text-slate-400">Publish and manage strategic talent acquisition roles globally.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#1d9cf0] hover:bg-[#1d9cf0]/80 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all shadow-[0_0_15px_rgba(29,156,240,0.3)]">
          <Plus className="w-4 h-4" /> Publish New Vacancy
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {jobs.map((job) => (
           <div key={job.id} className={cn(
             "bg-white/5 border border-white/5 rounded-xl p-6 relative overflow-hidden group transition-all",
             !job.active && "opacity-60"
           )}>
             <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="text-xl font-bold text-white mb-1">{job.titleEn} | {job.titleAr}</h3>
                  <p className="text-xs text-[#1d9cf0] font-mono tracking-wider">{job.id} • {job.department}</p>
               </div>
               <div className="flex gap-2">
                 <button onClick={async () => { await toggleJob(job.id); loadJobs(); }} className={cn("p-2 rounded-lg border", job.active ? "bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20" : "bg-white/5 border-white/10 text-slate-400 hover:text-white")}>
                    <Power className="w-4 h-4" />
                 </button>
                 <button onClick={async () => { await deleteJob(job.id); loadJobs(); }} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all">
                    <Trash className="w-4 h-4" />
                 </button>
               </div>
             </div>
             <div className="space-y-4">
                <div className="flex gap-4 text-sm text-slate-400">
                   <span className="bg-white/5 px-2 py-1 rounded">{job.type}</span>
                   <span className="bg-white/5 px-2 py-1 rounded">{job.location}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-white/10 pl-4">
                   {job.descriptionEn.substring(0, 100)}...
                </p>
             </div>
           </div>
        ))}
        {jobs.length === 0 && (
          <div className="col-span-full py-20 text-center border border-white/5 rounded-xl border-dashed">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No organizational vacancies published. Ready to expand.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-[#050a14] border border-white/10 p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Publish Strategic Vacancy</h2>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-slate-500 uppercase tracking-widest text-xs">Role Title (EN)</label>
                  <input type="text" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="w-full bg-[#0E1522] border border-white/5 rounded-lg p-2.5 text-white focus:border-[#1d9cf0] outline-none" placeholder="e.g. Senior Cloud Architect" />
                </div>
                <div>
                   <label className="block mb-1 text-slate-500 uppercase tracking-widest text-xs">Role Title (AR)</label>
                   <input type="text" value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="w-full bg-[#0E1522] border border-white/5 rounded-lg p-2.5 text-white focus:border-[#1d9cf0] outline-none text-right" placeholder="كبير مهندسي السحابة" dir="rtl" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div>
                   <label className="block mb-1 text-slate-500 uppercase tracking-widest text-xs">Department</label>
                   <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-[#0E1522] border border-white/5 rounded-lg p-2.5 text-white focus:border-[#1d9cf0] outline-none" />
                 </div>
                 <div>
                   <label className="block mb-1 text-slate-500 uppercase tracking-widest text-xs">Type</label>
                   <input type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-[#0E1522] border border-white/5 rounded-lg p-2.5 text-white focus:border-[#1d9cf0] outline-none" />
                 </div>
                 <div>
                   <label className="block mb-1 text-slate-500 uppercase tracking-widest text-xs">Location</label>
                   <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-[#0E1522] border border-white/5 rounded-lg p-2.5 text-white focus:border-[#1d9cf0] outline-none" />
                 </div>
              </div>
              <div>
                 <label className="block mb-1 text-slate-500 uppercase tracking-widest text-xs">Executive Summary (EN)</label>
                 <textarea value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full bg-[#0E1522] border border-white/5 rounded-lg p-2.5 text-white focus:border-[#1d9cf0] outline-none h-24" />
              </div>
              <div>
                 <label className="block mb-1 text-slate-500 uppercase tracking-widest text-xs">Executive Summary (AR)</label>
                 <textarea value={formData.descriptionAr} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="w-full bg-[#0E1522] border border-white/5 rounded-lg p-2.5 text-white focus:border-[#1d9cf0] outline-none h-24 text-right" dir="rtl" />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all">Cancel</button>
              <button onClick={handleCreate} className="bg-[#1d9cf0] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#1d9cf0]/80 transition-all">Publish Capability</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
