import { Link } from "@/navigation";
import type { Copy } from "@/lib/site/copy";

export default function Footer({ copy }: { copy: Copy }) {
  return (
    <footer className="border-t border-sand bg-olive-deep text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Villa Luxury Ulika</p>
          <p className="mt-2 text-sm text-paper/80">{copy.footer.place}</p>
        </div>
        <div className="text-sm leading-7">
          <p>{copy.contact.person}</p>
          {copy.contact.phones.map((phone) => (
            <a key={phone.href} href={phone.href} className="block hover:text-white">
              {phone.display}
            </a>
          ))}
          <a href={`mailto:${copy.contact.email}`} className="block hover:text-white">
            {copy.contact.email}
          </a>
        </div>
        <div className="text-sm leading-7">
          <Link href="/villa-luxury-ulika" className="block hover:text-white">
            {copy.nav.villa}
          </Link>
          <Link href="/pricelist" className="block hover:text-white">
            {copy.nav.prices}
          </Link>
          <Link href="/photogallery" className="block hover:text-white">
            {copy.nav.gallery}
          </Link>
          <Link href="/contact" className="block hover:text-white">
            {copy.nav.contact}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-paper/70">
        © {new Date().getFullYear()} Villa Luxury Ulika. {copy.footer.rights}
      </div>
    </footer>
  );
}
