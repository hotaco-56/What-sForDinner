import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../assets/hungryboy.png";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import "../CSS/NavBar.css";

const NavBar = () => {
  return (
    <AppBar
      className="navbar"
      position="fixed"
    >
      <Toolbar className="navbar-toolbar">
        <Button className="navbar-logo-button" component={NavLink} to="/">
          <img className="navbar-logo"
            src= {logo}
            alt= "HungryBoy"
          />
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
          <AccountBoxIcon></AccountBoxIcon>
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
