import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Collapse,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PolylineRoundedIcon from "@mui/icons-material/PolylineRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, Router, Routes, Route } from "react-router-dom";

const Sidebar = ({ onToggle }) => {
  const [reportsOpen, setReportsOpen] = useState(false);

  const toggleReportsDropdown = () => {
    setReportsOpen(!reportsOpen);
  };

  return (
        <Box
          sx={{
            width: "32vh",
            backgroundColor: "#fff",
            height: "87.5vh",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            paddingTop: "30px",
            paddingLeft: "30px",
            position: "fixed",
            left: 0,
            top: "62px",
            overflowY: "auto",
          }}
        >
          <IconButton
            onClick={onToggle}
            sx={{ marginTop: "-15px", marginLeft: "-20px" }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins",
              paddingTop: "25px",
              paddingBottom: "25px",
              paddingLeft: "30px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Tamilmani
          </Typography>
          <Divider width="200px" />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashpage">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Dashpage" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/create-user">
                <ListItemIcon>
                  <PersonAddRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/department">
                <ListItemIcon>
                  <PolylineRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Department" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/employee">
                <ListItemIcon>
                  <BadgeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Employee" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/activities">
                <ListItemIcon>
                  <HandymanRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Activities" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/holidays">
                <ListItemIcon>
                  <CelebrationRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Holidays" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/events">
                <ListItemIcon>
                  <EmojiEventsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Events" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/payroll">
                <ListItemIcon>
                  <PaymentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Payroll" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/accounts">
                <ListItemIcon>
                  <AccountBalanceRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
              </ListItemButton>
            </ListItem>

            {/* Reports Dropdown */}
            <ListItem disablePadding>
              <ListItemButton onClick={toggleReportsDropdown}>
                <ListItemIcon>
                  <AssessmentRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
                {reportsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            {/* Dropdown Items */}
            <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/reports?type=attendance"
                  >
                    <ListItemText primary="Attendance Report" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/reports?type=leave">
                    <ListItemText primary="Leave Report" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/reports?type=performance"
                  >
                    <ListItemText primary="Performance Report" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            <br />
            <Divider width="200px" />
            <br />
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/projects">
                <ListItemIcon>
                  <AssignmentRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/jobportal">
                <ListItemIcon>
                  <BusinessCenterRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Job Portal" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/auth">
                <ListItemIcon>
                  <LockPersonRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Authentication" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
  );
};

export default Sidebar;
