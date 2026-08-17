"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  KeyRound,
  Lock,
  ShieldCheck,
  Sparkles,
  User,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type Tab = "login" | "signup";
type Role = "guest" | "host";

export function AuthCard({ initialRole = "guest" }: { initialRole?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Role can come from props or search param query
  const queryRole = searchParams.get("role");
  const [role, setRole] = useState<Role>(
    queryRole === "host" || initialRole === "host" ? "host" : "guest"
  );
  const [tab, setTab] = useState<Tab>("login");

  // Form states
  const [form, setForm] = useState({
    name: "",
    farmName: "",
    location: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Sync role state if URL param changes
  useEffect(() => {
    if (queryRole === "host" || queryRole === "guest") {
      setRole(queryRole);
    }
  }, [queryRole]);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setError("");
    setDone(false);
    // Update URL query smoothly
    router.replace(`/login?role=${newRole}`, { scroll: false });
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  function handleDemoFill() {
    if (role === "guest") {
      setForm({
        name: "Anjali Sharma",
        farmName: "",
        location: "Nainital, Uttarakhand",
        phone: "+91 98765 43210",
        email: "anjali.sharma@example.com",
        password: "password123",
        confirm: "password123",
      });
    } else {
      setForm({
        name: "John Doe",
        farmName: "Green Valley Retreat",
        location: "Chamoli, Uttarakhand",
        phone: "+91 94120 55555",
        email: "host@greenvalleyretreat.in",
        password: "hostpassword123",
        confirm: "hostpassword123",
      });
    }
    setError("");
  }

  function validate() {
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (tab === "signup") {
      if (!form.name.trim()) return "Please enter your full name.";
      if (role === "host" && !form.farmName.trim()) return "Please enter your farmstay / estate name.";
      if (form.password !== form.confirm) return "Passwords do not match.";
    }
    return "";
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const message = validate();
    setError(message);
    if (!message) {
      // Store current user session in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "agrosafe_user",
          JSON.stringify({
            name: form.name || (role === "host" ? "John Doe" : "Anjali Sharma"),
            email: form.email,
            role,
          })
        );
      }
      setDone(true);
    }
  }

  function switchTo(next: Tab) {
    setTab(next);
    setError("");
    setDone(false);
  }

  return (
    <div className="w-full max-w-xl rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-10">
      {/* Host vs Guest Role Switcher at the very top */}
      <div className="mb-8">
        <p className="mb-2.5 text-center text-xs font-bold uppercase tracking-wider text-ink-subtle">
          Select Account Type
        </p>
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-canvas p-1.5">
          <button
            type="button"
            onClick={() => handleRoleChange("guest")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-bold transition-all",
              role === "guest"
                ? "bg-surface text-brand-800 shadow-sm border border-brand-200"
                : "text-ink-muted hover:text-ink hover:bg-black/5"
            )}
          >
            <User size={16} className={role === "guest" ? "text-brand-700" : "text-ink-muted"} />
            <span>Traveler / Guest</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("host")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-bold transition-all",
              role === "host"
                ? "bg-surface text-brand-800 shadow-sm border border-brand-200"
                : "text-ink-muted hover:text-ink hover:bg-black/5"
            )}
          >
            <Building2 size={16} className={role === "host" ? "text-brand-700" : "text-ink-muted"} />
            <span>Farm Host</span>
          </button>
        </div>
      </div>

      {/* Role Context Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-3 border">
          {role === "guest" ? (
            <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border-emerald-200">
              <UserCheck size={13} />
              Traveler / Guest Portal
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-800 bg-amber-50 border-amber-200">
              <Building2 size={13} />
              Farmstay Host Dashboard
            </span>
          )}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {role === "guest"
            ? tab === "login"
              ? "Welcome Back"
              : "Create Guest Account"
            : tab === "login"
            ? "Host Portal Sign In"
            : "Register as Farm Host"}
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          {role === "guest"
            ? tab === "login"
              ? "Sign in to access community alerts and travel safety resources."
              : "Join to book verified farmstays and receive regional hazard alerts."
            : tab === "login"
            ? "Sign in to manage your farm listings, bookings, and escrow payouts."
            : "List your rural farmstay, connect with eco-travelers, and receive escrow bookings."}
        </p>
      </div>

      {/* Login vs Sign Up Tabs */}
      <div className="mt-8 grid grid-cols-2 border-b border-line" role="tablist">
        {(["login", "signup"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => switchTo(t)}
            className={cn(
              "-mb-px border-b-2 pb-3 text-sm font-bold transition-colors",
              tab === t
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            {t === "login" ? "Login" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Success State */}
      {done ? (
        <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50 p-6 text-center space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-700 text-white">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-brand-950">
              {tab === "login" ? "Successfully Signed In" : "Account Created Successfully"}
            </h2>
            <p className="mt-1 text-sm text-brand-800">
              {tab === "login"
                ? `Signed in as ${form.email} (${role === "host" ? "Host" : "Guest"}).`
                : `Account created for ${form.email}. Verification email dispatched.`}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {role === "host" ? (
              <Button
                type="button"
                onClick={() => router.push("/host")}
                className="w-full sm:w-auto"
              >
                Go to Host Dashboard
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => router.push("/bookings")}
                  className="w-full sm:w-auto"
                >
                  View My Bookings
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="w-full sm:w-auto"
                >
                  Explore Farmstays
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Form */
        <form onSubmit={submit} noValidate className="mt-8 space-y-5">
          {tab === "signup" && (
            <>
              <Field label={role === "host" ? "Host Full Name" : "Full Name"}>
                {(id) => (
                  <Input
                    id={id}
                    autoComplete="name"
                    placeholder={role === "host" ? "John Doe" : "Anjali Sharma"}
                    value={form.name}
                    onChange={set("name")}
                  />
                )}
              </Field>

              {role === "host" && (
                <>
                  <Field label="Farmstay / Estate Name">
                    {(id) => (
                      <Input
                        id={id}
                        placeholder="e.g. Green Valley Retreat"
                        value={form.farmName}
                        onChange={set("farmName")}
                      />
                    )}
                  </Field>

                  <Field label="Farm Location / District">
                    {(id) => (
                      <Input
                        id={id}
                        placeholder="e.g. Chamoli, Uttarakhand"
                        value={form.location}
                        onChange={set("location")}
                      />
                    )}
                  </Field>
                </>
              )}
            </>
          )}

          <Field label={role === "host" ? "Host Email Address" : "Email Address"}>
            {(id) => (
              <Input
                id={id}
                type="email"
                autoComplete="email"
                placeholder={
                  role === "host" ? "host@greenvalleyretreat.in" : "name@example.com"
                }
                value={form.email}
                onChange={set("email")}
              />
            )}
          </Field>

          <Field
            label="Password"
            action={
              tab === "login" ? (
                <button
                  type="button"
                  className="text-xs font-medium text-brand-700 hover:underline"
                >
                  Forgot password?
                </button>
              ) : null
            }
          >
            {(id) => (
              <Input
                id={id}
                type="password"
                autoComplete={tab === "login" ? "current-password" : "new-password"}
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
              />
            )}
          </Field>

          {tab === "signup" ? (
            <Field label="Confirm Password">
              {(id) => (
                <Input
                  id={id}
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={set("confirm")}
                />
              )}
            </Field>
          ) : (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-sm text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded accent-brand-700"
                />
                Keep me signed in
              </label>

              <button
                type="button"
                onClick={handleDemoFill}
                className="text-xs font-semibold text-brand-700 hover:underline flex items-center gap-1"
              >
                <Sparkles size={12} /> Auto-fill Demo
              </button>
            </div>
          )}

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs font-medium text-danger border border-red-200">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full">
            {role === "guest"
              ? tab === "login"
                ? "Log In"
                : "Create Guest Account"
              : tab === "login"
              ? "Sign In to Host Portal"
              : "Register as Farm Host"}
          </Button>

          {tab === "login" && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleRoleChange(role === "guest" ? "host" : "guest")}
                className="w-full text-center text-xs text-ink-muted hover:text-brand-700 transition-colors"
              >
                {role === "guest"
                  ? "Are you a farm owner? Switch to Host Sign In →"
                  : "Are you a traveler? Switch to Guest Sign In →"}
              </button>
            </div>
          )}
        </form>
      )}

      {/* Footer Security Badge */}
      <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-ink-muted border-t border-line pt-4">
        <Lock size={14} aria-hidden className="text-ink-subtle" />
        {role === "host"
          ? "Encrypted host authorization with direct escrow vault link."
          : "Secure authentication for rural and remote access."}
      </p>
    </div>
  );
}
