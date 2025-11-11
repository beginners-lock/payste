"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: ErrorPageProps) {
  const router = useRouter()

  const handleReload = () => {
    reset()
    router.refresh()
  }

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-destructive/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-destructive/10 p-3">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl text-destructive">Something went wrong</CardTitle>
            <CardDescription className="text-base">
              We encountered an error while loading your dashboard. This might be a temporary issue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Error Details:</p>
              <p className="text-sm text-muted-foreground font-mono break-all">
                {error.message || "An unexpected error occurred"}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleReload} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                If this problem persists, please contact support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}