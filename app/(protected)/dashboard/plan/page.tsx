"use client"

import { queryClient } from "@/components/shared/providers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useUserPlan } from "@/hooks/useUserPlan"
import { authClient } from "@/lib/auth-client"
import { createPolarProCheckout, unsubscribeFromPro } from "@/service/polar.service"
import { USER_PLAN } from "@/utils/keys"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function PlanPage() {
  const { data } = authClient.useSession()
  const router = useRouter()
  const { plan, pending } = useUserPlan(data?.user.id)
  const [loading, setLoading] = useState(false)

  const features = [
    { name: "Paste limit", free: "5/day", pro: "Unlimited" },
    { name: "Expiry time", free: "24 hours", pro: "7 days" },
    { name: "Password protection", free: false, pro: true },
    { name: "Custom expiry time", free: false, pro: true },
    { name: "Analytics", free: false, pro: true },
    { name: "API access", free: false, pro: true },
  ]

  const subscribeToProPlan = async () => {
    setLoading(true)
    const response = await createPolarProCheckout()

    if(response.success && response.data){
      toast.success(response.message)
      router.push(response.data)
    }else{
      toast.error(response.message)
    }

    setLoading(false)
  }

  const unsubscribe = async () => {
    setLoading(true)
    const response = await unsubscribeFromPro()

    if(response.success){
      queryClient.invalidateQueries({ queryKey: [USER_PLAN, data?.user.id] })
      toast.success(response.message)
    }else{
      toast.error(response.message)
    }

    setLoading(false)
  }

  return (
    <div className="flex-1 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">Plans</h1>
        <p className="text-muted-foreground mt-1">Choose the plan that works for you</p>
      </div>

      {/* Plans */}
      <div className="grid gap-6 max-w-5xl mx-auto md:grid-cols-2 mb-8">
        {/* Free Plan */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">$0</div>
              <p className="text-sm text-muted-foreground">No credit card required</p>
            </div>
            <Button variant={`${plan==='pro' ? 'default' : 'outline'}`} className={`${plan==='pro' ? 'w-full bg-secondary hover:bg-secondary/90' : 'w-full bg-transparent'}`} disabled={loading || pending || plan==='free'} onClick={unsubscribe}>
              {
                loading && plan==='pro' ?
                  <Spinner />
                : plan==='pro' ? 'Downgrade to Free' : `You're on this plan` 
              }
            </Button>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-accent" />5 pastes per day
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-accent" />
                24-hour expiry
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-accent" />
                Anonymous sharing
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-accent ring-2 ring-accent/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For power users</CardDescription>
              </div>
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">Popular</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                $1<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">Unlimited everything</p>
            </div>
            <Button disabled={loading || pending || plan==='pro'} onClick={subscribeToProPlan} variant={`${plan==='free' ? 'default' : 'outline'}`} className={`${plan==='free' ? 'w-full bg-secondary hover:bg-secondary/90' : 'w-full bg-transparent'}`}>
              {
                loading && plan==='free' ?
                  <Spinner />
                : plan==='free' ? 'Upgrade to Pro' : `You're on this plan` 
              }
            </Button>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-foreground">
                <Check className="h-4 w-4 text-secondary" />
                Unlimited pastes
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <Check className="h-4 w-4 text-secondary" />
                7-day expiry
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <Check className="h-4 w-4 text-secondary" />
                Password protection
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <Check className="h-4 w-4 text-secondary" />
                Custom expiry time
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <Check className="h-4 w-4 text-secondary" />
                Analytics dashboard
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <Check className="h-4 w-4 text-secondary" />
                API access
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Feature comparison */}
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Free</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-card/50">
                      <td className="px-4 py-3 text-foreground">{feature.name}</td>
                      <td className="px-4 py-3 text-center">
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check className="h-4 w-4 text-accent mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-muted-foreground">{feature.free}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? (
                            <Check className="h-4 w-4 text-accent mx-auto" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
