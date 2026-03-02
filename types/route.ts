export type RouteSectionKind =
  | "hero"
  | "intro"
  | "content"
  | "cards"
  | "faq"
  | "message";

export interface RouteSection {
  id: string;
  name: string;
  title: string;
  kind: RouteSectionKind;
}

export interface FigmaRoute {
  id: string;
  pageName: string;
  frameName: string;
  slug: string;
  isHome: boolean;
  sections: RouteSection[];
}

export interface NavLinkItem {
  title: string;
  href: string;
}
