"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useEffect, useId, useState } from "react"
import { CheckCircle2, Zap, Clock, Lock, TrendingUp, Code2 } from "lucide-react"

export default function UpgradePage() {
  const [showConfetti, setShowConfetti] = useState(true)

  const [randoms] = useState(() => ([...Array(60)].map((_, i) => [Math.random(), Math.random(), Math.random()])));

  useEffect(() => {
    console.log(randoms)
    // Trigger confetti animation for 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const proFeatures = [
    {
      icon: Zap,
      title: "Unlimited Pastes",
      description: "Create as many pastes as you need",
    },
    {
      icon: Clock,
      title: "7-Day Expiry",
      description: "Longer retention time for your pastes",
    },
    {
      icon: Lock,
      title: "Password Protection",
      description: "Secure your pastes with passwords",
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Track views and engagement",
    },
    {
      icon: Code2,
      title: "API Access",
      description: "Integrate Payste into your apps",
    },
    {
      icon: Zap,
      title: "Custom Expiry",
      description: "Set personalized expiration times",
    },
  ]

  return (
    <div className="flex-1 p-6 md:p-8">
      {/* Confetti background */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {randoms.map((num, i) => (
            <div
              key={i}
              className="animate-bounce absolute w-2 h-2 rounded-full"
              style={{
                left: `${num[0] * 100}%`,
                top: `-10px`,
                backgroundColor: i % 2 === 0 ? "var(--secondary)" : "var(--primary)",
                animation: `fall ${2 + num[1] * 1}s linear forwards`,
                animationDelay: `${num[2] * 0.3}s`,
              }}
            />
          ))}
          <style>{`
            @keyframes fall {
              to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      {/* Success Content */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl" />
              <div className="relative bg-secondary/10 border border-secondary/20 rounded-full p-4">
                <CheckCircle2 className="h-12 w-12 text-secondary" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Welcome to Payste Pro!</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Your upgrade is complete. Let&apos;s explore what you can now do.
            </p>
          </div>
        </div>

        {/* Success Card */}
        <Card className="border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-secondary">Upgrade Successful</CardTitle>
            <CardDescription>Your Pro plan is now active</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="text-lg font-semibold text-foreground">Pro</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Billing</p>
                <p className="text-lg font-semibold text-foreground">$1/month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pro Features Grid */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Your New Pro Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card key={idx} className="hover:border-primary/50 hover:shadow-md transition-all">
                  <CardContent>
                    <div className="flex gap-3">
                      <Icon className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
