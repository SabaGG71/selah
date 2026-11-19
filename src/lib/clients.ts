// Client roster for the homepage "Trusted by" section.
// Logos: the 15 files on the live homepage (same order), redrawn by scripts/prep-clients in one ink (#111)
// plus a true-colour copy with the white removed, for the hover. Width and height are optical sizes
// (equal visual weight), in CSS px at desktop.
export type ClientLogo = { slug: string; name: string; width: number; height: number }

export const clientLogos: ClientLogo[] = [
  { slug: "denver-health", name: "Denver Health", width: 147, height: 26 },
  { slug: "google", name: "Google", width: 94, height: 31 },
  { slug: "vuori", name: "Vuori", width: 127, height: 23 },
  { slug: "microsoft", name: "Microsoft", width: 117, height: 25 },
  { slug: "us-soccer", name: "U.S. Soccer", width: 40, height: 64 },
  { slug: "fjallraven", name: "Fjällräven", width: 89, height: 33 },
  { slug: "audi", name: "Audi", width: 69, height: 42 },
  { slug: "ritz-carlton", name: "The Ritz-Carlton", width: 115, height: 46 },
  { slug: "gaylord-rockies", name: "Gaylord Rockies", width: 59, height: 55 },
  { slug: "ares", name: "Ares", width: 97, height: 30 },
  { slug: "denver-broncos", name: "Denver Broncos", width: 74, height: 43 },
  { slug: "canvas-credit-union", name: "Canvas Credit Union", width: 80, height: 36 },
  { slug: "mercedes-benz", name: "Mercedes-Benz of Denver", width: 70, height: 46 },
  { slug: "magnite", name: "Magnite", width: 90, height: 29 },
  { slug: "snapchat", name: "Snapchat", width: 43, height: 43 },
]

// Selah's own photos of branded work for named clients (from the live site's media library).
export type ClientWork = { src: string; brand: string; caption: string; alt: string }

export const clientWork: ClientWork[] = [
  {
    src: "/images/clients/work/selah-denver-broncos-training-camp-coffee-cart.jpg",
    brand: "Denver Broncos",
    caption: "Training camp coffee bar",
    alt: "Selah espresso cart wrapped for Denver Broncos training camp, with the team mascot behind it",
  },
  {
    src: "/images/clients/work/selah-mercedes-benz-of-denver-coffee-cart.jpg",
    brand: "Mercedes-Benz of Denver",
    caption: "Branded cart in the showroom",
    alt: "Selah cart with a Mercedes-Benz of Denver front panel inside the dealership",
  },
  {
    src: "/images/clients/work/selah-snapchat-logo-latte.jpg",
    brand: "Snapchat",
    caption: "Logo printed on the latte",
    alt: "A latte with the Snapchat ghost printed on the foam",
  },
  {
    src: "/images/clients/work/selah-eigenlayer-three-branded-carts.jpg",
    brand: "EigenLayer",
    caption: "Three branded carts, one event",
    alt: "Three Selah carts with EigenLayer panels at a conference",
  },
  {
    src: "/images/clients/work/selah-ritz-carlton-logo-latte.jpg",
    brand: "The Ritz-Carlton",
    caption: "Logo printed on the latte",
    alt: "A latte with The Ritz-Carlton lion printed on the foam",
  },
  {
    src: "/images/clients/work/selah-vuori-branded-cart-latte.jpg",
    brand: "Vuori",
    caption: "Branded cart and logo lattes",
    alt: "A Vuori logo latte held in front of a Selah cart with a Vuori panel",
  },
  {
    src: "/images/clients/work/selah-bylt-branded-coffee-cart.jpg",
    brand: "BYLT",
    caption: "Branded cart in store",
    alt: "Selah cart with a BYLT Premium Basics panel inside the store",
  },
  {
    src: "/images/clients/work/selah-viatris-conference-coffee-bar.jpg",
    brand: "Viatris",
    caption: "Conference coffee bar, branded cups",
    alt: "A Viatris branded cup in front of the Selah coffee bar at a conference",
  },
]
