import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="flex-1 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-9 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Pastes grid skeleton */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="col-span-1">
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3 mb-4" />

              {/* Metadata skeleton */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div>
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>

              {/* Actions skeleton */}
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}