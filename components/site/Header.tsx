"use client";

import { Link, usePathname } from "@/navigation";
import type { Copy, Locale } from "@/lib/site/copy";
import { useState } from "react";

const locales: Locale[] = ["hr", "en", "de", "it"];

const links = (nav: Copy["nav"]) =>
  [
    { href: "/villa-luxury-ulika" as const, label: nav.villa },
    { href: "/pricelist" as const, label: nav.prices },
    { href: "/photogallery" as const, label: nav.gallery },
    { href: "/surroundings" as const, label: nav.place },
    { href: "/contact" as const, label: nav.contact },
  ];

export default function Header({
  locale,
  nav,
  eyebrow,
}: {
  locale: Locale;
  nav: Copy["nav"];
  eyebrow: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = links(nav);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-sand/80 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="min-w-0" onClick={() => setOpen(false)}>
          <span className="block font-display text-xl leading-none tracking-tight text-ink">
            Villa Luxury Ulika
          </span>
          <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.18em] text-olive">
            {eyebrow}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label={nav.home}>
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm tracking-wide ${active ? "text-olive" : "text-ink/80 hover:text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs tracking-wide">
            {locales.map((code) => (
              <Link
                key={code}
                href={pathname || "/"}
                locale={code}
                hrefLang={code}
                lang={code}
                aria-current={code === locale ? "true" : undefined}
                className={`px-1.5 py-1 uppercase ${code === locale ? "text-olive" : "text-ink/50 hover:text-ink"}`}
              >
                {code}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            className="hidden rounded-full bg-olive px-4 py-2 text-sm text-paper hover:bg-olive-deep sm:inline-block"
          >
            {nav.book}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? nav.close : nav.open}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="site-menu" className="border-t border-sand bg-paper px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-1 text-lg text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="mt-2 inline-block rounded-full bg-olive px-4 py-2 text-sm text-paper"
                onClick={() => setOpen(false)}
              >
                {nav.book}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
