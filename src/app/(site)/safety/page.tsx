import Link from "next/link";
import { CloudRain, Mountain, Waves } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SafetyBadge } from "@/components/ui/safety-badge";
import { FARMS } from "@/lib/data/farms";

export const metadata = { title: "Safety Check — AgroSafe Travel" };

const SIGNALS = [
  { icon: Mountain, label: "Soil stability", value: "Stable across 5 of 6 monitored zones" },
  { icon: CloudRain, label: "Rainfall (24h)", value: "18mm average, no red-alert districts" },
  { icon: Waves, label: "Stream levels", value: "Normal — 1 zone under observation" },
];

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Safety Check</h1>
      <p className="mt-2 text-ink-muted">
        Current Safety Matrix reading for every farmstay in the network.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {SIGNALS.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="p-5">
            <Icon size={22} className="text-brand-700" aria-hidden />
            <h2 className="mt-3 text-sm font-bold">{label}</h2>
            <p className="mt-1 text-sm text-ink-muted">{value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8 divide-y divide-line">
        {FARMS.map((farm) => (
          <div key={farm.slug} className="flex flex-wrap items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold">
                <Link href={`/farms/${farm.slug}`} className="hover:text-brand-700">
                  {farm.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                {farm.subDistrict}, {farm.district} — {farm.state}
              </p>
            </div>
            <SafetyBadge status={farm.safety} />
          </div>
        ))}
      </Card>
    </div>
  );
}
