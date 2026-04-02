import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth/session";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

import { Sidebar } from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const session = await getAuthSession();

  // 1. Authentication Guard
  if (!session?.user) {
    redirect(`/${lang}/login`);
  }

  // 2. Role-Based Authorization Guard
  const userRole = (session.user as any).role;
  if (userRole !== "admin") {
    redirect(`/${lang}`);
  }

  return (
    <div className="min-h-screen bg-[#021C2A] text-white flex overflow-hidden">
      <Sidebar lang={lang} />
      
      {/* 3. SSK Command Center Shell */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="border-b border-white/5 bg-[#021C2A]/80 backdrop-blur-md px-8 py-6 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-1.5 h-1.5 bg-[#1CC8C8] animate-pulse"></div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-[0.4em] text-[#1CC8C8]">
                  Operations Management Center
                </p>
                <h1 className="text-xl font-bold uppercase tracking-tight">
                  Administrative Workspace
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase opacity-40">{userRole}</p>
                <p className="text-xs font-bold">{session.user.email}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs">
                {session.user.name?.[0] || "A"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
