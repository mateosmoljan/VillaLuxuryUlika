import { Link } from "@/navigation";
import Photo from "@/components/site/Photo";
import { prepareLocale } from "@/lib/site/locale";
import { getPublished } from "@/lib/store/publish";

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const { copy, hero } = await getPublished(locale);

  return (
    <>
      <section className="relative min-h-[78vh] bg-olive-deep">
        <Photo
          src={hero}
          alt={copy.meta.ogAlt}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/10" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-5 pb-14 pt-24 text-paper">
          <p className="text-xs uppercase tracking-[0.22em] text-paper/80">{copy.hero.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight sm:text-7xl">
            {copy.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/90">{copy.hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/villa-luxury-ulika"
              className="rounded-full bg-paper px-5 py-2.5 text-sm text-ink"
            >
              {copy.hero.primary}
            </Link>
            <Link
              href="/pricelist"
              className="rounded-full border border-paper/70 px-5 py-2.5 text-sm text-paper"
            >
              {copy.hero.secondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-olive">{copy.intro.kicker}</p>
        <h2 className="mt-2 max-w-2xl font-display text-4xl text-ink">{copy.intro.title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {copy.intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-ink/85">
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.cards.map((card) => (
            <li key={card.title}>
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-2xl border border-sand bg-white/40 p-5 hover:border-olive"
              >
                <span aria-hidden className="mb-4 h-8 w-8 rounded-full border border-olive/30 bg-olive/10" />
                <span className="font-display text-2xl text-ink">{card.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-ink/75">{card.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-16 md:grid-cols-2">
        <Photo
          src="/assets/images/i/76.jpg"
          alt={copy.spaces.items.find((item) => item.id === "pool")?.imageAlt || copy.meta.ogAlt}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[4/3] rounded-2xl"
        />
        <div>
          <h2 className="font-display text-4xl text-ink">{copy.spaces.items[5].title}</h2>
          <ul className="mt-4 space-y-3 text-ink/85">
            {copy.spaces.items[5].points.slice(0, 4).map((point) => (
              <li key={point} className="leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
          <Link href="/villa-luxury-ulika#pool" className="mt-6 inline-block text-olive underline">
            {copy.nav.villa}
          </Link>
        </div>
      </section>
    </>
  );
}
