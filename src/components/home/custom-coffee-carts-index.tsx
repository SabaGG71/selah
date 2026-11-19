"use client"

import Image from "next/image"
import { useEffect, useState, type ReactNode } from "react"
import { Tabs } from "radix-ui"
import { ArrowRightIcon } from "lucide-react"
import { Logo } from "@/components/site/logo"
import { cn } from "@/lib/utils"

// The five branding options from the live site as a ruled list (no numbers, Saba's call).
// Pointing at (or tapping, or arrowing to) an option shows a real example of it.
// Grey for inactive, black for active, with a blue arrow on the active row.
// Desktop: intro, list and button on the left, the example on the right, both ending together.
// Phones: intro, list, example, button.

type Item = { value: string; label: string; note?: string; caption: string }

const items: Item[] = [
  { value: "cups", label: "Custom Branded Cups", caption: "A Viatris branded cup at a conference coffee bar." },
  {
    value: "bars",
    label: "Custom Branded Espresso Bars",
    caption: "Custom branding mockups: the cart front and the cup in your brand.",
  },
  { value: "banners", label: "Overhead Banners", caption: "An EigenLayer backdrop and cart panels." },
  { value: "menus", label: "Tailor-made Menus", caption: "A menu set for your event, with your name on it." },
  {
    value: "printer",
    label: "Latte Logo Printer",
    note: "(always a showstopper)",
    caption: "The Snapchat ghost printed on a latte.",
  },
]

export function CustomCartsIndex({ intro, cta }: { intro: ReactNode; cta: ReactNode }) {
  const [value, setValue] = useState(items[0].value)

  return (
    <Tabs.Root
      value={value}
      onValueChange={setValue}
      orientation="vertical"
      className="lg:grid lg:grid-cols-12 lg:grid-rows-[auto_auto_1fr] lg:gap-x-6"
    >
      <div className="lg:col-span-6 lg:row-start-1">{intro}</div>

      <Tabs.List aria-label="Branding options" className="mt-8 border-t border-rule lg:col-span-6 lg:row-start-2">
        {items.map((item) => (
          <Tabs.Trigger
            key={item.value}
            value={item.value}
            onPointerEnter={(e) => e.pointerType === "mouse" && setValue(item.value)}
            className="group/tab flex w-full items-center justify-between gap-5 border-b border-rule py-3.5 text-left text-ink-muted outline-none hover:text-ink focus-visible:text-ink data-[state=active]:text-ink lg:py-[1.125rem]"
          >
            <span className="font-serif text-[1.5rem] leading-[1.15] tracking-[-0.01em] lg:text-[1.75rem]">
              {item.label}
              {item.note ? <span className="ml-2 font-sans text-ui tracking-normal">{item.note}</span> : null}
            </span>
            <ArrowRightIcon
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 shrink-0 text-action opacity-0 transition-opacity duration-150 group-data-[state=active]/tab:opacity-100"
            />
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className="mt-6 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-0">
        {items.map((item) => (
          <Tabs.Content key={item.value} value={item.value} className="outline-none">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-ground lg:aspect-square">
                <Visual value={item.value} />
              </div>
              <figcaption className="mt-3 text-ui text-ink-soft">{item.caption}</figcaption>
            </figure>
          </Tabs.Content>
        ))}
      </div>

      <div className="mt-8 lg:col-span-6 lg:row-start-3">{cta}</div>
    </Tabs.Root>
  )
}

function Visual({ value }: { value: string }) {
  if (value === "cups")
    return (
      <Image
        src="/images/custom/selah-viatris-branded-cups-banner.jpg"
        alt="A hand holding a Viatris branded cup in front of a Selah coffee bar with a Fueling Progress banner"
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover object-[50%_32%]"
      />
    )
  if (value === "bars") return <BrandingMockups />
  if (value === "banners")
    return (
      <Image
        src="/images/custom/selah-eigenlayer-branded-backdrop.jpg"
        alt="Four baristas behind a Selah cart with EigenLayer panels in front of a large EigenLayer backdrop"
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover object-[50%_58%]"
      />
    )
  if (value === "menus") return <MenuCard />
  return (
    <Image
      src="/images/custom/selah-snapchat-latte-logo-printer.jpg"
      alt="A latte with the Snapchat ghost printed on the foam"
      fill
      sizes="(min-width: 1024px) 40vw, 100vw"
      className="object-cover object-[50%_50%]"
    />
  )
}

// Selah's own mockups (from the live site): the same cart and cup in three brands, crossfading.
// Stays on one frame when the visitor prefers reduced motion.
const mockups = [
  { src: "/images/custom/selah-custom-branding-mockup-fjallraven.jpg", alt: "Mockup of the Selah cart and cup branded Fjallraven" },
  { src: "/images/custom/selah-custom-branding-mockup-vuori.jpg", alt: "Mockup of the Selah cart and cup branded Vuori" },
  { src: "/images/custom/selah-custom-branding-mockup-amazon.jpg", alt: "Mockup of the Selah cart and cup branded Amazon" },
]

function BrandingMockups() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % mockups.length), 2500)
    return () => window.clearInterval(id)
  }, [])
  return (
    <>
      {mockups.map((m, i) => (
        <Image
          key={m.src}
          src={m.src}
          alt={i === index ? m.alt : ""}
          aria-hidden={i !== index}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className={cn(
            "object-contain mix-blend-multiply transition-opacity duration-700 motion-reduce:transition-none",
            i === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </>
  )
}

// Tailor-made menus, set as real text (lookbook: "a menu as real text, not an image").
// "Your event name" is a placeholder the client replaces. Drinks are the ones on Selah's live site.
function MenuCard() {
  const drinks = ["Espresso", "Cortado", "Cappuccino", "Latte", "Chai", "Tea", "Hot chocolate"]
  return (
    <div className="absolute inset-0 grid place-items-center p-6 lg:p-10">
      <div className="flex h-full max-h-[30rem] w-full max-w-[21rem] flex-col bg-paper px-6 py-6 text-ink lg:px-7 lg:py-7">
        <Logo className="h-8 w-auto self-start lg:h-10" priority={false} />
        <p className="mt-4 text-ui text-ink-muted lg:mt-5">Menu</p>
        <p className="mt-1 font-serif text-[1.375rem] leading-[1.1] text-ink-muted lg:text-[1.625rem]">Your event name</p>
        <ul className="mt-3 border-t border-rule lg:mt-4">
          {drinks.map((d) => (
            <li key={d} className="border-b border-rule py-1 text-ui lg:py-1.5 lg:text-sm">
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-3 text-ui text-ink-soft lg:pt-4">Syrups and alternative milks</p>
      </div>
    </div>
  )
}
