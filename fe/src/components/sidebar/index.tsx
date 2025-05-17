import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useLocation } from "react-router-dom";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const Sidebar = ({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const teacherLinks = [
    { name: "Tracking", icon: <StorefrontIcon />, link: "/teacher/tracking" },
    { name: "Uplaod", icon: <SupportAgentIcon />, link: "/teacher/uplaod" },
    { name: "Logout", icon: <LogoutRoundedIcon />, link: "/" },
  ];
  const hasStudyPlan = !!localStorage.getItem("hasStudyPlan");

  const studentLinks = [
    { name: "Task", icon: <LeaderboardIcon />, link: "/dashboard" },
    ...(hasStudyPlan
      ? [
          {
            name: "Study Plan",
            icon: <AssignmentTurnedInIcon />,
            link: "/study-plan",
          },
        ]
      : []),
    { name: "Logout", icon: <LogoutRoundedIcon />, link: "/" },
  ];

  const { pathname } = useLocation();
  const navLinks = pathname.startsWith("/teacher")
    ? teacherLinks
    : studentLinks;

  // Sidebar content
  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: theme.palette.background.paper,
        p: 2,
        minWidth: 220,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontFamily: theme.typography.h5.fontFamily,
            color: theme.palette.primary.main,
            mb: 4,
            textAlign: "center",
          }}
        >
          Byte Me
        </Typography>
        <List>
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              })}
              onClick={isMobile && onMobileClose ? onMobileClose : undefined}
            >
              <ListItem
                button
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&.Mui-selected, &:hover": {
                    bgcolor: theme.palette.primary.light,
                  },
                  transition: "background 0.2s",
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: 600,
                  }}
                />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Box>
    </Box>
  );

  // Permanent drawer for desktop, temporary for mobile
  if (isMobile) {
    return (
      <Drawer
        anchor="top"
        open={!!mobileOpen}
        onClose={onMobileClose}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
            borderRadius: 3,
            bgcolor: theme.palette.background.paper,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          borderRight: "none",
          bgcolor: theme.palette.background.paper,
          boxShadow: 3,
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;
