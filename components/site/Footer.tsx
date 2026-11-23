import { Link } from "@/navigation";

type Item = { href: string; label: string };

export default function Footer({
  year,
  rights,
  pagesTitle,
  pages,
  guidesTitle,
  guides,
  discoverTitle,
  vodnjan,
  guide,
  contactTitle,
}: {
  year: string;
  rights: string;
  pagesTitle: string;
  pages: Item[];
  guidesTitle: string;
  guides: Item[];
  discoverTitle: string;
  vodnjan: string;
  guide: string;
  contactTitle: string;
}) {
  return (
    <footer className="border-t border-sand bg-olive-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl">Villa Luxury Ulika</p>
          <p className="mt-2 text-sm text-white/80">
            ©{new Date().getFullYear()}
            {year.replace(/^©\d{4}/, "")}
          </p>
          <p className="text-sm text-white/80">{rights}</p>
        </div>
        <div className="text-sm leading-7">
          <h2 className="font-display text-xl">{pagesTitle}</h2>
          {pages.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:underline">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-sm leading-7">
          <h2 className="font-display text-xl">{guidesTitle}</h2>
          {guides.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:underline">
              {item.label}
            </Link>
          ))}
          <h2 className="mt-4 font-display text-xl">{discoverTitle}</h2>
          <a className="block hover:underline" href="https://www.vodnjanski.info/" target="_blank" rel="noreferrer">
            {vodnjan}
          </a>
          <a className="block hover:underline" href="https://www.istra.hr/" target="_blank" rel="noreferrer">
            {guide}
          </a>
        </div>
        <div className="text-sm leading-7">
          <h2 className="font-display text-xl">{contactTitle}</h2>
          <p>Mihovil Smoljan</p>
          <p>Vodnjan</p>
          <a className="block hover:underline" href="tel:+385955824729">+(385) 95 582 4729</a>
          <a className="block hover:underline" href="tel:+385998734770">+(385) 99 873 4770</a>
          <a className="block hover:underline" href="mailto:villa-ulika-fivestars@gmail.com">
            villa-ulika-fivestars@gmail.com
          </a>
          <Link href="/contact" className="mt-2 inline-block underline">
            {contactTitle}
          </Link>
        </div>
      </div>
    </footer>
  );
}
