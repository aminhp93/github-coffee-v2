// Import libraries
import Button from "@mui/material/Button";

// Import local files
import useAuth from "./useAuth";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
