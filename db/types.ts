import { payste, user } from "./schema";

export type User = typeof user.$inferSelect;
export type Payste = typeof payste.$inferSelect;