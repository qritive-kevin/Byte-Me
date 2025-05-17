import Layout from "../Layout";
import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

const HomePage = () => {
  // const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      <Box sx={{ position: "relative", height: "500px", width: "100%" }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          color="light.main"
          sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
        >
          {t("home_title")}
        </Typography>
      </Box>
    </Layout>
  );
};

export default HomePage;
