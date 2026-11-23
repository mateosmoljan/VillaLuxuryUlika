import { Link } from "@/navigation";

export default function InquiryBand({
  title,
  text,
  cta,
}: {
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-olive-deep px-6 py-8 text-white sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-2 max-w-xl text-white/80">{text}</p>
        </div>
        <Link
          href="/contact"
          prefetch={false}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-olive-deep transition hover:bg-paper motion-reduce:transition-none"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
