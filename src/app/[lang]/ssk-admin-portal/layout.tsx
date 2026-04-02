import { Sidebar } from "@/components/admin-os/Sidebar";
import { cn } from "@/lib/utils";

export default async function AdminPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div className={cn(
      "min-h-screen bg-[#0E1522] text-slate-300 flex overflow-hidden font-sans",
      lang === "ar" ? "rtl" : "ltr"
    )}>
      {/* 1. SSK OS Navigation Column */}
      <Sidebar lang={lang} />
      
      {/* 2. Operations Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
