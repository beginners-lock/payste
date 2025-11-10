import Link from "next/link"
import { Lock } from "lucide-react"
import LoginForm from "@/components/login/loginForm"
import GoogleButton from "@/components/auth/googleButton"
import { SIGNUP_PAGE } from "@/utils/routes"

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">Payste</span>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Welcome back to Payste</h1>
            <p className="text-muted-foreground">Log in to continue sharing and managing your pastes.</p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Google Sign In */}
          <GoogleButton />

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href={SIGNUP_PAGE} className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Illustration/Accent */}
      <div className="hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 md:flex md:flex-col md:items-center md:justify-center">
        <div className="space-y-6 px-8 text-center">
          <div className="flex justify-center">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute inset-0 -z-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute inset-12 -z-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

              {/* Lock icon */}
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <Lock className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Your pastes are safe with us</h2>
            <p className="text-muted-foreground">Anonymous, encrypted, and automatically deleted after expiration</p>
          </div>
        </div>
      </div>
    </div>
  )
}
