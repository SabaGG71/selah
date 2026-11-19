import type { Metadata, Viewport } from "next"
import { EB_Garamond, Instrument_Sans } from "next/font/google"
import { InkPreview } from "@/components/site/ink-preview"
import "./globals.css"

// Display serif: EB Garamond (lookbook option A, what Canyon Coffee uses). Grotesk: Instrument Sans (lookbook stand-in).
const serif = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

// Title, description and social tags copied from the live homepage (SEO snapshot 2026-11-18). Do not change without the account owner.
export const metadata: Metadata = {
  metadataBase: new URL("https://selah.coffee"),
  title: "Coffee Cart Catering | Professional Event Baristas | Denver, Colorado | Selah Coffee",
  description:
    "Elevate your next event with Custom Coffee Carts & Mobile Espresso Bars, Bottomless Lattes, Pro Event Baristas. Corporate events, weddings, retail activations & more. Allegedly the best Denver Coffee Catering.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://selah.coffee/",
    siteName: "Selah Coffee Cart",
    title: "Selah Coffee Cart | Coffee Cart Catering | Professional Event Baristas | Denver, Colorado",
    description:
      "Selah Coffee Co is a specialty coffee cart with a full espresso bar based in Denver, Colorado. We provide coffee catering for weddings, private events, corporate events, pop-ups, etc.",
    images: [{ url: "/images/home/selah-coffee-cart-baristas-espresso-bar.jpg", width: 2400, height: 1600 }],
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#f3f1ec",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        {process.env.NODE_ENV !== "production" ? <InkPreview /> : null}
      </body>
    </html>
  )
}
