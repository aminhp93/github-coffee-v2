// Import libraries
import * as React from "react";
// Import local files
import useAuth from "./useAuth";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "webpmp-themes";

const StyledBoxBackground = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
});
const StyledBoxLoginDialog = styled(Box)({
  position: "absolute",
  width: "24%",
  top: "20%",
  left: "37%",
  padding: "25px",
  border: "1px solid black",
  borderRadius: "5px",
});
const StyledBoxLoginLayout = styled(Box)({
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://piscada.com/">
        Piscada
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ username, password });
    const dataRequest = {
      username,
      password,
    };

    login(dataRequest);
  };

  return (
    <StyledBoxBackground>
      <StyledBoxLoginDialog>
        <StyledBoxLoginLayout>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              value={username ? username : ""}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ shrink: true }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password ? password : ""}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 8, mb: 4 }}>
            <Copyright />
          </Box>
        </StyledBoxLoginLayout>
      </StyledBoxLoginDialog>
    </StyledBoxBackground>
  );
};

export default Login;
