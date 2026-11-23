import { Link } from "@/navigation";
import type { Chrome } from "@/lib/site/chrome";

export default function StickyBar({
  chrome,
  phone,
  email,
}: {
  chrome: Chrome;
  phone?: { display: string; href: string };
  email: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-white/95 p-2 backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        {phone ? (
          <a href={phone.href} className="rounded-full bg-olive py-3 text-center text-sm font-semibold text-white">
            {chrome.stickyCall}
          </a>
        ) : null}
        <Link href="/contact" prefetch={false} className="rounded-full bg-olive-deep py-3 text-center text-sm font-semibold text-white">
          {chrome.inquiry}
        </Link>
        <a href={`mailto:${email}`} className="rounded-full border border-olive py-3 text-center text-sm font-semibold text-olive">
          {chrome.stickyEmail}
        </a>
      </div>
    </div>
  );
}
