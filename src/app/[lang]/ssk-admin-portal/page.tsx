"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Activity, Users, Database, Smartphone, Monitor, ShieldAlert, MapPin, Search } from "lucide-react";
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

export default function AdminPortalOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
           <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Aggregating Institutional Telemetry...</p>
        </div>
      </div>
    );
  }

  // Fallback defaults if API fails or blocks
  const metrics = data?.traffic || { totalSessions: 0, uniqueIps: 0 };
  const devices = data?.devices || { desktop: 0, mobile: 0, tablet: 0 };
  const ipRecords = data?.ipRecords || [];
  const audits = data?.audits || [];
  const secThreats = data?.securityThreats || 0;
  const isSimulated = data?.simulated;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center">
             System Overview 
             {isSimulated && <span className="ml-4 px-2 py-1 text-[10px] uppercase font-bold tracking-widest border border-orange-500/50 text-orange-500 bg-orange-500/10 rounded">Simulator Mode</span>}
           </h1>
           <p className="text-slate-400">Institutional Command OS Status & Global Analytics</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/5 p-6 rounded-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-10"><Users className="w-16 h-16" /></div>
           <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Total Sessions</h3>
           <p className="text-3xl font-bold text-white mb-2">{metrics.totalSessions}</p>
           <p className="text-xs text-slate-500">Total institutional footfalls</p>
        </div>
        
        <div className="bg-white/5 border border-white/5 p-6 rounded-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-10"><Activity className="w-16 h-16" /></div>
           <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Unique IPs</h3>
           <p className="text-3xl font-bold text-[#1d9cf0] mb-2">{metrics.uniqueIps}</p>
           <p className="text-xs text-slate-500">Distinct geographic visitors</p>
        </div>

        <div className="bg-white/5 border border-white/5 p-6 rounded-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-10"><ShieldCheck className="w-16 h-16" /></div>
           <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Security Intrusions</h3>
           <p className="text-3xl font-bold text-white mb-2 flex items-center">
              {secThreats === 0 ? "Zero" : secThreats}
              {secThreats > 0 && <ShieldAlert className="w-5 h-5 text-red-500 ml-3" />}
           </p>
           <p className="text-xs text-slate-500">{secThreats === 0 ? "Platform secure and nominal" : "Threats detected & mitigated"}</p>
        </div>

        <div className="bg-white/5 border border-white/5 p-6 rounded-xl flex flex-col justify-center">
           <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4">Device Telemetry</h3>
           <div className="flex items-center justify-between text-white text-sm mb-2">
             <span className="flex items-center"><Monitor className="w-4 h-4 mr-2" /> PC/Mac</span>
             <span className="font-bold">{devices.desktop}</span>
           </div>
           <div className="flex items-center justify-between text-white text-sm mb-2">
             <span className="flex items-center"><Smartphone className="w-4 h-4 mr-2" /> Mobile</span>
             <span className="font-bold">{devices.mobile}</span>
           </div>
           <div className="w-full bg-black/50 rounded-full h-1 mt-2 flex overflow-hidden">
              <div className="bg-[#1d9cf0] h-full" style={{ width: `${(devices.desktop / (metrics.totalSessions || 1)) * 100}%` }}></div>
              <div className="bg-green-500 h-full" style={{ width: `${(devices.mobile / (metrics.totalSessions || 1)) * 100}%` }}></div>
           </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#1d9cf0]" /> Global Access Ledger
            </h2>
            <div className="px-3 py-1.5 bg-black/40 border border-white/10 rounded flex items-center gap-2">
              <Search className="w-3 h-3 text-slate-400" />
              <input type="text" placeholder="Search IP or Region" className="bg-transparent border-none text-xs text-white focus:outline-none w-48" disabled />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-black/20 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">IP Address</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4">Device classification</th>
                  <th className="px-6 py-4 text-center">Sessions</th>
                  <th className="px-6 py-4 text-right">Last Interaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ipRecords.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No active sessions logged on this instance.
                    </td>
                  </tr>
                ) : (
                  ipRecords.map((record: any, idx: number) => {
                    const isMobileInfo = record.userAgent?.toLowerCase().match(/mobile|android|iphone/);
                    return (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-mono text-[#1d9cf0]">{record.ipAddress}</td>
                        <td className="px-6 py-4 text-slate-300">
                          {record.city && record.city !== "Unknown City" ? `${record.city}, ` : ""}{record.country}
                        </td>
                        <td className="px-6 py-4 text-slate-400 truncate max-w-[200px]" title={record.userAgent}>
                          {isMobileInfo ? (
                             <span className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> Mobile Edge</span>
                          ) : (
                             <span className="flex items-center gap-2"><Monitor className="w-4 h-4" /> Desktop OS</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-white">
                          <span className="px-2 py-1 bg-white/10 rounded text-xs">{record.sessionCount}</span>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-500 text-xs">
                          {record.lastVisit ? formatDistanceToNowNative(record.lastVisit) : "Unknown"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
          <Activity className="w-5 h-5 text-green-500" /> Operational Action Audit
        </h2>
        <div className="space-y-4">
          <div className="border-b border-white/5 pb-2 grid grid-cols-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Action Code</span>
            <span>Identity</span>
            <span>Target IP</span>
            <span className="text-right">Timestamp</span>
          </div>
          {audits.length === 0 ? (
            <p className="text-slate-500 py-4 text-sm">No recent administrative actions logged.</p>
          ) : (
            audits.map((audit: any, i: number) => {
              const isThreat = audit.action.includes("FAILED") || audit.action.includes("SECURITY");
              return (
                <div key={i} className="grid grid-cols-4 text-sm py-3 border-b border-white/5 last:border-0 items-center">
                  <span className={`font-mono text-xs ${isThreat ? "text-red-500" : "text-green-500"}`}>{audit.action}</span>
                  <span className="text-white truncate pr-2">{audit.userId || "System Proxy"}</span>
                  <span className="text-slate-400 font-mono text-xs">{audit.ipAddress}</span>
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
