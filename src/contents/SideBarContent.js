import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { navMaker } from "../helpers/Util";
import { styled } from "@mui/system";
import { useState } from "react";
import routes from "../routes";

const SideBarContent = ({ width = 160 }) => {
  const StyledDrawer = styled(Drawer)(() => ({
    "& .MuiDrawer-paper": {
      backgroundColor: "#1976d2",
      color: "#fff",
      boxSizing: "border-box",
      width: width,
    },
  }));

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const navRoutes = navMaker(routes);

  const drawerComp = (
    <Box>
      <Divider />
      <List>
        {navRoutes.map((route, index) => (
          <ListItem key={`sidebar_item_${index}`} disablePadding>
            <ListItemButton
              key={`sidebar_button_${index}`}
              component={Link}
              to={route.path}
            >
              <ListItemText primary={route.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
      aria-label="sidebar_box"
    >
      <StyledDrawer
        variant="temporary"
        open={drawer}
        onClose={() => toggleDrawer()}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {drawerComp}
      </StyledDrawer>
      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        open
      >
        {drawerComp}
      </StyledDrawer>
    </Box>
  );
};

export default SideBarContent;
