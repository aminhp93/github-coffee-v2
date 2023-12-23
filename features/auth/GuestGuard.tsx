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

const GuestGuard = (props: Props) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (window.localStorage.getItem(USER_DATA_KEY_NAME)) {
      router.replace("/");
    }
  }, [router]);

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
