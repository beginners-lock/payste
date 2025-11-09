import { Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          <div>
            <p className="font-bold text-foreground mb-4">Payste</p>
            <p className="text-sm text-muted-foreground">Share text securely with automatic expiry.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-4 text-sm">Product</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-4 text-sm">Legal</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-4 text-sm">Connect</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Payste. All rights reserved. Built for privacy.
          </p>
        </div>
      </div>
    </footer>
  )
}
