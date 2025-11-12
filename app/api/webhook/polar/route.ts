import { verifyWebhookSignature } from "@/service/polar.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
  const verificationResponse = await verifyWebhookSignature(request)

  if(verificationResponse.error){
    return NextResponse.json({ error: verificationResponse.error }, { status: verificationResponse.status })
  }

  const jsonReq = await request.json()

  const { type, data } = jsonReq
  const { email } = data.customer

  if(type==="checkout.updated"){ 
    // When status is succeeded it means that a new subscription has been created for that customer email
    const { status } = data

    if(data.status==="succeeded"){

    }
  }

  if(type==="order.paid"){
    // Indicated a transaction that waas made add it to the transactions table

  }

  if(type==="subscription.canceled"){
    // Means a subscription was ended...take the user with the email back to free plan

  }

  return NextResponse.json(null, { status: 200 })
}