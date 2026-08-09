import { AuthCard } from "@/components/auth/auth-card";

export const metadata = { title: "Sign in — AgroSafe Travel" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const role = Array.isArray(sp.role) ? sp.role[0] : (sp.role ?? "guest");

  return <AuthCard role={role} />;
}
