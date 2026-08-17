"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  Building2,
  Menu,
  PlusCircle,
  Settings,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  isHighlight?: boolean;
};

// Guest Navigation Items
const GUEST_NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/safety", label: "Safety Check" },
  { href: "/report", label: "Report Landslide" },
  { href: "/live", label: "View Live Landslides" },
  { href: "/bookings", label: "My Bookings" },
];

// Host Navigation Items (deduplicated - single entry for Host dashboard/properties)
const HOST_NAV: NavItem[] = [
  { href: "/host", label: "My Hostings" },
  { href: "/safety", label: "Safety Check" },
  { href: "/report", label: "Report Landslide" },
  { href: "/live", label: "Live Landslides" },
  { href: "/host/farms/new", label: "List new farm", isHighlight: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isHostRole, setIsHostRole] = useState(false);

  // Sync role from localStorage or active URL route
  useEffect(() => {
    setOpen(false);

    // If on host routes, default to host mode
    if (pathname.startsWith("/host")) {
      setIsHostRole(true);
      return;
    }

    try {
      const stored = localStorage.getItem("agrosafe_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.role === "host") {
          setIsHostRole(true);
          return;
        }
      }
    } catch {
      // ignore
    }
  }, [pathname]);

  const navItems: NavItem[] = isHostRole ? HOST_NAV : GUEST_NAV;

  const toggleRole = () => {
    const nextRole = isHostRole ? "guest" : "host";
    setIsHostRole(!isHostRole);
    try {
      const stored = localStorage.getItem("agrosafe_user");
      const user = stored ? JSON.parse(stored) : {};
      localStorage.setItem(
        "agrosafe_user",
        JSON.stringify({ ...user, role: nextRole })
      );
    } catch {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Role Pill */}
        <div className="flex items-center gap-3">
          <Link
            href={isHostRole ? "/host" : "/"}
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-brand-700 shrink-0"
          >
            <span className="size-2.5 rounded-full bg-brand-600 inline-block" />
            AgroSafe Travel
          </Link>

          {/* Quick role badge & toggle button */}
          <button
            type="button"
            onClick={toggleRole}
            title={isHostRole ? "Switch to Traveler View" : "Switch to Host View"}
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold transition-all border",
              isHostRole
                ? "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
            )}
          >
            {isHostRole ? (
              <>
                <Building2 size={12} className="text-amber-700" />
                <span>Host Mode</span>
              </>
            ) : (
              <>
                <span className="size-1.5 rounded-full bg-emerald-600" />
                <span>Guest Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden items-center gap-5 lg:gap-6 md:flex">
          {navItems.map((item, idx) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/host"
                ? pathname === "/host"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={`${item.href}-${item.label}-${idx}`}
                href={item.href}
                className={cn(
                  "text-xs lg:text-sm font-medium transition-colors hover:text-brand-700 flex items-center gap-1.5",
                  isActive ? "font-bold text-brand-700" : "text-ink",
                  item.isHighlight &&
                    "rounded-md bg-brand-50 px-2.5 py-1 text-brand-800 font-semibold border border-brand-200 hover:bg-brand-100"
                )}
              >
                {item.isHighlight && <PlusCircle size={14} className="text-brand-700" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Link
            href="/notifications"
            aria-label="Notifications"
            className={cn(
              "relative rounded-md p-2 text-ink hover:bg-black/5 transition-colors",
              pathname === "/notifications" && "bg-black/5 text-brand-700"
            )}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger ring-2 ring-canvas" />
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            aria-label="Settings"
            className={cn(
              "rounded-md p-2 text-ink hover:bg-black/5 transition-colors",
              pathname === "/settings" && "bg-black/5 text-brand-700"
            )}
          >
            <Settings size={20} />
          </Link>

          {/* User Account */}
          <Link
            href="/settings"
            aria-label="Account Profile"
            className={cn(
              "rounded-full border border-line bg-black/5 p-2 text-ink hover:bg-black/10 transition-colors",
              pathname === "/login" && "ring-2 ring-brand-700"
            )}
          >
            <User size={18} />
          </Link>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            className="rounded-md p-2 text-ink hover:bg-black/5 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {open ? (
        <nav className="border-t border-line bg-canvas md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 space-y-1">
            <div className="flex items-center justify-between pb-2 border-b border-line mb-2">
              <span className="text-xs font-bold uppercase text-ink-subtle">
                Viewing as {isHostRole ? "Host" : "Guest"}
              </span>
              <button
                type="button"
                onClick={toggleRole}
                className="text-xs font-bold text-brand-700 underline"
              >
                Switch to {isHostRole ? "Guest" : "Host"}
              </button>
            </div>

            {navItems.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href === "/host"
                  ? pathname === "/host"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={`mobile-${item.href}-${idx}`}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-black/5",
                    isActive ? "bg-brand-50 text-brand-700 font-bold" : "text-ink",
                    item.isHighlight && "bg-brand-50/60 text-brand-800 font-semibold"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="border-t border-line pt-2 mt-2">
              <Link
                href="/login"
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-black/5"
              >
                <span>Switch / Login Account</span>
                <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">Auth</span>
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
