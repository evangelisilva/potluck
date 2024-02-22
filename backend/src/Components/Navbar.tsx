// Navbar.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import "../CSS/Navbar.css";
import logo from "/assets/logo.png";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const list = () => (
    <List>
      <ListItem button>
        <Link to="/" className="navbar-link">
          Home
        </Link>
      </ListItem>
      <ListItem button>
        <Link to="/events" className="navbar-link">
          Events
        </Link>
      </ListItem>
      <ListItem button>
        <Link to="/" className="navbar-link">
          About Us
        </Link>
      </ListItem>
      <ListItem button>
        <Link to="/" className="navbar-link ">
          Contact Us
        </Link>
      </ListItem>
      <ListItem button>
        <Link to="/contact-us" className="navbar-link">
          Sign Up
        </Link>
      </ListItem>
    </List>
  );

  return (
    <div className="navbar-container">
      <div className="navbar-logo-wrapper">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-title">
        Potluck
      </div>
      <div className="navbar-tabs">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/events" className="navbar-link">
          Events
        </Link>
        <Link to="/" className="navbar-link">
          About Us
        </Link>
        <Link to="/" className="navbar-link ">
          Contact Us
        </Link>
        <Link to="/contact-us" className="navbar-link">
          Sign Up
        </Link>
        
      </div>
      <IconButton className="navbar-menu-icon" onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: "#4D515A", fontSize: "2.5rem" }} />
      </IconButton>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Navbar;
