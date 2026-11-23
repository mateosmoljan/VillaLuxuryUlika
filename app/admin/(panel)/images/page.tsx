import Link from "next/link";
import { saveImages } from "../../actions";
import { gallery } from "@/lib/site/gallery";
import { isLocale, type Locale } from "@/lib/site/copy";
import { localeCopy, readState } from "@/lib/store";

export const dynamic = "force-dynamic";

const field = "mt-1 w-full rounded-xl border border-sand bg-white px-3 py-2";

export default async function ImagesPage({
  searchParams,
}: {
  searchParams?: { locale?: string; error?: string };
}) {
  const locale: Locale = searchParams?.locale && isLocale(searchParams.locale) ? searchParams.locale : "hr";
  const { state } = await readState();
  const copy = localeCopy(state, locale);
  return (
    <main>
      <h1 className="font-display text-4xl">Slike</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
        Odabir je među fotografijama koje su već u galeriji. Nema novih fotografija ni adrese.
      </p>
      <div className="mt-4 flex gap-3 text-sm">
        {(["hr", "en", "de", "it"] as const).map((code) => (
          <Link key={code} href={`/admin/images?locale=${code}`} className={code === locale ? "text-olive" : "text-ink/50"}>
            {code.toUpperCase()}
          </Link>
        ))}
      </div>
      {searchParams?.error && <p className="mt-4 text-sm text-clay">Spremanje nije uspjelo.</p>}
      <form action={saveImages} className="mt-8 space-y-6">
        <input type="hidden" name="locale" value={locale} />
        <label className="block text-sm">
          Naslovna fotografija
          <select name="hero" defaultValue={state.heroSrc} className={field}>
            {gallery.map((image) => (
              <option key={image.src} value={image.src}>
                {image.src}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Opis naslovne fotografije
          <input name="heroAlt" defaultValue={copy.meta.ogAlt} className={field} />
        </label>
        {copy.spaces.items.filter((space) => space.image).map((space) => (
          <div key={space.id} className="grid gap-2 md:grid-cols-2">
            <label className="text-sm">
              {space.title}
              <select name={`space_${space.id}`} defaultValue={space.image} className={field}>
                {gallery.map((image) => (
                  <option key={image.src} value={image.src}>
                    {image.src}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Opis
              <input name={`alt_${space.id}`} defaultValue={space.imageAlt ?? ""} className={field} />
            </label>
          </div>
        ))}
        <details>
          <summary className="cursor-pointer text-sm text-olive">Opisi svih fotografija u galeriji</summary>
          <div className="mt-4 space-y-2">
            {gallery.map((image, index) => (
              <label key={image.src} className="grid gap-2 text-xs md:grid-cols-[14rem_1fr]">
                <span className="truncate">{image.src}</span>
                <input
                  name={`g_${index}`}
                  defaultValue={state.galleryAlts[image.src]?.[locale] ?? image.alt[locale]}
                  className="rounded-lg border border-sand bg-white px-2 py-1"
                />
              </label>
            ))}
          </div>
        </details>
        <button className="rounded-full bg-olive px-5 py-2 text-sm text-paper" type="submit">
          Spremi i objavi
        </button>
      </form>
    </main>
  );
}
