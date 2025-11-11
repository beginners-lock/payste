"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { createUserPayste } from "@/service/payste.service"
import { useRouter } from "next/navigation"
import { PAYSTE_PAGE } from "@/utils/routes"
import { Spinner } from "@/components/ui/spinner"

const createPasteSchema = z.object({
  title: z.string().optional(),
  content: z.string().nonempty("Content is required").min(10, "Com'on make it at least 10 characters").max(10000, "Content must be less than 10,000 characters"),
})

type CreatePasteSchemaType = z.infer<typeof createPasteSchema>

export default function CreatePastePage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreatePasteSchemaType>({
    resolver: zodResolver(createPasteSchema),
  })

  const onSubmit = handleSubmit(async ({ title, content }) => {
    const response = await createUserPayste(title, content)

    if(!response.success){
      toast.error(response.message)
    }else{
      router.push(`${PAYSTE_PAGE}/${response.data!.paysteId}`)
      toast.success("Payste created successfully!")
      reset()
    }
  })

  return (
    <div className="flex-1 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create Paste</h1>
        <p className="text-muted-foreground mt-1">Share your text securely and anonymously</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Paste</CardTitle>
          <CardDescription>Free pastes expire in 24 hours. Pro pastes expire in 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Paste Title (Optional)</Label>
            <Input
              id="title"
              placeholder="Give your paste a title..."
              {...register("title")}
              className="bg-input border-border"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Paste Content</Label>
            <Textarea
              id="content"
              placeholder="Paste your content here..."
              {...register("content")}
              className="min-h-96 text-sm bg-input border-border resize-none"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>

          {/* Info */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
            <p className="text-sm text-foreground font-semibold">Plan Information</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Free: 24-hour expiry, 5 pastes per day</li>
              <li>✓ Pro: 7-day expiry, unlimited pastes ($1/month)</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting ? <Spinner/> : "Create Paste"}
            </Button>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Cancel
            </Button>
          </div>
        </form>
        </CardContent>
      </Card>
    </div>
  )
}
