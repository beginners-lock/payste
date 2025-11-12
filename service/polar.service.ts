"use server"

import { auth } from "@/lib/auth";
import { PAYSTE_PRO_PRICE_ID } from "@/utils/constants";
import { PROCESSING_ERROR } from "@/utils/messages";
import { createHmac, timingSafeEqual } from "crypto";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { user, payments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createPolarProCheckout(){
  try{
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user.id) throw new Error("Unauthorized payment attempt");

    const res = await fetch("https://sandbox-api.polar.sh/v1/checkouts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.POLAR_SBX_TOKEN}`, // ← Organization Access Token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_price_id: PAYSTE_PRO_PRICE_ID, // ← This is your recurring price ID (monthly or yearly)
        customer_email: session.user.email,
        customer_name: session.user.name ?? undefined,
        success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/upgrade`,
        // Optional: metadata to know which user upgraded
        metadata: {
          user_id: session.user.id,
        },
      }),
    });

    console.log(res)
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Failed to create Polar checkout");
    }

    const data = await res.json();
    return { success: true, message: "Checkout link generated", data: data.url as string }
  }catch(e){
    console.log(`An error occured in createPolarProCheckout:\n${e}`)
    const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
    return { success: false, message }
  }
}

export async function verifyWebhookSignature(req: NextRequest){
  const body = await req.text(); // Raw body
  const signature = req.headers.get("webhook-signature");
  const timestamp = req.headers.get("webhook-timestamp");
  const webhookId = req.headers.get("webhook-id");

  if (!signature || !timestamp || !webhookId) {
    return { error: "Missing headers", status: 400 };
  }

  const secret = Buffer.from(process.env.POLAR_WEBHOOK_SECRET || "").toString("base64");
  const payload = `${webhookId}.${timestamp}.${body}`;

  // Compute expected signature
  const expectedSig = createHmac("sha256", secret)
    .update(payload)
    .digest("base64");

  // Polar sends: "t=12345,v1=abc123" – extract v1
  const sigParts = signature.split(",");
  const receivedSig = sigParts.find(part => part.startsWith("v1="))?.split("=")[1];

  if (!receivedSig || !timingSafeEqual(Buffer.from(expectedSig), Buffer.from(receivedSig))) {
    console.error("Signature mismatch – dropping event");
    return { error: "Invalid signature",  status: 403 };
  }

  return { error: undefined, status: 200 }
}

export async function upgradeUserToPro(email: string){
   try{
     // Find user by email
     const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1)

     if(existingUser.length === 0){
       throw new Error("User not found")
     }

     // Update user plan to pro
     await db.update(user)
       .set({ plan: 'pro' })
       .where(eq(user.email, email))

     return { success: true, message: "User upgraded to Pro plan successfully" }
   }catch(e){
     console.log(`An error occured in upgradeUserToPro:\n${e}`)
     const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
     return { success: false, message }
   }
 }

export async function downgradeUserToFree(email: string){
   try{
     // Find user by email
     const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1)

     if(existingUser.length === 0){
       throw new Error("User not found")
     }

     // Update user plan to free
     await db.update(user)
       .set({ plan: 'free' })
       .where(eq(user.email, email))

     return { success: true, message: "User downgraded to Free plan successfully" }
   }catch(e){
     console.log(`An error occured in downgradeUserToFree:\n${e}`)
     const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
     return { success: false, message }
   }
 }

export async function createPaymentRecord(email: string, orderId: string, currency: string, amount: number, paidAt: Date){
   try{
     // Check if payment record already exists to prevent duplicates
     const existingPayment = await db.select().from(payments).where(eq(payments.orderId, orderId)).limit(1)

     if(existingPayment.length > 0){
       throw new Error("Payment record already exists")
     }

     // Create payment record
     await db.insert(payments).values({
       email, orderId, currency: currency, amount, paidAt
     })

     return { success: true, message: "Payment record created successfully" }
   }catch(e){
     console.log(`An error occured in createPaymentRecord:\n${e}`)
     const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
     return { success: false, message }
   }
 }

 export async function unsubscribeFromPro(email: string){
  
 }