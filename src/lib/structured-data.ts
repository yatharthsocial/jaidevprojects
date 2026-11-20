import { FAQS } from "@/lib/faqs";
import {
  AMENITIES,
  BROCHURE_URL,
  DIRECTIONS_URL,
  NEARBY,
  SITE,
  SITE_DESCRIPTION,
  SITE_URL,
  digits,
} from "@/lib/site";

// Schema.org structured data (JSON-LD) for the home page. It tells search
// engines and AI assistants, in a form they read directly, who the developer
// is, where the project is, what it offers and the answers to common
// questions. Built only from the facts in src/lib, so it never claims more
// than the page shows.
export function structuredData() {
  const org = `${SITE_URL}/#organization`;
  const place = `${SITE_URL}/#project`;
  const a = SITE.addressParts;
  const address = {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
  const image = [`${SITE_URL}/opengraph-image.jpg`, `${SITE_URL}/hero/final.jpg`];
  const tel = (n: string) => `+${digits(n)}`;
  const geo = SITE.geo.lat && SITE.geo.lng
    ? { geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng } }
    : {};

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: SITE.developer,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        address,
        telephone: tel(SITE.phones[0]),
        contactPoint: SITE.phones.map((n) => ({
          "@type": "ContactPoint",
          telephone: tel(n),
          contactType: "sales",
          areaServed: "IN",
        })),
        ...(SITE.email ? { email: SITE.email } : {}),
        ...(SITE.profiles.length ? { sameAs: SITE.profiles } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        inLanguage: "en-IN",
        publisher: { "@id": org },
      },
      {
        "@type": "Place",
        "@id": place,
        name: SITE.name,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        address,
        ...geo,
        hasMap: DIRECTIONS_URL,
        telephone: tel(SITE.phones[0]),
        image,
        containedInPlace: { "@type": "City", name: "Udupi" },
        amenityFeature: AMENITIES.map((x) => ({
          "@type": "LocationFeatureSpecification",
          name: x.label,
          value: true,
        })),
        // Distances to well-known landmarks, as stated in the brochure.
        additionalProperty: NEARBY.map((p) => ({
          "@type": "PropertyValue",
          name: `Distance to ${p.name}`,
          value: p.km,
          unitText: "km",
        })),
        subjectOf: {
          "@type": "DigitalDocument",
          name: `${SITE.name} brochure`,
          url: `${SITE_URL}${BROCHURE_URL}`,
          encodingFormat: "application/pdf",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: `${SITE.name} | Commercial Space in Udupi`,
        description: SITE_DESCRIPTION,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": place },
        primaryImageOfPage: image[0],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

// Safe to drop into a <script> tag: "<" can't close the tag early.
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
