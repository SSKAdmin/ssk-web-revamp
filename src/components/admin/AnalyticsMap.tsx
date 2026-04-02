"use client";

import { Activity, Globe, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data simulating inbound traffic footprint
const trafficNodes = [
  { id: "riyadh", x: 62, y: 45, count: 420 },
  { id: "london", x: 48, y: 30, count: 185 },
  { id: "newyork", x: 28, y: 35, count: 95 },
  { id: "dubai", x: 65, y: 47, count: 310 },
  { id: "singapore", x: 78, y: 55, count: 112 },
];

export function AnalyticsMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Auto-pulse simulation simulating active connections
  useEffect(() => {
    const pulse = setInterval(() => {
      const randomNode = trafficNodes[Math.floor(Math.random() * trafficNodes.length)].id;
      setActiveNode(randomNode);
      setTimeout(() => setActiveNode(null), 1000);
    }, 2000);
    return () => clearInterval(pulse);
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 overflow-hidden relative">
      <div className="absolute top-0 left-0 p-8 z-20 pointer-events-none">
        <div className="flex items-center space-x-3 mb-2">
          <Globe className="h-4 w-4 text-[#1CC8C8]" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Geospatial Analytics</h2>
        </div>
        <p className="text-[9px] uppercase tracking-widest text-[#1CC8C8]">Real-time Traffic Footprint</p>
      </div>

      {/* Embedded Simple SVG World Map Outline for visual telemetry */}
      <div className="relative w-full aspect-[2/1] opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain">
         
          {trafficNodes.map((node) => (
            <div 
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-crosshair"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="relative">
                <MapPin className={`w-3 h-3 transition-colors ${activeNode === node.id ? 'text-white' : 'text-[#1CC8C8]'}`} />
                {/* Sonar Pulse Effect */}
                <div className={`absolute inset-0 rounded-full bg-[#1CC8C8] animate-ping opacity-75 ${activeNode === node.id ? 'block' : 'hidden'}`}></div>
              </div>
              <div className="mt-1 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="bg-black text-[#1CC8C8] text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border border-[#1CC8C8]/30">
                   {node.id}
                 </span>
                 <span className="text-[7px] text-white/50">{node.count} Sessions</span>
              </div>
            </div>
         ))}
      </div>

      <div className="border-t border-white/5 grid grid-cols-4 divide-x divide-white/5 bg-black/20">
         <div className="p-4 text-center">
            <p className="text-xl font-black text-white">1,122</p>
            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Total Visitors (24h)</p>
         </div>
         <div className="p-4 text-center">
            <p className="text-xl font-black text-[#1CC8C8]">34%</p>
            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Return Rate</p>
         </div>
         <div className="p-4 text-center">
            <p className="text-xl font-black text-white">45</p>
            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Active IPs</p>
         </div>
         <div className="p-4 text-center flex items-center justify-center text-[#1CC8C8]">
            <Activity className="w-5 h-5 mx-auto mb-1" />
            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Live Monitoring</p>
         </div>
      </div>
    </div>
  );
}
