"use client";

import { useState } from "react";
import { updateDictionaryContent } from "@/lib/actions/cms";
import { Save, AlertCircle, RefreshCw, ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";

type JSONValue = string | number | boolean | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = Array<JSONValue>;

export function JSONVisualEditor({ initialData, lang }: { initialData: any, lang: "en" | "ar" }) {
  const [data, setData] = useState<any>(initialData);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(["navigation", "hero"]));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });

  const toggleExpand = (path: string) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleUpdate = (path: string[], value: string) => {
    setData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return next;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setStatus({ type: null, msg: "" });
    
    try {
      const res = await updateDictionaryContent(lang, data);
      if (res.success) {
        setStatus({ type: "success", msg: "Knowledge Base Synchronized." });
      } else {
        setStatus({ type: "error", msg: res.error || "Synchronization Failed." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "An unexpected error occurred." });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: null, msg: "" }), 5000);
    }
  };

  const renderNode = (obj: any, path: string[] = []): React.ReactNode => {
    if (typeof obj === "string") {
      const isLongText = obj.length > 60;
      return (
        <div className="ml-4 pl-4 border-l border-white/5 py-2">
          <label className="block text-[8px] font-black uppercase tracking-widest text-[#1CC8C8] mb-2">{path[path.length - 1]}</label>
          {isLongText ? (
            <textarea
              value={obj}
              onChange={(e) => handleUpdate(path, e.target.value)}
              className="w-full min-h-[80px] bg-black/20 border border-white/10 rounded-sm px-4 py-3 text-white text-xs focus:border-[#1CC8C8] outline-none"
            />
          ) : (
            <input
              type="text"
              value={obj}
              onChange={(e) => handleUpdate(path, e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-sm px-4 py-3 text-white text-xs focus:border-[#1CC8C8] outline-none"
            />
          )}
        </div>
      );
    }

    if (Array.isArray(obj)) {
      return (
        <div className="ml-4 pl-4 border-l border-white/5 space-y-4 pt-2 pb-4">
          {obj.map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/5 p-4 relative group">
              <span className="absolute top-2 right-2 text-[8px] font-black uppercase tracking-widest text-white/20">Item {index + 1}</span>
              {renderNode(item, [...path, index.toString()])}
            </div>
          ))}
        </div>
      );
    }

    if (typeof obj === "object" && obj !== null) {
      return (
        <div className="ml-4 pl-4 border-l border-white/10 space-y-1">
          {Object.entries(obj).map(([key, value]) => {
            const currentPath = [...path, key];
            const pathStr = currentPath.join(".");
            const isExpanded = expandedKeys.has(pathStr) || path.length === 0; // Root always expanded
            
            // If the value is a string, don't wrap it in an accordion, just render it cleanly.
            if (typeof value === "string") {
              return <div key={key}>{renderNode(value, currentPath)}</div>;
            }

            return (
              <div key={key} className="pt-2">
                <button
                  onClick={() => toggleExpand(pathStr)}
                  className="flex items-center gap-2 w-full text-left py-2 hover:bg-white/5 px-2 transition-colors group"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3 text-[#1CC8C8]" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#1CC8C8]" />
                  )}
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </button>
                {isExpanded && renderNode(value, currentPath)}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* HUD HEADER */}
      <div className="bg-white/5 border border-white/10 p-6 flex flex-col sm:flex-row justify-between items-center sticky top-24 z-40 backdrop-blur-md">
         <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-[#1CC8C8] flex items-center justify-center font-black text-black uppercase tracking-widest">
               {lang}
            </div>
            <div>
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Live Operations CMS</h3>
               <p className="text-[9px] uppercase tracking-widest text-[#1CC8C8] mt-1">Direct Master Node Sync</p>
            </div>
         </div>

         <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {status.type && (
              <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${status.type === 'error' ? 'text-red-500' : 'text-[#1CC8C8]'}`}>
                {status.type === 'error' ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                {status.msg}
              </div>
            )}
            
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-[#1CC8C8] text-black px-6 py-3 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              {loading ? "Syncing..." : "Publish Master"}
            </button>
         </div>
      </div>

      {/* RECURSIVE RENDER TREE */}
      <div className="bg-transparent pb-24">
         {renderNode(data)}
      </div>
    </div>
  );
}
