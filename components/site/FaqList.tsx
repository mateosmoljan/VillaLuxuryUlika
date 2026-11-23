export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <details key={item.q} className="rounded-2xl border border-sand bg-white">
          <summary className="cursor-pointer list-none px-4 py-4 font-semibold marker:content-none">{item.q}</summary>
          <p className="px-4 pb-4 leading-relaxed text-ink/75">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
