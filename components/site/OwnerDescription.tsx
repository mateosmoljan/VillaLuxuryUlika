"use client";

import Markdown from "react-markdown";
import ExpandableDescription from "@/components/About/ExpandableDescription";

export default function OwnerDescription({
  id,
  text,
  moreLabel,
  lessLabel,
}: {
  id: string;
  text: string;
  moreLabel: string;
  lessLabel: string;
}) {
  const parts = text.split("\n\n");
  return (
    <ExpandableDescription
      id={id}
      moreLabel={moreLabel}
      lessLabel={lessLabel}
      preview={<Markdown>{parts[0] || ""}</Markdown>}
    >
      <Markdown>{parts.slice(1).join("\n\n")}</Markdown>
    </ExpandableDescription>
  );
}
