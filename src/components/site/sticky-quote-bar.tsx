"use client"

import { useEffect, useState } from "react"
import { QuoteButton } from "@/components/site/quote-button"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// Phone-only bottom bar (LE playbook rule 13). Hidden while the hero button or the quote form is on screen.
export function StickyQuoteBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-hero-cta], #quote"))
    if (!targets.length) return
    const onScreen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target)
        else onScreen.delete(e.target)
      }
      setShow(onScreen.size === 0 && window.scrollY > 120)
    })
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ground px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-200 ease-out motion-reduce:transition-none lg:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center gap-4">
        <a
          href={site.phone.href}
          aria-label={`Call ${site.phone.display}`}
          className="inline-flex h-11 items-center text-sm underline underline-offset-4"
        >
          Call
        </a>
        <QuoteButton className="flex-1" />
      </div>
    </div>
  )
}
