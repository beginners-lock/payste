"use server"

import { db } from "@/db/drizzle";
import { payste } from "@/db/schema";
import { auth } from "@/lib/auth";
import { PROCESSING_ERROR, SESSION_NOT_FOUND } from "@/utils/messages";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getUserPaystes(){
  try{
    const data = await auth.api.getSession({
      headers: await headers()
    })

    if(!data || !data.user.id) throw new Error(SESSION_NOT_FOUND)

    const response = await db.select().from(payste).where(eq(payste.userId, data.user.id))
    return response
  }catch(e){
    console.log(`An error occured in getUserPaystes:\n${e}`)
    const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
    throw new Error(message)
  }
}