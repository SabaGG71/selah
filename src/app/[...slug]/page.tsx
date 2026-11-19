import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { legacyUrls } from "@/lib/site"

// Temporary stubs: every URL from the live WordPress site resolves here at the same path,
// with the new header, until its real page is built. A real route folder (for example
// app/faq/page.tsx) takes over from this catch-all automatically. Stubs are noindex.

const stubs = legacyUrls.filter((u) => u.path !== "/")
const find = (slug: string[]) => stubs.find((u) => u.path === `/${slug.join("/")}/`)

export function generateStaticParams() {
  return stubs.map((u) => ({ slug: u.path.split("/").filter(Boolean) }))
}

export async function generateMetadata({ params }: PageProps<"/[...slug]">): Promise<Metadata> {
  const page = find((await params).slug)
  return page ? { title: `${page.title} | Selah Coffee`, robots: { index: false, follow: true } } : {}
}

export default async function LegacyStub({ params }: PageProps<"/[...slug]">) {
  const page = find((await params).slug)
  if (!page) notFound()

  return (
    <>
      <SiteHeader />
      <main className="px-4 py-16 lg:px-6 lg:py-24">
        <p className="text-ui text-ink-muted">{page.path}</p>
        <h1 className="mt-4 max-w-[18ch] font-serif text-display text-balance">{page.title}</h1>
        <p className="mt-6 max-w-[34rem] text-body">
          This address is kept from the current site. The page itself is rebuilt after the homepage.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm underline underline-offset-4">
          Back to the homepage
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
