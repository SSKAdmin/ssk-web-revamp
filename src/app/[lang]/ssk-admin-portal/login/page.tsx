"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Terminal, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || "en";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, turnstileToken: "mock-token" }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = `/${lang}/ssk-admin-portal`;
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050a14] text-slate-300 font-sans">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#0E1522] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#1d9cf0] text-black rounded-xl flex flex-col items-center justify-center mb-4 shadow-[0_0_30px_rgba(29,156,240,0.3)]">
            <Terminal className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Authorization</h1>
          <p className="text-xs text-slate-400 mt-2 tracking-widest uppercase">SSK OS Command Level</p>
        </div>

        {error && (
          <div className="relative z-10 bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-lg mb-6 flex items-start gap-2">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="relative z-10 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Identity Descriptor
            </label>
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="administrator@ssk.sa"
                className="w-full bg-[#050a14] border border-white/10 rounded-lg px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-[#1d9cf0] focus:ring-1 focus:ring-[#1d9cf0] transition-all duration-300 shadow-inner"
              />
              <div className="absolute left-4 top-1/2 -transform-y-1/2 text-slate-500 group-focus-within:text-[#1d9cf0] transition-colors">
                <Users className="w-4 h-4 mt-3" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Cryptographic Key
            </label>
            <div className="relative group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full bg-[#050a14] border border-white/10 rounded-lg px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-[#1d9cf0] focus:ring-1 focus:ring-[#1d9cf0] transition-all duration-300 shadow-inner"
              />
              <div className="absolute left-4 top-1/2 -transform-y-1/2 text-slate-500 group-focus-within:text-[#1d9cf0] transition-colors">
                <Lock className="w-4 h-4 mt-3" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#1d9cf0] hover:bg-[#1985cc] text-black font-semibold rounded-lg px-4 py-3 text-sm flex justify-between items-center transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            <span>{loading ? "Authenticating Request..." : "Initialize Session"}</span>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-500 flex justify-center items-center gap-1">
            <Lock className="w-3 h-3" /> Secured by Proprietary Intercept JWT Engine
          </p>
        </div>
      </div>
    </div>
  );
}

// Temporary Icon for the form visually matching users since 'Users' import was missing above
function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
