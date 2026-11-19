import Link from "next/link"
import { Logo } from "@/components/site/logo"
import { Dateline } from "@/components/site/dateline"
import { DesktopNav } from "@/components/site/desktop-nav"
import { MobileMenu } from "@/components/site/mobile-menu"
import { QuoteButton } from "@/components/site/quote-button"
import { site } from "@/lib/site"

// Date bar in the interface blue (scrolls away, like Canyon's top bar), then the sticky header
// on the ground with a black rule under it. Header: official logo, five nav words in 12px caps,
// phone and the one quote button. No socials (playbook rule 3).
export function SiteHeader() {
  return (
    <>
      <div className="h-(--bar-h) bg-action text-ui text-on-action">
        <Dateline />
      </div>
      <header className="sticky top-0 z-40 border-b border-rule bg-ground">
        <div className="flex h-(--header-h) items-center gap-10 px-(--gutter)">
          <Link href="/" aria-label="Selah Coffee Co., home" className="shrink-0">
            <Logo className="h-[52px] w-auto lg:h-16" />
          </Link>
          <DesktopNav className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-6">
            <a
              href={site.phone.href}
              className="hidden text-sm underline decoration-1 underline-offset-4 hover:text-action-hover lg:inline"
            >
              {site.phone.display}
            </a>
            <QuoteButton className="hidden lg:inline-flex" />
            <a
              href={site.phone.href}
              aria-label={`Call ${site.phone.display}`}
              className="inline-flex h-11 items-center text-caps font-medium uppercase lg:hidden"
            >
              Call
            </a>
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
