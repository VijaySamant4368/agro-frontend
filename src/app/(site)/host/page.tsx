"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building,
  DollarSign,
  Plus,
  AlertOctagon,
  ShieldCheck,
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button, ButtonLink } from "@/components/ui/button";
import { SafetyBadge } from "@/components/ui/safety-badge";
import { FARMS, BOOKINGS, PAYMENT_ESCROWS, WARNINGS } from "@/lib/data/farms";
import { formatINR, cn } from "@/lib/utils";

export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState<"farms" | "bookings" | "escrow">("farms");
  const [escrowList, setEscrowList] = useState(PAYMENT_ESCROWS);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Host specific farms (e.g. Rohit Bisht / Anna Mathew)
  const hostFarms = FARMS.slice(0, 3);
  const hostBookings = BOOKINGS;

  const totalEarnings = escrowList
    .filter((e) => e.escrowStatus === "Released_To_Host")
    .reduce((sum, e) => sum + e.stayAmount, 0);

  const pendingEscrow = escrowList
    .filter((e) => e.escrowStatus === "Held_In_Escrow")
    .reduce((sum, e) => sum + e.stayAmount, 0);

  const handleReleasePayout = (paymentId: string, guestName: string) => {
    setEscrowList((prev) =>
      prev.map((item) =>
        item.paymentId === paymentId
          ? { ...item, escrowStatus: "Released_To_Host" }
          : item
      )
    );
    setActionSuccess(`Escrow payout for ${guestName}'s booking was successfully released to your host account.`);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-100 px-3 py-0.5 text-xs font-bold text-brand-800 uppercase tracking-wide">
              Host Operations Hub
            </span>
            <span className="flex items-center gap-1 text-xs text-ink-subtle">
              <ShieldCheck size={14} className="text-safe" /> Verified Host
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Host Dashboard
          </h1>
          <p className="mt-1 text-ink-muted">
            Manage your farmstay listings, track guest check-ins, and oversee escrow payouts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/host/warnings/new" variant="outline" size="md" className="gap-2 border-danger text-danger hover:bg-danger/5">
            <AlertOctagon size={16} />
            Issue Disaster Warning
          </ButtonLink>
          <ButtonLink href="/host/farms/new" variant="primary" size="md" className="gap-2">
            <Plus size={16} />
            List New Farm
          </ButtonLink>
        </div>
      </div>

      {actionSuccess && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800 animate-in fade-in">
          <CheckCircle size={20} className="shrink-0 text-safe" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">My Farmstays</p>
            <Building size={20} className="text-brand-700" />
          </div>
          <p className="mt-3 text-3xl font-extrabold">{hostFarms.length}</p>
          <p className="mt-1 text-xs text-ink-muted">Active in safety network</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Total Guests Hosted</p>
            <Users size={20} className="text-brand-700" />
          </div>
          <p className="mt-3 text-3xl font-extrabold">28</p>
          <p className="mt-1 text-xs text-safe font-medium flex items-center gap-1">
            <TrendingUp size={12} /> +14% this quarter
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">In Escrow Vault</p>
            <DollarSign size={20} className="text-warn" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-amber-600">{formatINR(pendingEscrow)}</p>
          <p className="mt-1 text-xs text-ink-muted">Protected stay funds</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Total Disbursed</p>
            <DollarSign size={20} className="text-safe" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-safe">{formatINR(totalEarnings)}</p>
          <p className="mt-1 text-xs text-ink-muted">Direct bank payouts</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mt-10 border-b border-line">
        <div className="flex gap-8">
          <button
            type="button"
            onClick={() => setActiveTab("farms")}
            className={cn(
              "border-b-2 pb-3 text-sm font-semibold transition-colors",
              activeTab === "farms"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            My Farm Listings ({hostFarms.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={cn(
              "border-b-2 pb-3 text-sm font-semibold transition-colors",
              activeTab === "bookings"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            Active Guest Bookings ({hostBookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("escrow")}
            className={cn(
              "border-b-2 pb-3 text-sm font-semibold transition-colors",
              activeTab === "escrow"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            Escrow & Payout Vault ({escrowList.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Farms */}
      {activeTab === "farms" && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {hostFarms.map((farm) => (
              <Card key={farm.slug} className="overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-black/5">
                    <Image
                      src={farm.images[0]}
                      alt={farm.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <SafetyBadge status={farm.safety} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg">{farm.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                      <MapPin size={14} />
                      {farm.subDistrict}, {farm.district} ({farm.state})
                    </p>
                    <p className="mt-3 text-sm line-clamp-2 text-ink-muted">
                      {farm.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                      <span className="text-xs text-ink-subtle">Nightly Rate</span>
                      <span className="text-base font-extrabold text-brand-700">{formatINR(farm.pricePerNight)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-line bg-canvas/50 p-4 flex items-center justify-between gap-2">
                  <ButtonLink href={`/farms/${farm.slug}`} variant="outline" size="sm" className="gap-1 text-xs">
                    <ExternalLink size={14} /> Live View
                  </ButtonLink>
                  <ButtonLink href={`/host/warnings/new?farm=${farm.slug}`} variant="outline" size="sm" className="gap-1 text-xs border-amber-300 text-amber-800 hover:bg-amber-50">
                    <AlertOctagon size={14} /> Alert Zone
                  </ButtonLink>
                </div>
              </Card>
            ))}
          </div>

          <div className="rounded-xl border border-dashed border-line p-8 text-center bg-surface/50">
            <Building size={36} className="mx-auto text-ink-subtle" />
            <h3 className="mt-3 text-base font-bold">Have another agricultural property?</h3>
            <p className="mt-1 text-xs text-ink-muted max-w-md mx-auto">
              Join the Himalayan AgroSafe network. Benefit from automated safety monitoring, risk matrix evaluation, and guaranteed escrow protection.
            </p>
            <ButtonLink href="/host/farms/new" variant="primary" size="md" className="mt-4">
              Add Farmstay Listing
            </ButtonLink>
          </div>
        </div>
      )}

      {/* Tab 2: Bookings */}
      {activeTab === "bookings" && (
        <div className="mt-8">
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="border-b border-line text-left bg-canvas/40">
                <tr className="text-xs uppercase tracking-wider text-ink-subtle">
                  <th className="px-5 py-3.5 font-semibold">Booking Ref</th>
                  <th className="px-5 py-3.5 font-semibold">Guest</th>
                  <th className="px-5 py-3.5 font-semibold">Farm Property</th>
                  <th className="px-5 py-3.5 font-semibold">Dates</th>
                  <th className="px-5 py-3.5 font-semibold">Guests</th>
                  <th className="px-5 py-3.5 font-semibold">Total</th>
                  <th className="px-5 py-3.5 font-semibold">Escrow Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {hostBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-black/[0.01]">
                    <td className="px-5 py-4 font-mono text-xs font-semibold text-brand-700">{b.id}</td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-ink">{b.guestName || "Verified Guest"}</p>
                      <p className="text-xs text-ink-subtle">{b.guestPhone || "+91 98XXX XXXXX"}</p>
                    </td>
                    <td className="px-5 py-4 font-medium">{b.farmName}</td>
                    <td className="px-5 py-4 text-ink-muted">
                      {b.checkIn} → {b.checkOut}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{b.guests} Guests</td>
                    <td className="px-5 py-4 font-extrabold">{formatINR(b.total)}</td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
                          b.escrowStatus === "Released_To_Host"
                            ? "bg-brand-50 text-brand-700 border-brand-200"
                            : b.escrowStatus === "Refunded_To_Guest"
                            ? "bg-red-50 text-danger border-red-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        )}
                      >
                        {b.escrowStatus?.replace(/_/g, " ") || "Held In Escrow"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* Tab 3: Escrow */}
      {activeTab === "escrow" && (
        <div className="mt-8 space-y-6">
          <Card className="p-6 bg-gradient-to-r from-brand-900 to-brand-700 text-white">
            <div className="max-w-2xl">
              <h2 className="text-xl font-extrabold tracking-tight">AgroSafe 3-Way Escrow Vault</h2>
              <p className="mt-2 text-sm text-brand-100 leading-relaxed">
                Guest stay payments are held securely in escrow from the moment of booking.
                Once the guest checks out safely, funds are released to the host.
                In the event of a verified natural disaster warning or landslide alert,
                guests receive a 100% automated refund guarantee.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <ButtonLink href="/escrow" variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Open Global Escrow Ledger <ChevronRight size={14} />
                </ButtonLink>
              </div>
            </div>
          </Card>

          <Card className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="border-b border-line text-left bg-canvas/40">
                <tr className="text-xs uppercase tracking-wider text-ink-subtle">
                  <th className="px-5 py-3.5 font-semibold">Payment ID</th>
                  <th className="px-5 py-3.5 font-semibold">Booking Ref</th>
                  <th className="px-5 py-3.5 font-semibold">Guest</th>
                  <th className="px-5 py-3.5 font-semibold">Stay Amount</th>
                  <th className="px-5 py-3.5 font-semibold">Vault Status</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {escrowList.map((escrow) => (
                  <tr key={escrow.paymentId} className="hover:bg-black/[0.01]">
                    <td className="px-5 py-4 font-mono text-xs font-bold text-brand-700">{escrow.paymentId}</td>
                    <td className="px-5 py-4 font-mono text-xs text-ink-muted">{escrow.bookingId}</td>
                    <td className="px-5 py-4 font-medium">{escrow.guestName}</td>
                    <td className="px-5 py-4 font-extrabold">{formatINR(escrow.stayAmount)}</td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-block rounded-full border px-2.5 py-1 text-xs font-semibold",
                          escrow.escrowStatus === "Released_To_Host"
                            ? "bg-brand-50 text-brand-700 border-brand-200"
                            : escrow.escrowStatus === "Refunded_To_Guest"
                            ? "bg-red-50 text-danger border-red-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        )}
                      >
                        {escrow.escrowStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {escrow.escrowStatus === "Held_In_Escrow" ? (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleReleasePayout(escrow.paymentId, escrow.guestName)}
                        >
                          Release Payout
                        </Button>
                      ) : (
                        <span className="text-xs text-ink-subtle font-medium">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
}
