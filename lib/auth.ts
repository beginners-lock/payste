import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '@/db/drizzle'
import { nextCookies } from "better-auth/next-js";
import * as schema from '@/db/schema'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: { 
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },
  database: drizzleAdapter(db, {
    schema,
    provider: "pg", // or "mysql", "sqlite"
  }),
  plugins: [nextCookies()]
});