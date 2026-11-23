export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <details key={item.q} className="group rounded-2xl border border-sand bg-white transition hover:border-olive/40 motion-reduce:transition-none">
          <summary className="cursor-pointer list-none px-4 py-4 font-semibold marker:content-none">{item.q}</summary>
          <p className="px-4 pb-4 leading-relaxed text-ink/75">{item.a}</p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </div>
  );
}
