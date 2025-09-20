import NavPath from "@/components/NavPath/NavPath";
import { Link } from "@/navigation";
import React from "react";
import Image from "next/image";

import oldTimer_House from "@/public/assets/images/oldTimer_House.jpg";
import oldTimer from "@/public/assets/images/oldTimer.jpg";
import { useTranslations } from "next-intl";

const EventPackages = () => {
  const a = useTranslations("Events");

  // Use the static packages array defined above
  const packages: { title: string; details: string[]; price: string }[] =
    a.raw("packages");

  return (
    <section className="pt-16 md:pt-14 min-h-screen mb-36 px-4">
      <NavPath />
      <div className="max-w-6xl mx-auto  mt-12 mb-10">
        <h2 className=" mb-6 text-center mt-12 font-ExtraBold text-4xl text-dark_blue_black tracking-wider">
          🎉 {a("title")}
        </h2>
        <p className="text-gray-600 mb-12 text-center">{a("subtitle")}</p>
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
                  <p className="text-2xl font-semibold text-yellow mb-4 text-center">
                    {pkg.price}
                  </p>
                  <Link href="/contact" className="btn justify-center">
                    {a("button")}
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
                {a("p4_title")}
              </h3>
              <p className="text-gray-600 space-y-2 mb-6">{a("p4_des")}</p>
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
                {a("button")}
              </Link>
            </div>
          </div>
        </div>
        <section>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <Image src={oldTimer} alt="Old Timer" className="rounded-xl" />
            </div>
            <div>
              <Image
                src={oldTimer_House}
                alt="Old Timer"
                className="rounded-xl"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default EventPackages;
