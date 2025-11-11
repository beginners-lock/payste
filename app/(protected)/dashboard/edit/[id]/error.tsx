"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function EditPaysteError({ error, reset }: ErrorPageProps) {
  const router = useRouter()

  const handleReload = () => {
    reset()
  }

  const handleGoBack = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex-1 p-6 md:p-8 max-w-4xl mx-auto">
      <Card className="border-destructive/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl text-destructive">Unable to Edit Payste</CardTitle>
          <CardDescription className="text-base">
            We couldn&apos;t load the payste for editing. It may not exist or you may not have permission to edit it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2 font-medium">Error Details:</p>
            <p className="text-sm text-muted-foreground font-mono break-all">
              {error.message || "An error occurred while loading the paste for editing"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleReload} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={handleGoBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}