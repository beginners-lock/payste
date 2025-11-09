import { Button } from "@/components/ui/button"
import { LOGIN_PAGE, SIGNUP_PAGE } from "@/utils/routes"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">Payste</span>
          </div>
          <nav className="hidden gap-8 md:flex">
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition">
              How it works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </a>
            <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition">
              Security
            </a>
          </nav>
          <div className="flex gap-3">
            <Link href={LOGIN_PAGE}>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>

            <Link href={SIGNUP_PAGE}>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Try Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
