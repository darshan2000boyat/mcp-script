import { FIGMA_ROUTES } from "@/lib/figma-routes";

export interface RouteGroup {
  pageName: string;
  count: number;
}

export function useRouteGroups(): RouteGroup[] {
  const groups = new Map<string, number>();

  for (const route of FIGMA_ROUTES) {
    groups.set(route.pageName, (groups.get(route.pageName) ?? 0) + 1);
  }

  return [...groups.entries()].map(([pageName, count]) => ({ pageName, count }));
}
