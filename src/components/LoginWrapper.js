import { Box } from "@mui/material";
import Loading from "./Loading";
import LoginForm from "./LoginForm";

const LoginWrapper = ({ children, user, loading, fetchUserData }) => {
  return user.authenticated ? (
    <Box width="100%" identificator="app-outlet">
      <Loading isLoading={loading}>{children}</Loading>
    </Box>
  ) : (
    <Box width="100%" identificator="app-login-form">
      <LoginForm authCallBack={fetchUserData} />
    </Box>
  );
};

export default LoginWrapper;
