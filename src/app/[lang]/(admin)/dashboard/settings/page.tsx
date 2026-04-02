import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";
import { redirect } from "next/navigation";
import { getAllSystemSettings } from "@/lib/actions/settings";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { Database, Wrench } from "lucide-react";

export default async function SettingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as { role?: string }).role !== "admin") {
    redirect("/login");
  }

  const { lang } = await params;
  
  // Retrieve ALL dynamic settings from the Command Center DB
  const settings = await getAllSystemSettings();
  
  // Map settings to a cleaner prop format fallback to empty string
  const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value || "" }), {} as Record<string, string>);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <Wrench className="w-8 h-8 text-[#1CC8C8]" />
            Command Center Hub
          </h1>
          <p className="text-white/50 mt-2 text-sm uppercase tracking-widest font-black">
            Manage System Configs, SMTP Relays, AI Neural Engines, and API Orchestrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
           {/* Deep Dynamic Form Element */}
          <SettingsForm initialSettings={settingsMap} />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 overflow-hidden group">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-3 mb-8">
              <Database className="w-4 h-4 text-[#1CC8C8]" />
              Environment Node
            </h3>
            
            <ul className="space-y-4 text-[9px] font-black uppercase tracking-widest text-white/50">
              <li className="flex justify-between items-center py-4 border-b border-white/5">
                <span>Database Sync</span>
                <div className="flex items-center gap-2">
                   <span className="text-green-500">Connected</span>
                   <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                </div>
              </li>
              <li className="flex justify-between items-center py-4 border-b border-white/5">
                <span>RAG AI System</span>
                {settingsMap["OPENAI_API_KEY"] ? (
                  <span className="text-[#1CC8C8] font-bold">Neural Core Active</span>
                ) : (
                  <span className="text-yellow-500 font-bold">Logic Fallback Ops</span>
                )}
              </li>
              <li className="flex justify-between items-center py-4 border-b border-white/5">
                <span>SMTP Mail Flow</span>
                {settingsMap["SMTP_HOST"] ? (
                  <span className="text-green-500 font-bold">Relay Active</span>
                ) : (
                  <span className="text-red-500 font-bold">Suspended</span>
                )}
              </li>
              <li className="flex justify-between items-center py-4">
                <span>MEO Pipeline</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#1CC8C8] shadow-[0_0_8px_rgba(28,200,200,0.5)]"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
