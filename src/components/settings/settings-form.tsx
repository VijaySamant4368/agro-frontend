"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import {
  FinancialDetails,
  type Bank,
  type PaymentMethod,
} from "@/components/settings/financial-details";
import { PersonalDetails, type Personal } from "@/components/settings/personal-details";
import { Button } from "@/components/ui/button";

const INITIAL_METHODS: PaymentMethod[] = [
  { id: "pm_4242", kind: "card", label: "•••• •••• •••• 4242", sub: "Expires 12/25" },
  { id: "pm_upi", kind: "upi", label: "UPI: anjali@okhdfcbank", sub: "Primary" },
];

export function SettingsForm() {
  const [personal, setPersonal] = useState<Personal>({
    firstName: "Anjali",
    lastName: "Sharma",
    email: "anjali.sharma@example.com",
    phone: "+91 98765 43210",
  });
  const [methods, setMethods] = useState(INITIAL_METHODS);
  const [bank, setBank] = useState<Bank>({
    name: "State Bank of India",
    ifsc: "SBIN0001234",
    account: "12345678901",
  });
  const [status, setStatus] = useState("");

  function addMethod() {
    const n = methods.length + 1;
    setMethods([
      ...methods,
      {
        id: `pm_new_${n}`,
        kind: "card",
        label: "•••• •••• •••• 0000",
        sub: "Pending verification",
      },
    ]);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!personal.firstName.trim() || !personal.email.trim()) {
      setStatus("First name and email are required.");
      return;
    }
    setStatus("Changes saved.");
  }

  return (
    <form onSubmit={save} className="space-y-8">
      <PersonalDetails value={personal} onChange={setPersonal} />

      <FinancialDetails
        methods={methods}
        bank={bank}
        onRemoveMethod={(id) => setMethods(methods.filter((m) => m.id !== id))}
        onAddMethod={addMethod}
        onBankChange={setBank}
      />

      <div className="flex flex-wrap items-center justify-end gap-4 border-t border-line pt-6">
        {status ? (
          <p role="status" className="text-sm font-medium text-ink-muted">
            {status}
          </p>
        ) : null}
        <Button type="submit" size="lg">
          <Save size={18} aria-hidden />
          Save Changes
        </Button>
      </div>
    </form>
  );
}
