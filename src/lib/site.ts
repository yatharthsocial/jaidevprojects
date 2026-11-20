// Single source of truth for project facts. Anything left empty or marked
// unconfirmed is hidden or shown as "to be confirmed" on the site, so nothing
// unverified is ever presented as fact. Fill these in as documents arrive.

export const SITE = {
  name: "K-Indrali Business Square",
  developer: "Jaidev Infra Project",
  // Path under /public, e.g. "/brand/logo.svg". Empty: a typographic
  // wordmark is shown instead.
  logo: "",
  phones: ["+91 97414 26631", "+91 72040 98286"],
  // The number that receives WhatsApp enquiries.
  whatsapp: "+91 97414 26631",
  // Empty hides the email everywhere.
  email: "",
  address:
    "K-Indrali Business Square, Udupi-Manipal Hwy, Rudra Priya Nagar, Indrali, Udupi, Karnataka 576102",
  shortAddress: "Udupi-Manipal Hwy, Indrali, Udupi 576102",
  // The address split into parts, for search engines (structured data).
  addressParts: {
    street: "Udupi-Manipal Hwy, Rudra Priya Nagar, Indrali",
    locality: "Udupi",
    region: "Karnataka",
    postalCode: "576102",
    country: "IN",
  },
  // Map pin, for search engines. Copy it from the Google Business Profile
  // (or right-click the building in Google Maps). Empty: left out.
  geo: { lat: "", lng: "" },
  // Official pages that belong to the company: Google Business Profile,
  // Instagram, Facebook, LinkedIn, YouTube... Search engines use these to
  // tie the brand together.
  profiles: [] as string[],
};

// The live address of the site, without a trailing slash. Every canonical
// link, the sitemap and the share previews are built from it.
export const SITE_URL = "https://www.jaidevinfraprojects.com";

// Used for the page description in search results and link previews.
export const SITE_DESCRIPTION =
  "Retail showrooms, offices and lodging suites on the Udupi-Manipal Highway, 2 km from Kasturba Hospital, Manipal. A G+4, Vastu-planned building by Jaidev Infra Project.";

// Exactly as listed on the amenities page of the brochure.
export const AMENITIES = [
  { icon: "power", label: "Generator backup", note: "For common areas and every unit.", art: "power" },
  { icon: "parking", label: "Car parking", note: "Two basement levels for owners and visitors.", art: "parking" },
  { icon: "fire", label: "Fire safety provisions", note: "Fire safety systems throughout the building.", art: "fire" },
  { icon: "drop", label: "24/7 water supply", note: "From a well and the municipal supply.", art: "drop" },
  { icon: "tiles", label: "Vitrified tile flooring", note: "Durable, easy-care floors across the building.", art: "tiles" },
  { icon: "lift", label: "Passenger lift", note: "Lift access to every floor.", art: "lift" },
  { icon: "rain", label: "Rainwater harvesting", note: "Rainwater collected and put back to use.", art: "rain" },
  { icon: "lobby", label: "Spacious lobby", note: "A generous, welcoming entrance.", art: "lobby" },
  { icon: "cctv", label: "CCTV surveillance", note: "Camera coverage of common areas.", art: "cctv" },
  { icon: "stp", label: "Sewage treatment plant", note: "On-site treatment of wastewater.", art: "stp" },
] as const;

// Distances from the location page of the brochure.
export const NEARBY = [
  { name: "Udupi Railway Station", km: 1.6, kind: "Transit", icon: "train" },
  { name: "Kasturba Hospital, Manipal", km: 2, kind: "Healthcare", icon: "hospital" },
  { name: "Sri Krishna Matha Temple", km: 3, kind: "Heritage", icon: "temple" },
  { name: "Udupi Bus Stand", km: 3.3, kind: "Transit", icon: "bus" },
  { name: "Malpe Beach", km: 10, kind: "Leisure", icon: "beach" },
] as const;

// Official brochure (a web-optimised copy of indrali-bookligt.pdf). Empty:
// brochure buttons ask for it through the enquiry form instead.
export const BROCHURE_URL = "/brochure/K-Indrali-Business-Square-Brochure.pdf";
export const BROCHURE_FILENAME = "K-Indrali-Business-Square-Brochure.pdf";
export const BROCHURE_SIZE = "4 MB";

// Floor plans booklet (a web-optimised copy of floorplan.pdf).
export const FLOOR_PLANS_URL = "/brochure/K-Indrali-Business-Square-Floor-Plans.pdf";
export const FLOOR_PLANS_FILENAME = "K-Indrali-Business-Square-Floor-Plans.pdf";
export const FLOOR_PLANS_SIZE = "4 MB";

// Only shown as a date once `confirmed` is true.
export const COMPLETION = { date: "December 2027", confirmed: false };

// Statutory details. Rows with an empty value are not shown.
export const APPROVALS: { label: string; value: string }[] = [
  { label: "Building plan", value: "Approved" },
  { label: "RERA registration no.", value: "" },
  { label: "RERA website", value: "" },
];

// Levels as listed in the brochure. `plan` takes an image of the approved
// drawing for that level (under /public) once available. Do not add areas or
// unit counts here unless they come from the approved drawings.
export const LEVELS: { name: string; use: string; plan?: string }[] = [
  { name: "Rooftop", use: "Space for a signature lounge or rooftop restaurant with city views." },
  { name: "Second to fourth floor", use: "Boutique hotel rooms and premium lodging suites." },
  { name: "Ground and first floor", use: "Retail showrooms, cafes and offices." },
  { name: "Upper basement", use: "Parking with convenience shops." },
  { name: "Lower basement", use: "Secure parking for owners and visitors." },
];

// Construction updates, newest first, with real site photos under /public.
export const PROGRESS: { date: string; title: string; note: string; photo: string }[] = [];

export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.address)}`;

// Digits only, for wa.me and tel: links.
export const digits = (n: string) => n.replace(/\D/g, "");

export const whatsappLink = (text = `Hello, I'd like to know more about ${SITE.name}.`) =>
  `https://wa.me/${digits(SITE.whatsapp)}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Floor plans", href: "#floor-plans" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

// Lets any button jump to the enquiry form with a topic already chosen.
export const ENQUIRE_EVENT = "enquire";
export function enquire(topic: string) {
  window.dispatchEvent(new CustomEvent(ENQUIRE_EVENT, { detail: topic }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}
