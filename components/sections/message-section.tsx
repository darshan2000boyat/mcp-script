import { Container } from "@/components/ui/container";

interface MessageSectionProps {
  title: string;
}

export function MessageSection({ title }: MessageSectionProps) {
  return (
    <section className="py-10">
      <Container>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-lg font-semibold text-emerald-900">{title}</h2>
          <p className="mt-2 text-sm text-emerald-800">Status and feedback blocks are modeled as reusable message sections.</p>
        </div>
      </Container>
    </section>
  );
}
