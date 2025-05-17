import React from "react";
import { Box, Typography, Paper, Stack, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

const StudyPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem("studyPlan");
  if (!stored) return navigate("/dashboard"), null;

  const plan = JSON.parse(stored);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Sidebar />

      <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, maxWidth: 700, mx: "auto" }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Personalized Study Plan
          </Typography>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              Score
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {plan.score}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              Feedback
            </Typography>
            <Typography>{plan.feedback}</Typography>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              Weak Points
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {plan.weak_points?.length ? (
                plan.weak_points.map((point: string, i: number) => (
                  <Chip key={i} label={point} color="warning" />
                ))
              ) : (
                <Typography color="text.secondary">None</Typography>
              )}
            </Stack>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              Study Plan
            </Typography>
            <ul>
              {plan.study_plan?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default StudyPlanPage;
