import { AppBar, Toolbar, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        right: 16,
        left: "auto",
        width: "auto",
        top: 16,
      }}
    >
      <Toolbar>
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/restaurants">
          Restaurants
        </Button>
        <Button color="inherit" component={NavLink} to="/favorites">
          Favorites
        </Button>
        <Button color="inherit" component={NavLink} to="/profile">
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
