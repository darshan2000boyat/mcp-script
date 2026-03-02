import type { FigmaRoute, NavLinkItem, RouteSection, RouteSectionKind } from "@/types/route";

const SOURCE_FRAMES: Array<[string, string, string[]]> =
[
  [
    "00_Website - Ready for Sign-off",
    "About Us",
    [
      "About ALN"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "CSR",
    [
      "About ALN"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "News",
    [
      "About ALN"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Cart",
    [
      "About ALN"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Search",
    [
      "About ALN"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Misc",
    [
      "About ALN"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Payments",
    [
      "Choose Payment Method"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Active Search",
    [
      "Hero Section",
      "Frame 2131338479",
      "Component 1"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Cookies",
    [
      "Hero Section",
      "Frame"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Search Results",
    [
      "Hero Section",
      "Frame 19625416",
      "Frame 2131332056",
      "message",
      "Footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "News",
    [
      "Hero Section",
      "Frame 2131338575",
      "message",
      "Footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "CSR",
    [
      "Hero Section",
      "Frame 2131337919",
      "Our Approach",
      "cards",
      "Frame 2131338232",
      "message",
      "Footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "About Us",
    [
      "Hero Section",
      "Our Approach",
      "About Us",
      "cards",
      "Frame 2131338258",
      "Our Partners",
      "message",
      "Footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "News Detail Page",
    [
      "Hero Section",
      "Frame 2131338575",
      "message",
      "Footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Privacy Policy",
    [
      "Hero Section",
      "Frame 2131331931",
      "message",
      "Footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Terms & Conditions",
    [
      "Hero Section",
      "Frame 2131331931",
      "message",
      "Footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "404",
    [
      "Frame 2131338588"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Thank You",
    [
      "Frame 2131338588"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Something Went Wrong",
    [
      "Frame 2131338588"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Email",
    [
      "Group 2131331989",
      "Frame 2131331772",
      "Email footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Cart",
    [
      "Hero Section",
      "Frame 2131338672",
      "message",
      "Footer"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Cart Checkout",
    [
      "Group 2131337918",
      "Frame 2131338479",
      "log-in-pop-up"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Toast",
    [
      "Campaign Detail Page",
      "Toast notification"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "Donate",
    [
      "Frame 2131336772"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "3x Template identifier",
    [
      "Frame 2131331325",
      "Frame 2131331324"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "3x Template identifier",
    [
      "Frame 2131331325",
      "Frame 2131331324"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "3x Template identifier",
    [
      "Frame 2131331325",
      "Frame 2131331324"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "3x Template identifier",
    [
      "Frame 2131331325",
      "Frame 2131331324"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "3x Template identifier",
    [
      "Frame 2131331325",
      "Frame 2131331324"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "3x Template identifier",
    [
      "Frame 2131331325",
      "Frame 2131331324"
    ]
  ],
  [
    "00_Website - Ready for Sign-off",
    "3x Template identifier",
    [
      "Frame 2131331325",
      "Frame 2131331324"
    ]
  ],
  [
    "02 _ All Pages",
    "Leaderboard",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Campaigns & Fundraisers",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Contact Us",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Partners",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Zakat Calculator",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Create a Campaign",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Menu",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Homepage",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Intro",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Mobile",
    [
      "About ALN"
    ]
  ],
  [
    "02 _ All Pages",
    "Homepage - For Individuals",
    [
      "Hero Section",
      "Why Jood",
      "Let Us Help You",
      "Urgent Appeals",
      "Key Features",
      "Success Numbers",
      "START YOUR FUNDRAISE",
      "What’s New at  JOOD",
      "Frame 2131337920",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Nav",
    [
      "Frame 2131338580",
      "Frame 2131338582",
      "Logo"
    ]
  ],
  [
    "02 _ All Pages",
    "Nav",
    [
      "Frame 2131338580",
      "Frame 2131338582",
      "Logo"
    ]
  ],
  [
    "02 _ All Pages",
    "Sticky Buttons",
    [
      "AnnouncementTicker",
      "Hero Section",
      "Frame 2"
    ]
  ],
  [
    "02 _ All Pages",
    "Menu For Individuals",
    [
      "Frame 2131337919",
      "Component 1",
      "Rectangle 34627660",
      "Line 26",
      "Frame 2131336489",
      "Frame 2131338674",
      "Rectangle 34627661"
    ]
  ],
  [
    "02 _ All Pages",
    "Menu For Companies",
    [
      "Frame 2131337919",
      "Component 1",
      "Frame 2131337912",
      "Rectangle 34627661"
    ]
  ],
  [
    "02 _ All Pages",
    "Menu For Individuals",
    [
      "Frame 2131337919",
      "Component 1",
      "Rectangle 34627660",
      "Line 26",
      "Frame 2131336489",
      "Frame 2131338674",
      "Rectangle 34627661",
      "Frame 2131338681"
    ]
  ],
  [
    "02 _ All Pages",
    "Homepage - For Companies",
    [
      "Hero Section",
      "Why Jood",
      "Let Us Help You",
      "Urgent Appeals",
      "Key Features",
      "Section",
      "Frame 2131338574",
      "START YOUR FUNDRAISE",
      "Frame 2131338258",
      "Our Partners",
      "What’s New at  JOOD",
      "Frame 2131337919",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Intro",
    [
      "Intro"
    ]
  ],
  [
    "02 _ All Pages",
    "Intro",
    [
      "Group",
      "Heading",
      "Heading",
      "Heading",
      "Heading",
      "Heading",
      "Heading",
      "Rectangle 34627602",
      "Rectangle 34627603"
    ]
  ],
  [
    "02 _ All Pages",
    "Fundraisers",
    [
      "Hero Section",
      "Frame 2131338221",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Partner Detail Page",
    [
      "Hero Section",
      "Frame 2131332056",
      "Banner",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Contact Us",
    [
      "Hero Section",
      "03.03 Our Work / Decarbonisation / Policy Hack",
      "FAQs",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Zakat Calculator",
    [
      "Hero Section",
      "Frame 2131336669",
      "Frame 2131338479",
      "account-category"
    ]
  ],
  [
    "02 _ All Pages",
    "Zakat Calculator",
    [
      "Hero Section",
      "Frame 2131336669",
      "Frame 2131338479",
      "account-category"
    ]
  ],
  [
    "02 _ All Pages",
    "Zakat Calculator",
    [
      "Hero Section",
      "Frame 2131336669",
      "Download the JOOD app",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Zakat Calculator",
    [
      "Hero Section",
      "Frame 2131336669",
      "Download the JOOD app",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Zakat Calculator",
    [
      "Hero Section",
      "Frame 2131336669",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Zakat Calculator",
    [
      "Hero Section",
      "Frame 2131336669",
      "Download the JOOD app",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Partners",
    [
      "Hero Section",
      "Frame 2131338586",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Gift a Contribution",
    [
      "Hero Section",
      "Our Approach",
      "cards",
      "Download the JOOD app",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Zakat",
    [
      "Hero Section",
      "Our Approach",
      "Urgent Appeals",
      "FAQs",
      "Download the JOOD app",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Create a Campaign",
    [
      "Hero Section",
      "Our Approach",
      "cards",
      "Frame 2131338631",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Fundraiser Detail Page",
    [
      "Hero Section",
      "Frame 2131338575",
      "Urgent Appeals",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Fundraiser Detail Page",
    [
      "Hero Section",
      "Frame 2131338575",
      "Urgent Appeals",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Campaign Detail Page",
    [
      "Campaign Detail Page"
    ]
  ],
  [
    "02 _ All Pages",
    "Campaign Detail Page",
    [
      "Hero Section",
      "Frame 2131338575",
      "Urgent Appeals",
      "message",
      "Footer",
      "Frame 2131338479",
      "Frame 12328"
    ]
  ],
  [
    "02 _ All Pages",
    "Campaigns & Fundraisers",
    [
      "Hero Section",
      "Our Approach",
      "Urgent Appeals",
      "Urgent Appeals",
      "Frame 2131338587",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Campaigns & Fundraisers",
    [
      "Hero Section",
      "Frame 2131338586",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Contribution Leaderboard",
    [
      "Hero Section",
      "Download the JOOD app",
      "Frame 2131338221",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "Fundraisers Leaderboard",
    [
      "Hero Section",
      "Download the JOOD app",
      "Frame 2131338221",
      "message",
      "Footer"
    ]
  ],
  [
    "02 _ All Pages",
    "3x Template identifier",
    [
      "Frame 2131331325",
      "Frame 2131331324"
    ]
  ],
  [
    "02 _ All Pages",
    "Mobile",
    [
      "Frame 2131337912",
      "Frame 2131338419",
      "Frame 2131336283",
      "Frame 2131338241",
      "Frame 2131338230",
      "Section",
      "Frame 2131338260",
      "Innovation Labs",
      "Section",
      "Section",
      "message",
      "content",
      "Frame 2131338452",
      "Frame 2131338008",
      "Top bar"
    ]
  ],
  [
    "02 _ All Pages",
    "Menu",
    [
      "Rectangle 34627662",
      "Frame 2131336489",
      "Top bar",
      "Frame 2131338583",
      "Frame 2131338908",
      "Frame 2131338678"
    ]
  ],
  [
    "02 _ All Pages",
    "Menu",
    [
      "Rectangle 34627662",
      "Frame 2131336489",
      "Top bar",
      "Frame 2131338583",
      "Frame 2131338908",
      "Frame 2131338678"
    ]
  ],
  [
    "02 _ All Pages",
    "Menu With Items",
    [
      "Rectangle 34627662",
      "Line 26",
      "Line 27",
      "Frame 2131336489",
      "Frame 2131338909",
      "Top bar",
      "Frame 2131338908"
    ]
  ],
  [
    "02 _ All Pages",
    "FAQs",
    [
      "About ALN"
    ]
  ],
  [
    "03 _ Dashboard",
    "Dashboard",
    [
      "Side Navigation",
      "Frame 2131338060"
    ]
  ],
  [
    "03 _ Dashboard",
    "plan-your-zakat",
    [
      "Frame 2131338317"
    ]
  ],
  [
    "03 _ Dashboard",
    "plan-your-zakat",
    [
      "Frame 2131338469",
      "Frame 2131338221"
    ]
  ],
  [
    "03 _ Dashboard",
    "Frame 2131338291",
    [
      "plan-your-zakat"
    ]
  ],
  [
    "03 _ Dashboard",
    "Quick Contribute in 3 Clicks Individual / Company / Guest",
    [
      "Introduction"
    ]
  ],
  [
    "03 _ Dashboard",
    "Homepage - For Individuals",
    [
      "Hero Section",
      "Why Jood",
      "Let Us Help You",
      "Urgent Appeals",
      "Key Features",
      "Success Numbers",
      "START YOUR FUNDRAISE",
      "What’s New at  JOOD",
      "Frame 2131337920",
      "message",
      "Footer",
      "Frame 2"
    ]
  ],
  [
    "03 _ Dashboard",
    "Home / Mobile",
    [
      "StatusBar",
      "Frame 2131338348",
      "bottom-nav"
    ]
  ],
  [
    "03 _ Dashboard",
    "Home / Mobile",
    [
      "StatusBar",
      "Frame 2131338348",
      "bottom-nav"
    ]
  ],
  [
    "03 _ Dashboard",
    "Home / Mobile",
    [
      "StatusBar",
      "Frame 2131338348",
      "Frame 2131338961",
      "bottom-nav"
    ]
  ]
];

function toSlugBase(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function isHomeLike(name: string): boolean {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === "home" || normalized === "homepage";
}

function toTitle(value: string): string {
  return value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function mapSectionKind(name: string): RouteSectionKind | "nav" | "footer" {
  const value = name.toLowerCase();

  if (value.includes("hero")) return "hero";
  if (value.includes("faq")) return "faq";
  if (value.includes("message") || value.includes("toast") || value.includes("notification")) return "message";
  if (value.includes("nav") || value.includes("top bar") || value.includes("statusbar") || value.includes("side navigation") || value === "logo") return "nav";
  if (value.includes("footer")) return "footer";
  if (value.includes("card") || value.includes("campaign") || value.includes("fundraiser") || value.includes("appeal") || value.includes("leaderboard")) return "cards";
  if (value.includes("intro")) return "intro";

  return "content";
}

function buildSections(frameName: string, childNames: string[]): RouteSection[] {
  const source = childNames.length ? childNames : [frameName];

  const sections = source
    .map((name, index) => ({
      id: `${toSlugBase(frameName)}-${index + 1}`,
      name,
      title: toTitle(name),
      kind: mapSectionKind(name),
    }))
    .filter((section) => section.kind !== "nav" && section.kind !== "footer") as RouteSection[];

  if (sections.length > 0) {
    return sections;
  }

  return [
    {
      id: `${toSlugBase(frameName)}-1`,
      name: frameName,
      title: toTitle(frameName),
      kind: "content",
    },
  ];
}

function buildRoutes(): FigmaRoute[] {
  const routes: FigmaRoute[] = [];
  const slugCounts = new Map<string, number>();
  let homeAssigned = false;

  for (const [pageName, frameName, childNames] of SOURCE_FRAMES) {
    let slug = "";
    let isHome = false;

    if (!homeAssigned && isHomeLike(frameName)) {
      isHome = true;
      homeAssigned = true;
    } else {
      const base = toSlugBase(frameName) || "untitled";
      const current = (slugCounts.get(base) ?? 0) + 1;
      slugCounts.set(base, current);
      slug = current === 1 ? base : `${base}-${current}`;
    }

    routes.push({
      id: `${pageName}::${frameName}::${routes.length + 1}`,
      pageName,
      frameName,
      slug,
      isHome,
      sections: buildSections(frameName, childNames),
    });
  }

  return routes;
}

export const FIGMA_ROUTES: FigmaRoute[] = buildRoutes();

export const NAV_LINKS: NavLinkItem[] = FIGMA_ROUTES.filter((route) => !route.slug.includes("template-identifier"))
  .map((route) => ({
    title: route.frameName,
    href: route.isHome ? "/" : `/${route.slug}`,
  }))
  .filter((link, index, items) => items.findIndex((item) => item.title === link.title && item.href === link.href) === index)
  .slice(0, 14);

export function getRouteBySlug(slug: string): FigmaRoute | undefined {
  return FIGMA_ROUTES.find((route) => route.slug === slug);
}

export const HOME_ROUTE: FigmaRoute | undefined = FIGMA_ROUTES.find((route) => route.isHome);
