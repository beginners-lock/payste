import ButtonsPane from "@/components/create/buttonsPane";
import { getUserPayste } from "@/service/payste.service";
import { Geist } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function PasteViewPage({ params }: { params: Promise<{ id: string }> }) {
  const paysteId = (await params).id

  const payste = await getUserPayste(paysteId)

  return (
    <div className="flex-1 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{payste.title}</h1>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>Created: {payste.createdAt.toLocaleString()}</span>
            <span>Expires: {payste.expiresAt.toLocaleString()}</span>
          </div>
        </div>
        <ButtonsPane
          content={payste.content}
        />
      </div>

      {/* Paste content */}
      <pre className={`${geistSans.className} bg-input p-6 rounded-lg font-mono text-sm text-foreground overflow-x-auto max-h-96`}>
        {payste.content}
      </pre>
    </div>
  )
}
