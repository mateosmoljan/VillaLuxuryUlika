import { pageMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return pageMetadata(params.locale, "villa");
}

export default function VillaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
