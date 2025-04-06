import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation="3"
        sx={{ zIndex: 1201, backgroundColor: "#3498db" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Poppins" }}
          >
            HR Dashboard
          </Typography>

          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            color="inherit"
            onClick={handleLogout}
            sx={{
              "&:hover": {
                backgroundColor: "transparent", // Prevent hover effects
                boxShadow: "none",
              },
            }}
          >
            <LogoutRoundedIcon />
            <Typography sx={{ fontFamily: "Poppins", m: "5px" }}>
              Logout
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
