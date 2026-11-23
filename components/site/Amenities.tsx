import type { Copy } from "@/lib/site/copy";

export default function Amenities({ copy }: { copy: Copy }) {
  return (
    <section className="bg-stone/60 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs uppercase tracking-[0.2em] text-olive">{copy.amenities.kicker}</p>
        <h2 className="mt-2 font-display text-4xl text-ink">{copy.amenities.title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {copy.amenities.groups.map((group) => (
            <section
              key={group.id}
              className={`rounded-2xl border p-5 ${
                group.notIncluded
                  ? "border-clay/40 bg-paper"
                  : "border-sand bg-paper"
              }`}
              aria-labelledby={`amenity-${group.id}`}
            >
              <h3 id={`amenity-${group.id}`} className="font-display text-2xl text-ink">
                {group.title}
              </h3>
              {group.notIncluded && (
                <p className="mt-1 text-sm text-clay">{copy.amenities.excludedNote}</p>
              )}
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <p className="text-ink">{item.name}</p>
                    {item.note && <p className="text-sm leading-relaxed text-ink/65">{item.note}</p>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
