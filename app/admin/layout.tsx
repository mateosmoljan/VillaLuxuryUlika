import type { Metadata } from "next";
import "../[locale]/globals.css";

export const metadata: Metadata = {
  title: "Domaćin · Villa Luxury Ulika",
  robots: { index: false, follow: false, nocache: true },
};

export const runtime = "nodejs";

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
