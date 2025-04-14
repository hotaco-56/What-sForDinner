import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Snackbar, Alert } from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Track error messages
  const [showSuccess, setShowSuccess] = useState(false); // Track success popup visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    if (isSignUp) {
      try {
        // Call the signup function from the backend
        const response = await fetch("http://localhost:8000/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username : username, passwd: password }),
        });

        console.log(username, password);

        if (response.created) {
          setShowSuccess(true); // Show success popup
          setIsSignUp(false); // Switch to sign-in mode
        } else {
          const data = await response.json();
          setErrorMessage(data.message || "Failed to create account.");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      }
    } else {
      try {
        // Call the login function from the backend
        const response = await fetch("http://localhost:8000/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username : username, passwd : password }),
        });

        if (response.ok) {
          setIsAuthenticated(true); // Simulate successful login
        } else {
          const data = await response.json();
          setErrorMessage(data.message || "Invalid username or password.");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      }
    }

    // Clear the input fields
    setUsername("");
    setPassword("");
  };

  const handleGuestAccess = () => {
    setIsAuthenticated(true); // Grant access as a guest
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "black",
        color: "white",
        padding: 2,
      }}
    >
      <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold" }}>
        What's For Dinner
      </Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {isSignUp ? "Create an Account" : "Sign In"}
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2, bgcolor: "white" }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, bgcolor: "white" }}
        />
        {errorMessage && (
          <Typography sx={{ color: "red", mb: 2 }}>{errorMessage}</Typography>
        )}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#115293" }, mb: 2 }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>
      <Typography>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          href="#"
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{ color: "#1976d2", cursor: "pointer" }}
        >
          {isSignUp ? "Sign In" : "Create an Account"}
        </Link>
      </Typography>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleGuestAccess}
        sx={{
          mt: 3,
          color: "white",
          borderColor: "white",
          "&:hover": { bgcolor: "#333", borderColor: "white" },
        }}
      >
        Continue as Guest
      </Button>

      {/* Snackbar for success message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Account created successfully! :)
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;