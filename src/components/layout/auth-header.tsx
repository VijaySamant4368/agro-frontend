import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/safety", label: "Safety Matrix" },
  { href: "/report", label: "Report Landslide" },
];

/** Slim header for signed-out screens — no notifications, no account menu. */
export function AuthHeader() {
  return (
    <header className="border-b border-line bg-canvas">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-brand-700">
          AgroSafe Travel
        </Link>

        <nav className="mx-auto hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ButtonLink href="/login?role=host" variant="outline" size="sm" className="hidden sm:inline-flex">
            Switch to Host
          </ButtonLink>
          <ButtonLink href="/login" size="sm">
            Login
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
