import { ReactNode } from "react";
import { Box } from "@mui/material";
// import Sidebar from "../components/sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        color: "white",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Navbar />
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          overflowY: "auto",
          minHeight: "100vh",
        }}
      >
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
