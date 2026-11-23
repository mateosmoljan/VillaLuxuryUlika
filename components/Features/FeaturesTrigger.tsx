"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FeaturesComponent = dynamic(() => import("./features"), {
  ssr: false,
});

export default function FeaturesTrigger({ buttonLabel }: { buttonLabel: string }) {
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showFeatures ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFeatures]);

  return (
    <>
      <button className="btn-2 mt-3" onClick={() => setShowFeatures(true)}>
        {buttonLabel}
      </button>
      {showFeatures && <FeaturesComponent handleClose={() => setShowFeatures(false)} />}
    </>
  );
}
