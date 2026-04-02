import { getContacts } from "@/lib/db/queries";
import { 
  Mail, 
  User, 
  Building2, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Inbox,
  ArrowRight,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { z } from "zod";

const applicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone is required"),
  coverLetter: z.string().min(20, "Cover letter must be at least 20 characters"),
  cvUrl: z.string().min(1, "CV is required"),
});

export default async function ContactsInbox() {
  const contacts = await getContacts();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-1 items-start">
          <h1 className="text-2xl font-black text-ssk-navy uppercase tracking-tight leading-none">Contacts Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Management of institutional and enterprise engagement requests.</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="px-4 py-2 border border-border/50 bg-white text-[10px] font-black uppercase tracking-widest flex items-center">
              <Filter className="h-3 w-3 mr-2" /> Filter
           </div>
           <div className="px-4 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest transition-all hover:bg-accent hover:text-white cursor-default">
              Total: {contacts.length}
           </div>
        </div>
      </div>

      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white border border-border/50 p-8 hover:border-accent transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Inbox className="h-24 w-24" />
               </div>
               
               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                  <div className="flex-1 space-y-6">
                     <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={cn(
                           "rounded-none px-3 py-1 text-[9px] font-black uppercase tracking-widest",
                           contact.status === 'new' ? "bg-accent/10 border-accent/20 text-accent" : "bg-muted border-border text-muted-foreground"
                        )}>
                           {contact.status}
                        </Badge>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center">
                           <Clock className="h-3 w-3 mr-2 text-accent" />
                           {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(contact.createdAt))}
                        </span>
                     </div>

                     <div>
                        <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-accent transition-colors">{contact.organization || "Direct Inquiry"}</h3>
                        <div className="flex flex-wrap gap-6 mt-4">
                           <div className="flex items-center text-xs font-medium text-foreground/60">
                              <User className="h-3 w-3 mr-2 text-accent" /> {contact.name}
                           </div>
                           <div className="flex items-center text-xs font-medium text-foreground/60">
                              <Mail className="h-3 w-3 mr-2 text-accent" /> {contact.email}
                           </div>
                           <div className="flex items-center text-xs font-medium text-foreground/60">
                              <Building2 className="h-3 w-3 mr-2 text-accent" /> {contact.organization}
                           </div>
                        </div>
                     </div>

                     <div className="pt-4 border-t border-border/30">
                        <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl line-clamp-2">
                           {contact.message}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center lg:flex-col lg:items-end justify-between lg:justify-center gap-4 lg:pl-8 lg:border-l lg:border-border/30">
                     <button className="text-[10px] font-black uppercase tracking-[0.2em] text-accent flex items-center hover:translate-x-2 transition-transform">
                        View Details <ArrowRight className="ml-2 h-3 w-3" />
                     </button>
                     <button className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
                        Archive
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[400px] border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-center p-12 bg-muted/5">
           <Inbox className="h-12 w-12 text-muted-foreground/20 mb-8" />
           <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Inbox Clear</h3>
           <p className="text-sm text-muted-foreground max-w-xs">No active inquiries require clinical attention at this moment.</p>
        </div>
      )}
    </div>
  );
}
