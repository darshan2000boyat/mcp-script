import { RouteScreen } from "@/components/sections/route-screen";
import { HOME_ROUTE } from "@/lib/figma-routes";

export default function HomePage() {
  if (!HOME_ROUTE) {
    return null;
  }

  return <RouteScreen route={HOME_ROUTE} />;
}
