"use client"

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  coverLetter: z.string().optional(),
  cvUrl: z.string().min(1, "Attachment is required").optional().or(z.literal("pending_upload")),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

export function ApplicationForm({ jobId, lang }: { jobId: string, lang: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [dict, setDict] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getDictionary(lang as Locale).then(setDict);
  }, [lang]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      cvUrl: "pending_upload"
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
         setStatus("error");
         setErrorMessage("The selected file exceeds the 5MB requirement."); 
         setSelectedFile(null);
         return; 
      }
      setStatus("idle");
      setErrorMessage("");
      setSelectedFile(file);
    }
  };

  async function onSubmit(data: ApplicationValues) {
    if (!selectedFile) {
       setStatus("error");
       setErrorMessage("Please attach your CV document (PDF/Word).");
       return;
    }
    
    setStatus("submitting");
    try {
      // 1. Core Upload Transaction
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      const uploadRes = await fetch("/api/upload/cv", {
         method: "POST",
         body: formData
      });
      
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Document ingestion failed.");
      
      // 2. Application Binding
      const applicationPayload = { ...data, jobId, cvUrl: uploadData.url };

      const submitRes = await fetch("/api/applications", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(applicationPayload)
      });
      
      const submitData = await submitRes.json();
      if (!submitRes.ok) throw new Error(submitData.error || "Application submission breached.");

      setStatus("success");
      reset();
      setSelectedFile(null);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected system fault occurred.");
    }
  }

  if (!dict) return <div className="h-40 flex items-center justify-center"><Loader2 className="animate-spin text-ssk-cyan" /></div>;

  const f = dict.careers_form;
  const isAr = lang === "ar";

  if (status === "success") {
    return (
      <div className={cn(
        "p-12 bg-background border border-ssk-border text-center animate-in fade-in zoom-in-95 duration-500",
        isAr && "font-[var(--font-arabic)]"
      )}>
        <div className="w-16 h-16 bg-ssk-cyan/10 text-ssk-cyan rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{f.success_title}</h3>
        <p className="text-ssk-text-soft font-medium mb-10 leading-relaxed max-w-[500px] mx-auto">
          {f.success_message}
        </p>
        <Button 
          variant="outline" 
          onClick={() => setStatus("idle")}
          className="font-bold uppercase tracking-[0.3em] text-[10px] px-10 py-6 h-auto rounded-none border-ssk-cyan/20 hover:border-ssk-cyan transition-all"
        >
          {f.return_button}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-8 text-left", isAr && "text-right font-[var(--font-arabic)]")}>
      {status === "error" && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold uppercase tracking-[0.3em] flex items-center mb-10">
          <AlertCircle className={cn("h-4 w-4 mr-3", isAr && "ml-3 mr-0")} />
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* NAME */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ssk-navy/40 flex items-center">
            <User className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.name}
          </label>
          <input
            {...register("name")}
            placeholder={f.placeholders.name}
            className={cn(
              "w-full bg-ssk-surface border border-ssk-border p-5 text-sm font-semibold text-black focus:bg-white focus:border-ssk-cyan outline-none transition-all rounded-none placeholder:text-neutral-400 placeholder:font-medium",
              errors.name && "border-destructive",
              isAr && "text-right"
            )}
          />
          {errors.name && <p className="text-[10px] font-bold text-destructive uppercase tracking-[0.3em]">{errors.name.message}</p>}
        </div>

        {/* EMAIL */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ssk-navy/40 flex items-center">
            <Mail className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.email}
          </label>
          <input
            {...register("email")}
            placeholder={f.placeholders.email}
            className={cn(
              "w-full bg-ssk-surface border border-ssk-border p-5 text-sm font-semibold text-black focus:bg-white focus:border-ssk-cyan outline-none transition-all rounded-none placeholder:text-neutral-400 placeholder:font-medium",
              errors.email && "border-destructive",
              isAr && "text-right"
            )}
          />
          {errors.email && <p className="text-[10px] font-bold text-destructive uppercase tracking-[0.3em]">{errors.email.message}</p>}
        </div>
      </div>

      {/* PHONE & CV */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ssk-navy/40 flex items-center">
            <Phone className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.phone}
          </label>
          <input
            {...register("phone")}
            placeholder={f.placeholders.phone}
            className={cn(
              "w-full bg-ssk-surface border border-ssk-border p-5 text-sm font-semibold text-black focus:bg-white focus:border-ssk-cyan outline-none transition-all rounded-none placeholder:text-neutral-400 placeholder:font-medium",
              errors.phone && "border-destructive",
              isAr && "text-right"
            )}
          />
          {errors.phone && <p className="text-[10px] font-bold text-destructive uppercase tracking-[0.3em]">{errors.phone.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ssk-navy/40 flex items-center">
             <FileText className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.cv}
          </label>
          <input 
             type="file" 
             className="hidden" 
             ref={fileInputRef} 
             accept=".pdf,.doc,.docx"
             onChange={handleFileChange}
          />
          <div className="flex cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
             <div className="flex-grow bg-white border border-ssk-border p-5 text-xs font-bold uppercase tracking-[0.2em] text-ssk-cyan/80 group-hover:border-ssk-cyan transition-all truncate">
                {selectedFile ? selectedFile.name : (isAr ? "اختر المستند..." : "SELECT DOCUMENT...")}
             </div>
             <div className="bg-ssk-navy text-white px-6 flex items-center text-[10px] font-bold uppercase tracking-[0.3em] group-hover:bg-ssk-cyan transition-colors">
                {selectedFile ? (isAr ? "مرفق" : "ATTACHED") : (isAr ? "رفع" : "UPLOAD")}
             </div>
          </div>
        </div>
      </div>

      {/* COVER LETTER */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ssk-navy/40 flex items-center">
          <MessageSquare className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.summary}
        </label>
        <textarea
          {...register("coverLetter")}
          placeholder={f.placeholders.summary}
          rows={6}
          className={cn(
            "w-full bg-ssk-surface border border-ssk-border p-5 text-sm font-semibold text-black focus:bg-white focus:border-ssk-cyan outline-none transition-all rounded-none placeholder:text-neutral-400 placeholder:font-medium resize-none",
            errors.coverLetter && "border-destructive",
            isAr && "text-right"
          )}
        ></textarea>
        {errors.coverLetter && <p className="text-[10px] font-bold text-destructive uppercase tracking-[0.3em]">{errors.coverLetter.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-ssk-cyan text-ssk-navy font-bold uppercase tracking-[0.3em] text-xs py-8 h-auto rounded-none hover:scale-[1.01] transition-all border-none"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className={cn("mr-3 h-4 w-4 animate-spin", isAr && "ml-3 mr-0")} /> {f.labels.submitting}
          </>
        ) : (
          <>
            {f.labels.submit} <ArrowRight className={cn("ml-3 h-4 w-4", isAr && "mr-3 ml-0 rotate-180")} />
          </>
        )}
      </Button>

      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-ssk-text-soft/40 text-center flex items-center justify-center">
        <ShieldCheck className="h-3 w-3 mr-2" /> {f.validation.confidentiality}
      </p>
    </form>
  );
}
