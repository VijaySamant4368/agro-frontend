"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type Tab = "login" | "signup";

export function AuthCard({ role }: { role: string }) {
  const [tab, setTab] = useState<Tab>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  function validate() {
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(form.email)) return "Enter a valid email address.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (tab === "signup") {
      if (!form.name.trim()) return "Enter your full name.";
      if (form.password !== form.confirm) return "Passwords do not match.";
    }
    return "";
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const message = validate();
    setError(message);
    if (!message) setDone(true);
  }

  function switchTo(next: Tab) {
    setTab(next);
    setError("");
    setDone(false);
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-line bg-surface p-6 sm:p-10">
      <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
        {tab === "login" ? "Welcome Back" : "Create your account"}
      </h1>
      <p className="mt-3 text-center text-ink-muted">
        {tab === "login"
          ? "Sign in to access community alerts and travel safety resources."
          : "Join to book verified farmstays and receive regional hazard alerts."}
      </p>

      {role === "host" ? (
        <p className="mt-4 rounded-md bg-brand-50 px-4 py-2 text-center text-sm font-semibold text-brand-800">
          Host account
        </p>
      ) : null}

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
                : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            {t === "login" ? "Login" : "Sign Up"}
          </button>
        ))}
      </div>

      {done ? (
        <p role="status" className="mt-8 rounded-md bg-brand-50 px-4 py-6 text-center text-brand-800">
          {tab === "login"
            ? `Signed in as ${form.email}.`
            : `Account created for ${form.email}. Check your inbox to verify.`}
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
          {tab === "signup" ? (
            <Field label="Full Name">
              {(id) => (
                <Input
                  id={id}
                  autoComplete="name"
                  placeholder="Anjali Sharma"
                  value={form.name}
                  onChange={set("name")}
                />
              )}
            </Field>
          ) : null}

          <Field label="Email Address">
            {(id) => (
              <Input
                id={id}
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={set("email")}
              />
            )}
          </Field>

          <Field
            label="Password"
            action={
              tab === "login" ? (
                <button type="button" className="text-sm font-medium text-brand-700 hover:underline">
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
            <label className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 accent-brand-700"
              />
              Keep me signed in
            </label>
          )}

          {error ? (
            <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-danger">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="w-full">
            {tab === "login" ? "Log In" : "Create Account"}
          </Button>
        </form>
      )}

      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
        <Lock size={14} aria-hidden />
        Secure authentication for rural and remote access.
      </p>
    </div>
  );
}
