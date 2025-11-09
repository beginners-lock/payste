import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

export default function GoogleButton(){
  return(
    <Button
      type="button"
      variant="outline"
      className="w-full gap-2 border-border/50 bg-input/30 hover:bg-input/50"
    >
      <Chrome className="h-4 w-4" />
      Continue with Google
    </Button>
  )
}