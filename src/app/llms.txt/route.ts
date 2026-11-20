import { FAQS } from "@/lib/faqs";
import {
  AMENITIES,
  APPROVALS,
  BROCHURE_URL,
  COMPLETION,
  FLOOR_PLANS_URL,
  LEVELS,
  NEARBY,
  SITE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

// /llms.txt: a plain-text fact sheet for AI assistants (the llmstxt.org
// convention), built from the same data as the page so the two never differ.
export function GET() {
  const approvals = APPROVALS.filter((r) => r.value).map((r) => `- ${r.label}: ${r.value}`);
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Key facts",
    "",
    `- Developer: ${SITE.developer}`,
    `- Address: ${SITE.address}`,
    "- Building: G+4 (ground plus four floors), two basement levels and a rooftop; Vastu planned",
    `- Completion: ${COMPLETION.confirmed ? COMPLETION.date : "to be confirmed"}`,
    ...approvals,
    `- Phone: ${SITE.phones.join(", ")}`,
    `- WhatsApp: ${SITE.whatsapp}`,
    ...(SITE.email ? [`- Email: ${SITE.email}`] : []),
    "",
    "## Levels",
    "",
    ...LEVELS.map((l) => `- ${l.name}: ${l.use}`),
    "",
    "## Amenities",
    "",
    ...AMENITIES.map((a) => `- ${a.label}: ${a.note}`),
    "",
    "## Distances",
    "",
    ...NEARBY.map((p) => `- ${p.name}: ${p.km} km`),
    "",
    "## Questions and answers",
    "",
    ...FAQS.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Links",
    "",
    `- [Website](${SITE_URL})`,
    ...(BROCHURE_URL ? [`- [Brochure (PDF)](${SITE_URL}${BROCHURE_URL})`] : []),
    ...(FLOOR_PLANS_URL ? [`- [Floor plans (PDF)](${SITE_URL}${FLOOR_PLANS_URL})`] : []),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
