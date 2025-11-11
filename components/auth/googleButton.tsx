"use client"

import { Button } from "@/components/ui/button"
import { googleSignin } from "@/lib/auth-client"
import { Chrome } from "lucide-react"
import { useState } from "react"
import { Spinner } from "../ui/spinner"

export default function GoogleButton(){
  const [loading, setLoading] = useState(false)

  const signinWithGoogle = async () => {
    setLoading(true)
    await googleSignin()
    setLoading(false)
  }

  return(
    <Button type="button" variant="outline" onClick={signinWithGoogle}
      className="w-full gap-2 border-border/50 bg-input/30"
    >
      {
        loading ?
          <Spinner/>
        : <>
            <Chrome className="h-4 w-4" />
            Continue with Google
          </>
      }
    </Button>
  )
}