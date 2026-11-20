import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everyone may crawl the site, including AI search and answer engines
// (ChatGPT, Claude, Perplexity, Gemini...), so the project can be cited in
// their answers. Only the enquiry form's API is kept out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
