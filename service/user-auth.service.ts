"use server"

import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth"; //import the auth client
import { PROCESSING_ERROR, USER_NOT_FOUND } from "@/utils/messages";
import { headers } from "next/headers";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function userEmailSignup(name: string, email: string, password: string){
	try{
		await auth.api.signUpEmail({
			body: {
				email, password, name,
				callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email only if email verification is enabled (optional)
			}
		})

		return { success: true }
	}catch(e){
		console.log(`An error occured in userEmailSignup:\n${e}`)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
		return { success: false, message }
	}
}

export async function userEmailSignin(email: string, password: string, rememberMe: boolean){
	try{
		await auth.api.signInEmail({
			body: {
				email, password, rememberMe
			}
		})

		return { success: true }
	}catch(e){
		console.log(`An error occured in userEmailSignin:\n${e}`)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
		return { success: false, message }
	}
}

export async function userSignOut(){
	try{
		await auth.api.signOut({
			headers: await headers()
		})

		return { success: true }
	}catch(e){
		console.log(`An error occured in userSignOut:\n${e}`)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR
		return { success: false, message }
	}
}

export async function getUserPlan(userId: string){
	const data = await db.select({ plan: user.plan }).from(user).where(eq(user.id, userId)).limit(1)
	
	if(data.length===0){
		throw new Error(USER_NOT_FOUND)
	}

	return data[0].plan
}