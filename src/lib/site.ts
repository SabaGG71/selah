// Single source for Selah's business facts, navigation and the URL map.
// Every path below is the live WordPress path on selah.coffee (Yoast sitemaps, read 2026-11-18).
// trailingSlash is on in next.config.ts, so these resolve exactly as they do today and need no redirects.

export const site = {
  name: "Selah Coffee Co.",
  url: "https://selah.coffee",
  city: "Denver, CO",
  timeZone: "America/Denver",
  phone: { display: "(720) 961-3445", href: "tel:+17209613445" },
  email: "contact@selah.coffee",
  // The live footer's address.
  address: { street: "1415 W Cedar Ave", city: "Denver, CO 80223", country: "USA" },
  instagram: "https://www.instagram.com/selahcoffee.co/",
  // The live footer's social icons, with the URLs from the site's own Yoast schema (sameAs).
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/selahcoffee.co/" },
    { label: "Facebook", href: "https://www.facebook.com/SelahCoffeeCo.cheers" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/selah-coffee-co" },
  ],
  // Google review count on the live site's review widget: 501 on 2026-11-18 (343 in June 2026),
  // rated "Excellent" by the widget. Shown as "500+" so it stays true as the count grows.
  // The star average is not shown until it is checked on the Google profile.
  reviews: { count: "500+", source: "Google", label: "Excellent" },
  quote: { label: "Get my Instant Quote", short: "Get my Quote", href: "#quote" },
} as const

export type NavLink = { label: string; href: string }

// Event pages that exist on the live site (page-sitemap.xml).
export const services: NavLink[] = [
  { label: "Corporate events", href: "/corporate-coffee-catering-denver/" },
  { label: "Office coffee service", href: "/office-coffee-cart-service-denver/" },
  { label: "Conferences and expos", href: "/conference-expocoffee-catering-in-denver/" },
  { label: "Brand activations", href: "/brand-activation-coffee-cart-denver/" },
  { label: "Weddings", href: "/wedding-coffee-cart-denver/" },
  { label: "Private events", href: "/private-event-coffee-cart-denver-selah-coffee-co/" },
  { label: "Schools and non-profits", href: "/school-non-profit-coffee-catering-in-denver/" },
]

export const serviceExtras: NavLink[] = [
  { label: "How much does a coffee cart cost?", href: "/how-much-does-a-coffee-cart-cost/" },
  { label: "Coffee cart consulting", href: "/coffee-cart-consulting/" },
]

// Same order as the live site's Locations menu.
export const cities: NavLink[] = [
  { label: "Denver", href: "/denver-coffee-catering/" },
  { label: "Boulder", href: "/boulder-coffee-catering/" },
  { label: "Colorado Springs", href: "/colorado-springs-coffee-catering/" },
  { label: "Vail", href: "/vail-coffee-catering/" },
  { label: "Breckenridge", href: "/breckenridge-coffee-catering/" },
  { label: "Aspen", href: "/aspen-coffee-catering/" },
]

// The live site's "Locations" menu item pointed at the homepage. "All locations" goes to the
// homepage map (serve-section.tsx, id="locations"): every city with its distance and page link.
export const allLocations: NavLink = { label: "All locations", href: "/#locations" }

// Where we serve, for the homepage map. City centres; distances are measured from the base as the crow
// flies. The ring names only describe the area: travel fees and limits are Selah's to state, so none are claimed.
const centres: Record<string, [number, number]> = {
  Denver: [39.7392, -104.9903],
  Boulder: [40.015, -105.2705],
  "Colorado Springs": [38.8339, -104.8214],
  Vail: [39.6403, -106.3742],
  Breckenridge: [39.4817, -106.0384],
  Aspen: [39.1911, -106.8175],
}
export type ServePlace = { name: string; href: string; lat: number; lng: number }
const servePlace = (c: NavLink): ServePlace => ({ name: c.label, href: c.href, lat: centres[c.label][0], lng: centres[c.label][1] })

export const serveArea = {
  base: servePlace(cities[0]),
  // Nearest first. Each ring is a group in the map's town list; anything past the last is "beyond".
  rings: [
    { miles: 30, label: "Denver and Boulder" },
    { miles: 80, label: "Front Range and mountains" },
  ],
  beyond: "Further out",
  places: cities.slice(1).map(servePlace),
}
export type ServeArea = typeof serveArea

// Top level of the header. Services and Locations open panels.
// The live nav's Who We Are (/#about), Gallery (/#gallery) and Contact (#bookus) are covered by
// About, the homepage sections and the quote button. Instagram moves to the footer (no socials in the nav).
export const primaryNav: NavLink[] = [
  { label: "Menu", href: "/coffee-cart-menu/" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/faq/" },
]

// Three true lines for the Services panel, taken from the live "Included with coffee cart rental" list.
export const includedLines = [
  "Professional baristas and unlimited drinks",
  "Local specialty coffee, syrups and alternative milks",
  "Branded cups, carts and latte logo printing",
]

// ---------------------------------------------------------------------------
// URL inventory of the live WordPress site. Used for the route stubs and the migration doc.
// ---------------------------------------------------------------------------

export type LegacyUrl = { path: string; title: string; kind: "page" | "post" | "archive" | "legal" }

export const legacyUrls: LegacyUrl[] = [
  // Pages (page-sitemap.xml)
  { path: "/", title: "Home", kind: "page" },
  { path: "/coffee-blog/", title: "Coffee Blog", kind: "page" },
  { path: "/coffee-cart-menu/", title: "Coffee Cart Menu", kind: "page" },
  { path: "/book-the-coffee-cart/", title: "Book the Coffee Cart", kind: "page" },
  { path: "/faq/", title: "FAQ", kind: "page" },
  { path: "/careers/", title: "Careers", kind: "page" },
  { path: "/school-non-profit-coffee-catering-in-denver/", title: "School and Non-Profit Coffee Catering in Denver", kind: "page" },
  { path: "/conference-expocoffee-catering-in-denver/", title: "Conference and Expo Coffee Catering in Denver", kind: "page" },
  { path: "/office-coffee-cart-service-denver/", title: "Office Coffee Cart Service in Denver", kind: "page" },
  { path: "/brand-activation-coffee-cart-denver/", title: "Brand Activation Coffee Cart in Denver", kind: "page" },
  { path: "/private-event-coffee-cart-denver-selah-coffee-co/", title: "Private Event Coffee Cart in Denver", kind: "page" },
  { path: "/corporate-coffee-catering-denver/", title: "Corporate Coffee Catering in Denver", kind: "page" },
  { path: "/wedding-coffee-cart-denver/", title: "Wedding Coffee Cart in Denver", kind: "page" },
  { path: "/how-much-does-a-coffee-cart-cost/", title: "How Much Does a Coffee Cart Cost?", kind: "page" },
  { path: "/aspen-coffee-catering/", title: "Aspen Coffee Catering", kind: "page" },
  { path: "/denver-coffee-catering/", title: "Denver Coffee Catering", kind: "page" },
  { path: "/vail-coffee-catering/", title: "Vail Coffee Catering", kind: "page" },
  { path: "/breckenridge-coffee-catering/", title: "Breckenridge Coffee Catering", kind: "page" },
  { path: "/colorado-springs-coffee-catering/", title: "Colorado Springs Coffee Catering", kind: "page" },
  { path: "/boulder-coffee-catering/", title: "Boulder Coffee Catering", kind: "page" },
  // Linked from the live footer, not in the sitemap
  { path: "/coffee-cart-consulting/", title: "Coffee Cart Consulting", kind: "page" },
  { path: "/privacy-policy/", title: "Privacy Policy", kind: "legal" },
  { path: "/term-and-conditions/", title: "Terms and Conditions", kind: "legal" },
  // Posts (post-sitemap.xml). WordPress serves posts at the root.
  { path: "/coffee-catering-denvers-vibiest-venues/", title: "Coffee Catering at Denver's Vibiest Venues", kind: "post" },
  { path: "/employee-appreciation-event-ideas-denver/", title: "Employee Appreciation Event Ideas in Denver", kind: "post" },
  { path: "/corporate-holiday-party-coffee-catering-denver/", title: "Corporate Holiday Party Coffee Catering in Denver", kind: "post" },
  { path: "/coffee-carts-vs-coffee-trucks-for-events-in-denver-colorado/", title: "Coffee Carts vs Coffee Trucks for Events in Denver", kind: "post" },
  { path: "/5-reasons-to-have-a-coffee-cart/", title: "5 Reasons to Have a Coffee Cart", kind: "post" },
  { path: "/how-selah-coffee-cart-helped-the-momco-celebrate-their-team-in-denver/", title: "How Selah Helped The MomCo Celebrate Their Team", kind: "post" },
  { path: "/denver-law-firm-books-coffee-cart-catering/", title: "Denver Law Firm Books Coffee Cart Catering", kind: "post" },
  { path: "/conference-coffee-cart-denver-ethdenver/", title: "Conference Coffee Cart at ETHDenver", kind: "post" },
  // Archives (category, tag and author sitemaps)
  { path: "/category/coffee-cart-catering/", title: "Coffee Cart Catering", kind: "archive" },
  { path: "/tag/coffee-cart-catering/", title: "Coffee Cart Catering", kind: "archive" },
  { path: "/author/jonnykupin/", title: "Jonny Kupin", kind: "archive" },
]
