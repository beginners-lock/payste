import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingComparison() {
  const features = [
    { name: "Paste limit", free: "5/day", pro: "Unlimited" },
    { name: "Expiry time", free: "24 hours", pro: "7 days" },
    { name: "Password protection", free: false, pro: true },
    { name: "Custom expiry time", free: false, pro: true },
    { name: "Analytics", free: false, pro: true },
    { name: "API access", free: false, pro: true },
  ]

  return (
    <section id="pricing" className="border-b border-border/50 bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Free vs Pro</h2>
          <p className="text-lg text-muted-foreground">Simple pricing that scales with you</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-4 text-left font-semibold text-foreground">Feature</th>
                <th className="px-4 py-4 text-center font-semibold text-foreground">Free</th>
                <th className="px-4 py-4 text-center font-semibold text-foreground">Pro</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-card/50">
                  <td className="px-4 py-4 text-foreground">{feature.name}</td>
                  <td className="px-4 py-4 text-center">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="h-5 w-5 text-accent mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )
                    ) : (
                      <span className="text-muted-foreground">{feature.free}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <Check className="h-5 w-5 text-accent mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )
                    ) : (
                      <span className="text-foreground font-semibold">{feature.pro}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Go Pro - $1/month
          </Button>
        </div>
      </div>
    </section>
  )
}
