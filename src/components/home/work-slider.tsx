"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { ClientWork } from "@/lib/clients"

// Branded work for named clients, as a strip the visitor moves themselves (drag, swipe, trackpad,
// arrow keys or the two buttons). It does not move on its own. Starts at the page margin and runs
// off the right edge so it reads as "there is more".
export function WorkSlider({ items }: { items: ClientWork[] }) {
  return (
    <Carousel opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }} aria-label="Branded work for clients">
      <div className="flex items-center justify-between px-(--gutter) pt-6 pb-3">
        <p className="text-ui text-ink-muted">Branded work</p>
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <div className="ml-(--gutter)">
        <CarouselContent className="-ml-2 cursor-grab select-none active:cursor-grabbing">
          {items.map((item, i) => (
            <CarouselItem
              key={item.src}
              aria-label={`${i + 1} of ${items.length}`}
              className={i === items.length - 1 ? "basis-auto pr-(--gutter) pl-2" : "basis-auto pl-2"}
            >
              <figure className="w-[9.5rem] lg:w-[15rem]">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 240px, 152px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-ui">
                  <span className="block font-semibold text-ink">{item.brand}</span>
                  <span className="block text-ink-soft">{item.caption}</span>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  )
}
