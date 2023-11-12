import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { ExitToApp, MenuOpen } from "@mui/icons-material";
import { formatCurrency } from "../helpers/Util";
import { styled } from "@mui/system";
import { drawerStore } from "../stores/drawerStore";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#1976D2",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 1rem",
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  fontSize: "1.25rem",
}));

const Data = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  textAlign: "right",
  width: "100%",
  padding: "0 2.5rem",
  whiteSpace: "pre-wrap",
}));

const StyledLogoutButton = styled(IconButton)(({ theme }) => ({
  color: "white",
}));

const Header = ({ user, handleLogout }) => {
  const userInfo = (email, balance) => {
    return `${email}   /   Balance: ${formatCurrency(balance)}`;
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <IconButton
          color="inherit"
          identificator="header-open-drawer"
          aria-label="open drawer"
          edge="start"
          onClick={drawerStore.toggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOpen />
        </IconButton>
        <StyledTypography identificator="header-title" variant="h6">
          ArithmeticCalculatorAPI
        </StyledTypography>
        {user.authenticated && (
          <>
            {user.email && (
              <Data identificator="header-user-info">
                {userInfo(user.email, user.balance)}
              </Data>
            )}
            <StyledLogoutButton
              identificator="header-logout"
              onClick={handleLogout}
            >
              <ExitToApp />
            </StyledLogoutButton>
          </>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
