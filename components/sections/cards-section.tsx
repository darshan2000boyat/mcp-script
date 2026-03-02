import { Container } from "@/components/ui/container";
import { SectionCard } from "@/components/ui/section-card";

interface CardsSectionProps {
  title: string;
}

export function CardsSection({ title }: CardsSectionProps) {
  const cards = [
    { title: `${title} Overview`, subtitle: "Mapped from repeated campaign and fundraiser patterns" },
    { title: `${title} Highlights`, subtitle: "Reusable card grid extracted into a shared section" },
    { title: `${title} Metrics`, subtitle: "Consistent spacing and typography scale from Tailwind utilities" },
  ];

  return (
    <section className="py-10">
      <Container>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-900">{title}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <SectionCard key={card.title} title={card.title} subtitle={card.subtitle} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
