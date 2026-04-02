import type { Metadata } from "next";
import { Geist_Mono, Inter, Montserrat, Alexandria } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const inter = Inter({ variable: "--font-body", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-display", subsets: ["latin"], weight: ["700", "800", "900"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const alexandria = Alexandria({ subsets: ["arabic", "latin"], variable: "--font-alexandria", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === "production" ? "https://www.ssksaudi.com" : "http://localhost:3000");
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
      className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} ${alexandria.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className={cn(
        "min-h-full flex flex-col font-medium transition-colors relative",
        "selection:bg-ssk-cyan/30 bg-ssk-surface text-ssk-navy",
        isRtl ? 'font-alexandria' : 'font-sans'
      )}>
        {children}
      </body>
    </html>
  );
}
