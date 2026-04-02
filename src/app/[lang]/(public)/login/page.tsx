import { LoginForm } from "@/components/site/LoginForm";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  // Can't await params directly in standard metadata if doing async, but for title we can just return standard
  return {
    title: "Executive Portal | SSK",
    description: "Secure Access Protocol",
  };
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  return <LoginForm params={params} searchParams={searchParams} />;
}
