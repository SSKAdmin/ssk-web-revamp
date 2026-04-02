import { getApplications } from "@/lib/db/queries";
import { 
  Users2, 
  Mail, 
  MapPin, 
  FileText, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function ApplicationReview() {
  const applications = await getApplications();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Applicant Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">Review and management of execution specialist candidates.</p>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest bg-foreground text-background px-6 py-2.5">
           Active Pipeline: {applications.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* SUMMARY CARDS */}
         {[
           { label: "Total Candidates", value: applications.length, color: "text-foreground" },
           { label: "Requires Review", value: applications.filter(a => a.status === 'new').length, color: "text-accent" },
           { label: "Shortlisted", value: applications.filter(a => a.status === 'shortlisted').length, color: "text-accent" },
           { label: "Hired", value: applications.filter(a => a.status === 'hired').length, color: "text-foreground" }
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-border/50 p-6 shadow-sm">
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">{stat.label}</p>
             <p className={cn("text-3xl font-black tracking-tight", stat.color)}>{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="flex items-center justify-between py-6 border-y border-border/30">
         <div className="flex items-center space-x-6">
            <div className="flex items-center bg-white border border-border/50 px-4 py-2 w-72">
               <Search className="h-3.5 w-3.5 text-muted-foreground mr-3" />
               <input placeholder="Search candidates..." className="bg-transparent text-xs outline-none w-full" />
            </div>
            <div className="flex items-center bg-white border border-border/50 px-4 py-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-muted/10 transition-colors">
               <Filter className="h-3.5 w-3.5 mr-2" /> Application Status
            </div>
         </div>
      </div>

      {applications.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white border border-border/50 p-8 hover:border-accent transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Users2 className="h-20 w-20" />
               </div>
               
               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                  <div className="flex-1">
                     <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="outline" className={cn(
                           "rounded-none px-3 py-1 text-[9px] font-black uppercase tracking-widest",
                           app.status === 'new' ? "bg-accent/10 border-accent/20 text-accent" : "bg-muted border-border text-muted-foreground"
                        )}>
                           {app.status}
                        </Badge>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                           <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-accent transition-colors">{app.name}</h3>
                           <div className="flex flex-wrap gap-6 mt-4">
                              <div className="flex items-center text-xs font-medium text-foreground/60">
                                 <Mail className="h-3 w-3 mr-2 text-accent" /> {app.email}
                              </div>
                              <div className="flex items-center text-xs font-medium text-foreground/60">
                                 <Clock className="h-3 w-3 mr-2 text-accent" /> Applied {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(new Date(app.createdAt))}
                              </div>
                           </div>
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Applied For</p>
                           <p className="text-sm font-bold uppercase tracking-tight">Role ID: {app.jobId}</p>
                           <button className="text-[10px] font-black uppercase tracking-widest text-accent mt-2 flex items-center hover:underline decoration-accent underline-offset-4">
                              <FileText className="h-3 w-3 mr-2" /> View Resume (CV.pdf)
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center lg:flex-col lg:items-end justify-between lg:justify-center gap-4 lg:pl-12 lg:border-l lg:border-border/30">
                     <button className="bg-foreground text-background text-[10px] font-black uppercase tracking-widest px-8 py-3 w-full hover:bg-accent transition-all">
                        Move to Review
                     </button>
                     <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2">
                        Reject
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[400px] border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-center p-12 bg-muted/5">
           <Users2 className="h-12 w-12 text-muted-foreground/20 mb-8" />
           <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Pipeline Empty</h3>
           <p className="text-sm text-muted-foreground max-w-xs">No candidates currently in the execution pipeline. Promote active roles to attract specialists.</p>
        </div>
      )}
    </div>
  );
}
