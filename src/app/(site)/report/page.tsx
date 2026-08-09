import Image from "next/image";
import { AlertTriangle, FileSearch, Radio, ShieldCheck } from "lucide-react";
import { ReportForm } from "@/components/report/report-form";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Report a Landslide — AgroSafe Travel" };

const ASSURANCES = [
  { icon: ShieldCheck, label: "Secured Uplink" },
  { icon: Radio, label: "GPS Tagged" },
  { icon: FileSearch, label: "Real-time Sync" },
];

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Report Landslide / Hazard
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Your immediate reporting helps rural communities and travellers stay safe. Data is
            shared directly with the users.
          </p>

          <div className="mt-6 border-l-4 border-warn bg-black/[0.03] p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
              <AlertTriangle size={18} className="text-warn" aria-hidden />
              Automated Verification
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Images are processed by our automated system. False reports are logged and may result
              in regional access restrictions.
            </p>
          </div>

          <div className="relative mt-6 aspect-4/3 overflow-hidden rounded-lg border border-line">
            <Image
              src="https://picsum.photos/seed/agrosafe-hazard-map/900/700"
              alt="Regional hazard monitoring map"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <p className="absolute top-0 right-0 left-0 bg-black/60 px-3 py-2 text-xs text-white">
              Landslide Reporting Portal | Western Ghats Monitoring
            </p>
          </div>
        </div>

        <div>
          <ReportForm />

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {ASSURANCES.map(({ icon: Icon, label }) => (
              <Card key={label} className="flex flex-col items-center gap-2 p-4 text-center">
                <Icon size={22} className="text-brand-700" aria-hidden />
                <span className="text-sm font-semibold">{label}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
