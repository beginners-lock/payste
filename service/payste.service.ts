"use server"

import { db } from "@/db/drizzle";
import { payste, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { PROCESSING_ERROR, SESSION_NOT_FOUND, USER_NOT_FOUND } from "@/utils/messages";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { getUserPlan } from "./user-auth.service";

// Helper function to get authenticated user session
async function getAuthenticatedUser() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session || !session.user.id) throw new Error(SESSION_NOT_FOUND)

  return session.user
}

export async function getUserPaystes(){
   try{
     const user = await getAuthenticatedUser()
     const response = await db.select().from(payste).where(eq(payste.userId, user.id))
     return response
   }catch(e){
     console.log(`An error occured in getUserPaystes:\n${e}`)
     const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
     throw new Error(message)
   }
 }

export async function createUserPayste(title: string | undefined, content: string){
	try{
		const user = await getAuthenticatedUser()

		// Get user plan to determine expiry
		const userPlan = await getUserPlan(user.id)
		const expiryHours = userPlan === 'pro' ? 7 * 24 : 24 // 7 days for pro, 24 hours for free
		const expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000)

		const newPayste = await db.insert(payste).values({
			id: crypto.randomUUID(), title: title || "Untitle Payste", 
      content, userId: user.id, expiresAt
		}).returning({ id: payste.id })

		return { success: true, message: "Payste created successfully", data: { paysteId: newPayste[0].id } }
	}catch(e){
		console.log(`An error occured in createUserPayste:\n${e}`)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
		return { success: false, message, data: null }
	}
}

export async function getUserPayste(id: string){
	try{
		const user = await getAuthenticatedUser()

		const response = await db.select().from(payste).where(eq(payste.id, id)).limit(1)

		if(response.length === 0){
			throw new Error("Payste not found")
		}

		// Check if the payste belongs to the current user
		if(response[0].userId !== user.id){
			throw new Error("Unauthorized access to payste")
		}

		// Check user plan and expiry
		const userPlan = await getUserPlan(user.id)
		const now = new Date()
		const expired = response[0].expiresAt < now

		if(expired){
			const gracePeriodMs = userPlan === 'pro' ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
			const expiredPastGrace = now.getTime() - response[0].expiresAt.getTime() > gracePeriodMs
			if(expiredPastGrace){
				throw new Error("Payste has expired")
			}
		}

		return response[0]
	}catch(e){
		console.log(`An error occured in getUserPayste:\n${e}`)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
		throw new Error(message)
	}
}

export async function deleteUserPayste(id: string){
	try{
		const user = await getAuthenticatedUser()

		// First check if the payste exists and belongs to the user
		const existingPayste = await db.select().from(payste).where(eq(payste.id, id)).limit(1)

		if(existingPayste.length === 0){
			throw new Error("Payste not found")
		}

		if(existingPayste[0].userId !== user.id){
			throw new Error("Unauthorized access to payste")
		}

		await db.delete(payste).where(eq(payste.id, id))

		return { success: true, message: "Payste deleted successfully", data: null }
	}catch(e){
		console.log(`An error occured in deleteUserPayste:\n${e}`)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
		return { success: false, message, data: null }
	}
}

export async function getPaysteById(paysteId: string){
	try{
		const user = await getAuthenticatedUser()

		const response = await db.select().from(payste).where(eq(payste.id, paysteId)).limit(1)

		if(response.length === 0){
			throw new Error("Payste not found")
		}

		// Check if the payste belongs to the current user
		if(response[0].userId !== user.id){
			throw new Error("Unauthorized access to payste")
		}

		return response[0]
	}catch(e){
		console.log(`An error occured in getPaysteById:\n${e}`)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
		throw new Error(message)
	}
}

export async function updateUserPayste(id: string, title?: string, content?: string){
	try{
		const user = await getAuthenticatedUser()

		// First check if the payste exists and belongs to the user
		const existingPayste = await db.select().from(payste).where(eq(payste.id, id)).limit(1)

		if(existingPayste.length === 0){
			throw new Error("Payste not found")
		}

		if(existingPayste[0].userId !== user.id){
			throw new Error("Unauthorized access to payste")
		}

		// Prepare update data
		const updateData: { title?: string; content?: string } = {}
		if(title !== undefined) updateData.title = title || "Untitled Payste"
		if(content !== undefined) updateData.content = content

		// Only update if there's something to update
		if(Object.keys(updateData).length === 0){
			throw new Error("No valid fields to update")
		}

		const updatedPayste = await db.update(payste)
			.set(updateData)
			.where(eq(payste.id, id))
			.returning({ id: payste.id })

		return { success: true, message: "Payste updated successfully", data: { paysteId: updatedPayste[0].id } }
	}catch(e){
		console.log(`An error occured in updateUserPayste:\n${e}`)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
		return { success: false, message, data: null }
	}
}