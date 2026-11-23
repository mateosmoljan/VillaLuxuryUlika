import Link from "next/link";
import { notFound } from "next/navigation";
import { saveContent } from "../../actions";
import { isLocale, type Locale } from "@/lib/site/copy";
import { localeCopy, readState } from "@/lib/store";

export const dynamic = "force-dynamic";

const field = "mt-1 w-full rounded-xl border border-sand bg-white px-3 py-2";

export default async function ContentPage({
  searchParams,
}: {
  searchParams?: { locale?: string; error?: string };
}) {
  const locale: Locale = searchParams?.locale && isLocale(searchParams.locale) ? searchParams.locale : "hr";
  if (searchParams?.locale && !isLocale(searchParams.locale)) notFound();
  const { state } = await readState();
  const copy = localeCopy(state, locale);
  return (
    <main>
      <h1 className="font-display text-4xl">Tekst</h1>
      <div className="mt-4 flex gap-3 text-sm">
        {(["hr", "en", "de", "it"] as const).map((code) => (
          <Link key={code} href={`/admin/content?locale=${code}`} className={code === locale ? "text-olive" : "text-ink/50"}>
            {code.toUpperCase()}
          </Link>
        ))}
      </div>
      {searchParams?.error === "database" && (
        <p className="mt-4 text-sm text-clay">Spremanje nije uspjelo jer nema baze.</p>
      )}
      <form action={saveContent} className="mt-8 space-y-8">
        <input type="hidden" name="locale" value={locale} />
        <section className="space-y-3">
          <h2 className="font-display text-2xl">Uvod</h2>
          <label className="block text-sm">Naslov stranice<input name="metaTitle" defaultValue={copy.meta.title} className={field} /></label>
          <label className="block text-sm">Opis za tražilice<textarea name="metaDescription" rows={3} defaultValue={copy.meta.description} className={field} /></label>
          <label className="block text-sm">Kratki uvod<textarea name="lead" rows={3} defaultValue={copy.hero.lead} className={field} /></label>
          <label className="block text-sm">Naslov odjeljka<input name="introTitle" defaultValue={copy.intro.title} className={field} /></label>
          <label className="block text-sm">Odlomak<textarea name="intro0" rows={4} defaultValue={copy.intro.paragraphs[0] ?? ""} className={field} /></label>
          <label className="block text-sm">Odlomak<textarea name="intro1" rows={4} defaultValue={copy.intro.paragraphs[1] ?? ""} className={field} /></label>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl">Kartice</h2>
          {copy.cards.map((card, index) => (
            <div key={card.href} className="grid gap-2 md:grid-cols-2">
              <input name={`card_${index}_title`} defaultValue={card.title} className={field} />
              <input name={`card_${index}_text`} defaultValue={card.text} className={field} />
            </div>
          ))}
        </section>
        <section className="space-y-6">
          <h2 className="font-display text-2xl">Prostori</h2>
          {copy.spaces.items.map((space) => (
            <div key={space.id}>
              <label className="block text-sm">
                {space.id}
                <input name={`space_${space.id}_title`} defaultValue={space.title} className={field} />
              </label>
              <textarea name={`space_${space.id}_points`} rows={6} defaultValue={space.points.join("\n")} className={field} />
            </div>
          ))}
        </section>
        <section className="space-y-6">
          <h2 className="font-display text-2xl">Pogodnosti</h2>
          {copy.amenities.groups.map((group) => (
            <div key={group.id} className="rounded-2xl border border-sand p-4">
              <h3 className="font-display text-xl">{group.title}</h3>
              {group.items.map((item, index) => (
                <div key={`${group.id}-${index}`} className="mt-3 grid gap-2 md:grid-cols-2">
                  <input name={`a_${group.id}_${index}_name`} defaultValue={item.name} className={field} />
                  <input name={`a_${group.id}_${index}_note`} defaultValue={item.note ?? ""} className={field} />
                </div>
              ))}
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <input name={`a_${group.id}_new_name`} placeholder="Nova stavka" className={field} />
                <input name={`a_${group.id}_new_note`} placeholder="Napomena" className={field} />
              </div>
            </div>
          ))}
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl">Pravila kuće</h2>
          {copy.booking.steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="grid gap-2">
              <input name={`rule_${index}_title`} defaultValue={step.title} className={field} />
              <textarea name={`rule_${index}_text`} rows={3} defaultValue={step.text} className={field} />
            </div>
          ))}
          <input name="rule_new_title" placeholder="Novo pravilo" className={field} />
          <textarea name="rule_new_text" rows={2} className={field} />
          <label className="block text-sm">
            Načini plaćanja, jedan u retku
            <textarea name="methods" rows={4} defaultValue={copy.booking.methods.join("\n")} className={field} />
          </label>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl">Mjesto i kontakt</h2>
          <textarea name="place0" rows={3} defaultValue={copy.place.paragraphs[0] ?? ""} className={field} />
          <textarea name="place1" rows={3} defaultValue={copy.place.paragraphs[1] ?? ""} className={field} />
          <textarea name="contactIntro" rows={3} defaultValue={copy.contact.intro} className={field} />
          <input name="person" defaultValue={copy.contact.person} className={field} />
          <input name="phone0" defaultValue={copy.contact.phones[0]?.display ?? ""} className={field} />
          <input name="phone1" defaultValue={copy.contact.phones[1]?.display ?? ""} className={field} />
          <input name="email" type="email" defaultValue={copy.contact.email} className={field} />
          <input name="languages" defaultValue={copy.contact.languages} className={field} />
        </section>
        <button className="rounded-full bg-olive px-5 py-2 text-sm text-paper" type="submit">
          Spremi i objavi
        </button>
      </form>
    </main>
  );
}
