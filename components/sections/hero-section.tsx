import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

interface HeroSectionProps {
  title: string;
  frameName: string;
}

export function HeroSection({ title, frameName }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-lime-50 to-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">{frameName}</p>
            <h1 className="text-3xl font-bold text-emerald-950 sm:text-4xl">{title}</h1>
            <p className="text-base text-emerald-800">This route is mapped from a top-level Figma frame and rendered with reusable sections.</p>
            <ButtonLink href="/" label="Back to home" />
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-emerald-800">Auto-layout direction and repeated section patterns are translated into composable layout blocks.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
