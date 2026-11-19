# selah.coffee migration (WordPress to Next.js)

Source of truth for URLs: the live Yoast sitemaps (`sitemap_index.xml`), read 2026-11-18, plus footer links.
The live site sits behind a Cloudflare bot check, so page text and photos were read through the Wayback Machine
(June 2026 capture) and the Jetpack image CDN (i0.wp.com).

## How URLs carry over

- `trailingSlash: true` in `next.config.ts`, same as WordPress. Every path below works unchanged.
- `/faq` (no slash) answers 308 to `/faq/`, which matches WordPress behaviour.
- Until a page is rebuilt, `src/app/[...slug]/page.tsx` serves a noindex stub at its path with the new header.
  A real route folder (for example `src/app/faq/page.tsx`) replaces the stub automatically.
- The list lives in `src/lib/site.ts` (`legacyUrls`). Unknown paths return 404.

## URL inventory (34)

| Path | Type | Status in new build |
|---|---|---|
| / | page | header + hero built |
| /coffee-blog/ | page | stub |
| /coffee-cart-menu/ | page | stub |
| /book-the-coffee-cart/ | page | stub (current quote page) |
| /faq/ | page | stub |
| /careers/ | page | stub |
| /school-non-profit-coffee-catering-in-denver/ | page | stub |
| /conference-expocoffee-catering-in-denver/ | page | stub |
| /office-coffee-cart-service-denver/ | page | stub |
| /brand-activation-coffee-cart-denver/ | page | stub |
| /private-event-coffee-cart-denver-selah-coffee-co/ | page | stub |
| /corporate-coffee-catering-denver/ | page | stub |
| /wedding-coffee-cart-denver/ | page | stub |
| /how-much-does-a-coffee-cart-cost/ | page | stub |
| /aspen-coffee-catering/ | page | stub |
| /denver-coffee-catering/ | page | stub |
| /vail-coffee-catering/ | page | stub |
| /breckenridge-coffee-catering/ | page | stub |
| /colorado-springs-coffee-catering/ | page | stub |
| /boulder-coffee-catering/ | page | stub |
| /coffee-cart-consulting/ | page (footer only) | stub |
| /privacy-policy/ | legal (footer only) | stub |
| /term-and-conditions/ | legal (footer only) | stub |
| /coffee-catering-denvers-vibiest-venues/ | post | stub |
| /employee-appreciation-event-ideas-denver/ | post | stub |
| /corporate-holiday-party-coffee-catering-denver/ | post | stub |
| /coffee-carts-vs-coffee-trucks-for-events-in-denver-colorado/ | post | stub |
| /5-reasons-to-have-a-coffee-cart/ | post | stub |
| /how-selah-coffee-cart-helped-the-momco-celebrate-their-team-in-denver/ | post | stub |
| /denver-law-firm-books-coffee-cart-catering/ | post | stub |
| /conference-coffee-cart-denver-ethdenver/ | post | stub |
| /category/coffee-cart-catering/ | archive | stub |
| /tag/coffee-cart-catering/ | archive | stub |
| /author/jonnykupin/ | archive | stub |

## Redirects still to add at launch (WordPress-only URLs)

Add these to `redirects()` in `next.config.ts` once the targets exist:

- `/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml`, `/category-sitemap.xml`, `/post_tag-sitemap.xml`, `/author-sitemap.xml` to `/sitemap.xml` (301), after `src/app/sitemap.ts` exists.
- `/feed/` and `/comments/feed/` to `/coffee-blog/` (301), or ship an RSS route.
- `/wp-content/uploads/:path*`: Google Images has these. Either keep the used photos at the same paths under `public/wp-content/uploads/` or 301 each one to its new file.
- `/#about`, `/#gallery` and `#bookus` are homepage anchors on the old site. Keep sections with ids `about` and `gallery` on the new homepage. `#bookus` becomes `#quote`.
- The new menus link "All locations" to `/#locations`: the homepage service-area section (map and city list) needs `id="locations"`.

## Homepage SEO snapshot (kept as-is)

- Title: Coffee Cart Catering | Professional Event Baristas | Denver, Colorado | Selah Coffee
- Meta description: Elevate your next event with Custom Coffee Carts & Mobile Espresso Bars, Bottomless Lattes, Pro Event Baristas. Corporate events, weddings, retail activations & more. Allegedly the best Denver Coffee Catering.
- OG title: Selah Coffee Cart | Coffee Cart Catering | Professional Event Baristas | Denver, Colorado
- Canonical: https://selah.coffee/
- H1: Coffee Cart & Coffee Catering in Denver, Co (new build fixes the case to "CO")
- No JSON-LD schema found in the June 2026 capture.
- Old H2s, in order (to keep their keyword phrases when the lower sections are built): Coffee Catering Trusted by Top Companies and Brands; Serving Denver Metro Area, Colorado Springs, Vail, Breckenridge, Aspen, Boulder & Beyond; Custom Coffee Carts; Mobile Coffee Cart & Espresso Bar Catering; Corporate Event Catering; Weddings & Gatherings; Brand Activations; Multiple Coffee Carts Available for High-Capacity Events; What people are saying about our coffee catering experience; Enjoy a Full Mobile Espresso Bar for Your Event & More; Included with Coffee Cart Rental; Elevate Any Event with Coffee Cart Catering; Allegedly the Best Espresso Bar Catering in Denver; Let's book your Coffee Cart Experience!; About Selah Coffee Cart; Your Denver Traveling Event Baristas; Planning an Event? (long service and city list); Based in Denver, Colorado.

## Brand assets used

- Header logo: the live site's own file `wp-content/uploads/2022/03/featuredimage1.png` (selah COFFEE CO. with the palm). White background made transparent, nothing else changed. `src/assets/selah-coffee-co-logo.png`.
- Favicon: the live site icon (the palm), `src/app/icon.png` and `src/app/apple-icon.png`.
- Hero slideshow (5s per photo, pause on hover, Pause button, no autoplay with reduced motion): five photos from Selah's own shoot in `public/images/home/` (SELAH-19384 baristas, the tent hand-off, SELAH-19868 pour, SELAH-19560 guest, SELAH-19892 cart in the park).
- Client logos (section 2): the 15 logo files from the live homepage's "Trusted by" block, same order, each as an ink copy and a true-colour copy in `public/images/clients/` (made by scripts/prep-clients in the scratch folder). Branded-work photos in `public/images/clients/work/`.
- Services menu photo: the founders at the cart with the logo in frame (`2023/07/22222-jpg.webp`), `public/images/nav/selah-founders-coffee-cart.jpg`.

## Open decisions (from the lookbook, for Kent and Jonny)

1. Colour: set 2026-11-18 to match the lookbook itself: type in #111111 (secondary #333333), thin black rules, and blue #142FB8 as the one interface colour for every link, nav word, button and the date bar (the Hours model). Oxblood #4A0A05 and slate #59767B still preview with `?ink=oxblood` or `?ink=slate` in dev. Slate fails text contrast at 13px.
2. Serif: EB Garamond is in (option A, Canyon's face). Goudy and Caslon not built.
3. "Now booking" month in the dateline is next month, computed in Denver time. Confirm Selah is happy to show it.
4. Review count shows "340+ reviews on Google" (343 on the site widget in June 2026). The star rating is not shown until it is checked on the Google profile.
