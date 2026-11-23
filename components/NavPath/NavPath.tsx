"use client";
import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FaHome } from "react-icons/fa";

type Props = {
  homePage?: boolean;
};

function NavPath({ homePage = false }: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const labels = useTranslations("Breadcrumb");
  const segment = pathname.split("/").filter(Boolean)[0];
  const label = segment ? labels(segment) : "";

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
