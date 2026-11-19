import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { site } from "@/lib/site"

// Section 9, the live site's gallery: H2 "Elevate Any Event with Coffee Cart Catering" (id="gallery",
// the old /#gallery anchor) and, under it, its H2 "Allegedly the Best Espresso Bar Catering in Denver"
// (the wink emoji becomes "Allegedly" in grey). The old gallery's photos that already appear in sections
// above are not repeated (LE rule: never show a photo twice); the rest of the old set plus two more real
// event photos make the mosaic. Each caption is a small white tag on the photo, the site's label device.
// Desktop: an editorial mosaic with 6px gutters. Phones: a strip you swipe.

type Shot = {
  src: string
  alt: string
  caption: string
  href?: string
  className: string
  position: string
  sizes: string
}

const shots: Shot[] = [
  {
    src: "/images/gallery/selah-coffee-cart-rooftop-event.jpg",
    alt: "A Selah barista at the cart under an umbrella on a city rooftop, high-rises behind",
    caption: "Rooftop service",
    className: "lg:col-span-4 lg:aspect-square",
    position: "object-[45%_62%]",
    sizes: "(min-width: 1024px) 33vw, 78vw",
  },
  {
    src: "/images/gallery/selah-coffee-cart-stage-event.jpg",
    alt: "The Selah cart on a rug on a stage, with a chalkboard menu, balloons and dried flowers",
    caption: "Set up on stage",
    className: "lg:col-span-8 lg:aspect-auto",
    position: "object-[62%_62%] lg:object-[50%_68%]",
    sizes: "(min-width: 1024px) 66vw, 78vw",
  },
  {
    src: "/images/bar/selah-latte-art-espresso-bar.jpg",
    alt: "A latte with a rosetta in a white Selah cup on the espresso machine, a plant behind",
    caption: "Latte art in a Selah cup",
    className: "lg:col-span-3 lg:aspect-[3/4]",
    position: "object-[50%_42%]",
    sizes: "(min-width: 1024px) 25vw, 78vw",
  },
  {
    src: "/images/gallery/selah-coffee-cart-party-setup.jpg",
    alt: "The Selah cart beside a table of donuts on a pink tablecloth, a disco ball above",
    caption: "Party setup with donuts",
    className: "lg:col-span-3 lg:aspect-[3/4]",
    position: "object-[55%_60%]",
    sizes: "(min-width: 1024px) 25vw, 78vw",
  },
  {
    src: "/images/gallery/selah-office-team-coffee-cart-momco.jpg",
    alt: "The Selah cart with grinder, espresso machine and menu in an office, a plant beside it",
    caption: "Office coffee for The MomCo",
    href: "/how-selah-coffee-cart-helped-the-momco-celebrate-their-team-in-denver/",
    className: "lg:col-span-6 lg:aspect-auto",
    position: "object-[48%_50%]",
    sizes: "(min-width: 1024px) 50vw, 78vw",
  },
]

export function GallerySection() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="border-t border-rule bg-paper">
      <div className="px-(--gutter) pt-10 pb-7 lg:grid lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-20 lg:pb-10">
        <div className="lg:col-span-8">
          <p className="text-ui text-ink-muted">Gallery</p>
          <h2
            id="gallery-title"
            className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            Elevate Any Event with Coffee Cart Catering
          </h2>
        </div>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group/ig mt-5 inline-flex items-center gap-2 text-sm underline decoration-1 underline-offset-4 hover:text-action-hover lg:col-span-4 lg:mt-0 lg:justify-self-end"
        >
          More on Instagram
          <ArrowRightIcon
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-3.5 transition-transform duration-150 group-hover/ig:translate-x-0.5"
          />
        </a>
      </div>

      <ul className="relative flex snap-x snap-mandatory scroll-px-(--gutter) gap-1.5 overflow-x-auto px-(--gutter) pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-12 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {shots.map((s) => (
          <li
            key={s.src}
            className={`relative aspect-[4/5] w-[78vw] max-w-[20rem] shrink-0 snap-start overflow-hidden bg-muted lg:w-auto lg:max-w-none ${s.className}`}
          >
            <Image src={s.src} alt={s.alt} fill sizes={s.sizes} className={`object-cover ${s.position}`} />
            {s.href ? (
              <Link
                href={s.href}
                className="absolute bottom-0 left-0 bg-paper px-3 py-1.5 text-ui underline decoration-1 underline-offset-[3px] hover:text-action-hover"
              >
                {s.caption}
              </Link>
            ) : (
              <p className="absolute bottom-0 left-0 bg-paper px-3 py-1.5 text-ui text-ink">{s.caption}</p>
            )}
          </li>
        ))}
      </ul>

      <div className="px-(--gutter) pt-10 pb-12 lg:pt-14 lg:pb-20">
        <h2 className="max-w-[40rem] font-serif text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] leading-[1.08] tracking-[-0.015em] text-balance">
          <span className="text-ink-muted">Allegedly</span> the Best Espresso Bar Catering in Denver
        </h2>
      </div>
    </section>
  )
}
