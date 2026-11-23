export default function Loading() {
  return (
    <main className="flex-1 pt-24 bg-white">
      <section className="relative h-[70vh] overflow-hidden bg-neutral-200">
        <div className="absolute inset-0 loading-shimmer" />
        <div className="absolute inset-x-0 top-10 flex items-center justify-center gap-3 text-white/95">
          <div className="flex gap-1.5">
            <span className="loading-dot h-2.5 w-2.5 rounded-full bg-white" />
            <span className="loading-dot h-2.5 w-2.5 rounded-full bg-white" style={{ animationDelay: '0.15s' }} />
            <span className="loading-dot h-2.5 w-2.5 rounded-full bg-white" style={{ animationDelay: '0.3s' }} />
          </div>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]">Loading villa experience</span>
        </div>
        <div className="absolute inset-x-0 bottom-10 mx-auto w-[min(92%,720px)] rounded-xl bg-black/30 p-6 backdrop-blur-sm">
          <div className="loading-shimmer h-8 w-3/4 rounded-md bg-white/30" />
          <div className="mt-4 loading-shimmer h-4 w-full rounded bg-white/25" />
          <div className="mt-2 loading-shimmer h-4 w-5/6 rounded bg-white/25" />
          <div className="mt-5 loading-shimmer h-10 w-40 rounded-md bg-white/25" />
        </div>
      </section>
      <section className="container py-12 space-y-6">
        <div className="loading-shimmer h-8 w-56 rounded" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="loading-shimmer h-64 rounded" />
          <div className="loading-shimmer h-64 rounded" />
          <div className="loading-shimmer h-64 rounded" />
          <div className="loading-shimmer h-64 rounded" />
        </div>
        <div className="loading-shimmer h-40 rounded" />
      </section>
    </main>
  );
}
