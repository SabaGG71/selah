"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type Slide = {
  src: string
  alt: string
  /** Literal Tailwind object-position classes for phone and desktop, e.g. "object-[42%_50%] lg:object-[26%_50%]" */
  position: string
}

// Hero slideshow. Crossfades every 5s. The blue progress line under the counter is the clock:
// when its CSS animation ends, the next photo shows, so pausing the line pauses the slideshow.
// - Pauses on mouse hover, in background tabs, and with the Pause button (WCAG 2.2.2).
// - No autoplay when the visitor has reduced motion on (motion-safe animation).
// - Only the first photo loads with the page; each next photo loads one step ahead.

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange)
  return () => document.removeEventListener("visibilitychange", onChange)
}
const getVisible = () => document.visibilityState === "visible"
const getServerVisible = () => true

export function HeroSlider({ slides, sizes }: { slides: Slide[]; sizes: string }) {
  const n = slides.length
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState<number[]>([0])
  const [primed, setPrimed] = useState(false)
  const [paused, setPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const visible = useSyncExternalStore(subscribeVisibility, getVisible, getServerVisible)
  const touchX = useRef<number | null>(null)
  const playing = primed && !paused && !hover && visible

  const prime = () => {
    setPrimed(true)
    setLoaded((l) => (l.includes(1 % n) ? l : [...l, 1 % n]))
  }

  // Safety net in case the first image finished before hydration and onLoad never reached us.
  useEffect(() => {
    const id = window.setTimeout(prime, 2500)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function go(i: number) {
    const next = (i + n) % n
    setIndex(next)
    setLoaded((l) => Array.from(new Set([...l, next, (next + 1) % n])))
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Selah at events"
      className="relative h-full w-full"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1)
      }}
    >
      <div aria-live={playing ? "off" : "polite"} className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}`}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
              i === index ? "opacity-100" : "opacity-0"
            )}
          >
            {loaded.includes(i) ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                quality={85}
                sizes={sizes}
                onLoad={i === 0 ? prime : undefined}
                className={cn("object-cover", slide.position)}
              />
            ) : null}
          </div>
        ))}
      </div>

      {/* Quiet controls on a white label (lookbook: chip-sized, words and arrows, interface blue). */}
      <div className="absolute top-3 right-3 z-10 flex h-11 items-stretch bg-paper text-ui lg:top-auto lg:right-4 lg:bottom-4 lg:h-9">
        <span className="flex items-center px-3 text-ink tabular-nums" aria-hidden="true">
          {index + 1} / {n}
        </span>
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="grid w-9 place-items-center text-action hover:text-action-hover"
        >
          <ArrowLeftIcon aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="grid w-9 place-items-center text-action hover:text-action-hover"
        >
          <ArrowRightIcon aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          className="min-w-[3.75rem] px-3 text-action decoration-1 underline-offset-4 hover:underline motion-reduce:hidden"
        >
          {paused ? "Play" : "Pause"}
        </button>
        <span
          key={index}
          aria-hidden="true"
          onAnimationEnd={() => go(index + 1)}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-action motion-safe:animate-slide-progress motion-reduce:hidden"
          style={{ animationPlayState: playing ? "running" : "paused" }}
        />
      </div>
    </div>
  )
}
