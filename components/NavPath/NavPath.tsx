"use client";
import { Link, usePathname } from "@/navigation";
import { useLocale } from "next-intl";
import { FaHome } from "react-icons/fa";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

const crumbs = {
  hr: hr.Breadcrumb,
  en: en.Breadcrumb,
  de: de.Breadcrumb,
  it: it.Breadcrumb,
} as const;

type Props = {
  homePage?: boolean;
};

function NavPath({ homePage = false }: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const labels = crumbs[locale as keyof typeof crumbs] ?? crumbs.en;
  const segment = pathname.split("/").filter(Boolean)[0] as keyof typeof labels;
  const label = segment ? labels[segment] ?? segment : "";

  return (
    <div className="b bg-gray-100 py-3 px-4 sm:px-8">
      <nav className="flex items-center gap-2 container" aria-label={locale}>
        <Link href="/" className="text-dark_blue_black">
          <FaHome />
        </Link>
        {!homePage && segment && (
          <Link href={pathname} className="text-dark_blue_black">
            <div className="flex items-center gap-2">
              <span className="text-xl"> {">"} </span>
              {label}
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default NavPath;
