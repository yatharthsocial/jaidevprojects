import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const TITLE = `${SITE.name} | Commercial Space in Udupi`;

// The share image and icons come from the files next to this layout
// (opengraph-image.jpg, icon.png, apple-icon.png, favicon.ico).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE.name}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.developer, url: SITE_URL }],
  creator: SITE.developer,
  publisher: SITE.developer,
  category: "Real estate",
  keywords: [
    SITE.name,
    "K-Indrali",
    SITE.developer,
    "commercial space in Udupi",
    "shops for sale in Udupi",
    "office space in Udupi",
    "commercial property near Manipal",
    "Udupi-Manipal Highway",
    "Indrali Udupi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE_DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Search Console / Bing Webmaster ownership checks. Set these in the
  // hosting environment once you have the codes (see SEO notes).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ebeae5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
