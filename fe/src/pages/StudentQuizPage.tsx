import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Sidebar from "../components/sidebar";

const questions = [
  {
    id: 1,
    label: "What was the main reason for the formation of Malaysia in 1963?",
  },
  {
    id: 2,
    label:
      "Name the agreement signed between Malaya, Sabah, Sarawak, and Singapore.",
  },
  {
    id: 3,
    label: "Explain the role of Tunku Abdul Rahman in Malaysia’s independence.",
  },
  { id: 4, label: "What is the significance of the Rukun Negara?" },
  {
    id: 5,
    label: "Describe the causes of the Emergency (1948–1960) in Malaya.",
  },
  {
    id: 6,
    label: "What was the impact of British colonization on the Malay states?",
  },
  {
    id: 7,
    label: "Explain the function of the Federal Constitution of Malaysia.",
  },
  {
    id: 8,
    label: "What is meant by 'Power Sharing' in the Malaysian context?",
  },
  {
    id: 9,
    label: "State two contributions of Tun Dr. Ismail to national unity.",
  },
  {
    id: 10,
    label:
      "Why is understanding the history of Malaysia important for students?",
  },
] as const;

type QuestionId = (typeof questions)[number]["id"];
type QuizValues = { [K in `q${QuestionId}`]: string };

const initialValues = questions.reduce((acc, q) => {
  acc[`q${q.id}` as keyof QuizValues] = "";
  return acc;
}, {} as QuizValues);

const validationSchema = Yup.object(
  questions.reduce((acc, q) => {
    acc[`q${q.id}` as keyof QuizValues] = Yup.string().required("Required");
    return acc;
  }, {} as Record<keyof QuizValues, Yup.StringSchema>)
);

const StudentQuizPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik<QuizValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate("/dashboard");
      }, 3000);
    },
  });

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 5,
          bgcolor: "#f5f5f5",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Student Quiz
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {questions.map((q) => {
            const name = `q${q.id}` as keyof QuizValues;
            return (
              <Box key={q.id} mb={2}>
                <Typography fontWeight="bold" mb={1}>
                  {q.label}
                </Typography>
                <TextField
                  fullWidth
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                  variant="outlined"
                  sx={{ bgcolor: "#fff", borderRadius: 2 }}
                />
              </Box>
            );
          })}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 2, fontWeight: "bold" }}
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Box>
      <Dialog open={open}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
          }}
        >
          <CircularProgress color="primary" />
          <Typography mt={2}>Peding Results...</Typography>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default StudentQuizPage;
