import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/features/auth/Login"), {
  ssr: false,
});

const LoginPage = () => {
  return <Login />;
};

LoginPage.guestGuard = true;

export default LoginPage;
