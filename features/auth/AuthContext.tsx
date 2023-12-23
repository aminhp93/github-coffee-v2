// Import libraries
import { createContext, ReactNode, useEffect, useState } from "react";

// Import local files
// Import libraries
import { useRouter } from "next/router";
import {
  STORAGE_TOKEN_KEY_NAME,
  USER_DATA_KEY_NAME,
  DEFAULT_PROVIDER,
} from "./Auth.constants";
import {
  LoginRequestData,
  ErrCallbackType,
} from "../../services/auth/Auth.types";
import AuthService from "../../services/auth/Auth.services";
import { User } from "@/features/users/Users.types";
import UsersService from "@/features/users/Users.services";

const AuthContext = createContext(DEFAULT_PROVIDER);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(DEFAULT_PROVIDER.user);
  const [loading, setLoading] = useState<boolean>(DEFAULT_PROVIDER.loading);
  const router = useRouter();

  useEffect(() => {
    console.log("useAuth");

    (async () => {
      const storedToken = window.localStorage.getItem(STORAGE_TOKEN_KEY_NAME)!;
      if (storedToken) {
        setLoading(true);
        try {
          console.log("fetch me");
          const res = await UsersService.me();
          setLoading(false);
          setUser(res);
          window.localStorage.setItem(USER_DATA_KEY_NAME, JSON.stringify(res));
          console.log("Logged in successfully");
        } catch (e) {
          setLoading(false);
          setUser(null);
          window.localStorage.removeItem(USER_DATA_KEY_NAME);
          window.localStorage.removeItem(STORAGE_TOKEN_KEY_NAME);
          console.log("Login failed");
        }
      } else {
        // redirect to login page
        router.push("/login");
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (
    params: LoginRequestData,
    errorCallback?: ErrCallbackType
  ) => {
    try {
      const res = await AuthService.login(params);
      window.localStorage.setItem(
        STORAGE_TOKEN_KEY_NAME,
        res.data.access_token
      );

      const meRes = await UsersService.me();
      setUser(meRes);

      window.localStorage.setItem(USER_DATA_KEY_NAME, JSON.stringify(meRes));

      const returnUrl = router.query.returnUrl;
      const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

      router.replace(redirectURL as string);
    } catch (err) {
      if (errorCallback) errorCallback();
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(USER_DATA_KEY_NAME);
    window.localStorage.removeItem(STORAGE_TOKEN_KEY_NAME);
    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
