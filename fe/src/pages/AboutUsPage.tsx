import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import Layout from "../Layout";

const AboutUsPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Box sx={{ position: "relative", bgcolor: "white", overflow: "hidden" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #E7D297, #BC9543)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("about_title")}
        </Typography>
      </Box>
    </Layout>
  );
};

export default AboutUsPage;
