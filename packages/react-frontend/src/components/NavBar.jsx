import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../assets/hungryboy.png";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#333333",
        accentColor: "white",
        borderBottom: "2px solid white",
      }}
    >
      <Toolbar
      sx={{
        justifyContent: "flex-start",
        display: 'flex'
      }}>
        <Button component={NavLink} to="/" sx={{ mr: 2 }}>
          <img
            src= {logo}
            alt= "HungryBoy"
            style={{ height: "50px", width: "50px" }}
          />
        </Button>
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/restaurants">
          Restaurants
        </Button>
        <Button color="inherit" component={NavLink} to="/favorites">
          Favorites
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button color="inherit" component={NavLink} to="/profile">
          <AccountBoxIcon></AccountBoxIcon>
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
