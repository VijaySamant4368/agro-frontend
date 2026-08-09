import Link from "next/link";
import { Globe, Mail } from "lucide-react";

const LINKS = [
  "Terms of Service",
  "Privacy Policy",
  "Contact Support",
  "Regional Guidelines",
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-black/[0.03]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-bold">AgroSafe Travel</p>
          <p className="mt-1 text-sm text-ink-muted">
            © 2024 AgroSafe Travel. All rights reserved. Emergency: +91-XXXX-XXXXXX
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((label) => (
            <Link
              key={label}
              href="/"
              className="text-sm text-ink-muted transition-colors hover:text-brand-700"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3 text-ink-muted">
          <Link href="/" aria-label="Regional sites" className="hover:text-brand-700">
            <Globe size={20} />
          </Link>
          <Link href="/" aria-label="Email support" className="hover:text-brand-700">
            <Mail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
