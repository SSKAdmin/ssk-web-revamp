"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoVariant = "color" | "white" | "mono";
type LogoType = "logo" | "mark";

interface SSKLogoProps {
  variant?: LogoVariant;
  type?: LogoType;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function SSKLogo({
  variant = "color",
  type = "logo",
  className,
  width = 220, // recommended minimum brand width
  height = 70, // proportionally scaled
}: SSKLogoProps) {
  
  const [imgError, setImgError] = useState(false);
  const accentColor = variant === "white" ? "#FFFFFF" : variant === "mono" ? "#9CA3AF" : "#0EA5A4";
  const textColor = variant === "white" ? "#FFFFFF" : variant === "mono" ? "#9CA3AF" : "#0B1F3A";

  // Map to the exact pristine Brand Pack Professional filenames
  const imageSource = 
    type === "mark" 
      ? "/logo-assets/ssk-icon-minimal.svg"
      : (variant === "white" ? "/logo-assets/ssk-logo-light.svg" : variant === "mono" ? "/logo-assets/ssk-logo-dark.svg" : "/logo-assets/ssk-logo-primary.svg");

  return (
    <div 
      className={cn(
        "relative flex items-center justify-start select-none",
        variant === "mono" && "grayscale opacity-50",
        className
      )}
      style={{ width, minWidth: width, height, minHeight: height }}
    >
      <img 
        src={imageSource} 
        alt="SSK Smart Solutions Key Bilingual Logo"
        width={width}
        height={height}
        className="object-contain object-left w-auto max-w-full h-full drop-shadow-sm"
      />
    </div>
  );
}
