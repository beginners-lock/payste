import { DASHBOARD_PAGE } from "@/utils/routes";
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient()

export const googleSignin = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: DASHBOARD_PAGE
  });
};