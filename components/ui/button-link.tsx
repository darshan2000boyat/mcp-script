import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  label: string;
}

export function ButtonLink({ href, label }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
    >
      {label}
    </Link>
  );
}
