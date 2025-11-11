"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { deleteUserPayste } from "@/service/payste.service"
import { useRouter } from "next/navigation"
import { DASHBOARD_PAGE, EDIT_PAGE } from "@/utils/routes"
import { Spinner } from "../ui/spinner"

interface Props {
  id: string
  content: string
}

export default function ButtonsPane({ id, content }: Props){
  const router = useRouter()

  const [openDialog, setOpenDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)

  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    toast.success('Content copied to clipboard')
  }

  const handleEdit = () => {
    router.push(`${EDIT_PAGE}/${id}`)
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    const response = await deleteUserPayste(id)

    if(!response.success){
      toast.error(response.message)
    }else{
      toast.success('Payste deleted successfully')
      router.push(DASHBOARD_PAGE)
      setOpenDialog(false)
    }
    
    setDeleting(false)
  }

  return(
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={handleCopy} title="Copy to clipboard">
        <Copy className="h-5 w-5" />
      </Button>

      <Button variant="outline" size="icon" onClick={handleEdit}>
        <Edit className="h-5 w-5" />
      </Button>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogTrigger>
          <Button variant="outline" size="icon" className="text-destructive bg-transparent">
            <Trash2 className="h-5 w-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payste</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this payste?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={deleting} className="bg-red-700 hover:bg-red-700/90" onClick={(e)=>{ e.preventDefault(); handleDelete(id); }}>
              {
                deleting ?
                  <Spinner/>
                : 'Delete'
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}