import { Lock, Trash2, Eye } from "lucide-react"

export function Security() {
  const features = [
    {
      icon: Lock,
      title: "Private Key Access",
      description: "Your data is encrypted end-to-end. Only people with the link can access your paste.",
    },
    {
      icon: Trash2,
      title: "Automatic Expiry",
      description: "Pastes automatically delete after your chosen expiry time. No manual cleanup needed.",
    },
    {
      icon: Eye,
      title: "No Data Retention",
      description: "We never store logs or analytics about your pastes. Your privacy is paramount.",
    },
  ]

  return (
    <section id="security" className="border-b border-border/50 bg-card/50 py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Security & Privacy</h2>
          <p className="text-lg text-muted-foreground">Your data, your rules</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="rounded-xl border border-border/50 bg-background p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
