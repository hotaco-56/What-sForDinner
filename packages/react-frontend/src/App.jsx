import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., check localStorage or token)
    const token = localStorage.getItem("token");
    const isGuest = localStorage.getItem("isGuest") === "true";
    setIsAuthenticated(!!token || isGuest); // Set to true if a token exists or the user is a guest
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* Protected routes */}
        {isAuthenticated ? (
          <>
            {/* Render NavBar only for authenticated users */}
            <Route
              path="*"
              element={
                <>
                  <NavBar
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </>
              }
            />
          </>
        ) : (
          // Redirect to login if not authenticated
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;