import CalendarEditor from "@/components/admin/CalendarEditor";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const { state } = await readState();
  return (
    <main>
      <h1 className="font-display text-4xl">Kalendar i cijene</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
        Brojevi dolaze iz cjenika, od studenoga 2026. do prosinca 2027. Prazan dan nije cijena 0.
        Zatvoren dan nije slobodan za boravak. Valuta, naknade i najkraći boravak nisu navedeni u
        cjeniku i ovdje se ne dodaju.
      </p>
      <div className="mt-8">
        <CalendarEditor days={state.prices} />
      </div>
    </main>
  );
}
