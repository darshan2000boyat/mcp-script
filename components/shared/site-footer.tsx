import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <Container className="flex flex-col gap-2 py-8 text-sm text-emerald-700 sm:flex-row sm:items-center sm:justify-between">
        <p>Generated from Figma top-level frames</p>
        <p>Next.js App Router + TypeScript</p>
      </Container>
    </footer>
  );
}
