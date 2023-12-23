import { z } from "zod";
import { User } from "@/features/users/Users.types";

export type ErrCallbackType = () => void;

export type AuthValuesType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (data: LoginRequestData) => Promise<void>;
  logout: () => void;
};

const LoginRequestDataSchema = z.object({
  username: z.string(),
  password: z.string(),
  grant_type: z.string().optional(),
  scope: z.string().optional(),
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
});

const LoginResponseDataSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

const LogoutResponseDataSchema = z.object({
  message: z.string(),
});

export type LoginRequestData = z.infer<typeof LoginRequestDataSchema>;
export type LoginResponseData = z.infer<typeof LoginResponseDataSchema>;
export type LogoutResponseData = z.infer<typeof LogoutResponseDataSchema>;
