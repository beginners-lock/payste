import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PasteCard } from "@/components/dashboard/pasteCard"
import Link from "next/link"
import { Plus } from "lucide-react"
import { getUserPaystes } from "@/service/payste.service"

export default async function DashboardPage() {
  const paystes = await getUserPaystes()

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
      {paystes.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {paystes.map((paste) => (
            <PasteCard key={paste.id} paste={paste} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 font-medium">No pastes yet</p>
            <Link href="/dashboard/create">
              <Button>Create your first paste</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
