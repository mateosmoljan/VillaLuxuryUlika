"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FeaturesModal = dynamic(() => import("@/components/Features/features"), { ssr: false });

export default function OpenAmenities({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-line" type="button" onClick={() => setOpen(true)}>
        {label}
      </button>
      {open ? <FeaturesModal handleClose={() => setOpen(false)} /> : null}
    </>
  );
}
