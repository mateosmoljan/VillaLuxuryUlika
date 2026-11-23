import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "../actions";
import { readSession } from "@/lib/admin/auth";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const actionRequest = Boolean(headers().get("next-action"));
  if (!actionRequest && !readSession()) redirect("/admin/login");
  const { mode } = await readState();
  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-sand pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-olive">Domaćin</p>
          <p className="font-display text-2xl">Villa Luxury Ulika</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/admin">Pregled</Link>
          <Link href="/admin/calendar">Kalendar i cijene</Link>
          <Link href="/admin/content">Tekst</Link>
          <Link href="/admin/images">Slike</Link>
          <Link href="/hr">Javna stranica</Link>
        </nav>
        <form action={logoutAction}>
          <button className="text-sm text-ink/70" type="submit">
            Odjava
          </button>
        </form>
      </header>
      {mode === "seed" && (
        <p className="mt-4 rounded-2xl border border-clay/40 bg-clay/10 px-4 py-3 text-sm leading-relaxed">
          Nema spremnika za izmjene. Javna stranica prikazuje početne tekstove i cjenik. Trajno spremanje
          traži besplatni Neon preko postojećeg Vercel projekta, u varijabli DATABASE_URL. Novi račun nije
          otvoren.
        </p>
      )}
      {mode === "file" && (
        <p className="mt-4 text-sm text-ink/70">
          Izmjene se spremaju u lokalnu datoteku. Na Vercelu trebaju ostati u Neon bazi.
        </p>
      )}
      <div className="py-8">{children}</div>
    </div>
  );
}
