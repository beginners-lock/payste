import { customType } from "drizzle-orm/pg-core";

export const planEnum = customType<{
  data: 'free' | 'pro';
  driverData: 'free' | 'pro';
}>({
  dataType() { return 'plan_type'; },
  toDriver: (v) => v,
  fromDriver: (v) => v,
});