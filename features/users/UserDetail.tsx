// Import local files
import useAuth from "@/features/auth/useAuth";

const UserDetail = () => {
  const { user } = useAuth();

  if (!user) return null;

  return <div>{JSON.stringify(user)}</div>;
};

export default UserDetail;
