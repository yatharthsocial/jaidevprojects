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
};

// Official brochure, placed in /public (e.g. "/docs/k-indrali-brochure.pdf").
// Empty: brochure buttons ask for it through the enquiry form instead.
export const BROCHURE_URL = "";

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
