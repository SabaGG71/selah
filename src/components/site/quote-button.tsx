import { ArrowDownIcon } from "lucide-react"
import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

// The one CTA (LE playbook rule 13): same words everywhere, a solid button,
// and it jumps down the same page to the quote form. It never leaves the page.
// The footer passes href="/#quote", so it also works on pages without the form (it opens the homepage form).
export function QuoteButton({
  label = site.quote.label,
  href = site.quote.href,
  className,
  size,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { label?: string; href?: string; size?: "default" | "sm" | "lg" }) {
  return (
    <Button asChild size={size} className={className}>
      <a href={href} {...props}>
        {label}
        <ArrowDownIcon aria-hidden="true" strokeWidth={1.75} />
      </a>
    </Button>
  )
}
