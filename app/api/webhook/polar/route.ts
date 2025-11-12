import { createPaymentRecord, downgradeUserToFree, updateUserSubscriptionId, upgradeUserToPro, verifyWebhookSignature } from "@/service/polar.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
  const verificationResponse = await verifyWebhookSignature(request)

  if(verificationResponse.error){
    return NextResponse.json({ error: verificationResponse.error }, { status: verificationResponse.status })
  }

  const jsonReq = verificationResponse.data
  console.log(jsonReq)
  const { type, data } = jsonReq

  if(type==="checkout.updated"){ 
    const email = data.customer_email
    // When status is succeeded it means that a new subscription has been created for that customer email
    const { status } = data

    if(status==="succeeded"){
      const response = await upgradeUserToPro(email)

      if(!response.success) throw new Error(response.message)
    }
  }

  if(type==="subscription.created"){
    const email = data.customer.email
    // Indicated a transaction that waas made add it to the transactions table
    const { id } = data
    console.log(`Subscription ID: ${id}`)
    console.log(`Subscription ID: ${data.id}`)

    const response = await updateUserSubscriptionId(email, id)

    if(!response.success) throw new Error(response.message)
  }
  
  if(type==="order.paid"){
    const email = data.customer.email
    // Indicated a transaction that waas made add it to the transactions table
    const { id, subtotal_amount, currency, modified_at } = data
    const dateFormat = new Date(modified_at)

    const response = await createPaymentRecord(email, id, currency, subtotal_amount, dateFormat)

    if(!response.success) throw new Error(response.message)
  }

  if(type==="subscription.canceled"){
    const email = data.customer.email
    // Means a subscription was ended...take the user with the email back to free plan
    const response = await downgradeUserToFree(email)

    if(!response.success) throw new Error(response.message)
  }

  return NextResponse.json(null, { status: 200 })
}