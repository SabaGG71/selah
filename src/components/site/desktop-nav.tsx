"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { QuoteButton } from "@/components/site/quote-button"
import { allLocations, cities, includedLines, primaryNav, serviceExtras, services, type NavLink } from "@/lib/site"
import { cn } from "@/lib/utils"

const panel = "grid grid-cols-12 gap-6 px-(--gutter) pt-6 pb-7"
const label = "text-ui text-ink-muted"
const statement = "mt-3 font-serif text-[1.875rem] leading-[1.05] tracking-[-0.015em] text-balance text-ink"

export function DesktopNav({ className }: { className?: string }) {
  return (
    <NavigationMenu className={className} delayDuration={80}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Catering panel as a mini pitch (LE playbook rule 17): real cart photo, headline,
                three true lines, the quote button, then the event and city links. */}
            <div className={panel}>
              <div className="relative col-span-3 min-h-[20rem] overflow-hidden bg-muted">
                {/* The cart with "selah COFFEE CO." fully in frame, founders Jonny and Vanessa at work. */}
                <Image
                  src="/images/nav/selah-founders-coffee-cart.jpg"
                  alt="Selah founders Jonny and Vanessa making drinks at the white Selah Coffee Co. cart"
                  fill
                  sizes="(min-width: 1440px) 25vw, 330px"
                  className="object-cover object-[40%_50%]"
                />
              </div>
              <div className="col-span-3 flex flex-col">
                <p className={label}>Coffee catering</p>
                <p className={statement}>A full espresso bar, brought to your event.</p>
                <ul className="mt-5 border-t border-rule">
                  {includedLines.map((line) => (
                    <li key={line} className="border-b border-rule py-2 text-sm text-ink">
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <QuoteButton />
                </div>
              </div>
              <div className="col-span-3">
                <p className={label}>Event types</p>
                <LinkRows links={services} className="mt-3" />
                <LinkRows links={serviceExtras} className="mt-5" />
              </div>
              <div className="col-span-3">
                <p className={label}>Locations</p>
                <LinkRows links={[...cities, allLocations]} className="mt-3" />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={panel}>
              <div className="col-span-4 flex flex-col items-start pr-6">
                <p className={label}>Service area</p>
                <p className={statement}>Based in Denver. We travel across Colorado and to other states.</p>
                <NavigationMenuLink asChild>
                  <Link
                    href={allLocations.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm underline decoration-1 underline-offset-4 hover:text-action-hover"
                  >
                    {allLocations.label}
                    <ArrowRightIcon aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
                  </Link>
                </NavigationMenuLink>
              </div>
              <div className="col-span-4">
                <p className={label}>Cities</p>
                <LinkRows links={cities.slice(0, 3)} className="mt-3" />
              </div>
              <div className="col-span-4">
                <p className={label} aria-hidden="true">
                  &nbsp;
                </p>
                <LinkRows links={cities.slice(3)} className="mt-3" />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {primaryNav.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="inline-flex h-10 items-center text-caps font-medium text-ink uppercase decoration-1 underline-offset-[6px] hover:underline"
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// Ruled rows (lookbook "Lists, not cards"): label left, arrow right, black rules, blue words.
function LinkRows({ links, className }: { links: NavLink[]; className?: string }) {
  return (
    <ul className={cn("border-t border-rule", className)}>
      {links.map((link) => (
        <li key={link.href} className="border-b border-rule">
          <NavigationMenuLink asChild>
            <Link
              href={link.href}
              className="group/row flex items-center justify-between gap-4 py-2 text-sm decoration-1 underline-offset-4 hover:text-action-hover hover:underline"
            >
              {link.label}
              <ArrowRightIcon
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-3.5 transition-transform duration-150 group-hover/row:translate-x-0.5"
              />
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}
