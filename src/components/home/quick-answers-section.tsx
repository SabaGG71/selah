import Link from "next/link"
import { ArrowRightIcon, PlusIcon } from "lucide-react"

// The live site's "Quick Answers Before You Book" block (added there after June 2026, copy from Saba's
// screenshot on 2026-11-18). Answers are word for word; only the dashes became periods or commas
// (LE copy rule: no em dashes). Native <details>, so every answer is real HTML for search, and works
// with no script. FAQPage structured data mirrors the same four answers.

export const quickAnswers = [
  {
    q: "How far in advance should we book?",
    a: "The earlier the better. Popular weekends fill up fast. We recommend reaching out 2-4 weeks ahead, but we can often accommodate shorter timelines, so it never hurts to ask.",
  },
  {
    q: "Is a deposit required to hold our date?",
    a: "Yes, a deposit reserves your date on our calendar, with the balance due around your event. Until the deposit is in, the date stays open to other clients.",
  },
  {
    q: "What areas do you serve?",
    a: "We’re based in Denver and serve the full metro area plus Boulder, Colorado Springs, Vail, Breckenridge, and Aspen. We also travel throughout Colorado and beyond for the right event.",
  },
  {
    q: "Is there a minimum guest count?",
    a: "No strict minimum. We cater events of all sizes, from intimate gatherings to thousands of guests. Your quote is built around your guest count, service hours, and location.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: quickAnswers.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

export function QuickAnswersSection() {
  return (
    <section id="quick-answers" aria-labelledby="quick-answers-title" className="border-t border-rule bg-ground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="px-(--gutter) pt-10 pb-12 lg:grid lg:grid-cols-12 lg:gap-6 lg:pt-20 lg:pb-20">
        <div className="lg:col-span-5">
          <p className="text-ui text-ink-muted">FAQ</p>
          <h2
            id="quick-answers-title"
            className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            Quick Answers Before You Book
          </h2>
          <Link
            href="/faq/"
            className="group/faq mt-6 inline-flex items-center gap-2 text-sm underline decoration-1 underline-offset-4 hover:text-action-hover"
          >
            All questions and answers
            <ArrowRightIcon
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-3.5 transition-transform duration-150 group-hover/faq:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-8 border-t border-rule lg:col-span-7 lg:mt-1">
          {quickAnswers.map(({ q, a }, i) => (
            <details key={q} open={i === 0} className="group/qa border-b border-rule">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-[1.375rem] leading-[1.2] tracking-[-0.01em] lg:text-[1.625rem]">{q}</h3>
                <PlusIcon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-1.5 size-5 shrink-0 text-action transition-transform duration-200 group-open/qa:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-[40rem] pr-10 pb-6 text-body text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
