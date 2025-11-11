"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { UserSignOut } from "@/service/user-auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LOGIN_PAGE } from "@/utils/routes";

export default function SignoutButton(){
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const signout = async () => {
    setLoading(true);
    const response = await UserSignOut()

    if(response.success){
      toast.success('User signout successful')
      router.push(LOGIN_PAGE)
    }else{
      toast.error(response.message)
    }

    setLoading(false);
  }

  return(
    <Button onClick={signout} className="mt-4">
      {
        loading ?
          <Spinner/>
        : 'Signout'
      }
    </Button>
  )
}