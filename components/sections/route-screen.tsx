import type { FigmaRoute } from "@/types/route";

import { HeroSection } from "@/components/sections/hero-section";
import { ContentSection } from "@/components/sections/content-section";
import { CardsSection } from "@/components/sections/cards-section";
import { FaqSection } from "@/components/sections/faq-section";
import { MessageSection } from "@/components/sections/message-section";

interface RouteScreenProps {
  route: FigmaRoute;
}

export function RouteScreen({ route }: RouteScreenProps) {
  const first = route.sections[0];

  return (
    <main className="min-h-dvh bg-slate-50">
      <HeroSection title={first?.title ?? route.frameName} frameName={route.frameName} />
      {route.sections.slice(1).map((section) => {
        if (section.kind === "cards") {
          return <CardsSection key={section.id} title={section.title} />;
        }

        if (section.kind === "faq") {
          return <FaqSection key={section.id} title={section.title} />;
        }

        if (section.kind === "message") {
          return <MessageSection key={section.id} title={section.title} />;
        }

        return <ContentSection key={section.id} title={section.title} sectionName={section.name} />;
      })}
    </main>
  );
}
