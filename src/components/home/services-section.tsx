import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

// Section 5, the live site's "Mobile Coffee Cart & Espresso Bar Catering" block, same headings and lines.
// Three services as a photo row (the photograph is the layout): each name sits on a white label that
// overlaps the photo's edge, the same device as the review card in the hero. Then the old
// "Multiple Coffee Carts" line as a closing band with the photo of three carts at one event.
// Phones: the three services are a strip you swipe.

type Service = {
  title: string
  line: string
  href: string
  about: string
  image: { src: string; alt: string; position: string }
}

const services: Service[] = [
  {
    title: "Corporate Event Catering",
    line: "Offices, Conferences & Expos, Churches, Schools",
    href: "/corporate-coffee-catering-denver/",
    about: "corporate event catering",
    image: {
      src: "/images/services/selah-corporate-office-coffee-catering.jpg",
      alt: "Two guests and a Selah barista raising cups at the espresso cart in an office lobby",
      position: "object-[50%_50%]",
    },
  },
  {
    title: "Weddings & Gatherings",
    line: "Bridal Showers, Private Events, & more",
    href: "/wedding-coffee-cart-denver/",
    about: "weddings and gatherings",
    image: {
      src: "/images/services/selah-coffee-cart-lawn-golden-hour.jpg",
      alt: "The Selah espresso cart on a lawn in front of a hotel at golden hour",
      position: "object-[50%_82%]",
    },
  },
  {
    title: "Brand Activations",
    line: "Grand Openings, Retail Activations, Green Rooms",
    href: "/brand-activation-coffee-cart-denver/",
    about: "brand activations",
    image: {
      src: "/images/services/selah-bylt-retail-activation-coffee-cart.jpg",
      alt: "A Selah cart with a BYLT Premium Basics front inside a store",
      position: "object-[50%_66%]",
    },
  },
]

// The live site's band of four more services (added there after June 2026), copy verbatim.
const moreServices = [
  { title: "Office Coffee Cart", line: "Barista-made coffee for your team, right at the office", href: "/office-coffee-cart-service-denver/" },
  { title: "Conference & Expo", line: "High-volume espresso service for large events", href: "/conference-expocoffee-catering-in-denver/" },
  { title: "School & Non-Profit", line: "Coffee experiences for schools, churches & non-profits", href: "/school-non-profit-coffee-catering-in-denver/" },
  { title: "Pricing Guide", line: "See exactly how our coffee cart pricing works", href: "/how-much-does-a-coffee-cart-cost/" },
]

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-rule bg-ground">
      <div className="px-(--gutter) pt-10 pb-7 lg:grid lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-20 lg:pb-10">
        <div className="lg:col-span-8">
          <p className="text-ui text-ink-muted">Catering</p>
          <h2
            id="services-title"
            className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            Mobile Coffee Cart &amp; Espresso Bar Catering
          </h2>
        </div>
        <p className="mt-4 text-[0.9375rem] leading-6 text-ink-soft lg:col-span-4 lg:mt-0 lg:justify-self-end">
          Caffeinating your event &amp; guests&rsquo; experience
        </p>
      </div>

      <ul className="relative flex snap-x snap-mandatory scroll-px-(--gutter) gap-2 overflow-x-auto px-(--gutter) pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {services.map((s) => (
          <li key={s.title} className="w-[82vw] max-w-[22rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <article className="group/svc">
              <div className="relative">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 82vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover/svc:scale-[1.03] motion-reduce:transition-none ${s.image.position}`}
                  />
                </div>
                <h2 className="absolute bottom-0 left-0 max-w-[calc(100%-1.5rem)] translate-y-1/2 bg-paper px-4 py-3 font-serif text-[1.375rem] leading-[1.1] tracking-[-0.01em] lg:px-5 lg:text-[1.75rem]">
                  {s.title}
                </h2>
              </div>
              <p className="mt-11 text-[0.9375rem] leading-6 text-ink-soft lg:mt-12">{s.line}</p>
              <Link
                href={s.href}
                className="group/more mt-3 inline-flex items-center gap-2 text-sm underline decoration-1 underline-offset-4 hover:text-action-hover"
              >
                Learn more<span className="sr-only"> about {s.about}</span>
                <ArrowRightIcon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-3.5 transition-transform duration-150 group-hover/more:translate-x-0.5"
                />
              </Link>
            </article>
          </li>
        ))}
      </ul>

      {/* "Multiple Coffee Carts" and, under it as on the live site, the four more services
          (Office, Conference & Expo, School & Non-Profit, Pricing Guide) as ruled rows. */}
      <div className="mt-12 border-t border-rule px-(--gutter) pt-8 pb-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-6 lg:pt-12 lg:pb-20">
        <div className="lg:col-span-5">
          <h2 className="font-serif text-[1.75rem] leading-[1.1] tracking-[-0.015em] text-balance lg:text-[2.25rem]">
            Multiple Coffee Carts Available for High-Capacity Events
          </h2>
          <p className="mt-8 text-ui text-ink-muted">More services</p>
          <ul className="mt-3 border-t border-rule">
            {moreServices.map((m) => (
              <li key={m.href} className="border-b border-rule">
                <Link href={m.href} className="group/row flex items-center justify-between gap-6 py-4">
                  <span>
                    <h3 className="font-serif text-[1.375rem] leading-[1.15] tracking-[-0.01em] text-ink decoration-1 underline-offset-4 group-hover/row:underline">
                      {m.title}
                    </h3>
                    <span className="mt-1 block text-sm text-ink-soft">{m.line}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-ui">
                    <span className="hidden sm:inline">Learn more</span>
                    <ArrowRightIcon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-3.5 transition-transform duration-150 group-hover/row:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-muted lg:col-span-7 lg:mt-0 lg:aspect-auto lg:min-h-full">
          <Image
            src="/images/services/selah-three-coffee-carts-high-capacity-event.jpg"
            alt="Three Selah carts with EigenLayer fronts in a row at a conference"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[50%_62%]"
          />
        </div>
      </div>
    </section>
  )
}
