"use client";

import { use } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(typeof params === 'object' && params !== null && 'then' in params ? params : Promise.resolve(params));
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

  return (
    <>
      {/* pt-[90px] matches navbar height to prevent content cutoff */}
      <div className="flex-grow pt-[90px]">
        <Navbar lang={lang as "en" | "ar"} />
        <main className="min-h-[80vh]">{children}</main>
        <Footer lang={lang as "en" | "ar"} />
      </div>
      
      {/* Global RAG AI Chatbot (Temporarily disabled completely per user request) */}
      {/* <FloatingChatbot lang={lang as "en" | "ar"} /> */}

      <GoogleAnalytics gaId={GTM_ID} />
    </>
  );
}
