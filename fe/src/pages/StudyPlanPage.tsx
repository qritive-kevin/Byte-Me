import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

const StudyPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem("studyPlan");
  if (!stored) return navigate("/dashboard"), null;

  const plan = JSON.parse(stored);
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafbfc" }}>
      <Sidebar />
      <Box sx={{ flex: 1, maxWidth: 600, mx: "auto", mt: 5 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Evaluation Result
          </Typography>
          <Typography>
            <strong>Score:</strong> {plan.score}
          </Typography>
          <Typography>
            <strong>Feedback:</strong> {plan.feedback}
          </Typography>
          <Typography>
            <strong>Weak Points:</strong> {plan.weak_points?.join(", ")}
          </Typography>
          <Typography>
            <strong>Study Plan:</strong>
          </Typography>
          <ul>
            {plan.study_plan?.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Paper>
      </Box>
    </Box>
  );
};

export default StudyPlanPage;
