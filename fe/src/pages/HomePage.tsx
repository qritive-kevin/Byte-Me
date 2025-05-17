import Layout from "../Layout";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, #f8fafc 0%,rgb(83, 122, 249) 100%)",
        position: "relative",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        color="text.primary"
        align="center"
        sx={{ mb: 2, textShadow: "0 2px 4px rgba(0,0,0,0.06)" }}
      >
        Edu Qwen
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4, maxWidth: 600 }}
      >
        Effortless task management for teams and individuals, streamline
        workflows, meet deadlines, and achieve more with ease
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/dashboard")}
          sx={{ fontWeight: "bold", borderRadius: 2 }}
        >
          Students
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/teacher/tracking")}
          sx={{ fontWeight: "bold", borderRadius: 2 }}
        >
          Teachers
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;
