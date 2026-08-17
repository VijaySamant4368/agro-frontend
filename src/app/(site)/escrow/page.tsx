"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  HelpCircle,
  History,
  Lock,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Unlock,
  UserCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button, ButtonLink } from "@/components/ui/button";
import { PAYMENT_ESCROWS } from "@/lib/data/farms";
import { formatINR, cn } from "@/lib/utils";

export default function EscrowLifecyclePage() {
  const [escrows, setEscrows] = useState(PAYMENT_ESCROWS);
  const [selectedEscrowId, setSelectedEscrowId] = useState(PAYMENT_ESCROWS[0].paymentId);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  const activeEscrow = escrows.find((e) => e.paymentId === selectedEscrowId) || escrows[0];

  // Simulator actions
  const handleSimulatePayout = (paymentId: string) => {
    setEscrows((prev) =>
      prev.map((item) => {
        if (item.paymentId !== paymentId) return item;
        const newTx = {
          id: `TXN-SIM-${Date.now().toString().slice(-4)}`,
          paymentId: item.paymentId,
          transactionType: "Payout" as const,
          amount: item.stayAmount,
          gatewayRef: `payout_bank_${Math.floor(Math.random() * 900000 + 100000)}`,
          processedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
          note: "Stay successfully completed without incidents. Escrow payout disbursed to Host account.",
        };
        const newLog = {
          id: `LOG-${Date.now().toString().slice(-3)}`,
          previousStatus: item.escrowStatus,
          newStatus: "Completed",
          reason: "Guest checkout confirmed. Payout triggered via AgroSafe Lifecycle Pipeline.",
          changedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        };
        return {
          ...item,
          escrowStatus: "Released_To_Host" as const,
          transactions: [...item.transactions, newTx],
          statusHistory: [...item.statusHistory, newLog],
        };
      })
    );
    setSimulationNotice(`✅ Simulation: Stay verified. ₹${formatINR(activeEscrow.stayAmount)} released from escrow to host.`);
  };

  const handleSimulateDisasterRefund = (paymentId: string) => {
    setEscrows((prev) =>
      prev.map((item) => {
        if (item.paymentId !== paymentId) return item;
        const newTx = {
          id: `TXN-SIM-${Date.now().toString().slice(-4)}`,
          paymentId: item.paymentId,
          transactionType: "Refund" as const,
          amount: item.totalCharged,
          gatewayRef: `rfnd_auto_${Math.floor(Math.random() * 900000 + 100000)}`,
          processedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
          note: "100% Emergency Disaster Safeguard Refund processed back to guest card.",
        };
        const newLog = {
          id: `LOG-${Date.now().toString().slice(-3)}`,
          previousStatus: item.escrowStatus,
          newStatus: "Cancelled",
          reason: "Active Landslide Warning in district. Automated 100% Escrow Refund Guarantee triggered.",
          changedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        };
        return {
          ...item,
          escrowStatus: "Refunded_To_Guest" as const,
          transactions: [...item.transactions, newTx],
          statusHistory: [...item.statusHistory, newLog],
        };
      })
    );
    setSimulationNotice(`⚠️ Simulation: Disaster warning triggered! 100% full refund (${formatINR(activeEscrow.totalCharged)}) disbursed to guest.`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-100 px-3 py-0.5 text-xs font-bold text-brand-800 uppercase tracking-wide flex items-center gap-1">
              <Lock size={12} /> ERD D4 Payment & Lifecycle Protocol
            </span>
            <span className="text-xs text-ink-subtle">
              Zero-Risk Financial Escrow for Mountain Stays
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Escrow Vault & Payment Lifecycle Explorer
          </h1>
          <p className="mt-1 text-ink-muted max-w-3xl">
            See how AgroSafe protects traveller funds during severe monsoon seasons.
            Funds are securely locked in escrow and only released upon verified checkout or refunded immediately upon hazard alert.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ButtonLink href="/bookings" variant="outline" size="md">
            My Bookings
          </ButtonLink>
          <ButtonLink href="/host" variant="primary" size="md">
            Host Payouts
          </ButtonLink>
        </div>
      </div>

      {simulationNotice && (
        <div className="mt-6 flex items-center justify-between rounded-lg border border-brand-300 bg-brand-50 p-4 text-xs font-medium text-brand-900 animate-in fade-in">
          <span>{simulationNotice}</span>
          <button type="button" onClick={() => setSimulationNotice(null)} className="text-xs font-bold underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Visual Pipeline Diagram */}
      <div className="mt-10">
        <h2 className="text-sm font-bold uppercase tracking-wider text-ink-subtle mb-4">
          Lifecycle State Machine (Payment & Lifecycle Flow)
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Step 1 */}
          <Card className="p-5 border-l-4 border-l-brand-600">
            <div className="flex items-center justify-between text-xs text-brand-800 font-bold uppercase">
              <span>Step 1: Reservation</span>
              <Lock size={16} />
            </div>
            <h3 className="mt-2 text-base font-bold">Charge Guest & Hold Escrow</h3>
            <p className="mt-1 text-xs text-ink-muted">
              Guest pays stay amount + 5% platform fee via payment gateway. 100% of stay amount is isolated in escrow vault.
            </p>
            <div className="mt-3 rounded-md bg-canvas/70 p-2 font-mono text-[11px] text-ink-subtle">
              Status: <span className="text-amber-700 font-bold">Held_In_Escrow</span>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-5 border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between text-xs text-amber-800 font-bold uppercase">
              <span>Step 2: Stay Duration</span>
              <Clock size={16} />
            </div>
            <h3 className="mt-2 text-base font-bold">Wait State & Hazard Monitoring</h3>
            <p className="mt-1 text-xs text-ink-muted">
              System continuously streams live soil stability and rainfall warnings for the property coordinates.
            </p>
            <div className="mt-3 rounded-md bg-canvas/70 p-2 font-mono text-[11px] text-ink-subtle">
              Status: <span className="text-amber-700 font-bold">Active Observation</span>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-5 border-l-4 border-l-safe">
            <div className="flex items-center justify-between text-xs text-safe font-bold uppercase">
              <span>Step 3: Resolution</span>
              <ShieldCheck size={16} />
            </div>
            <h3 className="mt-2 text-base font-bold">Dual Resolution Paths</h3>
            <p className="mt-1 text-xs text-ink-muted">
              <strong>Path A:</strong> Safe stay complete → Payout sent to Host.<br/>
              <strong>Path B:</strong> Hazard detected → 100% refunded to Guest.
            </p>
            <div className="mt-3 rounded-md bg-canvas/70 p-2 font-mono text-[11px] text-ink-subtle">
              Status: <span className="text-safe font-bold">Released_To_Host</span> or <span className="text-danger font-bold">Refunded</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Interactive Ledger */}
      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* Left List of Escrows */}
        <div className="space-y-4 lg:col-span-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-subtle">
            Select Escrow Vault Record ({escrows.length})
          </h2>

          <div className="space-y-3">
            {escrows.map((e) => (
              <button
                key={e.paymentId}
                type="button"
                onClick={() => setSelectedEscrowId(e.paymentId)}
                className={cn(
                  "w-full text-left rounded-xl border p-4 transition-all",
                  selectedEscrowId === e.paymentId
                    ? "border-brand-600 bg-brand-50/40 shadow-sm"
                    : "border-line bg-surface hover:border-ink-subtle"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-700">{e.paymentId}</span>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase",
                      e.escrowStatus === "Released_To_Host"
                        ? "bg-brand-50 text-brand-700 border-brand-200"
                        : e.escrowStatus === "Refunded_To_Guest"
                        ? "bg-red-50 text-danger border-red-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    )}
                  >
                    {e.escrowStatus.replace(/_/g, " ")}
                  </span>
                </div>

                <h3 className="mt-2 text-sm font-bold text-ink">{e.farmName}</h3>
                <p className="text-xs text-ink-muted">Guest: {e.guestName}</p>

                <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-2 text-xs">
                  <span className="text-ink-subtle">{e.stayStartDate}</span>
                  <span className="font-extrabold text-ink">{formatINR(e.totalCharged)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Escrow Detail View */}
        <div className="space-y-6 lg:col-span-8">
          <Card className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink-subtle">Payment Vault ID:</span>
                  <span className="font-mono text-sm font-extrabold text-brand-700">{activeEscrow.paymentId}</span>
                </div>
                <h2 className="text-xl font-bold mt-1">{activeEscrow.farmName}</h2>
                <p className="text-xs text-ink-muted">Booking Reference: <span className="font-mono font-semibold">{activeEscrow.bookingId}</span> • Gateway Ref: <span className="font-mono text-xs">{activeEscrow.gatewayRef}</span></p>
              </div>

              <span
                className={cn(
                  "self-start sm:self-auto rounded-full border px-3 py-1 text-xs font-bold uppercase",
                  activeEscrow.escrowStatus === "Released_To_Host"
                    ? "bg-brand-50 text-brand-700 border-brand-200"
                    : activeEscrow.escrowStatus === "Refunded_To_Guest"
                    ? "bg-red-50 text-danger border-red-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                )}
              >
                {activeEscrow.escrowStatus.replace(/_/g, " ")}
              </span>
            </div>

            {/* Financial Breakdown */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-canvas/60 p-4">
                <p className="text-xs font-semibold text-ink-subtle uppercase">Stay Amount (In Escrow)</p>
                <p className="mt-1 text-2xl font-extrabold text-brand-800">{formatINR(activeEscrow.stayAmount)}</p>
                <p className="text-[11px] text-ink-muted">100% held for host/refund</p>
              </div>

              <div className="rounded-lg border border-line bg-canvas/60 p-4">
                <p className="text-xs font-semibold text-ink-subtle uppercase">Platform Safety Fee</p>
                <p className="mt-1 text-2xl font-extrabold text-ink">{formatINR(activeEscrow.platformFee)}</p>
                <p className="text-[11px] text-ink-muted">Matrix sensor maintenance</p>
              </div>

              <div className="rounded-lg border border-line bg-canvas/60 p-4">
                <p className="text-xs font-semibold text-ink-subtle uppercase">Total Charged</p>
                <p className="mt-1 text-2xl font-extrabold text-ink">{formatINR(activeEscrow.totalCharged)}</p>
                <p className="text-[11px] text-ink-muted">Card / UPI capture</p>
              </div>
            </div>

            {/* Simulator Interactive Action Buttons */}
            {activeEscrow.escrowStatus === "Held_In_Escrow" && (
              <div className="mt-6 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 p-5">
                <p className="text-xs font-bold text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles size={14} className="text-brand-700" /> Test Payment & Lifecycle State Machine:
                </p>
                <p className="mt-1 text-xs text-brand-800">
                  Simulate the outcome of this booking to see transactions dynamically recorded to the ERD database tables.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleSimulatePayout(activeEscrow.paymentId)}
                    className="gap-1.5"
                  >
                    <Unlock size={14} /> Simulate Safe Stay Checkout (Release to Host)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSimulateDisasterRefund(activeEscrow.paymentId)}
                    className="gap-1.5 border-danger text-danger hover:bg-danger/5"
                  >
                    <AlertTriangle size={14} /> Simulate Landslide Alert (100% Guest Refund)
                  </Button>
                </div>
              </div>
            )}

            {/* Transaction Movement Log */}
            <div className="mt-8">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <DollarSign size={16} className="text-brand-700" /> Payment Transaction Log (ERD: PAYMENT_TRANSACTION_LOG)
              </h3>

              <div className="mt-3 divide-y divide-line rounded-lg border border-line overflow-hidden bg-surface text-xs">
                {activeEscrow.transactions.map((tx) => (
                  <div key={tx.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-brand-700">{tx.id}</span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase border",
                            tx.transactionType === "Payout"
                              ? "bg-brand-50 text-brand-700 border-brand-200"
                              : tx.transactionType === "Refund"
                              ? "bg-red-50 text-danger border-red-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          )}
                        >
                          {tx.transactionType}
                        </span>
                      </div>
                      <p className="text-ink-muted">{tx.note}</p>
                      <p className="font-mono text-[11px] text-ink-subtle">Gateway Ref: {tx.gatewayRef} • {tx.processedAt}</p>
                    </div>
                    <span className="font-extrabold text-sm text-ink self-start sm:self-center">
                      {tx.transactionType === "Refund" ? "-" : "+"}{formatINR(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Transition History Log */}
            <div className="mt-8">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <History size={16} className="text-brand-700" /> Booking Status Transition Log (ERD: BOOKING_STATUS_LOG)
              </h3>

              <div className="mt-3 divide-y divide-line rounded-lg border border-line overflow-hidden bg-surface text-xs">
                {activeEscrow.statusHistory.map((log) => (
                  <div key={log.id} className="p-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-subtle">{log.id}</span>
                      <span className="font-semibold text-ink">
                        {log.previousStatus} → <span className="text-brand-700 font-bold">{log.newStatus}</span>
                      </span>
                      <span className="text-ink-subtle text-[11px]">• {log.changedAt}</span>
                    </div>
                    <p className="text-ink-muted">{log.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
