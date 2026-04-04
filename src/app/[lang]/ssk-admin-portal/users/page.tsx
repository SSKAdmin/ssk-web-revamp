"use client";
import { useEffect, useState } from "react";
import { Users, Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { getUsers, addUser, deleteUser } from "@/lib/admin-actions";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", mail: "", role: "Viewer" });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  }

  async function handleAdd(e: any) {
    e.preventDefault();
    setActionLoading(true);
    await addUser(formData);
    setModalOpen(false);
    setFormData({ name: "", mail: "", role: "Viewer" });
    await loadUsers();
    setActionLoading(false);
  }

  async function handleDelete(id: string) {
    if(confirm("Are you sure you want to revoke this identity?")) {
      await deleteUser(id);
      await loadUsers();
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-slate-400">Manage organizational identities and system access.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#1d9cf0] hover:bg-[#1985cc] text-black px-4 py-2 rounded-lg font-semibold transition-all"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </header>
      
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[#1d9cf0] animate-spin" /></div>
      ) : (
        <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 p-4 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5">
            <span className="col-span-2">User Identity</span>
            <span>Role</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          {users.map((u, i) => (
            <div key={i} className="grid grid-cols-5 p-4 border-b border-white/5 last:border-0 items-center hover:bg-white/5 transition-colors">
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center font-bold text-[#1d9cf0]">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-200">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.mail}</p>
                </div>
              </div>
              <span className="text-sm text-slate-300">{u.role}</span>
              <div>
                <span className={u.active ? "text-xs px-2 py-1 rounded-full border bg-green-500/10 text-green-500 border-green-500/20" : "text-xs px-2 py-1 rounded-full border bg-slate-500/10 text-slate-500 border-slate-500/20"}>
                  {u.active ? 'Active' : 'Suspended'}
                </span>
              </div>
              <div className="flex justify-end gap-3 text-slate-400">
                <button className="hover:text-white transition-colors" title="Edit Properties"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(u.id)} className="hover:text-red-500 transition-colors" title="Revoke Access"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           <form onSubmit={handleAdd} className="bg-[#0e1522] border border-white/10 p-8 rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95">
             <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
               <h2 className="text-xl font-bold text-white">Provision New Identity</h2>
               <button type="button" onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5"/></button>
             </div>
             <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#1d9cf0] transition-colors" placeholder="e.g. Tariq Al-Faisal" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Corporate Email</label>
                  <input required type="email" value={formData.mail} onChange={e=>setFormData({...formData, mail: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#1d9cf0] transition-colors" placeholder="t.alfaisal@ssk.sa" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Clearance Role</label>
                  <select value={formData.role} onChange={e=>setFormData({...formData, role: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#1d9cf0]">
                    <option>Viewer</option>
                    <option>Manager</option>
                    <option>Director</option>
                    <option>Super Admin</option>
                  </select>
                </div>
             </div>
             <div className="flex justify-end gap-3">
               <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2 rounded-lg text-sm text-slate-300 bg-white/5 hover:bg-white/10 font-bold transition-colors">Cancel</button>
               <button type="submit" disabled={actionLoading} className="px-5 py-2 rounded-lg text-sm text-black bg-[#1d9cf0] hover:bg-[#1985cc] font-bold flex items-center gap-2">
                 {actionLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : null} 
                 Provision Identity
               </button>
             </div>
           </form>
        </div>
      )}
    </div>
  );
}