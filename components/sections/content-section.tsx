import { Container } from "@/components/ui/container";

interface ContentSectionProps {
  title: string;
  sectionName: string;
}

export function ContentSection({ title, sectionName }: ContentSectionProps) {
  return (
    <section className="py-10">
      <Container>
        <div className="rounded-2xl border border-emerald-100 bg-white p-6">
          <h2 className="text-xl font-semibold text-emerald-900">{title}</h2>
          <p className="mt-2 text-sm text-emerald-700">Section source: {sectionName}</p>
        </div>
      </Container>
    </section>
  );
}
