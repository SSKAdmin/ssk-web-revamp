import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { ShieldCheck, Database, FileCode, Layers, Terminal, Fingerprint, RefreshCcw, Network } from "lucide-react";

export default async function PresentationPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${lang}/login`);
  }

  return (
    <div className="p-8 lg:p-12 pb-32 max-w-[1600px] mx-auto text-white bg-ssk-navy min-h-screen font-sans">
      
      {/* 1. DOCUMENT IDENTIFICATION HEADER */}
      <div className="mb-16 border-b-2 border-ssk-cyan/30 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
        <div className="relative z-10">
          <p className="text-ssk-cyan text-sm font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-ssk-cyan"></span>
            System Blueprint & Tech Transfer
          </p>
          <h1 className="text-[40px] lg:text-[56px] font-black uppercase tracking-tight text-white mb-2 leading-[1.1] " style={{"fontFamily": "var(--font-display)"}}>
             Architecture Handover <br />
             <span className="text-white/40">Root Matrix</span>
          </h1>
        </div>
        
        <div className="bg-white/5 p-6 border border-ssk-cyan/20 rounded-xl min-w-[320px] backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
             <ShieldCheck size={100} />
          </div>
          <p className="text-[10px] text-ssk-cyan font-bold uppercase tracking-widest mb-3 border-b border-ssk-cyan/20 pb-3">
             Sole Architectural Authorship By:
          </p>
          <h2 className="text-[28px] font-black text-white uppercase tracking-wider mb-0 leading-none" style={{"fontFamily": "var(--font-display)"}}>
             Fahad Meshal
          </h2>
          <p className="text-[11px] text-white/50 uppercase tracking-widest font-bold mt-2">
             Principal Enterprise Architect
          </p>
        </div>
      </div>

      <p className="mb-16 text-[18px] leading-relaxed text-white/70 max-w-[1000px] font-medium border-l-[3px] border-ssk-cyan pl-6">
        This matrix represents the definitive blueprint of the SSK Platform ecosystem. 
        It illustrates the absolute end-to-end data flow, authentication gates, and infrastructure topography. 
        <strong className="block mt-4 text-[#ff4c4c] uppercase text-[14px] tracking-widest">
          Warning to subsequent engineering teams: Do not modify the foundational schema, ORM strategies, or Edge Middleware without explicit authorization from the Principal Architect.
        </strong>
      </p>

      {/* TECH TREE ROOT DIAGRAM */}
      <div className="space-y-4">
        
        {/* LEVEL 1: DATABASE & STORAGE */}
        <div className="relative pl-12 pb-16">
          <div className="absolute left-[23px] top-[40px] bottom-0 w-px bg-ssk-cyan/30" />
          <div className="absolute left-[13px] top-[20px] w-5 h-5 rounded-full bg-ssk-cyan border-4 border-ssk-navy z-10" />
          
          <div className="flex items-center gap-4 mb-6 relative">
            <Database className="text-ssk-cyan w-8 h-8" strokeWidth={1.5} />
            <h3 className="text-[22px] font-bold text-white uppercase tracking-widest">Level 0: Data Persistence Layer</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechNode 
              title="PostgreSQL Engine" 
              sub="Serverless Neon Cloud"
              body="Primary relational datastore handling multi-tenant records securely. Scales dynamically with connection pooling out of the box."
            />
            <TechNode 
              title="Drizzle ORM" 
              sub="Zero-Raw SQL Operations"
              body="Type-safe TS querying mapped strictly to schema.ts. Enforces rigid datatype validation before ever hitting the DB. Prevents SQL injection categorically."
            />
            <TechNode 
              title="Blob Storage" 
              sub="Vercel Blob / AWS S3"
              body="Immutable file storage primarily utilized for EDMS Vault components and Recruitment CV intakes. Enforces MIME-type whitelisting."
            />
          </div>
        </div>

        {/* LEVEL 2: SECURITY & MIDDLEWARE */}
        <div className="relative pl-12 pb-16">
          <div className="absolute left-[23px] top-[40px] bottom-0 w-px bg-white/10" />
          <div className="absolute left-[13px] top-[20px] w-5 h-5 rounded-full bg-white/30 border-4 border-ssk-navy z-10" />
          
          <div className="flex items-center gap-4 mb-6">
            <Fingerprint className="text-white/60 w-8 h-8" strokeWidth={1.5} />
            <h3 className="text-[22px] font-bold text-white uppercase tracking-widest">Level 1: Edge Security & Authentication</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechNode 
              title="BCrypt Hashing" 
              sub="Password Cryptography"
              body="Salted 10+ rounds hashing logic executing dynamically. Passwords NEVER stored or logged in plain text. Auth route validates synchronously."
            />
            <TechNode 
              title="NextAuth.js Session" 
              sub="State Management"
              body="Manages uncompromised server-side session cookies. Session payload strips sensitive PII before transmitting token to the browser."
            />
            <TechNode 
              title="Edge Route Control (RBAC)" 
              sub="Middleware.ts Shield"
              body="Next.js Middleware intercepts all `/dashboard` requests at the Edge. Rejects unauthenticated traffic instantly before hitting Node execution."
            />
          </div>
        </div>

        {/* LEVEL 3: API & INFRASTRUCTURE */}
        <div className="relative pl-12 pb-16">
          <div className="absolute left-[23px] top-[40px] bottom-0 w-px bg-white/10" />
          <div className="absolute left-[13px] top-[20px] w-5 h-5 rounded-full bg-white/30 border-4 border-ssk-navy z-10" />
          
          <div className="flex items-center gap-4 mb-6">
            <Network className="text-white/60 w-8 h-8" strokeWidth={1.5} />
            <h3 className="text-[22px] font-bold text-white uppercase tracking-widest">Level 2: API Gateway & Logic Core</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechNode 
              title="Serverless Route Handlers" 
              sub="App Router (/api)"
              body="Decoupled JSON endpoints handling business logic independently. Each endpoint assumes malicious input and triggers Zod validation."
            />
            <TechNode 
              title="Zod Execution" 
              sub="Strict Type Parsing"
              body="Forms and API requests pass through strict Zod schemas. Any deviation from exact typing results in a 400 Bad Request error string."
            />
            <TechNode 
              title="NodeMailer Integration" 
              sub="SMTP Relay"
              body="Automated transactional workflows via SMTP hooks. Fires async confirmation notifications upon Jobs or Contact submissions natively."
            />
          </div>
        </div>

        {/* LEVEL 4: FRONTEND & PRESENTATION */}
        <div className="relative pl-12 pb-8">
          <div className="absolute left-[13px] top-[20px] w-5 h-5 rounded-full bg-ssk-cyan border-4 border-ssk-navy shadow-[0_0_15px_rgba(10,186,181,0.6)] z-10" />
          
          <div className="flex items-center gap-4 mb-6">
            <Layers className="text-ssk-cyan w-8 h-8" strokeWidth={1.5} />
            <h3 className="text-[22px] font-bold text-white uppercase tracking-widest">Level 3: Client Distribution & UI</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechNode 
              title="Next.js 16.2.1" 
              sub="React Server Components (RSC)"
              body="Renders massive UI payloads silently on the server. Zero JS shipped for static informational blocks. Massive TTFB speed gains."
            />
            <TechNode 
              title="Turbopack Engine" 
              sub="Build Verification"
              body="Compiles strictly. Production branches will instantly fail if a single Type error or invalid route configuration is detected."
            />
            <TechNode 
              title="TailwindCSS Engine" 
              sub="JIT Utility Processing"
              body="The absolute SSK aesthetic (Navy, Cyan, White) injected via JS/CSS JIT compilation. Strict class conventions maintain corporate identity."
            />
          </div>
        </div>

      </div>

    </div>
  );
}

// Helper Node Component for clean code and aesthetic precision
function TechNode({ title, sub, body }: { title: string, sub: string, body: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-ssk-cyan/40 hover:bg-white/10 transition-all duration-300">
       <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-white/5 via-transparent to-transparent pointer-events-none" />
       
       <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-ssk-cyan mb-2">
         {sub}
       </h4>
       <h5 className="text-[20px] font-bold text-white leading-tight mb-4 tracking-wide font-[var(--font-display)]">
         {title}
       </h5>
       <p className="text-[13px] text-white/50 leading-relaxed font-medium">
         {body}
       </p>
    </div>
  );
}
