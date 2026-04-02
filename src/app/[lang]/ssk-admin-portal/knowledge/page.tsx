"use client";
import { useEffect, useState } from "react";
import { Folder, FileText, ChevronRight, Loader2, GitMerge } from "lucide-react";
import { getKnowledge } from "@/lib/admin-actions";

export default function KnowledgeHubPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDoc, setActiveDoc] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getKnowledge();
      setDocs(data);
      if(data.length > 0) setActiveDoc(data[0]);
      setLoading(false);
    }
    load();
  }, []);

  const folders = Array.from(new Set(docs.map(d => d.folder)));

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1">Knowledge Hub (SDLC Internal)</h1>
        <p className="text-slate-400 text-sm">Institutional repository of methodologies and platform specifications.</p>
      </header>

      {loading ? <div className="flex flex-1 justify-center items-center"><Loader2 className="w-8 h-8 text-[#1d9cf0] animate-spin"/></div> : (
        <div className="flex-1 bg-[#050a14] border border-white/5 rounded-xl flex overflow-hidden min-h-[600px]">
          {/* Left Master Tree */}
          <div className="w-80 border-r border-white/5 overflow-y-auto bg-black/40">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <GitMerge className="w-3 h-3"/> Active Workspace
              </h3>
            </div>
            
            {folders.map(folder => (
               <div key={String(folder)}>
                 <div className="flex items-center gap-2 p-3 bg-white/5 border-b border-white/5 text-slate-300 font-semibold text-sm">
                   <Folder className="w-4 h-4 text-[#1d9cf0]"/> {String(folder)}
                 </div>
                 <div className="space-y-1 py-2">
                   {docs.filter(d => d.folder === folder).map(doc => (
                     <div 
                       key={doc.id} 
                       onClick={() => setActiveDoc(doc)}
                       className={`flex items-center gap-3 px-6 py-2 cursor-pointer text-sm transition-colors ${activeDoc?.id === doc.id ? 'text-[#1d9cf0] bg-[#1d9cf0]/10 border-r-2 border-[#1d9cf0]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                     >
                       <FileText className="w-3 h-3"/> {doc.title}
                     </div>
                   ))}
                 </div>
               </div>
            ))}
          </div>

          {/* Right Detail Pane */}
          {activeDoc ? (
            <div className="flex-1 flex flex-col bg-gradient-to-br from-[#050a14] to-black overflow-y-auto">
               <div className="p-8 border-b border-white/5">
                  <div className="flex items-center gap-3 text-xs text-[#1d9cf0] font-mono mb-4">
                     <span>{activeDoc.folder}</span> <ChevronRight className="w-3 h-3"/> <span>{activeDoc.title}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">{activeDoc.title}</h2>
                  <div className="flex items-center gap-6 text-sm text-slate-400 border border-white/5 bg-black/50 p-4 rounded-lg">
                    <div><span className="text-slate-500">Author:</span> <span className="text-slate-300 font-semibold">{activeDoc.author}</span></div>
                    <div><span className="text-slate-500">Function:</span> <span className="text-slate-300 font-semibold">{activeDoc.team}</span></div>
                    <div><span className="text-slate-500">Date:</span> {activeDoc.date}</div>
                  </div>
               </div>
               <div className="p-8 text-slate-300 text-sm leading-8 whitespace-pre-wrap font-sans max-w-4xl">
                  {/* Basic Markdown rendering simulation for visual appeal */}
                  {activeDoc.content.split('\n').map((line: string, i: number) => {
                     if(line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('# ', '')}</h1>;
                     if(line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-[#1d9cf0] mt-6 mb-3">{line.replace('## ', '')}</h2>;
                     if(line.startsWith('- ')) return <li key={i} className="ml-4 mb-2 marker:text-[#1d9cf0] list-disc">{line.replace('- ', '')}</li>;
                     if(line.match(/^\d+\.\s/)) return <li key={i} className="ml-4 mb-2 list-decimal font-semibold text-slate-200">{line.replace(/^\d+\.\s/, '')}</li>;
                     if(line.trim() === '') return <br key={i}/>;
                     
                     // Handle inline code formatting via regex replacement to JSX spans
                     let formattedLine = line;
                     const parts = formattedLine.split(/`(.*?)`/g);
                     return <p key={i} className="mb-4 text-slate-300">
                        {parts.map((part, index) => index % 2 === 1 ? <span key={index} className="bg-white/10 text-[#1d9cf0] px-1.5 py-0.5 rounded font-mono text-xs border border-white/10">{part}</span> : part)}
                     </p>;
                  })}
               </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              Select a document to begin.
            </div>
          )}
        </div>
      )}
    </div>
  );
}