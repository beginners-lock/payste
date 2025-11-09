import { Button } from "@/components/ui/button"
import { LOGIN_PAGE, SIGNUP_PAGE } from "@/utils/routes"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-background via-background to-background/80 py-20 sm:py-32">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#3B82F6_1px,transparent_1px),linear-gradient(to_bottom,#3B82F6_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                ✨ Secure & Anonymous
              </div>
              <h1 className="text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Share text{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">&ldquo;securely.&rdquo;</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Create anonymous pastes that automatically expire. Keep your data private with automatic deletion, no
                data retention.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={SIGNUP_PAGE}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try Free
                </Button>
              </Link>

              <Link href={LOGIN_PAGE}>
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Free: 24-hour expiry</p>
              <p>✓ Pro: 7-day expiry + unlimited pastes ($1/month)</p>
            </div>
          </div>

          {/* Paste editor mockup */}
          <div className="relative">
            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-2xl">
              <div className="space-y-2 mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-auto text-xs text-muted-foreground">payste</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="text-primary">{"{"}</div>
                <div className="ml-4 text-muted-foreground">
                  <span className="text-accent">&quot;message&quot;</span>: &quot;Your secret here&quot;
                </div>
                <div className="ml-4 text-muted-foreground">
                  <span className="text-accent">&quot;expiry&quot;</span>: &quot;24 hours&quot;
                </div>
                <div className="ml-4 text-muted-foreground">
                  <span className="text-accent">&quot;visibility&quot;</span>: &quot;anonymous&quot;
                </div>
                <div className="text-primary">{"}"}</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
