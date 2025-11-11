import "better-auth";

declare module "better-auth" {
  interface User {
    plan: "free" | "pro";
    // add any other custom fields here later
  }

  interface Session {
    user: User;
  }
}