"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Activity, Users, Database, Smartphone, Monitor, ShieldAlert, MapPin, Search, LineChart, Briefcase, FileSignature, ArrowUpRight } from "lucide-react";

function formatDistanceToNowNative(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatNative(dateString: string) {
  return new Intl.DateTimeFormat('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(dateString));
}

// Minimalistic SVG Activity Line Chart Component
function TrendGraph({ trends }: { trends: any[] }) {
  if (!trends || trends.length === 0) return null;
  const maxEng = Math.max(...trends.map(t => t.engagements || 0), 1);
  const maxTrf = Math.max(...trends.map(t => t.traffic || 0), 1);
  
  return (
    <div className="relative w-full h-48 flex items-end justify-between p-4 bg-white/5 border border-white/5 rounded-xl pt-10 mt-6">
      <div className="absolute top-4 left-4 flex gap-4">
        <div className="flex items-center gap-2 text-xs text-white font-medium">
           <div className="w-3 h-3 bg-[#1d9cf0] rounded-sm"></div> Business Action
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
           <div className="w-3 h-3 bg-slate-700 rounded-sm"></div> Global Traffic
        </div>
      </div>
      
      {trends.map((day, idx) => {
        // Calculate heights relative to their own maximums
        // Or relative to overall maximum traffic? Traffic is usually higher than engagements
        const engHeight = `${(day.engagements / maxTrf) * 100}%`;
        const trfHeight = `${(day.traffic / maxTrf) * 100}%`;
        
        return (
          <div key={idx} className="group relative w-full h-full flex items-end justify-center px-1" title={`${day.date} - ${day.engagements} actions, ${day.traffic} visits`}>
            <div className="w-full flex justify-center h-full items-end gap-1 relative z-10 transition-all hover:opacity-80">
              <div style={{ height: trfHeight }} className="w-1/2 bg-slate-700/50 rounded-t-sm group-hover:bg-slate-600 transition-all min-h-[4px]"></div>
              <div style={{ height: engHeight }} className="w-1/2 bg-[#1d9cf0] rounded-t-sm group-hover:bg-[#34a9f8] transition-all min-h-[4px]"></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function AdminPortalOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"traffic" | "leads" | "talent">("traffic");

  useEffect(() => {
    fetch("/api/admin/overview")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard metrics failed to load", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
           <Activity className="w-12 h-12 text-[#1d9cf0] animate-spin" />
           <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Compiling Business Intelligence...</p>
        </div>
      </div>
    );
  }

  const metrics = data?.traffic || { totalSessions: 0, uniqueIps: 0 };
  const business = data?.business || { totalLeads: 0, totalApplications: 0, conversionActions: 0, trends: [] };
  const devices = data?.devices || { desktop: 0, mobile: 0, tablet: 0 };
  const ipRecords = data?.ipRecords || [];
  const leads = data?.businessRecords?.leads || [];
  const talent = data?.businessRecords?.talent || [];
  const audits = data?.audits || [];
  const secThreats = data?.securityThreats || 0;
  const isSimulated = data?.simulated;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center">
             Business Command Center
             {isSimulated && <span className="ml-4 px-2 py-1 text-[10px] uppercase font-bold tracking-widest border border-orange-500/50 text-orange-500 bg-orange-500/10 rounded">Simulator Mode</span>}
           </h1>
           <p className="text-slate-400">Strategic KPIs, Lead Generation & Telemetry Overpass</p>
        </div>
      </header>

      {/* --- BUSINESS TIER --- */}
      <div>
         <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
            <LineChart className="w-4 h-4 text-[#1d9cf0]" /> Strategic Outcomes
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-[#1d9cf0]/30 p-6 rounded-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10"><FileSignature className="w-16 h-16 text-[#1d9cf0]" /></div>
               <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Service Inquiries (Leads)</h3>
               <p className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                 {business.totalLeads}
               </p>
               <p className="text-xs text-slate-500">Form submissions & corporate requests</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-6 rounded-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10"><Briefcase className="w-16 h-16" /></div>
               <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Talent Acquisitions</h3>
               <p className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                 {business.totalApplications}
               </p>
               <p className="text-xs text-slate-500">CV submissions & applications</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-6 rounded-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10"><Activity className="w-16 h-16" /></div>
               <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Total Conversions</h3>
               <p className="text-3xl font-bold text-[#1d9cf0] mb-2">{business.conversionActions}</p>
               <p className="text-xs text-[#1d9cf0]/70 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> Aggregated inbound outcomes</p>
            </div>
         </div>
         {business.trends?.length > 0 && <TrendGraph trends={business.trends.slice().reverse()} />}
      </div>

      {/* --- TELEMETRY TIER --- */}
      <div>
         <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
            <Monitor className="w-4 h-4 text-slate-400" /> Infrastructure Telemetry
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
               <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Global Sessions</h3>
               <p className="text-2xl font-bold text-white mb-1">{metrics.totalSessions}</p>
               <p className="text-[10px] text-slate-500">Total institutional footfalls</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
               <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Unique IPs (Visitors)</h3>
               <p className="text-2xl font-bold text-slate-300 mb-1">{metrics.uniqueIps}</p>
               <p className="text-[10px] text-slate-500">Distinct geographic addresses</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-6 rounded-xl flex items-center justify-between">
               <div>
                  <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Threat Blocks</h3>
                  <p className="text-2xl font-bold text-white">{secThreats === 0 ? "Zero" : secThreats}</p>
               </div>
               {secThreats > 0 ? <ShieldAlert className="w-10 h-10 text-red-500" /> : <ShieldCheck className="w-10 h-10 text-green-500" />}
            </div>
         </div>
      </div>

      {/* --- TABBED LEDGER --- */}
      <div className="bg-white/5 border border-white/5 rounded-xl flex flex-col">
          <div className="p-4 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex bg-black/40 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab("leads")} 
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${activeTab === "leads" ? "bg-[#1d9cf0] text-white" : "text-slate-400 hover:text-white"}`}
                >
                  <FileSignature className="w-3 h-3 inline mr-2" /> Recent Leads
                </button>
                <button 
                  onClick={() => setActiveTab("talent")} 
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${activeTab === "talent" ? "bg-[#1d9cf0] text-white" : "text-slate-400 hover:text-white"}`}
                >
                  <Briefcase className="w-3 h-3 inline mr-2" /> Talent Influx
                </button>
                <button 
                  onClick={() => setActiveTab("traffic")} 
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${activeTab === "traffic" ? "bg-[#1d9cf0] text-white" : "text-slate-400 hover:text-white"}`}
                >
                  <MapPin className="w-3 h-3 inline mr-2" /> Raw IP Traffic
                </button>
             </div>
             
            <div className="px-3 py-1.5 bg-black/40 border border-white/10 rounded flex items-center gap-2">
              <Search className="w-3 h-3 text-slate-400" />
              <input type="text" placeholder="Search table..." className="bg-transparent border-none text-xs text-white focus:outline-none w-48" disabled />
            </div>
          </div>
          
          <div className="overflow-x-auto">
             {activeTab === "traffic" && (
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-black/20 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">IP Address</th>
                      <th className="px-6 py-4">Region</th>
                      <th className="px-6 py-4">Device OS</th>
                      <th className="px-6 py-4 text-center">Sessions</th>
                      <th className="px-6 py-4 text-right">Last Interaction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ipRecords.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No telemetry logged.</td></tr>
                    ) : (
                      ipRecords.map((record: any, idx: number) => {
                        const isMobileInfo = record.userAgent?.toLowerCase().match(/mobile|android|iphone/);
                        return (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 font-mono text-[#1d9cf0]">{record.ipAddress}</td>
                            <td className="px-6 py-4 text-slate-300">
                              {record.city && record.city !== "Unknown City" ? `${record.city}, ` : ""}{record.country}
                            </td>
                            <td className="px-6 py-4 text-slate-400">
                              {isMobileInfo ? ( <span className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> Mobile Edge</span>) : ( <span className="flex items-center gap-2"><Monitor className="w-4 h-4" /> PC</span>)}
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-white"><span className="px-2 py-1 bg-white/10 rounded text-xs">{record.sessionCount}</span></td>
                            <td className="px-6 py-4 text-right text-slate-500 text-xs">{record.lastVisit ? formatDistanceToNowNative(record.lastVisit) : "Unknown"}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
             )}

             {activeTab === "leads" && (
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-black/20 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">Organization / Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4 text-right">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No leads captured.</td></tr>
                    ) : (
                      leads.map((lead: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{lead.organization || lead.name}</td>
                          <td className="px-6 py-4 text-slate-400">{lead.email}</td>
                          <td className="px-6 py-4 text-slate-400">{lead.phone || "-"}</td>
                          <td className="px-6 py-4 text-right text-slate-500 text-xs">{lead.createdAt ? formatDistanceToNowNative(lead.createdAt) : "Unknown"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
             )}

             {activeTab === "talent" && (
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-black/20 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">Candidate Name</th>
                      <th className="px-6 py-4">Email Contact</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Applied</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {talent.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No applications received.</td></tr>
                    ) : (
                      talent.map((app: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{app.name}</td>
                          <td className="px-6 py-4 text-slate-400">{app.email}</td>
                          <td className="px-6 py-4 text-slate-300 uppercase tracking-widest text-[10px]"><span className="px-2 py-1 bg-white/10 rounded">{app.status}</span></td>
                          <td className="px-6 py-4 text-right text-slate-500 text-xs">{app.createdAt ? formatDistanceToNowNative(app.createdAt) : "Unknown"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
             )}
          </div>
      </div>

      {/* --- AUDIT LOGS --- */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
          <Activity className="w-5 h-5 text-green-500" /> Deep Operation Logs
        </h2>
        <div className="space-y-4">
          <div className="border-b border-white/5 pb-2 grid grid-cols-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Action Category</span>
            <span>Identity/Principal</span>
            <span>Origin IP</span>
            <span className="text-right">Timestamp Executed</span>
          </div>
          {audits.length === 0 ? (
            <p className="text-slate-500 py-4 text-sm">No recent administrative actions logged.</p>
          ) : (
            audits.map((audit: any, i: number) => {
              const isThreat = audit.action.includes("FAILED") || audit.action.includes("SECURITY");
              return (
                <div key={i} className="grid grid-cols-4 text-sm py-3 border-b border-white/5 last:border-0 items-center">
                  <span className={`font-mono text-xs font-bold ${isThreat ? "text-red-500" : "text-[#1d9cf0]"}`}>{audit.action}</span>
                  <span className="text-white truncate pr-2">{audit.userId || "System Node"}</span>
                  <span className="text-slate-400 font-mono text-xs">{audit.ipAddress || "-"}</span>
                  <span className="text-slate-500 text-right text-xs">
                     {audit.createdAt ? formatNative(audit.createdAt) : "Unknown"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
