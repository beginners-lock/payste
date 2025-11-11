"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function CreatePastePage() {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  const handleCreate = () => {
    console.log("[v0] Creating paste with content:", { title, content })
  }

  return (
    <div className="flex-1 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create Paste</h1>
        <p className="text-muted-foreground mt-1">Share your text securely and anonymously</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Paste</CardTitle>
          <CardDescription>Free pastes expire in 24 hours. Pro pastes expire in 7 days.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Paste Title (Optional)</Label>
            <Input
              id="title"
              placeholder="Give your paste a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Paste Content</Label>
            <Textarea
              id="content"
              placeholder="Paste your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-96 font-mono text-sm bg-input border-border resize-none"
            />
          </div>

          {/* Info */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
            <p className="text-sm text-foreground font-semibold">Plan Information</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Free: 24-hour expiry, 5 pastes per day</li>
              <li>✓ Pro: 7-day expiry, unlimited pastes ($1/month)</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/90" onClick={handleCreate}>
              Create Paste
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
