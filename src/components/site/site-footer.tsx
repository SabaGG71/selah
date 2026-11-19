import { ArrowUpRightIcon, PhoneIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { QuoteButton } from "@/components/site/quote-button"
import { cities, site, type NavLink } from "@/lib/site"

// The live site's footer, rebuilt in the lookbook style. Kept from it: the H2 "Based in Denver, Colorado"
// (its emoji dropped), the columns Services, Service Locations and Company with their labels and paths,
// the contact block, and the copyright and trademark lines word for word. Added: Selah's palm (the
// official favicon, unchanged) set like an engraving with Denver's coordinates as its caption, the quote
// button, and the LocalEyes credit (LE rule 20). Socials live here only (rule 3); every link is the
// interface blue (rule 2).

const services: NavLink[] = [
  { label: "Corporate Events", href: "/corporate-coffee-catering-denver/" },
  { label: "Conferences & Trade Shows", href: "/conference-expocoffee-catering-in-denver/" },
  { label: "Brand Activations", href: "/brand-activation-coffee-cart-denver/" },
  { label: "Office Coffee Programs", href: "/office-coffee-cart-service-denver/" },
  { label: "Schools & Non-Profits", href: "/school-non-profit-coffee-catering-in-denver/" },
  { label: "Weddings", href: "/wedding-coffee-cart-denver/" },
  { label: "Private Events", href: "/private-event-coffee-cart-denver-selah-coffee-co/" },
]

const company: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/how-much-does-a-coffee-cart-cost/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/#quote" },
  { label: "Coffee Blog", href: "/coffee-blog/" },
  { label: "Careers", href: "/careers/" },
  { label: "Terms & Conditions", href: "/term-and-conditions/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
]

const row =
  "flex min-h-11 items-center border-b border-rule/15 py-2 text-[0.9375rem] leading-5 decoration-1 underline-offset-4 hover:text-action-hover hover:underline lg:min-h-10"

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-paper">
      {/* Sign-off */}
      <div className="px-(--gutter) pt-14 sm:grid sm:grid-cols-12 sm:gap-6 lg:pt-24">
        <div className="sm:col-span-8 sm:self-end">
          <p className="text-ui text-ink-muted">{site.name}</p>
          <h2 className="mt-3 font-serif text-[clamp(2.75rem,1.2rem+5.2vw,6.5rem)] leading-[0.92] tracking-[-0.03em]">
            Based in <span className="whitespace-nowrap">Denver, Colorado</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-10">
            <QuoteButton href="/#quote" />
            <a
              href={site.phone.href}
              className="inline-flex h-11 items-center gap-2 text-ui underline decoration-1 underline-offset-4 hover:text-action-hover lg:h-auto"
            >
              <PhoneIcon aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
              {site.phone.display}
            </a>
          </div>
        </div>
        <figure className="mt-6 flex flex-col items-end sm:col-span-4 sm:mt-0 sm:self-end">
          <Image
            src="/images/brand/selah-coffee-palm-icon.png"
            alt=""
            width={512}
            height={512}
            sizes="(min-width: 1024px) 17rem, (min-width: 640px) 13rem, 8rem"
            className="-mr-4 -mb-3 w-32 sm:-mr-6 sm:w-52 lg:-mr-8 lg:w-68"
          />
          <figcaption className="text-caps text-ink-muted uppercase tabular-nums">39.7392° N, 104.9903° W</figcaption>
        </figure>
      </div>

      {/* The old footer's columns */}
      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 px-(--gutter) lg:mt-20 lg:grid-cols-12">
        <FooterList title="Services" links={services} className="lg:col-span-3" />
        <FooterList title="Service Locations" links={cities} className="lg:col-span-3" />
        <FooterList title="Company" links={company} className="lg:col-span-3" />
        <div className="col-span-2 lg:col-span-3">
          <h3 className="text-ui text-ink-muted">Get in touch</h3>
          <ul className="mt-3 border-t border-rule">
            <li>
              <a href={`mailto:${site.email}`} className={row}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phone.href} className={row}>
                {site.phone.display}
              </a>
            </li>
            <li className="border-b border-rule/15 py-2.5 text-[0.9375rem] leading-6 text-ink-soft">
              <address className="not-italic">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </address>
            </li>
          </ul>
          <ul aria-label="Selah Coffee on social media" className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-1 text-[0.9375rem] decoration-1 underline-offset-4 hover:text-action-hover hover:underline lg:h-auto"
                >
                  {s.label}
                  <ArrowUpRightIcon aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal line and credit */}
      <div className="mt-12 border-t border-rule px-(--gutter) py-6 lg:mt-20 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="text-[0.75rem] leading-5 text-ink-muted">
          <p>Copyright &copy; 2026 Selah Coffee Co.</p>
          <p className="mt-1 max-w-[52rem]">
            Selah Coffee Co, and our logo, and any other trademarks on our Site are trademarks of Selah Coffee Co and may
            not be used without permission.
          </p>
        </div>
        <a
          href="https://localeyesgrowth.com"
          target="_blank"
          rel="noopener"
          className="mt-5 inline-flex h-8 shrink-0 items-center rounded-full border border-rule/25 px-3.5 text-[0.75rem] transition-colors hover:border-action lg:mt-0"
        >
          Designed by LocalEyes
        </a>
      </div>
    </footer>
  )
}

function FooterList({ title, links, className }: { title: string; links: NavLink[]; className?: string }) {
  return (
    <nav aria-label={title} className={className}>
      <h3 className="text-ui text-ink-muted">{title}</h3>
      <ul className="mt-3 border-t border-rule">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={row}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
