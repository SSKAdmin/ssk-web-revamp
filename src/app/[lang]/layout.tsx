import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Outfit, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const outfit = Outfit({ variable: "--font-body", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-display", subsets: ["latin"], weight: ["700", "800", "900"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const ibmPlexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", weight: ["300", "400", "500", "600", "700"] });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === "production" ? "https://www.ssk.sa" : "http://localhost:3000");
  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${dict.navigation.home} - SSK Strategy, Execution, and Knowledge`,
      default: dict.metadata.home.title,
    },
    description: dict.metadata.home.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isRtl = lang === "ar";

  return (
      <html
        lang={lang}
        dir={isRtl ? "rtl" : "ltr"}
        className={`${outfit.variable} ${montserrat.variable} ${geistMono.variable} ${ibmPlexArabic.variable} h-full antialiased scroll-smooth`}
        suppressHydrationWarning
      >
        <body suppressHydrationWarning className={cn(
          "min-h-full flex flex-col font-medium transition-colors relative",
          "selection:bg-ssk-cyan/30 bg-ssk-surface text-ssk-navy",
          isRtl ? 'font-arabic' : 'font-sans'
        )}>
        {children}
      </body>
    </html>
  );
}
