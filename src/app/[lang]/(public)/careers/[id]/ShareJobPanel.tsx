"use client";

import { useEffect, useState } from "react";
import { Share2, MessageCircle, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShareJobPanel({ isAr, title, jobId }: { isAr: boolean, title: string, jobId: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const trackShare = () => {
    fetch(`/api/jobs/${jobId}/share`, { method: "POST" }).catch(console.error);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackShare();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  const whatsappText = isAr 
    ? `أعتقد أن هذه الوظيفة (${title}) في شركة SSK تناسبك. تفضل الرابط:` 
    : `I found this role (${title}) at SSK that might interest you. Check it out:`;

  return (
    <div className="pt-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ssk-navy mb-4 text-center">
        {isAr ? "مشاركة هذه الفرصة" : "Distribute Opportunity"}
      </p>
      
      <div className="flex justify-center gap-3">
        <a 
          href={`https://wa.me/?text=${encodeURIComponent(whatsappText + " " + url)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackShare}
          className="w-10 h-10 border border-ssk-border flex items-center justify-center text-ssk-navy hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackShare}
          className="w-10 h-10 border border-ssk-border flex items-center justify-center text-ssk-navy hover:bg-[#0077B5] hover:text-white hover:border-transparent transition-all"
        >
          <Share2 className="w-5 h-5" />
        </a>

        <button 
          onClick={handleCopy}
          className={cn(
            "w-10 h-10 border border-ssk-border flex items-center justify-center transition-all",
            copied ? "bg-ssk-cyan text-ssk-navy border-transparent" : "text-ssk-navy hover:bg-ssk-navy hover:text-white"
          )}
        >
          {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
