import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../language";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { name: t("home"), link: "/" },
    { name: t("tours"), link: "/tours" },
    { name: t("blogs"), link: "/blog" },
    { name: t("about"), link: "/about-us" },
    { name: t("contact"), link: "/contact-us" },
  ];

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{ height: 32, cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.link);
                toggleDrawer();
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <LanguageSwitcher />
        </ListItem>

        <ListItem disablePadding sx={{ display: { xs: "flex", md: "none" } }}>
          <ListItemButton onClick={() => setLangOpen(!langOpen)}>
            <ListItemText primary={t("language")} />
            {langOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={langOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton>
              <ListItemText
                primary={<Typography color="primary">English</Typography>}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                primary={
                  <Typography color="text.secondary">简体中文</Typography>
                }
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      color="default"
      sx={{ borderBottom: "1px solid #eee", bgcolor: "background.default" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: 32, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          {!isMobile && (
            <Box
              component="input"
              placeholder={t("find_your_next_adventure")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  navigate(
                    `/packages?search=${encodeURIComponent(
                      e.currentTarget.value
                    )}`
                  );
                }
              }}
              sx={{
                border: "1px solid #e0e0e0",
                px: 2,
                py: 1,
                borderRadius: "50px",
                width: 280,
              }}
            />
          )}
        </Box>

        {!isMobile ? (
          <Box display="flex" alignItems="center" gap={3}>
            {navItems.map((item) => (
              <Typography
                key={item.name}
                variant="body2"
                sx={{
                  cursor: "pointer",
                  color:
                    location.pathname === item.link
                      ? "primary.main"
                      : "text.primary",
                }}
                onClick={() => navigate(item.link)}
              >
                {item.name}
              </Typography>
            ))}
            <Button
              variant="contained"
              size="small"
              sx={{ borderRadius: "20px" }}
              onClick={() => navigate("/booking")}
            >
              {t("booking")}
            </Button>
            <LanguageSwitcher />
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="contained"
              size="small"
              sx={{ borderRadius: "20px" }}
            >
              {t("booking")}
            </Button>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
