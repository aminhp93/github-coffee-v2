// Import library
import { useRouter } from "next/router";

// Import local files
import useAuth from "./useAuth";

type Props = {
  children: React.ReactNode;
};

const RouterGuard = ({ children }: Props) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  return <>{children}</>;
};

export default RouterGuard;
