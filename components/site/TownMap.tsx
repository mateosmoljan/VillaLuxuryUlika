"use client";

import { useState } from "react";
import type { Chrome } from "@/lib/site/chrome";

export default function TownMap({ chrome }: { chrome: Chrome }) {
  const [open, setOpen] = useState(false);
  const query = "https://maps.google.com/maps?q=Vodnjan%2C%20Istria&z=13&output=embed";
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-sand bg-stone">
      {open ? (
        <iframe title={chrome.mapTown} src={query} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <button type="button" className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center" onClick={() => setOpen(true)}>
          <span className="font-display text-3xl text-olive-deep">{chrome.mapButton}</span>
          <span className="max-w-sm text-sm text-ink/70">{chrome.mapHint}</span>
        </button>
      )}
      <a
        href="https://www.google.com/maps/search/?api=1&query=Vodnjan%2C%20Istria"
        className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-2 text-sm font-semibold"
        target="_blank"
        rel="noreferrer"
      >
        {chrome.mapTown}
      </a>
    </div>
  );
}
