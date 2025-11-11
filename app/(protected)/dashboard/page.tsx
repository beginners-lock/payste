import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PasteCard } from "@/components/dashboard/pasteCard"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function DashboardPage() {
  // Mock data - in real app, fetch from database
  const pastes = [
    {
      id: "1",
      title: "Hello World Script",
      content: "console.log('Hello World')...",
      createdAt: "2025-11-09",
      expiryAt: "2025-11-10",
      isPro: false,
    },
    {
      id: "2",
      title: "Database Query",
      content: "SELECT * FROM users WHERE...",
      createdAt: "2025-11-08",
      expiryAt: "2025-11-15",
      isPro: true,
    },
  ]

  return (
    <div className="flex-1 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage all your pastes</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="gap-2">
            <Plus className="h-5 w-5" />
            Create New Paste
          </Button>
        </Link>
      </div>

      {/* Pastes grid */}
      {pastes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pastes.map((paste) => (
            <PasteCard key={paste.id} paste={paste} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No pastes yet</p>
            <Link href="/dashboard/create">
              <Button>Create your first paste</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
