import ShowcaseGallery from "@/components/Gallery/ShowcaseGallery";
import ShowcaseGallery2 from "@/components/Gallery/ShowcaseGallery2";
import NavPath from "@/components/NavPath/NavPath";
import SendMessage from "@/components/SendMessage/SendMessage";
import { useTranslations } from "next-intl";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata(locale, "/photogallery");
}

function Photogallery() {
  const t = useTranslations("Titles");
  return (
    <section className="pt-16 md:pt-14">
      <NavPath />
      <div className="">
        <h1 className="mt-12 font-ExtraBold text-center text-4xl text-dark_blue_black tracking-wider">
          {t("Photogallery")}
        </h1>
        <div>
          <div>
            <ShowcaseGallery />
          </div>
        </div>
        <div>
          <ShowcaseGallery2 />
        </div>
        <div className="mb-24">
          <SendMessage />
        </div>
      </div>
    </section>
  );
}

export default Photogallery;
