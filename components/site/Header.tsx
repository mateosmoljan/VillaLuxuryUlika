"use client";

import { Link, usePathname } from "@/navigation";
import type { Locale } from "@/lib/site/copy";
import type { Chrome } from "@/lib/site/chrome";
import { useState } from "react";

const locales: { code: Locale; label: string }[] = [
  { code: "hr", label: "Hrvatski" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
];

export default function Header({
  locale,
  nav,
  eyebrow,
  inquiry,
  menuLabel,
  closeLabel,
}: {
  locale: Locale;
  nav: string[];
  eyebrow: string;
  inquiry: string;
  menuLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = [
    { href: "/villa-luxury-ulika" as const, label: nav[0] },
    { href: "/photogallery" as const, label: nav[2] },
    { href: "/pricelist" as const, label: nav[1] },
    { href: "/surroundings" as const, label: nav[3] },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="mr-auto flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/icon-32.png" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="block font-display text-[1.35rem] leading-none text-olive-deep">Villa Luxury Ulika</span>
          <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">{eyebrow}</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label={menuLabel}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-sm font-semibold transition motion-reduce:transition-none ${pathname === item.href ? "text-clay" : "text-ink hover:text-olive"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative hidden lg:block">
          <summary className="cursor-pointer list-none rounded-xl border border-sand px-3 py-2 text-sm font-semibold uppercase text-olive-deep">
            {locale}
          </summary>
          <ul className="absolute right-0 z-10 mt-2 w-44 rounded-xl border border-sand bg-white p-1 shadow-lg">
            {locales.map((item) => (
              <li key={item.code}>
                <Link
                  href={pathname || "/"}
                  locale={item.code}
                  hrefLang={item.code}
                  lang={item.code}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-paper"
                  aria-current={item.code === locale ? "true" : undefined}
                >
                  <b className="w-8 text-xs">{item.code.toUpperCase()}</b>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
        <Link href="/contact" className="hidden rounded-full bg-olive px-4 py-2 text-sm font-semibold text-white hover:bg-olive-deep sm:inline-flex">
          {inquiry}
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sand lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? closeLabel : menuLabel}</span>
          <span aria-hidden className="flex w-4 flex-col gap-1.5">
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
          </span>
        </button>
      </div>
      {open && (
        <nav id="site-menu" className="border-t border-sand bg-white px-4 py-3 lg:hidden">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="block border-b border-paper py-3 font-semibold" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 py-3">
            {locales.map((item) => (
              <Link key={item.code} href={pathname || "/"} locale={item.code} className="rounded-lg border border-sand px-3 py-2 text-sm font-semibold uppercase" onClick={() => setOpen(false)}>
                {item.code}
              </Link>
            ))}
          </div>
          <Link href="/contact" className="mt-1 inline-flex rounded-full bg-olive px-4 py-2 text-sm font-semibold text-white" onClick={() => setOpen(false)}>
            {inquiry}
          </Link>
        </nav>
      )}
    </header>
  );
}
