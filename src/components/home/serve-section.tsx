import { PhoneIcon } from "lucide-react"
import { ServeMap } from "@/components/home/serve-map"
import { QuoteButton } from "@/components/site/quote-button"
import { serveArea, site } from "@/lib/site"

// Where we serve: the live site's two service-area blocks in one section, both H2s word for word.
// Top: "Serving Denver Metro Area, Colorado Springs, Vail, Breckenridge, Aspen, Boulder & Beyond" and its
// line (the old section-2 block). Then the map (keyless Leaflet, LE playbook rule 16). Under it, as on the
// old site: "Planning an Event? ..." (the long service and city list), with the quote button beside it.
// It sits above About; nothing heavy comes between the hero and the quote form (rule 15).
// id="locations" is the nav's "All locations" target and the old /#locations anchor.
export function ServeSection() {
  return (
    <section
      id="locations"
      aria-labelledby="serve-title"
      className="border-t border-rule bg-paper px-(--gutter) pt-10 pb-12 lg:pt-20 lg:pb-20"
    >
      <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-8">
          <p className="text-ui text-ink-muted">Where we serve</p>
          <h2
            id="serve-title"
            className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            Serving Denver Metro Area,{" "}
            <span className="text-ink-muted">Colorado Springs, Vail, Breckenridge, Aspen, Boulder &amp; Beyond</span>
          </h2>
        </div>
        <p className="mt-5 max-w-[26rem] text-body text-ink-soft lg:col-span-4 lg:mt-0 lg:justify-self-end">
          Aside from Denver, we are able to travel all over Colorado as well as other states.
        </p>
      </div>

      <ServeMap area={serveArea} className="mt-8 lg:mt-12" />

      <div className="mt-10 border-t border-rule pt-8 lg:mt-14 lg:grid lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-10">
        <h2 className="font-serif text-[clamp(1.375rem,1.1rem+0.9vw,2rem)] leading-[1.22] tracking-[-0.01em] text-pretty text-ink-muted lg:col-span-9">
          <span className="text-ink">Planning an Event?</span> Selah Coffee provides Event Baristas &amp; Mobile Espresso Bar
          Coffee Catering for Weddings, Corporate Events, Conferences, Expos, Brand Activations Breakfast &amp; Brunch
          Catering, in <City>Denver</City>, <City>Vail</City>, <City>Colorado Springs</City>, <City>Aspen</City>,{" "}
          <City>Boulder</City>, <City>Breckenridge</City> &amp; Beyond
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-3 lg:mt-0 lg:flex-col lg:items-end lg:gap-y-4">
          <QuoteButton />
          <a
            href={site.phone.href}
            className="inline-flex h-11 items-center gap-2 text-ui underline decoration-1 underline-offset-4 hover:text-action-hover lg:h-auto"
          >
            <PhoneIcon aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
            {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}

function City({ children }: { children: string }) {
  return <span className="text-ink">{children}</span>
}
