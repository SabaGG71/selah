import { HeroSlider, type Slide } from "@/components/home/hero-slider"
import { QuoteButton } from "@/components/site/quote-button"
import { site } from "@/lib/site"

// Four photos from Selah's own shoot, one place and one light (lookbook rule 1):
// the bar at work, the hand-off, a guest, the cart in its setting.
// (The pour photo belongs to the espresso bar section, as on the live site.)
const slides: Slide[] = [
  {
    src: "/images/home/selah-coffee-cart-baristas-espresso-bar.jpg",
    alt: "Two Selah baristas behind the espresso cart at an outdoor event, talking with a guest",
    position: "object-[42%_50%] lg:object-[26%_50%]",
  },
  {
    src: "/images/home/selah-barista-hands-guest-iced-latte.jpg",
    alt: "A Selah barista handing an iced latte to a guest under the event tent",
    position: "object-[62%_30%] lg:object-[50%_28%]",
  },
  {
    src: "/images/home/selah-guest-two-iced-lattes.jpg",
    alt: "A smiling guest holding two iced lattes from Selah",
    position: "object-[50%_32%] lg:object-[50%_26%]",
  },
  {
    src: "/images/home/selah-espresso-cart-outdoor-event.jpg",
    alt: "The white Selah Coffee Co. espresso cart set up outdoors on a rug, with a grinder and menu",
    position: "object-[50%_82%] lg:object-[50%_88%]",
  },
]

// Split hero (LE playbook rule 10): H1, one short paragraph, the quote button and proof on the
// calm ground; Selah's event photos on the other side. On phones the text comes first.
// The H1 keeps the live site's ranking words, set in the serif (lookbook rule 3).
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="lg:grid lg:h-[calc(100svh-var(--bar-h)-var(--header-h))] lg:max-h-[880px] lg:min-h-[600px] lg:grid-cols-12"
    >
      <div className="flex flex-col px-(--gutter) pt-8 pb-9 lg:col-span-5 lg:justify-center lg:py-14 lg:pr-14">
        <h1 id="hero-title" className="font-serif text-display text-balance lg:max-w-[14ch]">
          Coffee Cart &amp; Coffee Catering in Denver,&nbsp;CO
        </h1>
        <p className="mt-5 max-w-[26rem] text-body lg:mt-7">
          A full espresso bar and professional baristas for corporate events, weddings and brand activations in Denver,
          Boulder, Colorado Springs and the Rocky Mountains.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-9">
          <QuoteButton data-hero-cta="" />
          <p className="text-ui text-ink-soft">
            {site.reviews.count} reviews on {site.reviews.source}
          </p>
        </div>
      </div>

      <div className="relative lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/4] lg:aspect-auto lg:h-full">
          <HeroSlider slides={slides} sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>

        {/* One standout review, cut to its best words (playbook rule 11). Plain text, not a link. */}
        <figure className="relative z-10 mx-(--gutter) -mt-12 max-w-[19rem] bg-paper px-5 py-4 lg:absolute lg:bottom-10 lg:-left-16 lg:m-0">
          <blockquote className="font-serif text-[1.375rem] leading-[1.15] tracking-[-0.01em]">
            <p>&ldquo;They never disappoint!&rdquo;</p>
          </blockquote>
          <figcaption className="mt-2 text-ui text-ink-soft">
            Rhiannon R. on Google, after booking Selah three times for work
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
