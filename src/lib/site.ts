// Shared project details used by the contact section and footer.
// TODO: replace the phone and email with the sales team's real details.
export const SITE = {
  name: "K-Indrali Business Square",
  developer: "Jaidev Infra Project",
  phone: "+91 00000 00000",
  whatsapp: "+91 00000 00000",
  email: "sales@example.com",
  address:
    "K-Indrali Business Square, Udupi-Manipal Hwy, Rudra Priya Nagar, Indrali, Udupi, Karnataka 576102",
};

export const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;

// Digits only, for wa.me and tel: links.
export const digits = (n: string) => n.replace(/\D/g, "");

// True once a real number has been filled in above.
export const hasRealNumber = (n: string) => /[1-9]/.test(digits(n).slice(2));

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];
