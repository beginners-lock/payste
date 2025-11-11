"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Paste {
  id: string
  title: string
  content: string
  createdAt: string
  expiryAt: string
  isPro: boolean
}

export function PasteCard({ paste }: { paste: Paste }) {
  return (
    <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
      <CardHeader>
        <Link href={`/dashboard/paste/${paste.id}`}>
          <CardTitle className="hover:text-primary transition-colors">{paste.title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">{paste.content}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metadata */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">Created</p>
            <p>{paste.createdAt}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Expires</p>
            <p>{paste.expiryAt}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
            onClick={() => console.log("[v0] Edit paste")}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-destructive hover:text-destructive bg-transparent"
            onClick={() => console.log("[v0] Delete paste")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
