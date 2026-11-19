import Image from "next/image"
import { CustomCartsIndex } from "@/components/home/custom-coffee-carts-index"
import { QuoteButton } from "@/components/site/quote-button"
import { clientWork } from "@/lib/clients"

// Section 4, "Custom Coffee Carts" (the live site's next H2 after the service area).
// Old content kept verbatim: the H2, the subline, the five branding options and the branded-work photos.
// The old "Get a Custom Quote" button is the site's one quote button.
const strip = ["Denver Broncos", "Mercedes-Benz of Denver", "The Ritz-Carlton", "Vuori"]
  .map((brand) => clientWork.find((w) => w.brand === brand))
  .filter((w) => w !== undefined)

export function CustomCoffeeCarts() {
  return (
    <section id="custom-carts" aria-labelledby="custom-carts-title" className="border-t border-rule bg-paper">
      <div className="px-(--gutter) pt-10 pb-10 lg:pt-20 lg:pb-14">
        <CustomCartsIndex
          intro={
            <>
              <p className="text-ui text-ink-muted">Custom carts</p>
              <h2
                id="custom-carts-title"
                className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
              >
                Custom Coffee Carts
              </h2>
              <p className="mt-4 max-w-[26rem] text-body text-ink-soft">
                Create an experience your guests won&rsquo;t stop talking about.
              </p>
            </>
          }
          cta={<QuoteButton />}
        />
      </div>

      {/* The branded carts and lattes from the old section: real photos, captions say what they show.
          A grid on desktop, a strip you swipe on phones. */}
      <div className="border-t border-rule pt-6 pb-12 lg:pb-20">
        <p className="px-(--gutter) text-ui text-ink-muted">Branded work</p>
        <ul className="relative mt-3 flex snap-x snap-mandatory scroll-px-(--gutter) gap-2 overflow-x-auto px-(--gutter) pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {strip.map((item) => (
            <li key={item.src} className="w-[72vw] max-w-[18rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
              <figure>
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 25vw, 72vw" className="object-cover" />
                </div>
                <figcaption className="mt-2 text-ui">
                  <span className="block font-semibold text-ink">{item.brand}</span>
                  <span className="block text-ink-soft">{item.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
