"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SignupForm(){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  return(
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">
            First name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">
            Last name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

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
        Sign Up
      </Button>
    </form>
  )
}