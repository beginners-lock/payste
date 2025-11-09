import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Developer",
      content: "Payste is the simplest way to share code snippets securely. Love the auto-expiry feature.",
      rating: 5,
    },
    {
      name: "Maria Santos",
      role: "Security Analyst",
      content: "Finally, a pastebin that takes privacy seriously. No logs, no tracking. Exactly what we need.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Startup Founder",
      content: "Clean interface, reliable service. We use Payste for all sensitive internal communications.",
      rating: 5,
    },
  ]

  return (
    <section className="border-b border-border/50 bg-card/50 py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Trusted by users worldwide</h2>
          <p className="text-lg text-muted-foreground">See what people are saying about Payste</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="rounded-xl border border-border/50 bg-background p-8">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
