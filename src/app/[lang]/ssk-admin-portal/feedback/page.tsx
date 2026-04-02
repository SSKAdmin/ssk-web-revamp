import { MessageSquare, ThumbsUp, ThumbsDown, BarChart2 } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Client Feedback</h1>
        <p className="text-slate-400">Sentiment analysis matrix generated from client interactions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#050a14] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <BarChart2 className="w-8 h-8 text-[#1d9cf0] mb-3" />
            <h2 className="text-3xl font-bold text-white mb-1">94%</h2>
            <p className="text-xs uppercase tracking-widest text-slate-500">Satisfaction Rate</p>
         </div>
         <div className="bg-[#050a14] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <ThumbsUp className="w-8 h-8 text-green-500 mb-3" />
            <h2 className="text-3xl font-bold text-white mb-1">112</h2>
            <p className="text-xs uppercase tracking-widest text-slate-500">Positive Responses</p>
         </div>
         <div className="bg-[#050a14] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <ThumbsDown className="w-8 h-8 text-red-500 mb-3" />
            <h2 className="text-3xl font-bold text-white mb-1">7</h2>
            <p className="text-xs uppercase tracking-widest text-slate-500">Needs Attention</p>
         </div>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl p-6">
         <h3 className="font-bold text-white mb-6">Recent Verbatim</h3>
         <div className="space-y-4">
            {[
              { score: "positive", text: "The architectural guidance provided during the ERP phase was instrumental." },
              { score: "positive", text: "Highly structured PMO transition. The team delivered exactly to spec." },
              { score: "negative", text: "Communication delays during week 3 of the integration timeline." }
            ].map((fb, i) => (
              <div key={i} className="flex gap-4 p-4 border border-white/5 rounded-lg bg-black/50">
                 {fb.score === 'positive' ? <ThumbsUp className="w-5 h-5 text-green-500 shrink-0"/> : <ThumbsDown className="w-5 h-5 text-red-500 shrink-0"/>}
                 <p className="text-sm text-slate-300 italic">"{fb.text}"</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}