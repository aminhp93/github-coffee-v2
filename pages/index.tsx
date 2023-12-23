// Import libraries
import { Box } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";

const Logout = dynamic(() => import("@/features/auth/Logout"), {
  ssr: false,
});

const UserDetail = dynamic(() => import("@/features/users/UserDetail"), {
  ssr: false,
});

const IndexPage = () => {
  return (
    <Box>
      <h1>Index page</h1>
      <ul>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/view/123">view id</Link>
        </li>
        <li>
          <Link href="/edit/123">edit id</Link>
        </li>
        <li>
          <Link href="/dashboard">dashboard</Link>
        </li>
        <li>
          <Link href="/app-builder">app builder</Link>
        </li>
      </ul>
      <Logout />
      <UserDetail />
    </Box>
  );
};

export default IndexPage;
