import { Link } from "@/navigation";
import { siteUrl } from "@/lib/seo";

type Crumb = { href?: string; label: string };

export default function Crumbs({
  locale,
  home,
  items,
}: {
  locale: string;
  home: string;
  items: Crumb[];
}) {
  const list: Crumb[] = [{ href: "/", label: home }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `${siteUrl}/${locale}${item.href === "/" ? "" : item.href}` }
        : {}),
    })),
  };
  return (
    <nav aria-label={home} className="text-sm text-ink/60">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {list.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href && index < list.length - 1 ? (
              <Link href={item.href} className="transition hover:text-olive motion-reduce:transition-none">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </nav>
  );
}
