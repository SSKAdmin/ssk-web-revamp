import { LineChart, FileCog } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Market Intelligence</h1>
        <p className="text-slate-400">Analytic visualizations for web traffic and sector engagement.</p>
      </header>

      <div className="bg-[#050a14] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-[400px]">
         <LineChart className="w-16 h-16 text-slate-600 mb-4 opacity-50" />
         <h2 className="text-xl font-bold text-white mb-2">Telemetry Offline</h2>
         <p className="text-sm text-slate-500 max-w-md">The intelligence matrix requires a live active database connection to populate vector traffic and regional demographics.</p>
         <button className="mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 font-semibold hover:text-white transition-colors">Configure Aggregator</button>
      </div>
    </div>
  );
}