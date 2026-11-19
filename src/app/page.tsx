import { AboutSection } from "@/components/home/about-section"
import { BarSection } from "@/components/home/bar-section"
import { ClientsSection } from "@/components/home/clients-section"
import { CustomCoffeeCarts } from "@/components/home/custom-coffee-carts"
import { GallerySection } from "@/components/home/gallery-section"
import { Hero } from "@/components/home/hero"
import { QuickAnswersSection } from "@/components/home/quick-answers-section"
import { QuoteSection } from "@/components/home/quote-section"
import { ReviewsSection } from "@/components/home/reviews-section"
import { ServeSection } from "@/components/home/serve-section"
import { ServicesSection } from "@/components/home/services-section"
import { StatementSection } from "@/components/home/statement-section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { StickyQuoteBar } from "@/components/site/sticky-quote-bar"

// Homepage in the live site's heading order, except the booking block (H2 "Let's book your Coffee Cart
// Experience!"), which moves up to section 3 so the form sits high on the page (LE playbook).
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ClientsSection />
        <QuoteSection />
        <CustomCoffeeCarts />
        <ServicesSection />
        <StatementSection />
        <ReviewsSection />
        <BarSection />
        <GallerySection />
        <ServeSection />
        <AboutSection />
        <QuickAnswersSection />
      </main>
      <SiteFooter />
      <StickyQuoteBar />
    </>
  )
}
