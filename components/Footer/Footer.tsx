import Image from "next/image";
import SSL from "@/public/assets/images/ssl.png";
import "./footer.css";
import { Link } from "@/navigation";
import FooterSvg from "./FooterSvg";
import { useLocale, useTranslations } from "next-intl";

const creditPrefix = {
  hr: "Izradio",
  en: "Made by",
  de: "Erstellt von",
  it: "Realizzato da",
} as const;

function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale() as keyof typeof creditPrefix;
  return (
    <section className="flex relative justify-center bg-dark_blue_black xl:px-20 pb-10 xl:pb-20 ">
      <FooterSvg />
      <div className="pt-8 max-w-screen-2xl grid w-full text-white sm:grid-cols-2 gap-y-8 lg:grid-cols-3 place-items-center">
        <div className="h-full relative pl-5 sm:pl-0 w-full sm:w-3/5 lg:w-auto">
          <div className="space-y-4 ">
            <Image src={SSL} alt="SSL" width={200} />
            <p>
              ©{new Date().getFullYear()}
              {t("year").replace(/^©\d{4}/, "")}
            </p>
            <p>{t("rights")}</p>
            <p className="text-xs text-white/60">
              {creditPrefix[locale] ?? creditPrefix.en}{" "}
              <a
                href="https://webotok.com"
                target="_blank"
                rel="noopener"
                className="!text-white/70 hover:!text-yellow"
              >
                Webotok
              </a>
            </p>
            {/* <p className="">
              <a
                href="https://www.boostweb.io"
                className="!text-white hover:!text-yellow"
              >
                {t("created_by")}
              </a>
            </p> */}
          </div>
        </div>
        <div className="w-full h-full relative pl-5 sm:pl-0 sm:w-3/5 lg:w-auto">
          <h2 className="font-bold uppercase text-xl pb-5">
            {t("Discover.title")}
          </h2>
          <ul className="space-y-4 !text-white">
            <li>
              <Link
                href="https://www.vodnjanski.info/"
                target="_blank"
                className="!text-white underline hover:!text-yellow"
              >
                {t("Discover.list.Pula")}
              </Link>
            </li>
            <li>
              <Link
                href="https://www.istra.hr/"
                target="_blank"
                className="!text-white underline hover:!text-yellow"
              >
                {t("Discover.list.Guide")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="h-full relative pl-5 sm:pl-0 w-full sm:w-3/5 lg:w-auto">
          <h2 className="font-bold uppercase text-xl pb-5">
            {t("Contact_Us.title")}
          </h2>
          <ul className="space-y-4">
            <li>Mihovil Smoljan</li>
            <li>Vodnjan</li>
            <li>
              <a
                href="tel:+385955824729"
                className="!text-white hover:!text-yellow"
              >
                +(385) 95 582 4729
              </a>
            </li>
            <li>
              <a
                href="tel:+385998734770"
                className="!text-white hover:!text-yellow"
              >
                +(385) 99 873 4770
              </a>
            </li>
            <li>
              <a
                href="mailto:villa-ulika-fivestars@gmail.com"
                className="!text-white hover:!text-yellow"
              >
                villa-ulika-fivestars@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;
