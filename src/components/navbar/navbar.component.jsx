import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ferremundo.png";
import Tooltip from "@mui/material/Tooltip";
import { ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";

const pages = [{ label: "Productos", route: "/productos" }];

export default function Navbar() {
  const history = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleGoTo = (route) => {
    history(route);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#b53836" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="Ferremundo"
              style={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                height: "5vh",
              }}
            />
          </Typography>

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
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleGoTo(page.route)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              style={{
                height: "5vh",
                display: { xs: "flex", md: "none" },
                mr: 1,
              }}
              src={logo}
              alt="Ferremundo"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleGoTo(page.route)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Carrito de Compras">
              <IconButton sx={{ p: 0 }}>
                <ShoppingCart alt="Carrito" style={{ color: "#FFFFFF" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
