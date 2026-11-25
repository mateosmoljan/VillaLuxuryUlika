"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AmenityIcon } from "./AmenityIcon";

const FeaturesModal = dynamic(() => import("@/components/Features/features"), { ssr: false });

type Group = { title: string; start: number; items: string[] };

export default function AmenityModal({
  title,
  button,
  groups,
}: {
  title: string;
  button: string;
  groups: Group[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <section className="sec wrap">
      <h2>{title}</h2>
      <div className="cards">
        {groups.map((group) => (
          <article className="card" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.slice(0, 3).map((name, index) => (
                <li key={name} className="amenity-row">
                  <AmenityIcon index={group.start + index} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <button className="btn btn-line" type="button" onClick={() => setOpen(true)}>
        {button}
      </button>
      {open ? <FeaturesModal handleClose={() => setOpen(false)} /> : null}
    </section>
  );
}
