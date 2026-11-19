import Image from "next/image"

// The live site's photo band "An invitation to pause and celebrate." (H3) with "Selah Coffee Cart",
// on the same photograph it uses (SELAH-19618: guests gathered at the cart under a tent).
// The statement sits on a white label, the site's one repeated device (hero review card, service labels),
// placed over the pavement so it never covers a face. Phones: the label sits under the photo.
export function StatementSection() {
  return (
    <section id="selah" aria-label="An invitation to pause and celebrate" className="relative border-t border-rule bg-ground">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[46rem] lg:min-h-[34rem] lg:w-full">
        <Image
          src="/images/statement/selah-guests-gather-at-coffee-cart-under-tent.jpg"
          alt="Guests talking and waiting with iced coffees at the Selah Coffee Co. cart under a tent in a park"
          fill
          sizes="100vw"
          className="object-cover object-[66%_50%] sm:object-[50%_46%]"
        />
      </div>
      <div className="relative z-10 mx-(--gutter) -mt-20 bg-paper px-6 py-7 sm:max-w-[34rem] lg:absolute lg:bottom-(--gutter) lg:left-(--gutter) lg:m-0 lg:max-w-[40rem] lg:px-10 lg:py-9">
        <p className="text-ui text-ink-muted">Selah</p>
        <h3 className="mt-3 font-serif text-[clamp(2.25rem,1.3rem+3vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-balance">
          An invitation to pause and celebrate.
        </h3>
        <p className="mt-4 text-body text-ink-soft">Selah Coffee Cart</p>
      </div>
      <div className="h-10 lg:hidden" aria-hidden="true" />
    </section>
  )
}
