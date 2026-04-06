import { Briefcase, FileText, Download } from "lucide-react";
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function CareersInboxPage() {
  let applications: any[] = [];
  
  try {
    applications = await db
      .select({
         id: schema.applications.id,
         name: schema.applications.name,
         email: schema.applications.email,
         phone: schema.applications.phone,
         cvUrl: schema.applications.cvUrl,
         coverLetter: schema.applications.coverLetter,
         status: schema.applications.status,
         createdAt: schema.applications.createdAt,
         jobTitle: schema.jobs.title
      })
      .from(schema.applications)
      .leftJoin(schema.jobs, eq(schema.applications.jobId, schema.jobs.id))
      .orderBy(desc(schema.applications.createdAt));
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    // Fallback to empty if db fails completely (e.g. strict strict isolation mode)
  }

  function formatNative(dateString: string) {
    return new Intl.DateTimeFormat('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Recruitment Hub</h1>
        <p className="text-slate-400">Live system records of talent acquisition submissions.</p>
      </header>

      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
         <div className="grid grid-cols-5 p-4 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-black/50">
            <span className="col-span-2">Candidate Identity</span>
            <span>Applied Position</span>
            <span>Date Received</span>
            <span className="text-right">Attached Assets</span>
         </div>
         {applications.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
               No active applications logged in the recruitment channel yet.
            </div>
         ) : applications.map((app, i) => (
            <div key={app.id} className="grid grid-cols-5 p-4 items-center border-b border-white/5 last:border-0 hover:bg-black/20 transition-colors">
               <div className="col-span-2 flex flex-col">
                 <span className="text-sm font-medium text-white">{app.name}</span>
                 <span className="text-[10px] text-slate-400 font-mono mt-1">{app.email} {app.phone ? `• ${app.phone}` : ''}</span>
               </div>
               <span className="text-xs text-[#1d9cf0] font-semibold">{app.jobTitle || "GENERAL SUBMISSION"}</span>
               <span className="text-xs text-slate-400">{formatNative(app.createdAt)}</span>
               <div className="text-right">
                  {app.cvUrl ? (
                    <a href={app.cvUrl} download={`CV_${app.name.replace(/\\s/g, '_')}.pdf`} className="text-xs bg-[#1d9cf0]/10 hover:bg-[#1d9cf0]/20 px-3 py-1.5 rounded border border-[#1d9cf0]/30 text-[#1d9cf0] inline-flex items-center gap-2 transition-all">
                       <Download className="w-3 h-3" /> Fetch CV
                    </a>
                  ) : (
                    <span className="text-xs text-slate-600 italic">No File attached</span>
                  )}
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}