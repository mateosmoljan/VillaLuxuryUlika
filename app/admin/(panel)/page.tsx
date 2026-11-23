import Link from "next/link";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const { state, mode } = await readState();
  const closed = state.prices.filter((day) => day.closed).length;
  const unpriced = state.prices.filter((day) => day.price == null).length;
  return (
    <main>
      <h1 className="font-display text-4xl">Pregled</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
        Kalendar, dnevni iznosi i javni tekst dijele isti zapis. Nakon spremanja javne stranice se
        ponovno izgrade.
      </p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-sand p-4">
          <dt className="text-xs uppercase tracking-wide text-ink/50">Spremište</dt>
          <dd className="mt-1 text-lg">{mode === "postgres" ? "Neon / Postgres" : mode === "file" ? "Lokalna datoteka" : "Samo početni podaci"}</dd>
        </div>
        <div className="rounded-2xl border border-sand p-4">
          <dt className="text-xs uppercase tracking-wide text-ink/50">Zatvoreni dani</dt>
          <dd className="mt-1 text-lg">{closed}</dd>
        </div>
        <div className="rounded-2xl border border-sand p-4">
          <dt className="text-xs uppercase tracking-wide text-ink/50">Dani bez iznosa</dt>
          <dd className="mt-1 text-lg">{unpriced}</dd>
        </div>
      </dl>
      <ul className="mt-8 space-y-2 text-olive">
        <li><Link href="/admin/calendar">Otvori ili zatvori dane i uredi iznose</Link></li>
        <li><Link href="/admin/content">Uredi tekst, pogodnosti i pravila</Link></li>
        <li><Link href="/admin/images">Odaberi postojeće fotografije</Link></li>
      </ul>
    </main>
  );
}
