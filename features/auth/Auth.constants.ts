import { AuthValuesType } from "@/services/auth/Auth.types";

export const USER_DATA_KEY_NAME = "userData";
export const STORAGE_TOKEN_KEY_NAME = "accessToken";

export const DEFAULT_PROVIDER: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => null,
};
