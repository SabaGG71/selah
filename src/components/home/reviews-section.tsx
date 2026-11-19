import { ReviewsSlider } from "@/components/home/reviews-slider"
import { reviews } from "@/lib/reviews"
import { site } from "@/lib/site"

// Section 7, the live site's "What people are saying about our coffee catering experience" (colon dropped).
// Proof as a plain object (lookbook: the review count as a plain sentence; playbook: lead with the
// strongest true claim): the review count large in serif, the widget's "Excellent" in words. No stars,
// no avatars, no logo, nothing links off the page.
export function ReviewsSection() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-rule bg-paper">
      <div className="px-(--gutter) pt-10 pb-8 lg:grid lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-20 lg:pb-10">
        <div className="lg:col-span-8">
          <p className="text-ui text-ink-muted">Reviews</p>
          <h2
            id="reviews-title"
            className="mt-3 font-serif text-[clamp(2rem,1.1rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            What people are saying <span className="text-ink-muted">about our coffee catering experience</span>
          </h2>
        </div>
        <div className="mt-6 flex items-baseline gap-4 lg:col-span-4 lg:mt-0 lg:flex-col lg:items-end lg:gap-1 lg:justify-self-end lg:text-right">
          <p className="font-serif text-[3rem] leading-none tracking-[-0.02em] lg:text-[4.5rem]">{site.reviews.count}</p>
          <p className="text-ui text-ink-soft">
            reviews on {site.reviews.source}, rated {site.reviews.label}
          </p>
        </div>
      </div>
      <div className="pb-12 lg:pb-20">
        <ReviewsSlider reviews={reviews} />
      </div>
    </section>
  )
}
