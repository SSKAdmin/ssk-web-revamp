"use client"

import { useState, useRef, useEffect } from "react";
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
  MessageSquare,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,13}$/, "Please enter a valid email"),
  phone: z.string().regex(/^05\d{8}$/, "Mobile number must start with 05 and be exactly 10 digits"),
  coverLetter: z.string().optional(),
  cvUrl: z.string().min(1, "Attachment is required").optional().or(z.literal("pending_upload")),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

export function ApplicationForm({ jobId, jobTitle, lang }: { jobId: string, jobTitle: string, lang: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [dict, setDict] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
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

  const processFile = (file: File) => {
    if (file.size > 2.5 * 1024 * 1024) {
       setStatus("error");
       setErrorMessage("Document exceeds 2.5MB institutional limit. Please compress or optimize."); 
       setSelectedFile(null);
       return; 
    }
    if (!file.name.toLowerCase().endsWith('.pdf') && !file.name.toLowerCase().endsWith('.doc') && !file.name.toLowerCase().endsWith('.docx')) {
       setStatus("error");
       setErrorMessage("Strict policy: Only highly-formatted PDF or Word documents are permitted."); 
       setSelectedFile(null);
       return;
    }
    setStatus("idle");
    setErrorMessage("");
    setSelectedFile(file);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const onError = (errors: any) => {
    const firstError = Object.keys(errors)[0];
    const el = document.querySelector(`[name="${firstError}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLElement).focus();
    }
  };

  async function onSubmit(data: ApplicationValues) {
    if (!selectedFile) {
       setStatus("error");
       setErrorMessage("A CV or technical resume is strictly required to process this application.");
       setTimeout(() => {
         const errElement = document.getElementById("form-error-banner");
         if (errElement) errElement.scrollIntoView({ behavior: "smooth", block: "center" });
       }, 100);
       return;
    }
    
    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      const uploadRes = await fetch("/api/upload/cv", {
         method: "POST",
         body: formData
      });
      
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Document ingestion failed.");
      
      const applicationPayload = { ...data, jobId: jobId, jobTitle: jobTitle, cvUrl: uploadData.url };

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
      setTimeout(() => {
        const errElement = document.getElementById("form-error-banner");
        if (errElement) errElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }

  if (!dict) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-ssk-cyan h-8 w-8" /></div>;

  const f = dict.careers_form;
  const isAr = lang === "ar";

  if (status === "success") {
    return (
      <div className={cn(
        "p-12 md:p-20 bg-ssk-navy border border-ssk-cyan/30 text-center animate-in fade-in zoom-in-95 duration-500 shadow-[0_0_40px_rgba(10,186,181,0.15)] relative",
        isAr && "font-[var(--font-arabic)]"
      )}>
        <div className="absolute top-0 left-0 w-full h-1 bg-ssk-cyan"></div>
        <div className="w-20 h-20 bg-ssk-cyan/10 text-ssk-cyan rounded-full flex items-center justify-center mx-auto mb-8 border border-ssk-cyan/30">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-3xl font-bold uppercase tracking-widest text-white mb-6">
          {isAr ? "تم تسجيل ترشيحك" : "APPLICATION SECURED"}
        </h3>
        <p className="text-white/60 font-medium mb-10 leading-relaxed max-w-[500px] mx-auto">
          {isAr 
            ? `تم توثيق طلب انضمامك لشغل منصب (${jobTitle}). سيتم تقييم ملفك من قبل لجنة الخبراء.`
            : `Your candidacy for the [${jobTitle}] role has been officially logged in our acquisition matrix. Our operational team will review your credentials.`}
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="inline-flex min-h-[64px] items-center justify-center border border-ssk-cyan px-16 text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-cyan hover:bg-ssk-cyan hover:text-ssk-navy transition-all"
        >
          {f.return_button}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={cn("space-y-10 text-left", isAr && "text-right font-[var(--font-arabic)]")} dir={isAr ? "rtl" : "ltr"}>
      
      <div className="bg-[#f7f9fb] border border-ssk-border p-6 flex flex-col items-center justify-center text-center space-y-3 mb-12">
         <Briefcase className="h-6 w-6 text-ssk-cyan mb-2" />
         <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ssk-navy">{isAr ? "تطبيق على وظيفة" : "APPLICATION FOR"}</p>
         <h3 className="text-xl md:text-2xl font-bold tracking-tight text-ssk-navy">{jobTitle}</h3>
         <p className="text-xs font-bold text-ssk-cyan uppercase tracking-widest">ID: {jobId}</p>
      </div>

      {status === "error" && (
        <div id="form-error-banner" className="p-6 bg-destructive/10 border-l-4 border-destructive text-destructive font-bold text-sm tracking-wide flex items-center mb-10">
          <AlertCircle className={cn("h-5 w-5 mr-4", isAr && "ml-4 mr-0")} />
          <span>{isAr ? "تدخل ضروري: " : "Action Required: "}{errorMessage}</span>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
         <div className="p-6 bg-ssk-navy border border-destructive/50 text-white/50 text-sm mb-8 relative">
           <div className="absolute top-0 left-0 w-1 h-full bg-destructive"></div>
           <strong className="text-destructive block mb-3 uppercase tracking-widest text-xs">{isAr ? "بيانات مفقودة" : "Missing Directives"}</strong>
           <ul className="list-disc pl-5 rtl:pr-5 space-y-1">
              {Object.values(errors).map((err, i) => (
                <li key={i} className="text-destructive/80 font-medium">{err.message}</li>
              ))}
           </ul>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
            <User className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.name} <span className="text-destructive ml-1">*</span>
          </label>
          <input
            {...register("name")}
            placeholder={f.placeholders.name}
            className={cn(
              "w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[16px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors text-black font-semibold placeholder:text-gray-400 placeholder:font-normal",
              errors.name ? "border-destructive focus:border-destructive bg-destructive/5" : ""
            )}
          />
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
            <Mail className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.email} <span className="text-destructive ml-1">*</span>
          </label>
          <input
            {...register("email")}
            placeholder={f.placeholders.email}
            className={cn(
              "w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[16px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors text-black font-semibold placeholder:text-gray-400 placeholder:font-normal",
              errors.email ? "border-destructive focus:border-destructive bg-destructive/5" : ""
            )}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
          <Phone className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.phone} <span className="text-destructive ml-1">*</span>
        </label>
        <input
          {...register("phone")}
          placeholder="05XXXXXXXX"
          className={cn(
            "w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[16px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors text-black font-semibold placeholder:text-gray-400 placeholder:font-normal",
            errors.phone ? "border-destructive focus:border-destructive bg-destructive/5" : ""
          )}
        />
      </div>

      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center border-b border-ssk-border pb-4">
           <FileText className={cn("h-4 w-4 text-ssk-cyan mr-2", isAr && "ml-2 mr-0")} /> 
           {isAr ? "إرفاق السيرة الذاتية أو الملف التعريفي" : "Attach Professional Biography / CV"}
           <span className="text-destructive ml-1">*</span>
        </label>
        
        <div 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
             "relative border-2 border-dashed p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all mt-4",
             dragActive ? "border-ssk-cyan bg-ssk-cyan/5" : "border-ssk-border bg-[#f7f9fb] hover:border-ssk-cyan/50 hover:bg-white",
             selectedFile && "border-ssk-cyan bg-white"
          )}
        >
           <input 
             type="file" 
             className="hidden" 
             ref={fileInputRef} 
             accept=".pdf,.doc,.docx"
             onChange={handleFileChange}
           />
           {selectedFile ? (
             <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-ssk-cyan text-white flex items-center justify-center rounded shadow-ssk-glow">
                   <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                   <p className="text-ssk-navy font-bold text-lg mb-1">{selectedFile.name}</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-ssk-cyan">{isAr ? "مستند موثق وجاهز" : "Document Verified & Ready"}</p>
                </div>
             </div>
           ) : (
             <div className="flex flex-col items-center space-y-4 opacity-50 hover:opacity-100 transition-opacity">
                <FileText className="h-12 w-12 text-ssk-navy mb-2" />
                <div>
                   <p className="text-ssk-navy font-bold">{isAr ? "قم بسحب المستند هنا أو اضغط للاستعراض" : "Drag Document Here or Click to Browse"}</p>
                   <p className="text-xs font-bold text-ssk-navy mt-2">{isAr ? "الحد الأقصى (2.5MB). الصيغ: PDF, DOCX" : "Maximum payload (2.5MB). Formats: PDF, DOCX"}</p>
                </div>
                <div className="mt-6 px-8 py-3 bg-ssk-navy text-ssk-cyan text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center">
                   {isAr ? "اختر ملفاً" : "Select File"}
                </div>
             </div>
           )}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
          <MessageSquare className={cn("h-3 w-3 mr-2", isAr && "ml-2 mr-0")} /> {f.labels.summary}
        </label>
        <textarea
          {...register("coverLetter")}
          placeholder={f.placeholders.summary}
          rows={6}
          className={cn(
            "w-full bg-[#f7f9fb] border-b-2 border-ssk-border px-6 py-5 text-[16px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors resize-none text-black font-semibold placeholder:text-gray-400 placeholder:font-normal",
            errors.coverLetter ? "border-destructive focus:border-destructive bg-destructive/5" : ""
          )}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex min-h-[84px] items-center justify-center bg-ssk-navy px-20 text-[16px] font-bold uppercase tracking-[0.2em] text-ssk-cyan shadow-ssk-glow transition-all hover:bg-ssk-cyan hover:text-ssk-navy active:scale-95 group gap-4 disabled:opacity-50 disabled:pointer-events-none mt-12"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className={cn("mr-3 h-5 w-5 animate-spin", isAr && "ml-3 mr-0")} /> {isAr ? "جاري الاعتماد..." : "VALIDATING CANDIDACY..."}
          </>
        ) : (
          <>
            {f.labels.submit} <ArrowRight className={cn("ml-3 h-5 w-5 font-bold", isAr && "mr-3 ml-0 rotate-180")} />
          </>
        )}
      </button>

      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ssk-navy text-center flex items-center justify-center pt-8">
        <ShieldCheck className="h-4 w-4 mr-3" /> {f.validation.confidentiality}
      </p>
    </form>
  );
}
