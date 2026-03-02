import Link from "next/link";

import { NAV_LINKS } from "@/lib/figma-routes";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  const links = NAV_LINKS.slice(0, 8);

  return (
    <header className="border-b border-emerald-100 bg-white/95">
      <Container className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold text-emerald-900">
          Figma Web App
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 sm:justify-end">
          {links.map((link) => (
            <Link
              key={`${link.title}-${link.href}`}
              href={link.href}
              className="rounded-full border border-emerald-200 px-3 py-1 text-sm text-emerald-800 transition hover:border-emerald-400 hover:text-emerald-900"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
