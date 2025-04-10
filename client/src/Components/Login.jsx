import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../App.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", { email, password })
      .then((response) => {
        if (response.data.status) {
          setIsAuthenticated(true);
          localStorage.setItem("isLoggedIn", "true"); // ✅ Remember login
          navigate("/dashpage");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google user:", decoded);

    Axios.post("http://localhost:3000/auth/google-login", {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    })
      .then((res) => {
        if (res.data.status) {
          setIsAuthenticated(true);
          localStorage.setItem("isLoggedIn", "true"); // ✅ Remember login
          navigate("/dashpage");
        }
      })
      .catch((err) => {
        console.error("Google login error:", err);
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
        <Typography variant="h5" align="center" sx={{ fontFamily: "Poppins" }}>
          Login
        </Typography>

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

        <Link
          to="/forgotPassword"
          style={{ textDecoration: "none", color: "#1976D2" }}
        >
          Forgot Password?
        </Link>

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>

        <Divider>or</Divider>

        <Box display="flex" justifyContent="center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google login failed")}
          />
        </Box>

        <Typography align="center" sx={{ fontFamily: "Poppins" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#1976D2" }}>
            Sign Up
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
