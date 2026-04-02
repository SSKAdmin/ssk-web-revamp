import { getJobs } from "@/lib/db/queries";
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Globe2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function JobsManager() {
  const jobs = await getJobs(true);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Talent Pipeline</h1>
          <p className="text-muted-foreground font-medium mt-1">Manage active deployments and clinical roles.</p>
        </div>
        <Button className="bg-accent text-white font-black uppercase tracking-widest text-[10px] px-8 py-6 h-auto rounded-none border-none hover:scale-105 transition-all">
          <Plus className="h-4 w-4 mr-2" /> Initialize New Role
        </Button>
      </div>

      <div className="flex items-center justify-between py-6 border-y border-border/30">
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-white border border-border/50 px-4 py-2 w-72">
            <Search className="h-3.5 w-3.5 text-muted-foreground mr-3" />
            <input placeholder="Search roles..." className="bg-transparent text-xs outline-none w-full" />
          </div>
          <div className="flex items-center bg-white border border-border/50 px-4 py-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-muted/10 transition-colors">
            <Filter className="h-3.5 w-3.5 mr-2" /> Department
          </div>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {jobs.length} Active Deployments
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-border/50 p-10 flex flex-col group hover:border-accent transition-all shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <Badge variant={job.status === "published" ? "default" : "secondary"} className="rounded-none uppercase font-black text-[9px] tracking-widest px-3 py-1">
                {job.status}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-grow mb-12">
              <h2 className="text-lg font-black uppercase tracking-tight group-hover:text-accent transition-colors">{job.title}</h2>
              <p className="text-[9px] font-black tracking-widest text-muted-foreground uppercase mt-1">
                Created {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(new Date(job.createdAt))}
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-border/30">
               <div className="flex items-center text-xs font-medium text-foreground/60">
                  <Building2 className="h-3.5 w-3.5 mr-3 text-accent" /> {job.department}
               </div>
               <div className="flex items-center text-xs font-medium text-foreground/60">
                  <MapPin className="h-3.5 w-3.5 mr-3 text-accent" /> {job.location}
               </div>
               <div className="flex items-center text-xs font-medium text-foreground/60">
                  <Clock className="h-3.5 w-3.5 mr-3 text-accent" /> {job.type}
               </div>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-40 border border-dashed border-border/50 bg-muted/5">
           <Briefcase className="h-16 w-16 text-muted-foreground/20 mx-auto mb-8" />
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">No Active Deployments</p>
        </div>
      )}
    </div>
  );
}
