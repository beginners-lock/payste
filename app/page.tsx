import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/howItWorks"
import { PricingComparison } from "@/components/landing/pricingComparison"
import { Security } from "@/components/landing/security"
import { DashboardPreview } from "@/components/landing/dashboardPreview"
import { Testimonials } from "@/components/landing/testimonials"
import { FinalCTA } from "@/components/landing/finalCta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <PricingComparison />
      <Security />
      <DashboardPreview />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
