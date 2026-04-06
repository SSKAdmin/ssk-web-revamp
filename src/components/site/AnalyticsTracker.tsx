"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Fire and forget strategy - won't block UI thread
    if (!pathname || pathname.includes('/admin')) return;

    let sessionId = sessionStorage.getItem("ssk_client_session");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("ssk_client_session", sessionId);
    }

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, sessionId }),
      keepalive: true,
    }).catch(() => {
      // Intentionally swallow errors so client experience is unbothered
    });

  }, [pathname]);

  return null; // Invisible structural component
}
