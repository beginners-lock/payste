"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Props {
  content: string
}

export default function ButtonsPane({ content }: Props){
  const [isEditing, setIsEditing] = useState(false)

  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    toast.success('Content copied to clipboard')
  }

  return(
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={handleCopy} title="Copy to clipboard">
        <Copy className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
        <Edit className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="icon" className="text-destructive bg-transparent">
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  )
}