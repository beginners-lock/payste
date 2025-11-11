import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditPaysteLoading() {
  return (
    <div className="flex-1 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-9 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-96 w-full" />
          </div>

          {/* Info */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}