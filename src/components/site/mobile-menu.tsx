"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRightIcon, PlusIcon } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { allLocations, cities, primaryNav, serviceExtras, services, site, type NavLink } from "@/lib/site"

// Phone menu: ruled rows at 16px in the interface blue, Services and Locations fold open,
// the quote button and phone at the bottom.
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="-mr-3 inline-flex h-11 items-center px-3 text-caps font-medium text-action uppercase"
          aria-label="Open menu"
        >
          Menu
        </button>
      </SheetTrigger>
      <SheetContent side="right" aria-describedby={undefined}>
        <div className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-rule px-4">
          <SheetClose asChild>
            <Link href="/" aria-label="Selah Coffee Co., home">
              <Logo className="h-[52px] w-auto" priority={false} />
            </Link>
          </SheetClose>
          <SheetClose className="-mr-3 inline-flex h-11 items-center px-3 text-caps font-medium text-action uppercase">
            Close
          </SheetClose>
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-4 pt-2 pb-6">
          <Group label="Services" links={[...services, ...serviceExtras]} />
          <Group label="Locations" links={[...cities, allLocations]} />
          {[...primaryNav, { label: "Blog", href: "/coffee-blog/" }].map((item) => (
            <SheetClose key={item.href} asChild>
              <Link href={item.href} className="flex h-14 items-center border-b border-rule text-body">
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="shrink-0 border-t border-rule px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <SheetClose asChild>
            <Button asChild className="w-full">
              <a href={site.quote.href}>{site.quote.label}</a>
            </Button>
          </SheetClose>
          <a href={site.phone.href} className="mt-3 flex h-11 items-center justify-center text-body underline underline-offset-4">
            Call {site.phone.display}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function Group({ label, links }: { label: string; links: NavLink[] }) {
  return (
    <details className="group border-b border-rule">
      <summary className="flex h-14 cursor-pointer list-none items-center justify-between text-body text-action [&::-webkit-details-marker]:hidden">
        {label}
        <PlusIcon aria-hidden="true" strokeWidth={1.5} className="size-4 transition-transform duration-200 group-open:rotate-45" />
      </summary>
      <ul className="pb-3">
        {links.map((link) => (
          <li key={link.href}>
            <SheetClose asChild>
              <Link href={link.href} className="flex h-11 items-center justify-between pl-3 text-[0.9375rem]">
                {link.label}
                <ArrowRightIcon aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
    </details>
  )
}
