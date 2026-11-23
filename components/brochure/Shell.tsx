import { Link } from "@/navigation";

const locales = [
  { code: "hr", label: "Hrvatski" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
] as const;

export default function Shell({
  locale,
  nav,
  inquiry,
  guides,
  children,
}: {
  locale: string;
  nav: { href: string; label: string }[];
  inquiry: string;
  guides: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip" href="#main">
        {inquiry}
      </a>
      <header className="hd">
        <div className="wrap hd-in">
          <Link href="/" className="brand">
            <img src="/icon-32.png" width={44} height={44} alt="" />
            <span>
              Villa Luxury Ulika
              <small>Vodnjan · Istra</small>
            </span>
          </Link>
          <button className="burger" type="button" aria-expanded="false" aria-controls="nav">
            <span className="sr">Menu</span>
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <nav id="nav" className="nav" aria-label="Menu">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <details className="ls" data-ls>
              <summary className="ls-b">{locale.toUpperCase()}</summary>
              <ul className="ls-l">
                {locales.map((item) => (
                  <li key={item.code}>
                    <Link href="/" locale={item.code} hrefLang={item.code} lang={item.code}>
                      <b>{item.code.toUpperCase()}</b> {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            <Link href="/contact" className="btn btn-cta nav-cta">
              {inquiry}
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="ft">
        <div className="wrap ft-in">
          <div>
            <p className="ft-b">Villa Luxury Ulika</p>
            <p className="muted">Vodnjan · Istra</p>
          </div>
          <div>
            <p className="ft-h">{inquiry}</p>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              {guides.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="ft-h">Mihovil Smoljan</p>
            <ul>
              <li>Vodnjan</li>
              <li>
                <a href="tel:+385955824729">+(385) 95 582 4729</a>
              </li>
              <li>
                <a href="tel:+385998734770">+(385) 99 873 4770</a>
              </li>
              <li>
                <a href="mailto:villa-ulika-fivestars@gmail.com">villa-ulika-fivestars@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="sbar">
        <Link href="/contact" className="btn btn-cta sb-main">
          {inquiry}
        </Link>
        <a className="sb-s" href="tel:+385955824729" aria-label="+(385) 95 582 4729">
          ☎
        </a>
        <a className="sb-s" href="mailto:villa-ulika-fivestars@gmail.com" aria-label="villa-ulika-fivestars@gmail.com">
          ✉
        </a>
      </div>
      <dialog id="lb" className="lb" aria-label="Photo">
        <button type="button" className="lb-x" data-lb="x" aria-label="Close">
          ×
        </button>
        <button type="button" className="lb-p" data-lb="p" aria-label="Previous">
          ‹
        </button>
        <figure>
          <img alt="" width={1920} height={1280} />
          <figcaption className="cnt" />
        </figure>
        <button type="button" className="lb-n" data-lb="n" aria-label="Next">
          ›
        </button>
      </dialog>
      <script src="/brochure.js" defer />
    </>
  );
}
