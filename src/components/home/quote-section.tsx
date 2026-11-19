import { ArrowUpRightIcon } from "lucide-react"
import { CortadoForm } from "@/components/home/cortado-form"
import { site } from "@/lib/site"

// Section 3 (id="quote"): the live site's booking block, moved up from near the bottom
// (LE playbook: the form in section 2 or 3; Saba agreed). Every quote button on the site jumps here.
// Old headings kept: H2 "Let's book your Coffee Cart Experience!", the H3 with the three steps
// (emoji dropped, shown as three ruled lines), H3 "Contact us", H3 "Socials".
//
// Layout: Selah's Cortado form card sits straight on the ground (its frame is transparent). The card has
// a 16px inset inside its frame and stops growing at 672px, so the frame is pulled out 16px on every side
// and the column is capped at 672px: the card's edges land exactly on the grid and the right margin.
// Desktop: the left column (heading + steps at the top, contact at the bottom) ends on the same line as
// the bottom of the card. Phones: heading and steps, the form, then the contact details.

const steps = [
  { text: "Fill out the form.", when: "Now" },
  { text: "Get a custom quote.", when: "Next" },
  { text: "Approve and Book.", when: "Then" },
]

const socials = [
  { label: "Instagram", href: site.instagram },
  { label: "Facebook", href: "https://www.facebook.com/Selah-Coffee-Co-109083091688349" },
]

const row = "flex items-center justify-between gap-4 border-b border-rule py-3"
const link = "underline decoration-1 underline-offset-4 hover:text-action-hover"

export function QuoteSection() {
  return (
    <section id="quote" aria-labelledby="quote-title" className="border-t border-rule bg-ground">
      <div className="px-(--gutter) pt-10 pb-12 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-6 lg:row-start-1 lg:pr-6">
          <p className="text-ui text-ink-muted">Book</p>
          <h2
            id="quote-title"
            className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            Let&rsquo;s book your Coffee Cart Experience!
          </h2>
          <h3 className="mt-6 border-t border-rule">
            {steps.map((s) => (
              <span
                key={s.text}
                className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5 font-serif text-[1.375rem] leading-[1.2] tracking-[-0.01em] lg:text-[1.5rem]"
              >
                {s.text}
                <span aria-hidden="true" className="font-sans text-ui tracking-normal text-ink-muted">
                  {s.when}
                </span>
              </span>
            ))}
          </h3>
        </div>

        <div className="mt-8 w-full lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-[42rem] lg:justify-self-end">
          <div className="-m-4">
            <CortadoForm />
          </div>
        </div>

        <div className="mt-10 lg:col-span-6 lg:row-start-2 lg:mt-10 lg:self-end lg:pr-6">
          <h3 className="text-ui text-ink-muted">Contact us</h3>
          <ul className="mt-3 border-t border-rule text-[0.9375rem]">
            <li className={row}>
              <span className="text-ink-soft">Phone</span>
              <a href={site.phone.href} className={link}>
                {site.phone.display}
              </a>
            </li>
            <li className={row}>
              <span className="text-ink-soft">Email</span>
              <a href="mailto:contact@selah.coffee" className={link}>
                contact@selah.coffee
              </a>
            </li>
            <li className={row}>
              <span className="text-ink-soft">Based in</span>
              <span>Denver, CO</span>
            </li>
            <li className={row}>
              <h3 className="font-normal text-ink-soft">Socials</h3>
              <span className="flex items-center gap-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/so inline-flex items-center gap-1.5 hover:text-action-hover"
                  >
                    <span className="underline decoration-1 underline-offset-4">{s.label}</span>
                    <ArrowUpRightIcon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-3.5 transition-transform duration-150 group-hover/so:-translate-y-0.5 group-hover/so:translate-x-0.5"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
