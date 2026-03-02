import { notFound } from "next/navigation";

import { RouteScreen } from "@/components/sections/route-screen";
import { FIGMA_ROUTES, getRouteBySlug } from "@/lib/figma-routes";

interface RoutePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FIGMA_ROUTES.filter((route) => !route.isHome).map((route) => ({ slug: route.slug }));
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  return <RouteScreen route={route} />;
}
