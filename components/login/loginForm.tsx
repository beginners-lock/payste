"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return(
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        Login
      </Button>
    </form>
  )
}