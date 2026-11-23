import NavPath from "@/components/NavPath/NavPath";
import { Link } from "@/navigation";
import React from "react";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { prepareLocale } from "@/lib/site/locale";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  prepareLocale(params.locale);
  return pageMetadata(params.locale, "events");
}
import Markdown from "react-markdown";

import oldTimer_House from "@/public/assets/images/oldTimer_House.jpg";
import oldTimer from "@/public/assets/images/oldTimer.jpg";
import whiteTent from "@/public/assets/images/white_tent.jpg";
import longTables from "@/public/assets/images/long_tables.jpg";
import roundTables from "@/public/assets/images/round_tables.jpg";

const column1Images = [{ src: oldTimer_House }, { src: oldTimer }];
const column2Images = [{ src: whiteTent }];
const column3Images = [{ src: roundTables }, { src: longTables }];

const eventAlts: Record<string, string[]> = {
  hr: [
    "Oldtimer ispred vile",
    "Oldtimer",
    "Bijeli šator",
    "Okrugli stolovi",
    "Dugi stolovi",
  ],
  en: [
    "Vintage car in front of the villa",
    "Vintage car",
    "White tent",
    "Round tables",
    "Long tables",
  ],
  de: [
    "Oldtimer vor der Villa",
    "Oldtimer",
    "Weißes Zelt",
    "Runde Tische",
    "Lange Tische",
  ],
  it: [
    "Auto d'epoca davanti alla villa",
    "Auto d'epoca",
    "Tenda bianca",
    "Tavoli rotondi",
    "Tavoli lunghi",
  ],
};

const packs = { hr, en, de, it };

const EventPackages = ({ params }: { params: { locale: string } }) => {
  const locale = prepareLocale(params.locale);
  const a = packs[locale].Events;
  const alts = eventAlts[locale] ?? eventAlts.en;

  // Use the static packages array defined above
  const packages: { title: string; details: string[]; price: string }[] =
    "packages" in a ? a.packages : [];

  return (
    <section className="pt-16 md:pt-14 min-h-screen mb-36 ">
      <NavPath />
      <div className="max-w-6xl mx-auto  mt-12 mb-10 px-4">
        <h1 className=" mb-6 text-center mt-12 font-ExtraBold text-4xl text-dark_blue_black tracking-wider">
          {a.title}
        </h1>
        <p className="text-gray-600 mb-12 text-center">
          <Markdown>{a.subtitle}</Markdown>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map(
            (
              pkg: { title: string; details: string[]; price: string },
              index: number
            ) => (
              <div
                key={index}
                className="flex flex-col justify-between border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">
                    {pkg.title}
                  </h3>
                  <ul className="text-gray-600 space-y-2 mb-6">
                    {pkg.details.map((item: string, i: number) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* <p className="text-2xl font-semibold text-yellow mb-4 text-center">
                    {pkg.price}
                  </p> */}
                  <Link href="/contact" className="btn justify-center">
                    {a.button}
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-16 mb-36">
          <div className="flex md:flex-row gap-6 flex-col justify-between border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                {a.p4_title}
              </h3>
              <p className="text-gray-600 space-y-2 mb-6">{a.p4_des}</p>
              <p className="mt-4">
                <a
                  href="https://www.facebook.com/share/1BKZu6AJjK/?mibextid=wwXIfr"
                  target="_blank"
                  className="underline text-yellow"
                >
                  <b>VISAEM</b>
                </a>
              </p>
            </div>

            <div className="flex flex-col md:items-end items-center justify-center">
              <Link
                href="/contact"
                className="btn justify-center min-w-[220px] mt-4 md:mt-0"
              >
                {a.button}
              </Link>
            </div>
          </div>
        </div>
        <section className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Column 1 */}
            <div className="flex-1 flex flex-col gap-2">
              {column1Images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image.src}
                    alt={alts[index]}
                    className="rounded-lg w-full h-auto object-cover"
                    width={500}
                    height={300}
                  />
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex-1 flex flex-col gap-2">
              {column2Images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image.src}
                    alt={alts[2]}
                    className="rounded-lg w-full h-auto object-cover"
                    width={500}
                    height={300}
                  />
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex-1 flex flex-col gap-2">
              {column3Images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image.src}
                    alt={alts[3 + index]}
                    className="rounded-lg w-full h-auto object-cover"
                    width={500}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default EventPackages;
