"use client";

import * as React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { SSKLogo } from "@/components/site/SSKLogo";
import { cn } from "@/lib/utils";

export function LoginForm({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const router = useRouter();
  const { lang } = React.use(params);
  const { callbackUrl: rawCallbackUrl } = React.use(searchParams);
  const callbackUrl = rawCallbackUrl || `/${lang}/dashboard`;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isAr = lang === "ar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(isAr ? "فشل التفويض. يرجى التحقق من بيانات الاعتماد الخاصة بك." : "Authorization failed. Please verify your credentials.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("System malfunction. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ssk-navy flex items-center justify-center p-6 relative overflow-hidden">
      {/* 1. ARCHITECTURAL DECOR */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,var(--color-ssk-cyan)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-ssk-cyan/5 -skew-x-12 translate-x-1/4"></div>

      {/* 2. LOGIN CORE */}
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex flex-col items-center space-y-4 mb-8">
            <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-ssk-cyan" />
            </div>
            <div className="mb-8 flex justify-center">
              <SSKLogo variant="white" width={180} height={60} />
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] text-ssk-cyan uppercase opacity-60">
               {isAr ? "الاستراتيجية، التنفيذ، والمعرفة" : "Strategy, Execution, and Knowledge"}
            </span>
          </div>

          <h1 className={cn(
            "text-3xl font-black text-white uppercase tracking-tight mb-4 leading-none",
            isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {isAr ? "مدخل الإدارة" : "Executive Portal"}
          </h1>
          <p className={cn(
            "text-xs font-black uppercase tracking-[0.3em] text-white/40",
            isAr && "font-[var(--font-arabic)] tracking-normal"
          )}>
            {isAr ? "بروتوكول الوصول الأمن" : "Secure Access Protocol"}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 shadow-2xl relative">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center">
              <ShieldAlert className="h-4 w-4 mr-3 rtl:mr-0 rtl:ml-3 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] text-ssk-cyan",
                isAr && "font-[var(--font-arabic)]"
              )}>
                 {isAr ? "البريد الإلكتروني" : "Email Identification"}
              </label>
              <Input
                type="email"
                required
                className="bg-white/5 border-white/10 text-white rounded-none focus:border-ssk-cyan focus:ring-0 placeholder:opacity-20"
                placeholder="admin@ssk.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] text-ssk-cyan",
                isAr && "font-[var(--font-arabic)]"
              )}>
                 {isAr ? "كلمة المرور" : "Security Credential"}
              </label>
              <Input
                type="password"
                required
                className="bg-white/5 border-white/10 text-white rounded-none focus:border-ssk-cyan focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-ssk-cyan text-ssk-navy hover:bg-white font-black uppercase tracking-widest text-xs py-8 rounded-none transition-all shadow-ssk-glow"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                isAr ? "بدء الجلسة" : "Initialize Session"
              )}
            </Button>
          </form>
        </div>

        <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
          Internal Systems Gateway — Restricted
        </div>
      </div>
    </main>
  );
}
