import { getDictionaryContent } from "@/lib/actions/cms";
import { JSONVisualEditor } from "@/components/admin/JSONVisualEditor";
import { FileText } from "lucide-react";

export default async function CmsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  // Load the live dictionary configuration
  const currentDict = await getDictionaryContent(lang as "en" | "ar");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b border-white/10 pb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#1CC8C8]" />
            Content Master Grid
          </h1>
          <p className="text-white/50 mt-2 text-sm uppercase tracking-widest font-black">
            Zero-Code Dictionary Sync & Real-time Platform Editor.
          </p>
        </div>
        
        {/* Environment toggle indicator */}
        <div className="text-right">
           <p className="text-[10px] font-black uppercase text-[#1CC8C8] tracking-widest">Active Branch</p>
           <p className="text-sm font-black uppercase bg-white/10 px-4 py-1 mt-1 inline-block border border-white/20">master_{lang}</p>
        </div>
      </div>

      <div className="bg-[#021C2A]/50 border border-white/5 rounded-xl overflow-hidden p-1 shadow-2xl">
         {/* Live Recursive Sync UI */}
         <JSONVisualEditor initialData={currentDict} lang={lang as "en" | "ar"} />
      </div>
    </div>
  );
}
