import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/fengshui",
    "/liuyao",
    "/taoist",
    "/services",
    "/learn",
    "/learn/feng-shui-floor-plan-review",
    "/learn/liu-yao-online-reading",
    "/contact",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.startsWith("/learn/") ? 0.7 : 0.8,
  }));
}
