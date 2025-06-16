import React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";

const Navbar = ({ isSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={-1}
        sx={{
          zIndex: 1201,
          backgroundColor: "#fff",
          width: isSidebarOpen ? "calc(100% - 265px)" : "calc(100% - 60px)",
          marginLeft: isSidebarOpen ? "265px" : "60px",
          transition: "margin-left 0.2s ease-in-out",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Poppins", color: "#34495e"}}
          >
            Welcome Tamilmani !
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
