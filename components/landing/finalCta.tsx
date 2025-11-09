import { Button } from "@/components/ui/button"
import { LOGIN_PAGE, SIGNUP_PAGE } from "@/utils/routes"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="border-b border-border/50 bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Ready to share securely?</h2>
          <p className="text-lg text-muted-foreground">Start sharing with confidence. Your privacy matters.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <Link href={SIGNUP_PAGE}>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Free Plan
            </Button>
          </Link>

          <Link href={LOGIN_PAGE}>
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required • Free: 24-hour expiry • Pro: $1/month for 7-day expiry
        </p>
      </div>
    </section>
  )
}
