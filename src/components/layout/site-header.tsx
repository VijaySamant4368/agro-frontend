"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Menu, Settings, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/safety", label: "Safety Check" },
  { href: "/report", label: "Report Landslide" },
  { href: "/live", label: "View Live Landslides" },
  { href: "/bookings", label: "My Bookings" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-brand-700 shrink-0">
          AgroSafe Travel
        </Link>

        <nav className="mx-auto hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-700",
                pathname === item.href ? "text-brand-700" : "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-md p-2 text-ink hover:bg-black/5"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger" />
          </button>

          <Link
            href="/settings"
            aria-label="Settings"
            className="rounded-md p-2 text-ink hover:bg-black/5"
          >
            <Settings size={20} />
          </Link>

          <Link
            href="/login"
            aria-label="Account"
            className="rounded-md border border-line bg-black/5 p-2 text-ink hover:bg-black/10"
          >
            <User size={20} />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-md p-2 text-ink hover:bg-black/5 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line bg-canvas lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-2 py-3 text-sm font-medium hover:bg-black/5",
                    pathname === item.href ? "text-brand-700" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
