"use client";

import { useEffect, useState, useMemo } from "react";
import { ShieldCheck, Search, Filter, PlayCircle, Loader2, CheckCircle2, AlertTriangle, XCircle, Settings, X, Save, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type DocumentStatus = "exists" | "partial" | "missing";
type DocumentPriority = "high" | "medium" | "low";

interface Doc {
  id: string;
  category: string;
  name: string;
  purpose: string;
  status: DocumentStatus;
  path: string | null;
  owner: string | null;
  priority: DocumentPriority;
  requiredForGoLive: boolean;
  notes: string | null;
}

export function DocumentationClient({ lang }: { lang: string }) {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | "all">("all");
  const [goLiveOnly, setGoLiveOnly] = useState(false);
  
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Doc>>({});

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/documents");
      const json = await res.json();
      setDocuments(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async () => {
    if (!selectedDoc) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/documents/${selectedDoc.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        await fetchDocuments();
        setSelectedDoc({ ...selectedDoc, ...editForm } as Doc);
        setIsEditMode(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.category.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
      const matchesGoLive = goLiveOnly ? doc.requiredForGoLive : true;
      return matchesSearch && matchesStatus && matchesGoLive;
    });
  }, [documents, search, filterStatus, goLiveOnly]);

  const stats = useMemo(() => {
    return {
      total: documents.length,
      exists: documents.filter(d => d.status === "exists").length,
      partial: documents.filter(d => d.status === "partial").length,
      missing: documents.filter(d => d.status === "missing").length,
      critical: documents.filter(d => d.requiredForGoLive).length,
    };
  }, [documents]);

  const getStatusColor = (status: DocumentStatus) => {
    switch(status) {
      case "exists": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "partial": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "missing": return "text-red-400 bg-red-400/10 border-red-400/20";
      default: return "";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 p-2">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1CC8C8]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1CC8C8]">SSK Integrity Mechanism</span>
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-white flex items-center gap-3">
            Documentation Command Center
          </h1>
          <p className="text-white/60 text-sm max-w-xl">
            Full Lifecycle Governance & Readiness Matrix. Ensure all critical assets are accounted for prior to institutional go-live.
          </p>
        </div>
      </div>

      {/* Top Stats Bar */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Total Documents", value: stats.total, icon: FileText },
          { label: "Completed", value: stats.exists, icon: CheckCircle2, color: "text-green-400" },
          { label: "Partial", value: stats.partial, icon: AlertTriangle, color: "text-orange-400" },
          { label: "Missing", value: stats.missing, icon: XCircle, color: "text-red-400" },
          { label: "Go-Live Critical", value: stats.critical, icon: ShieldCheck, color: "text-[#1CC8C8]" }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110">
              <stat.icon className={cn("w-20 h-20", stat.color || "text-white")} />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">{stat.label}</p>
            <p className={cn("text-3xl font-black", stat.color || "text-white")}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 p-4">
        <div className="flex gap-4 w-full md:w-auto flex-1">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text"
              placeholder="Search by name or category..."
              className="w-full bg-black/20 border border-white/10 rounded-none pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#1CC8C8] transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-black/20 border border-white/10 text-white text-sm px-4 py-2 focus:outline-none focus:border-[#1CC8C8]"
          >
            <option value="all">All Statuses</option>
            <option value="exists">Exists</option>
            <option value="partial">Partial</option>
            <option value="missing">Missing</option>
          </select>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <label className="flex items-center space-x-2 text-sm text-white/80 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={goLiveOnly} 
              onChange={(e) => setGoLiveOnly(e.target.checked)}
              className="w-4 h-4 rounded-none bg-black/20 border-white/20 text-[#1CC8C8] focus:ring-0 focus:ring-offset-0 transition-all"
            />
            <span className="group-hover:text-white transition-colors">Go-Live Critical Only</span>
          </label>
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-black/40 border-b border-white/10 text-[10px] uppercase font-black tracking-widest text-white/50">
              <tr>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Document / Artifact</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Go-Live</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#1CC8C8] mx-auto" />
                  </td>
                </tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-white/40">
                    No documents align with the current parameters.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs bg-white/10 px-2 py-1 uppercase">{doc.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white mb-1 group-hover:text-[#1CC8C8] transition-colors cursor-pointer" onClick={() => setSelectedDoc(doc)}>
                        {doc.name}
                      </div>
                      <div className="text-[10px] uppercase text-white/40">{doc.purpose}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn("text-[10px] px-3 py-1 font-black uppercase tracking-widest border", getStatusColor(doc.status))}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {doc.requiredForGoLive ? (
                        <ShieldCheck className="w-4 h-4 text-orange-400 mx-auto" />
                      ) : (
                        <span className="text-white/20">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-white/60">
                      {doc.owner || "Unassigned"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedDoc(doc)}
                        className="text-[10px] uppercase font-bold tracking-widest text-[#1CC8C8] hover:text-white transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Inspector */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#021C2A] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-[#021C2A] p-6 border-b border-white/5 flex justify-between items-start z-10">
              <div>
                <div className="flex gap-2 items-center mb-2">
                  <span className="text-[10px] uppercase font-black bg-white/10 px-2.5 py-1 text-white/60 tracking-widest">
                    {selectedDoc.category}
                  </span>
                  <span className={cn("text-[10px] px-2.5 py-1 font-black uppercase tracking-widest border", getStatusColor(selectedDoc.status))}>
                    {selectedDoc.status}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{selectedDoc.name}</h2>
              </div>
              <button 
                onClick={() => { setSelectedDoc(null); setIsEditMode(false); }}
                className="text-white/40 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#1CC8C8]">Strategic Purpose</p>
                <p className="text-sm text-white/80 leading-relaxed border-l-2 border-white/10 pl-4">{selectedDoc.purpose}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 bg-white/5 p-4 border border-white/5">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1">Owner / Custodian</p>
                  {isEditMode ? (
                    <input 
                      type="text"
                      className="w-full bg-black/40 border border-white/10 text-white text-xs p-2 focus:border-[#1CC8C8] outline-none"
                      value={editForm.owner || selectedDoc.owner || ""}
                      onChange={(e) => setEditForm({...editForm, owner: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-white font-mono">{selectedDoc.owner || "Unassigned"}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1">Current State</p>
                  {isEditMode ? (
                    <select 
                      className="w-full bg-black/40 border border-white/10 text-white text-xs p-2 focus:border-[#1CC8C8] outline-none appearance-none"
                      value={editForm.status || selectedDoc.status}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value as any})}
                    >
                      <option value="exists">Exists</option>
                      <option value="partial">Partial</option>
                      <option value="missing">Missing</option>
                    </select>
                  ) : (
                    <p className="text-sm text-white">{selectedDoc.status.toUpperCase()}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1">System Path / Identifier</p>
                  {isEditMode ? (
                     <input 
                     type="text"
                     className="w-full bg-black/40 border border-white/10 text-white text-xs p-2 focus:border-[#1CC8C8] outline-none"
                     value={editForm.path || selectedDoc.path || ""}
                     onChange={(e) => setEditForm({...editForm, path: e.target.value})}
                   />
                  ) : (
                    <p className="text-sm text-white font-mono break-all">{selectedDoc.path || "N/A"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#1CC8C8]">Administrative Notes</p>
                {isEditMode ? (
                   <textarea 
                   className="w-full bg-black/40 border border-white/10 text-white text-sm p-3 focus:border-[#1CC8C8] outline-none min-h-[100px]"
                   value={editForm.notes || selectedDoc.notes || ""}
                   onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                   placeholder="Add execution notes or blockages..."
                 />
                ) : (
                  <div className="text-sm text-white/80 bg-white/5 p-4 border border-white/5 whitespace-pre-wrap">
                    {selectedDoc.notes || <span className="opacity-40 italic">No notes logged.</span>}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#021C2A] p-6 border-t border-white/5 flex justify-end gap-4 z-10">
              {isEditMode ? (
                <>
                  <button 
                    onClick={() => { setIsEditMode(false); setEditForm({}); }}
                    className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={updateDocument}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-[#1CC8C8] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Update
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    setIsEditMode(true);
                    setEditForm({
                      status: selectedDoc.status,
                      notes: selectedDoc.notes,
                      path: selectedDoc.path,
                      owner: selectedDoc.owner,
                    });
                  }}
                  className="px-6 py-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  Edit Configuration
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
