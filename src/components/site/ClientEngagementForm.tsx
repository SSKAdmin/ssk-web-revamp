"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const engagementSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,13}$/, "Please enter a valid email"),
  organization: z.string().optional(),
  phone: z.string().regex(/^05\d{8}$/, "Mobile number must start with 05 and be exactly 10 digits"),
  initiativeType: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().optional(),
});

type EngagementValues = z.infer<typeof engagementSchema>;

export function ClientEngagementForm({ 
  lang,
  labels,
  placeholders,
  options,
  submitText
}: { 
  lang: string;
  labels: Record<string, string>;
  placeholders: Record<string, string>;
  options: Record<string, string>;
  submitText: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const isAr = lang === "ar";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EngagementValues>({
    resolver: zodResolver(engagementSchema)
  });

  async function onSubmit(data: EngagementValues) {
    setStatus("submitting");
    setErrorMessage("");

    // Combine payload for generic contact logging backend
    const combinedMessage = "Initiative: " + data.initiativeType + "\\nTimeline: " + (data.timeline || 'N/A') + "\\n\\nDetails:\\n" + data.description;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          organization: data.organization,
          phone: data.phone || "",
          message: combinedMessage
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Submission failed");
      }

      setStatus("success");
      // The backend doesn't explicitly return the reference ID in the JSON body,
      // but it promises to send it via email. We'll show a generic success notice.
      reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setTimeout(() => {
        const errElement = document.getElementById("form-error-banner");
        if (errElement) errElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }

  const onError = (errors: any) => {
    const firstError = Object.keys(errors)[0];
    const el = document.querySelector(`[name="${firstError}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLElement).focus();
    }
  };

  if (status === "success") {
    return (
      <div className="p-12 md:p-20 bg-ssk-navy border border-ssk-cyan/30 text-center animate-in zoom-in-95 duration-500 shadow-[0_0_40px_rgba(10,186,181,0.15)] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-ssk-cyan"></div>
        <div className="w-20 h-20 bg-ssk-cyan/10 text-ssk-cyan rounded-full flex items-center justify-center mx-auto mb-8 border border-ssk-cyan/30">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className={cn("text-3xl font-bold uppercase tracking-widest text-white mb-6", isAr && "font-[var(--font-arabic)] tracking-normal text-4xl")}>
          {isAr ? "تم قيد طلب التنفيذ" : "Engagement Registered"}
        </h3>
        <p className="text-white/60 font-medium mb-12 leading-relaxed max-w-[600px] mx-auto text-lg">
          {isAr 
            ? "تم استلام تفاصيل المبادرة بنجاح وتم تسجيلها في أنظمة SSK بمرجع تتبع موثق. تم إرسال رسالة بريد إلكتروني تحتوي على المرجع والتفاصيل. سيقوم فريقنا التنفيذي بالتواصل معكم قريباً." 
            : "Your initiative details have been received and logged into SSK systems with a secure reference ID. An email containing your tracking reference has been dispatched. Our executive team will contact you shortly."}
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="inline-flex min-h-[64px] items-center justify-center border border-ssk-cyan px-16 text-[12px] font-bold uppercase tracking-[0.3em] text-ssk-cyan hover:bg-ssk-cyan hover:text-ssk-navy transition-all"
        >
          {isAr ? "إرسال طلب آخر" : "Submit Another Request"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={cn("space-y-12", isAr && "text-right")} dir={isAr ? "rtl" : "ltr"}>
      {status === "error" && (
        <div id="form-error-banner" className="p-6 bg-destructive/10 border-l-4 border-destructive text-destructive font-bold text-sm tracking-wide flex items-center">
          <AlertCircle className={cn("h-5 w-5 mr-4", isAr && "ml-4 mr-0")} />
          <span>{isAr ? "عذراً، فشل إرسال الطلب: " : "Submission Failed: "}{errorMessage}</span>
        </div>
      )}

      {/* ERROR LIST SUMMARY BOLDNESS */}
      {Object.keys(errors).length > 0 && (
         <div className="p-6 bg-ssk-navy border border-destructive/50 text-white/50 text-sm mb-8 relative">
           <div className="absolute top-0 left-0 w-1 h-full bg-destructive"></div>
           <strong className="text-destructive block mb-3 uppercase tracking-widest text-xs">{isAr ? "أخطاء في الإدخال" : "Validation Sequence Incomplete"}</strong>
           <ul className="list-disc pl-5 rtl:pr-5 space-y-1">
              {Object.values(errors).map((err, i) => (
                <li key={i} className="text-destructive/80 font-medium">{err.message}</li>
              ))}
           </ul>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
            {labels.org_name}
          </label>
          <input 
            {...register("organization")}
            placeholder={placeholders.org_name}
            className={cn(
               "w-full bg-[#f7f9fb] text-black font-semibold border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors",
               errors.organization ? "border-destructive focus:border-destructive bg-destructive/5" : ""
            )}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
            {labels.contact_person}
          </label>
          <input 
            {...register("name")}
            placeholder={placeholders.contact_person}
            className={cn(
               "w-full bg-[#f7f9fb] text-black font-semibold border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors",
               errors.name ? "border-destructive focus:border-destructive bg-destructive/5" : ""
            )}
          />
        </div>
      </div>

      {/* CRITICAL MISSING CONTACT FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
            {isAr ? "البريد الإلكتروني" : "Email Address"} <span className="text-destructive ml-1">*</span>
          </label>
          <input 
            {...register("email")}
            placeholder={isAr ? "البريد الإلكتروني للجهة" : "Corporate Email Address"}
            className={cn(
               "w-full bg-[#f7f9fb] text-black font-semibold border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors",
               errors.email ? "border-destructive focus:border-destructive bg-destructive/5" : ""
            )}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
             {isAr ? "رقم الهاتف" : "Phone Number"} <span className="text-destructive ml-1">*</span>
          </label>
          <input 
            {...register("phone")}
            placeholder="05XXXXXXXX"
            pattern="[0-9]*"
            className={cn(
               "w-full bg-[#f7f9fb] text-black font-semibold border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors",
               errors.phone ? "border-destructive focus:border-destructive bg-destructive/5" : ""
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
            {labels.initiative_type}
          </label>
          <select 
            {...register("initiativeType")}
            className={cn(
               "w-full bg-[#f7f9fb] text-black font-semibold border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors appearance-none",
               errors.initiativeType ? "border-destructive focus:border-destructive bg-destructive/5" : ""
            )}
          >
            <option value="">{isAr ? "اختر التصنيف..." : "Select classification..."}</option>
            <option value="transformation">{options.transformation}</option>
            <option value="national">{options.national}</option>
            <option value="infrastructure">{options.infrastructure}</option>
            <option value="other">{options.other}</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy">
            {labels.timeline}
          </label>
          <input 
            {...register("timeline")}
            placeholder={placeholders.timeline}
            className="w-full bg-[#f7f9fb] text-black font-semibold border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors"
          />
        </div>
      </div>

      <div className="space-y-3 border-t border-ssk-border pt-12">
        <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-ssk-navy flex items-center">
          {labels.requirement_description}
        </label>
        <textarea 
          {...register("description")}
          rows={6}
          placeholder={placeholders.description}
          className={cn(
             "w-full bg-[#f7f9fb] text-black font-semibold border-b-2 border-ssk-border px-6 py-5 text-[18px] focus:border-ssk-cyan focus:bg-white outline-none transition-colors resize-none",
             errors.description ? "border-destructive focus:border-destructive bg-destructive/5" : ""
          )}
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[84px] items-center justify-center bg-ssk-navy px-20 text-[16px] font-bold uppercase tracking-[0.2em] text-ssk-cyan shadow-ssk-glow transition-all hover:bg-ssk-cyan hover:text-ssk-navy active:scale-95 group gap-4 disabled:opacity-50 disabled:pointer-events-none"
      >
        {status === "submitting" ? (
           <><Loader2 className="h-5 w-5 animate-spin" /> {isAr ? "جاري الإرسال..." : "TRANSMITTING..."}</>
        ) : (
           <>
              {submitText}
              <Send className={cn("h-5 w-5 transition-transform", isAr && "rotate-180", !isAr && "group-hover:translate-x-2 group-hover:-translate-y-2")} />
           </>
        )}
      </button>
    </form>
  );
}
