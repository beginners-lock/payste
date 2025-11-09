import { Copy, Eye, Share2 } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Copy,
      title: "Paste",
      description: "Paste your text anonymously. No account needed for free pastes.",
    },
    {
      icon: Eye,
      title: "Set Visibility",
      description: "Choose between public, unlisted, or private access with optional password protection.",
    },
    {
      icon: Share2,
      title: "Share Link",
      description: "Get an instant link. Your paste auto-deletes after expiry—no trace remains.",
    },
  ]

  return (
    <section id="how" className="border-b border-border/50 bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">How it works</h2>
          <p className="text-lg text-muted-foreground">Three simple steps to share securely</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative group">
                <div className="rounded-xl border border-border/50 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
