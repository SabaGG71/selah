import Image from "next/image"
import { clientLogos, type ClientLogo } from "@/lib/clients"

// Section 2: the client roster.
// Logos: the 15 client logos in one ink, in ruled cells (lookbook "lists, not cards"), drifting left
// (CSS only). Hover pauses the row and brings a logo back to its own colours.
// With reduced motion the row stands still and scrolls sideways instead.
// The branded-work photos live in Custom Coffee Carts (section 4), where the old site had them.
// The live site's service-area block that followed the logos is now the top of Where we serve
// (serve-section.tsx, with the map), so the page has one service area. The H2 is the live site's, word for word.
export function ClientsSection() {
  return (
    <section id="clients" aria-labelledby="clients-title" className="border-t border-rule bg-paper">
      <div className="px-(--gutter) pt-10 pb-7 lg:grid lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-20 lg:pb-10">
        <div className="lg:col-span-8">
          <p className="text-ui text-ink-muted">Clients</p>
          <h2
            id="clients-title"
            className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            Coffee Catering Trusted by <span className="text-ink-muted">Top Companies and Brands</span>
          </h2>
        </div>
        <p className="mt-5 max-w-[28rem] text-[0.9375rem] leading-6 text-ink-soft lg:col-span-4 lg:mt-0 lg:justify-self-end">
          Offices, conferences, store launches and training camps. A few of the teams that book Selah, and the carts,
          cups and lattes we branded for them.
        </p>
      </div>

      {/* Row 1: logos */}
      <div className="group/logos overflow-hidden border-t border-rule motion-reduce:overflow-x-auto">
        <div className="flex w-max [--marquee-duration:70s] group-hover/logos:[animation-play-state:paused] motion-safe:animate-marquee">
          <LogoRow logos={clientLogos} />
          <LogoRow logos={clientLogos} hidden />
        </div>
      </div>
    </section>
  )
}

function LogoRow({ logos, hidden = false }: { logos: ClientLogo[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Clients"} className={hidden ? "flex motion-reduce:hidden" : "flex"}>
      {logos.map((logo) => (
        <li
          key={logo.slug}
          className="group/logo flex h-[5.5rem] w-[9.5rem] shrink-0 items-center justify-center border-r border-rule lg:h-[7.5rem] lg:w-[13.75rem]"
        >
          <span
            className="relative block max-lg:scale-[0.8]"
            style={{ width: logo.width, height: logo.height }}
          >
            <Image
              src={`/images/clients/${logo.slug}-ink.png`}
              alt={hidden ? "" : logo.name}
              width={logo.width}
              height={logo.height}
              className="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover/logo:opacity-0"
            />
            <Image
              src={`/images/clients/${logo.slug}-color.png`}
              alt=""
              aria-hidden="true"
              width={logo.width}
              height={logo.height}
              className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
            />
          </span>
        </li>
      ))}
    </ul>
  )
}
