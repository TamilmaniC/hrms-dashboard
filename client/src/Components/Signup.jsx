import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../App.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className="sign-up-container">
      <form
        className="sign-up-form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "400px",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontFamily: "Poppins" }}
        >
          Register
        </Typography>

        <TextField
          type="text"
          placeholder="Username"
          required
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon
                  style={{
                    fontSize: "20px",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                />
              </InputAdornment>
            ),
            sx: { paddingTop: "15px", height: "45px" },
          }}
        />

        <TextField
          type="email"
          placeholder="Email"
          autoComplete="off"
          required
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon
                  style={{
                    fontSize: "20px",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                />
              </InputAdornment>
            ),
            sx: { paddingTop: "15px", height: "45px" },
          }}
        />

        <TextField
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon
                  style={{
                    fontSize: "20px",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{
                    marginBottom: "15px",
                    color: "#666",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            sx: { paddingTop: "15px", height: "45px" },
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          REGISTER
        </Button>

        <Typography align="center" sx={{ fontFamily: "Poppins" }}>
          Have an Account?{" "}
          <Link to="/login" style={{ color: "#1976D2" }}>
            Login
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Signup;
