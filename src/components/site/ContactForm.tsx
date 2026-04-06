"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,13}$/, "Please enter a valid business email"),
  phone: z.string().regex(/^05\d{8}$/, "Mobile number must start with 05 and be exactly 10 digits"),
  organization: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  dict: any;
  isRtl: boolean;
}

export function ContactForm({ dict, isRtl }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const c = dict.contact_page.form;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
      honeypot: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.error || "Submission failed");

      setStatus("success");
      reset();
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      
      // Auto-scroll to error message container so user immediately sees it
      setTimeout(() => {
        const errElement = document.getElementById("form-error-banner");
        if (errElement) {
          errElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }

  // To auto-scroll on form validation errors from Zod
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
      <div className="bg-white border border-ssk-border p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CheckCircle2 className="h-16 w-16 text-ssk-cyan mx-auto mb-6" />
        <h3 className={cn(
          "font-[var(--font-display)] text-2xl font-bold text-ssk-navy mb-4",
          isRtl && "font-[var(--font-arabic)]"
        )}>
          {isRtl ? "تم الإرسال بنجاح" : "Submission Successful"}
        </h3>
        <p className="text-ssk-text-soft font-medium leading-relaxed max-w-[400px] mx-auto">
          {c.success}
        </p>
        <Button 
          onClick={() => setStatus("idle")}
          className="mt-8 bg-ssk-navy hover:bg-ssk-cyan text-white hover:text-ssk-navy font-bold uppercase tracking-[0.2em] px-12 py-6 text-[13px] rounded-none h-auto transition-all"
        >
          {isRtl ? "إرسال رسالة أخرى" : "Send another inquiry"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8 animate-in fade-in duration-500">
      {/* Honeypot field - Hidden from users */}
      <div className="hidden">
        <input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className={cn(
            "text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-navy",
            isRtl && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {c.fields.name}
          </label>
          <Input 
            {...register("name")}
            className={cn(
              "bg-white border-ssk-border rounded-none py-6 focus:border-ssk-cyan focus:ring-0 transition-colors h-14 text-black font-semibold placeholder:text-neutral-400 placeholder:font-medium",
              isRtl && "text-right font-[var(--font-arabic)]",
              errors.name && "border-red-500 focus:border-red-500"
            )} 
            placeholder={isRtl ? "الاسم الكامل" : "Full Name"} 
          />
          {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.3em]">{errors.name.message}</p>}
        </div>
        <div className="space-y-3">
          <label className={cn(
            "text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-navy",
            isRtl && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {c.fields.email}
          </label>
          <Input 
            {...register("email")}
            className={cn(
              "bg-white border-ssk-border rounded-none py-6 focus:border-ssk-cyan focus:ring-0 transition-colors h-14 text-black font-semibold placeholder:text-neutral-400 placeholder:font-medium",
              isRtl && "text-right font-[var(--font-arabic)]",
              errors.email && "border-red-500 focus:border-red-500"
            )} 
            placeholder="email@organization.com" 
          />
          {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.3em]">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className={cn(
            "text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-navy",
            isRtl && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {c.fields.organization}
          </label>
          <Input 
            {...register("organization")}
            className={cn(
              "bg-white border-ssk-border rounded-none py-6 focus:border-ssk-cyan focus:ring-0 h-14 text-black font-semibold placeholder:text-neutral-400 placeholder:font-medium",
              isRtl && "text-right font-[var(--font-arabic)]"
            )} 
            placeholder={isRtl ? "اسم الجهة" : "Organization Name"} 
          />
        </div>
        <div className="space-y-3">
          <label className={cn(
            "text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-navy",
            isRtl && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {c.fields.phone} <span className="text-destructive ml-1">*</span>
          </label>
          <Input 
            {...register("phone")}
            className={cn(
              "bg-white border-ssk-border rounded-none py-6 focus:border-ssk-cyan focus:ring-0 h-14 text-black font-semibold placeholder:text-neutral-400 placeholder:font-medium",
              isRtl && "text-right font-[var(--font-arabic)]"
            )} 
            placeholder="05XXXXXXXX" 
            pattern="[0-9]*"
          />
          {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.2em]">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <label className={cn(
          "text-[11px] font-bold uppercase tracking-[0.3em] text-ssk-navy",
          isRtl && "font-[var(--font-arabic)] tracking-normal"
        )}>
          {c.fields.message}
        </label>
        <Textarea 
          {...register("message")}
          className={cn(
            "bg-white border-ssk-border rounded-none py-6 min-h-[160px] focus:border-ssk-cyan focus:ring-0 transition-colors text-black font-semibold placeholder:text-neutral-400 placeholder:font-medium",
            isRtl && "text-right font-[var(--font-arabic)]",
            errors.message && "border-red-500 focus:border-red-500"
          )} 
          placeholder={isRtl ? "نبذة عن استفساركم..." : "Brief overview of your requirement..."} 
        />
        {errors.message && <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.3em]">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <div id="form-error-banner" className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold uppercase tracking-[0.3em]">
          <AlertCircle className="h-5 w-5" />
          {c.error}
        </div>
      )}

      <Button 
        type="submit"
        disabled={status === "submitting"}
        className="w-full lg:w-auto bg-ssk-navy hover:bg-ssk-cyan text-white hover:text-ssk-navy font-bold uppercase tracking-[0.3em] px-16 py-10 text-[13px] rounded-none h-auto transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className={cn("h-4 w-4 animate-spin", isRtl ? "ml-3" : "mr-3")} />
            {c.submitting}
          </>
        ) : (
          c.fields.submit
        )}
      </Button>
    </form>
  );
}
