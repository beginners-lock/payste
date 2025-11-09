export function DashboardPreview() {
  return (
    <section className="border-b border-border/50 bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Dashboard Preview</h2>
            <p className="text-lg text-muted-foreground">Manage your pastes with ease</p>
          </div>

          <div className="rounded-xl border border-border/50 bg-card shadow-xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/50 bg-card/50 p-4">
              <div className="h-3 w-3 rounded-full bg-red-500/50" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <div className="h-3 w-3 rounded-full bg-green-500/50" />
              <span className="ml-auto text-xs text-muted-foreground">Payste Dashboard</span>
            </div>

            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Your Pastes</h3>
                  <p className="text-sm text-muted-foreground">3 active pastes</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">
                  New Paste
                </button>
              </div>

              {/* Paste items */}
              <div className="space-y-3">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border/50 bg-background p-4 flex items-center justify-between hover:border-primary/30 transition"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Paste {idx + 1}</p>
                      <p className="text-xs text-muted-foreground">Expires in {24 - idx * 2} hours</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs border border-border/50 rounded text-muted-foreground hover:text-foreground transition">
                        Copy
                      </button>
                      <button className="px-3 py-1 text-xs border border-destructive/30 text-destructive rounded hover:bg-destructive/10 transition">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
