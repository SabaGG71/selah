import Image from "next/image"

// The live site's About block, founder-led (the owners are the business). Old content verbatim:
// H2 "About Selah Coffee Cart", "Founders | Jonny & Vanessa Kupin", "Hey there!", the two paragraphs
// (their bold phrases kept as emphasis), H2 "Your Denver Traveling Event Baristas" (leading dash dropped),
// the Selah definition and the Queen City Collective Coffee line. Only the three dashes became commas
// (LE copy rule). id="about" keeps the old /#about anchor.
// Top: the founders' portrait with a white caption tag, and their story set as a letter with their names
// as the sign-off. Below: "Selah" as a dictionary entry with its pronunciation.

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-rule bg-ground">
      <div className="px-(--gutter) pt-10 pb-12 lg:grid lg:grid-cols-12 lg:gap-6 lg:pt-20 lg:pb-16">
        <figure className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src="/images/about/jonny-and-vanessa-kupin-selah-coffee-founders.jpg"
              alt="Jonny and Vanessa Kupin, the founders of Selah Coffee, standing together in an autumn field"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[45%_40%]"
            />
          </div>
          <figcaption className="absolute bottom-0 left-0 bg-paper px-4 py-2 text-ui text-ink">
            <span className="font-semibold">Founders</span> | Jonny &amp; Vanessa Kupin
          </figcaption>
        </figure>

        <div className="mt-10 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:flex lg:flex-col">
          <p className="text-ui text-ink-muted">About</p>
          <h2
            id="about-title"
            className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            About Selah Coffee Cart
          </h2>

          <div className="mt-8 border-t border-rule pt-6 lg:mt-10">
            <p className="font-serif text-[1.75rem] leading-[1.1] tracking-[-0.01em]">Hey there!</p>
            <div className="mt-5 space-y-5 text-[1.0625rem] leading-[1.65] text-ink-soft">
              <p>
                <strong className="font-medium text-ink">We&rsquo;re Jonny and Vanessa, Founders of Selah Coffee.</strong> Our
                journey began as a dream back in 2021, right after we got married. As first-generation Americans with years
                of experience in the specialty coffee world, we were determined to build something meaningful together,{" "}
                <strong className="font-medium text-ink">something that brought people together</strong>, celebrated life,
                and created unforgettable moments.
              </p>
              <p>
                That&rsquo;s exactly what Selah Coffee Cart is all about.{" "}
                <strong className="font-medium text-ink">
                  From crazy &ldquo;I do&rsquo;s&rdquo; to events with thousands (and hey, maybe even a private jet one day,
                  dream big, right?), we bring the caffeine, the energy, and touch of magic to every experience.
                </strong>{" "}
                Every event is unique, and we love crafting custom coffee experiences that are anything but cookie cutter for
                everyone including you.
              </p>
            </div>
            <p className="mt-7 font-serif text-[1.5rem] leading-none tracking-[-0.01em]">Jonny &amp; Vanessa</p>
          </div>
        </div>
      </div>

      {/* Selah, defined */}
      <div className="border-t border-rule px-(--gutter) pt-8 pb-12 lg:grid lg:grid-cols-12 lg:gap-6 lg:pt-12 lg:pb-20">
        <div className="lg:col-span-5">
          <h2 className="font-serif text-[1.5rem] leading-[1.15] tracking-[-0.01em] lg:text-[1.75rem]">
            Your Denver Traveling Event Baristas
          </h2>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-1 lg:mt-8">
            <p className="font-serif text-[clamp(4.5rem,2.5rem+6vw,9rem)] leading-[0.85] tracking-[-0.03em]">Selah</p>
            <p className="text-body text-ink-muted">/sel-uh/</p>
          </div>
        </div>
        <div className="mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end">
          <p className="font-serif text-[1.625rem] leading-[1.2] tracking-[-0.01em] text-balance lg:text-[2rem]">
            An invitation to pause and celebrate.{" "}
            <span className="text-ink-muted">
              We wanted to invite people into a Selah moment at any occasion through coffee.
            </span>
          </p>
          <p className="mt-6 max-w-[34rem] text-body text-ink-soft">
            Selah Coffee is a specialty coffee catering company with full espresso bars and custom coffee carts based in
            Denver, Colorado. We proudly feature <strong className="font-medium text-ink">Queen City Collective Coffee</strong>,
            a <strong className="font-medium text-ink">local coffee roaster in Denver</strong>.
          </p>
        </div>
      </div>
    </section>
  )
}
