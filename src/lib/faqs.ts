import { AMENITIES, COMPLETION, SITE } from "@/lib/site";

// Questions people ask about the project, answered from the brochure only.
// Each answer starts with the direct answer and names the project, so it still
// makes sense when a search engine or AI assistant quotes it on its own.
// The same list feeds the FAQ section, the FAQ structured data and /llms.txt.
// Add price, RERA or possession answers here only once they are confirmed.
export const FAQS: { q: string; a: string }[] = [
  {
    q: `Where is ${SITE.name}?`,
    a: `${SITE.name} is on the Udupi-Manipal Highway at Indrali, Udupi, Karnataka 576102. It is 1.6 km from Udupi Railway Station and 2 km from Kasturba Hospital, Manipal.`,
  },
  {
    q: "What kind of spaces are available?",
    a: `${SITE.name} has retail showrooms, cafes and offices on the ground and first floors, hotel rooms and lodging suites on the second to fourth floors, and rooftop space suited to a lounge or restaurant.`,
  },
  {
    q: "Who is the developer?",
    a: `${SITE.name} is developed by ${SITE.developer}. It is the company's first project.`,
  },
  {
    q: "How big is the building?",
    a: `${SITE.name} is a G+4 building (ground plus four floors) with two basement levels and a rooftop, planned to be Vastu compliant.`,
  },
  {
    q: "Is there parking?",
    a: `Yes. ${SITE.name} has two basement levels of car parking: the upper basement has parking with convenience shops, and the lower basement is secure parking for owners and visitors.`,
  },
  {
    q: "What amenities does the building have?",
    a: `${SITE.name} offers ${AMENITIES.map((a) => a.label.toLowerCase())
      .join(", ")
      .replace(/, ([^,]*)$/, " and $1")}.`,
  },
  {
    q: "How far is it from Manipal and other landmarks?",
    a: `${SITE.name} is 2 km from Kasturba Hospital, Manipal, 1.6 km from Udupi Railway Station, 3 km from Sri Krishna Matha Temple, 3.3 km from Udupi Bus Stand and 10 km from Malpe Beach.`,
  },
  {
    q: "Is it suitable for a clinic or office?",
    a: `Yes. The ground and first floors of ${SITE.name} suit firms, clinics and studios as well as shops, with road-facing frontage on the highway and basement parking below.`,
  },
  {
    q: "Is the building plan approved?",
    a: `Yes. The building plan for ${SITE.name} is approved, and the development is planned to be Vastu compliant.`,
  },
  {
    q: "When will the project be completed?",
    a: COMPLETION.confirmed
      ? `${SITE.name} is expected to be completed by ${COMPLETION.date}. Follow the construction progress section for site updates.`
      : `The completion date for ${SITE.name} will be published here once it is confirmed. Our team can give you the latest status.`,
  },
  {
    q: "Can I download the brochure and floor plans?",
    a: `Yes. The ${SITE.name} brochure and floor plans are free PDF downloads on this page, with no form to fill.`,
  },
  {
    q: "Can I visit the site?",
    a: `Yes. Call ${SITE.phones[0]}, message us on WhatsApp, or send the enquiry form, and we will arrange a visit to ${SITE.name}.`,
  },
];
