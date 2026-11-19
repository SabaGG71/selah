import Image from "next/image"
import { QuoteButton } from "@/components/site/quote-button"

// Section 8, the live site's "Enjoy a Full Mobile Espresso Bar for Your Event & More…" block, on the same
// photograph it uses (SELAH-19868: espresso poured over iced lattes). An editorial spread: the photo bleeds
// off the left edge and a white menu card (the site's white-label device, at full size) overlaps it on the
// right. The six items are the old list, word for word, as ruled rows; then the old "Included with Coffee
// Cart Rental" heading and "Book the Ultimate Coffee Experience", with the site's one quote button.
// Phones: photo first, the card overlapping its bottom edge.

type Item = { title: string; detail?: string }

const items: Item[] = [
  { title: "Fresh Local Specialty Coffee" },
  { title: "Variety of Syrups & Alternative Milks" },
  { title: "Full Espresso Bar Menu", detail: "Espressos, Cortados, Cappuccinos, Lattes & more" },
  { title: "Unlimited Drinks w/ Hospitable Baristas" },
  { title: "Custom Branding Packages", detail: "Multiple Carts Option for High Capacity" },
  { title: "Alternative Drinks", detail: "Chai, Tea, Hot Chocolate" },
]

export function BarSection() {
  return (
    <section id="espresso-bar" aria-labelledby="bar-title" className="border-t border-rule bg-ground lg:grid lg:grid-cols-12 lg:gap-6">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:aspect-auto lg:min-h-[52rem]">
        <Image
          src="/images/home/selah-espresso-pour-iced-latte.jpg"
          alt="A shot of espresso poured over two iced lattes on the Selah cart"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[30%_32%]"
        />
      </div>

      <div className="relative z-10 mx-(--gutter) -mt-24 pb-12 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mx-0 lg:mt-0 lg:flex lg:items-center lg:py-20 lg:pr-(--gutter)">
        <div className="w-full bg-paper px-6 py-8 lg:px-12 lg:py-12">
          <p className="text-ui text-ink-muted">Espresso bar</p>
          <h2
            id="bar-title"
            className="mt-3 font-serif text-[clamp(2rem,1.2rem+2vw,3rem)] leading-[1.04] tracking-[-0.02em] text-balance"
          >
            Enjoy a Full Mobile Espresso Bar for Your Event &amp; More
          </h2>

          <ul className="mt-8 border-t border-rule">
            {items.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-1 border-b border-rule py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-serif text-[1.25rem] leading-[1.2] tracking-[-0.01em] lg:text-[1.375rem]">
                  {item.title}
                </span>
                {item.detail ? (
                  <span className="text-sm text-ink-soft sm:max-w-[15rem] sm:text-right">{item.detail}</span>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-ui text-ink-muted">Included with Coffee Cart Rental</h2>
              <p className="mt-1 font-serif text-[1.375rem] leading-[1.2] tracking-[-0.01em]">
                Book the Ultimate Coffee Experience
              </p>
            </div>
            <QuoteButton className="self-start sm:self-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
