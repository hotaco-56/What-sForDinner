import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication
  const [isGuest, setIsGuest] = useState(false); // Track if the user is a guest

  return (
    <Router>
      {isAuthenticated && (
        <NavBar
          isAuthenticated={isAuthenticated}
          isGuest={isGuest}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      <Routes>
        {!isAuthenticated ? (
          <Route
            path="*"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setIsGuest={setIsGuest}
              />
            }
          />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;