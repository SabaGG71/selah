"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Review } from "@/lib/reviews"

// Real Google reviews as ruled columns the visitor slides (drag, swipe, arrow keys, buttons).
// Nothing moves on its own. Each column: the words in serif, then name and date.
export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  return (
    <Carousel opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }} aria-label="Google reviews">
      <div className="flex items-center justify-between px-(--gutter) pb-4">
        <p className="text-ui text-ink-muted">Google reviews</p>
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <div className="ml-(--gutter) border-y border-rule">
        <CarouselContent className="-ml-0 cursor-grab select-none active:cursor-grabbing">
          {reviews.map((r, i) => (
            <CarouselItem
              key={r.name}
              aria-label={`${i + 1} of ${reviews.length}`}
              className={
                i === reviews.length - 1
                  ? "basis-auto border-r border-rule pl-0 lg:mr-(--gutter)"
                  : "basis-auto pl-0"
              }
            >
              <figure className="flex h-full w-[80vw] max-w-[21rem] flex-col border-l border-rule px-5 pt-6 pb-5 lg:w-[22rem] lg:max-w-none lg:px-7 lg:pt-8 lg:pb-6">
                <blockquote className="font-serif text-[1.375rem] leading-[1.28] tracking-[-0.01em] text-ink lg:text-[1.5rem]">
                  <p>&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-auto pt-8 text-ui">
                  <span className="block font-semibold text-ink">{r.name}</span>
                  <span className="block text-ink-muted">{r.date}, Google review</span>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  )
}
