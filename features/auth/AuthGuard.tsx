// Import library
import { ReactNode, ReactElement, useEffect } from "react";
import { useRouter } from "next/router";

// Import local files
import useAuth from "./useAuth";
import { USER_DATA_KEY_NAME } from "./Auth.constants";

type Props = {
  children: ReactNode;
  fallback: ReactElement | null;
};

const AuthGuard = (props: Props) => {
  const { children, fallback } = props;
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (user === null && !window.localStorage.getItem(USER_DATA_KEY_NAME)) {
      if (router.asPath !== "/") {
        router.replace({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      } else {
        router.replace("/login");
      }
    }
  }, [router, user]);

  if (loading || user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
