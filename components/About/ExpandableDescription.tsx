"use client";

import { useState } from "react";

type Props = {
  id: string;
  moreLabel: string;
  lessLabel: string;
  preview: React.ReactNode;
  children: React.ReactNode;
};

function ExpandableDescription({
  id,
  moreLabel,
  lessLabel,
  preview,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative">
        {preview}
        {!open && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent"
          />
        )}
      </div>
      <div id={id} hidden={!open}>
        {children}
      </div>
      <button
        type="button"
        className="expand-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? lessLabel : moreLabel}
      </button>
    </div>
  );
}

export default ExpandableDescription;
