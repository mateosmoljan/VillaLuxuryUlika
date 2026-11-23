import Photo from "./Photo";
import type { Copy } from "@/lib/site/copy";

export default function Spaces({ copy }: { copy: Copy }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-olive">{copy.spaces.kicker}</p>
      <h2 className="mt-2 font-display text-4xl text-ink">{copy.spaces.title}</h2>
      <div className="mt-10 flex flex-col gap-16">
        {copy.spaces.items.map((space, index) => (
          <article
            id={space.id}
            key={space.id}
            className="scroll-mt-24 grid items-center gap-8 md:grid-cols-2"
          >
            {space.image && space.imageAlt ? (
              <Photo
                src={space.image}
                alt={space.imageAlt}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`aspect-[4/3] rounded-2xl ${index % 2 === 1 ? "md:order-2" : ""}`}
              />
            ) : (
              <div className="hidden md:block" />
            )}
            <div>
              <h3 className="font-display text-3xl text-ink">{space.title}</h3>
              <ul className="mt-4 space-y-3 text-ink/85">
                {space.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
