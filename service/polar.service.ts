"use server"

import { auth } from "@/lib/auth";
import { PAYSTE_PRO_PRICE_ID } from "@/utils/constants";
import { PROCESSING_ERROR } from "@/utils/messages";
import { headers } from "next/headers";

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