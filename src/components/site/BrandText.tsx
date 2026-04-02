
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandTextProps {
  text: string;
  className?: string;
  logoVariant?: "color" | "white" | "mono";
}

export function BrandText({ text, className, logoVariant = "white" }: BrandTextProps) {
  if (!text) return null;

  // Split text by "SSK" (case-sensitive)
  const parts = text.split("SSK");

  if (parts.length === 1) {
    return <span className={className}>{text}</span>;
  }

  const srcMap = {
    color: "/logo-assets/ssk-logo-primary.svg",
    white: "/logo-assets/ssk-logo-light.svg",
    mono: "/logo-assets/ssk-logo-dark.svg",
  };

  return (
    <span className={cn("inline-flex items-center flex-wrap", className)}>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="inline-flex mx-1 align-baseline items-center justify-center">
              <img
                src={srcMap[logoVariant]}
                alt="SSK"
                className="h-[1.1em] w-auto inline-block object-contain"
                style={{ transform: "translateY(-0.08em)" }}
              />
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
