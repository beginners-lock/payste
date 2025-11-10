"use server"

import { auth } from "@/lib/auth"; //import the auth client
import { PROCESSING_ERROR } from "@/utils/messages";

export async function UserEmailSignup(name: string, email: string, password: string){
	try{
		await auth.api.signUpEmail({
			body: {
				email, password, name,
				callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email only if email verification is enabled (optional)
			}
		})
		
		return { success: true }
	}catch(e){
		console.log(e)
		const message = e instanceof Error ? e.message.length<100 ? e.message : PROCESSING_ERROR : PROCESSING_ERROR 
		return { success: false, message }
	}
}