"use client";
import { useEffect, useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { getInbox, archiveMessage } from "@/lib/admin-actions";

export default function ContactInboxPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => { load() }, []);
  
  async function load() {
    setLoading(true);
    const data = await getInbox();
    setMessages(data);
    if(data.length > 0 && !activeId) setActiveId(data[0].id);
    setLoading(false);
  }

  async function handleArchive(id: string) {
    if(confirm("Mark inquiry as completely resolved?")) {
      await archiveMessage(id);
      await load();
    }
  }

  const activeMsg = messages.find(m => m.id === activeId);
  const unreadCount = messages.filter(m => m.unread && !m.archived).length;
  const displayMsgs = messages.filter(m => !m.archived);

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold text-white">Institutional Inquiries</h1>
        <div className="flex gap-2 text-xs">
          <span className="bg-[#1d9cf0]/20 text-[#1d9cf0] px-3 py-1 rounded-full border border-[#1d9cf0]/30">{unreadCount} Action Required</span>
        </div>
      </header>

      {loading ? <div className="flex justify-center flex-1 items-center"><Loader2 className="w-8 h-8 text-[#1d9cf0] animate-spin"/></div> : (
        <div className="flex-1 bg-[#050a14] border border-white/5 rounded-xl flex overflow-hidden min-h-[600px]">
          {/* Master List */}
          <div className="w-1/3 border-r border-white/5 overflow-y-auto">
            {displayMsgs.length === 0 ? <div className="p-8 text-center text-sm text-slate-500">Inbox Zero. No active pending inquiries.</div> : null}
            {displayMsgs.map((msg: any) => (
               <div key={msg.id} onClick={() => setActiveId(msg.id)} className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${activeId === msg.id ? 'bg-[#1d9cf0]/10 border-l-2 border-l-[#1d9cf0]' : msg.unread ? 'bg-white/5 hover:bg-white/10' : 'hover:bg-white/5'}`}>
                 <div className="flex justify-between items-start mb-1">
                   <h4 className={`text-sm ${msg.unread ? 'font-bold text-white' : 'text-slate-300'}`}>{msg.from}</h4>
                   <span className="text-[10px] text-slate-500">{msg.time}</span>
                 </div>
                 <p className="text-xs text-[#1d9cf0] mb-1">{msg.comp}</p>
                 <p className="text-xs text-slate-400 truncate">{msg.sub}</p>
               </div>
            ))}
          </div>
          {/* Detail Pane */}
          {activeMsg ? (
            <div className="w-2/3 p-8 flex flex-col bg-gradient-to-br from-[#050a14] to-black">
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/5">
                 <div>
                   <h2 className="text-2xl font-bold text-white mb-2">{activeMsg.sub}</h2>
                   <p className="text-sm text-slate-400">From: <span className="text-[#1d9cf0] font-semibold">{activeMsg.from}</span> <span className="text-slate-600">({activeMsg.comp})</span></p>
                 </div>
                 <button onClick={() => handleArchive(activeMsg.id)} className="text-slate-500 hover:text-green-500 transition-colors flex flex-col items-center gap-1 group">
                    <CheckCircle className="w-6 h-6"/>
                    <span className="text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Resolve</span>
                 </button>
              </div>
              <div className="flex-1 text-slate-300 text-sm leading-relaxed space-y-4">
                 <p>{activeMsg.body}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                 <a href={`mailto:reply@example.com?subject=Re:${activeMsg.sub}`} className="inline-block bg-white/5 hover:bg-[#1d9cf0] hover:text-black hover:border-[#1d9cf0] border border-white/10 px-6 py-2 rounded text-sm text-slate-300 font-medium transition-colors">Forward to Engagement Lead</a>
              </div>
            </div>
          ) : (
            <div className="w-2/3 flex items-center justify-center text-slate-500"><Mail className="w-12 h-12 opacity-20" /></div>
          )}
        </div>
      )}
    </div>
  );
}