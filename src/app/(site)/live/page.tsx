import Image from "next/image";
import { Card } from "@/components/ui/card";
import { LIVE_REPORTS } from "@/lib/data/farms";
import { cn } from "@/lib/utils";

export const metadata = { title: "Live Landslides — AgroSafe Travel" };

const SEVERITY_STYLES: Record<string, string> = {
  Critical: "bg-red-50 text-danger border-red-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-brand-50 text-brand-700 border-brand-200",
};

export default function LivePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Live Landslide Map</h1>
      <p className="mt-2 text-ink-muted">
        Verified hazard reports from the last 7 days, synced from the Safety Matrix.
      </p>

      <div className="relative mt-8 aspect-21/9 overflow-hidden rounded-lg border border-line">
        <Image
          src="https://picsum.photos/seed/agrosafe-live-map/1600/700"
          alt="Live regional hazard map"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Card className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-line text-left">
            <tr className="text-ink-muted">
              <th scope="col" className="px-5 py-4 font-semibold">Zone ID</th>
              <th scope="col" className="px-5 py-4 font-semibold">Location</th>
              <th scope="col" className="px-5 py-4 font-semibold">Coordinates</th>
              <th scope="col" className="px-5 py-4 font-semibold">Severity</th>
              <th scope="col" className="px-5 py-4 font-semibold">Reported</th>
              <th scope="col" className="px-5 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {LIVE_REPORTS.map((r) => (
              <tr key={r.id}>
                <td className="px-5 py-4 font-mono text-xs">{r.id}</td>
                <td className="px-5 py-4 font-medium">{r.location}</td>
                <td className="px-5 py-4 text-ink-muted">
                  {r.lat}° N, {r.lng}° E
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full border px-2.5 py-1 text-xs font-semibold",
                      SEVERITY_STYLES[r.severity],
                    )}
                  >
                    {r.severity}
                  </span>
                </td>
                <td className="px-5 py-4 text-ink-muted">{r.reportedAt}</td>
                <td className="px-5 py-4 text-ink-muted">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
