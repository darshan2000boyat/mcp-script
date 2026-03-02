interface SectionCardProps {
  title: string;
  subtitle: string;
}

export function SectionCard({ title, subtitle }: SectionCardProps) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold text-emerald-900">{title}</h3>
      <p className="mt-2 text-sm text-emerald-700">{subtitle}</p>
    </article>
  );
}
