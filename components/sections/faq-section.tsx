import { Container } from "@/components/ui/container";

interface FaqSectionProps {
  title: string;
}

export function FaqSection({ title }: FaqSectionProps) {
  const faqs = [
    `How is ${title} organized?`,
    `Which Figma frame produced ${title}?`,
    "How are repeated blocks reused?",
  ];

  return (
    <section className="py-10">
      <Container>
        <div className="rounded-2xl border border-emerald-100 bg-white p-6">
          <h2 className="text-xl font-semibold text-emerald-900">{title}</h2>
          <ul className="mt-4 space-y-3">
            {faqs.map((question) => (
              <li key={question} className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                {question}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
