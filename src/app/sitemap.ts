import type { MetadataRoute } from "next";
import { BROCHURE_URL, FLOOR_PLANS_URL, SITE_URL } from "@/lib/site";

// The pages and documents search engines should index. The PDFs are listed
// too: Google indexes them and can show them for brochure searches.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...[BROCHURE_URL, FLOOR_PLANS_URL]
      .filter(Boolean)
      .map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
