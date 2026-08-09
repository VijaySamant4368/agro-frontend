import Image from "next/image";
import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BOOKINGS } from "@/lib/data/farms";
import { cn, formatINR } from "@/lib/utils";

export const metadata = { title: "My Bookings — AgroSafe Travel" };

const STATUS_STYLES: Record<string, string> = {
  upcoming: "bg-brand-50 text-brand-700 border-brand-200",
  completed: "bg-black/5 text-ink-muted border-line",
  cancelled: "bg-red-50 text-danger border-red-200",
};

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BookingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">My Bookings</h1>
      <p className="mt-2 text-ink-muted">Every stay you have booked, with its escrow status.</p>

      <ul className="mt-8 space-y-5">
        {BOOKINGS.map((b) => (
          <li key={b.id}>
            <Card className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
              <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-md sm:w-40">
                <Image
                  src={b.image}
                  alt={b.farmName}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-bold tracking-tight">{b.farmName}</h2>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
                      STATUS_STYLES[b.status],
                    )}
                  >
                    {b.status}
                  </span>
                </div>

                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-muted">
                  <MapPin size={15} aria-hidden />
                  {b.location}
                </p>

                <p className="mt-2 text-sm text-ink-muted">
                  {longDate(b.checkIn)} → {longDate(b.checkOut)} • {b.guests} guests • Ref {b.id}
                </p>
              </div>

              <div className="shrink-0 text-left sm:text-right">
                <p className="text-xl font-extrabold">{formatINR(b.total)}</p>
                <ButtonLink
                  href={`/farms/${b.farmSlug}`}
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full sm:w-auto"
                >
                  View Farm
                </ButtonLink>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
