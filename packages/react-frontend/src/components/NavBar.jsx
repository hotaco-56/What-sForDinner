import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/hungryboy.png";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "../CSS/NavBar.css";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    localStorage.removeItem("isGuest"); // Remove guest flag if present
    setIsAuthenticated(false); // Update authentication state
    navigate("/login"); // Redirect to login page
  };

  const handleSignIn = () => {
    navigate("/login"); // Redirect to login page
    localStorage.removeItem("isGuest");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar className="navbar" position="fixed">
      <Toolbar className="navbar-toolbar">
        <Button className="navbar-logo-button" component={NavLink} to="/">
          <img className="navbar-logo" src={logo} alt="HungryBoy" />
        </Button>
        <Button className="navbar-button" component={NavLink} to="/">
          Home
        </Button>
        <Button className="navbar-button" component={NavLink} to="/restaurants">
          Restaurants
        </Button>
        <Button className="navbar-button" component={NavLink} to="/favorites">
          Favorites
        </Button>

        <Box className="navbar-spacer" />

        <Button className="navbar-profile" component={NavLink} to="/profile">
          <AccountBoxIcon />
          Profile
        </Button>

        {/* Add Sign In or Sign Out button */}
        {localStorage.getItem("authToken") ? (
          // If the user has a real auth token, show "Sign Out"
          <Button
            className="navbar-button"
            onClick={handleSignOut}
            sx={{ color: "white" }}
          >
            Sign Out
          </Button>
        ) : (
          // If the user is a guest or not logged in, show "Sign In"
          <Button
            className="navbar-button"
            onClick={handleSignIn}
            sx={{ color: "white" }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
