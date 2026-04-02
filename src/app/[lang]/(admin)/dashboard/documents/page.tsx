import { getAuthSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { DocumentationClient } from "./components/DocumentationClient";

export default async function DocumentationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const session = await getAuthSession();

  if (!session?.user || (session.user as any).role !== "admin") {
    redirect(`/${lang}/login`);
  }

  return <DocumentationClient lang={lang} />;
}
