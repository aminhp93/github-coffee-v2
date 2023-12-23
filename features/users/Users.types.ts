import { z } from "zod";

const MeResponseDataSchema = z.object({
  id: z.string(),
  controllerId: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  isActive: z.boolean(),
  isAdmin: z.boolean(),
  loginNerverExpires: z.boolean(),
  inactivityTimeout: z.number(),
  created: z.string(),
  updated: z.string(),
});

const UserSchema = MeResponseDataSchema.pick({
  id: true,
  username: true,
  name: true,
  email: true,
  phone: true,
  isActive: true,
  isAdmin: true,
});

export type MeResponseData = z.infer<typeof MeResponseDataSchema>;
export type User = z.infer<typeof UserSchema>;
