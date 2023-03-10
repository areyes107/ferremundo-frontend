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
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo-ferremundo.png";
import Tooltip from "@mui/material/Tooltip";
import { ShoppingBagOutlined, Menu as MenuIcon } from "@mui/icons-material";

const pages = [
  { label: "Inicio", route: "/home" },
  { label: "Productos", route: "/productos" },
];

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
            onClick={() => history("/home")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
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
                <MenuItem key={page.label}>
                  <NavLink
                    to={page.route}
                    style={({ isActive, isPending }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                      };
                    }}
                  >
                    {page.label}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => history("/home")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
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
              <NavLink
                to={page.route}
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: "#ffffff",
                    textDecoration: "none",
                    border: isActive && "1px solid #ffffff",
                    borderRadius: isActive && "5px",
                    padding: "5px",
                  };
                }}
              >
                {page.label}
              </NavLink>
            ))}
          </Box>

          <NavLink
            to="/login"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: "#ffffff",
                textDecoration: "none",
                border: isActive && "1px solid #ffffff",
                borderRadius: isActive && "5px",
                padding: "5px",
                paddingRight: "8px",
              };
            }}
          >
            Iniciar Sesión
          </NavLink>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Carrito de Compras">
              <IconButton sx={{ p: 0 }}>
                <ShoppingBagOutlined
                  alt="Carrito"
                  style={{ color: "#FFFFFF" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
