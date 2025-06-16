import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Smallsidebar = ({ onToggle }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "60px",
        backgroundColor: "#34495e",
        zIndex: 1000,
        left: 0,
        paddingTop: "20px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <IconButton onClick={onToggle}>
        <MenuIcon sx={{ color: "#fff" }}/>
      </IconButton>
    </Box>
  );
};

export default Smallsidebar;
