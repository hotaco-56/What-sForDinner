import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Snackbar, Alert } from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Track error messages
  const [users, setUsers] = useState([]); // Simple list to store user logins
  const [showSuccess, setShowSuccess] = useState(false); // Track success popup visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    if (isSignUp) {
      // Check if the username already exists
      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        setErrorMessage("Username already exists. Please choose a different username.");
        return;
      }

      // Add the new user to the list
      setUsers([...users, { username, password }]);
      setIsSignUp(false); // Switch to sign-in mode
      setShowSuccess(true); // Show success popup
    } else {
      // Check if the username and password match any user in the list
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        setIsAuthenticated(true); // Simulate successful login
      } else {
        setErrorMessage("Username or password is incorrect.");
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