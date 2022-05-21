import React from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import logoImg from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#017bc150", color: "#26282b" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              "&:hover": {
                cursor: "pointer",
                mr: "2",
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              style={{ width: "200px", marginRight: "1rem" }}
              src={logoImg}
              alt="huuva logo"
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              style={{ width: "200px" }}
              alt="Huuva's Logo"
              src={logoImg}
            ></img>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
