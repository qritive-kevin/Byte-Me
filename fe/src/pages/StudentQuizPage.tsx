import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  Paper,
  DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout";
import Sidebar from "../components/sidebar";

const questions = [
  {
    id: 1,
    label:
      "What were the key features of nation-states in pre-Western Malay kingdoms?",
  },
  {
    id: 2,
    label:
      "How did the Malacca Sultanate enhance the characteristics of nation-states?",
  },
  {
    id: 3,
    label: "What is the 'Fourfold Minister System' in the Malacca Sultanate?",
  },
  {
    id: 4,
    label: "What were the primary revenue sources for the Malacca Sultanate?",
  },
  {
    id: 5,
    label:
      "Name the two major legal codes implemented in the Malacca Sultanate.",
  },
  {
    id: 6,
    label: "What was the role of the Bendahara in the Malacca Sultanate?",
  },
  {
    id: 7,
    label:
      "How did the legal systems of the Malacca Sultanate contribute to its success?",
  },
  {
    id: 8,
    label:
      "What was the relationship between rulers and citizens in the Malacca Sultanate?",
  },
  {
    id: 9,
    label:
      "Why is the legacy of pre-Western Malay kingdoms important for modern Malaysia?",
  },
  {
    id: 10,
    label:
      "What lessons can Malaysians learn from the traditions of the Malacca Sultanate?",
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
  const [dialogOpen, setDialogOpen] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentId, setStudentId] = useState("");
  const [evaluation, setEvaluation] = useState<any>(null);
  const navigate = useNavigate();

  const formik = useFormik<QuizValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setOpen(true);

      try {
        const payload = {
          student_name: studentName,
          student_class: studentClass,
          student_id: studentId,
          answers: questions.map((q) => ({
            question: q.label,
            answer: values[`q${q.id}` as keyof QuizValues],
          })),
        };

        const res = await axios.post(
          "https://n8n-staging.ai-spacex.co/webhook/c6e9fcb1-54bd-4704-b5ca-5520af1b4d39",
          payload
        );

        setEvaluation(res.data.output || res.data);
      } catch (error) {
        console.error("n8n webhook error:", error);
        setEvaluation(null);
      } finally {
        setOpen(false);
      }
    },
  });

  return (
    <>
      <Dialog open={dialogOpen} disableEscapeKeyDown>
        <DialogTitle>Enter Student Info</DialogTitle>
        <DialogContent>
          <TextField
            label="Student Name"
            fullWidth
            margin="normal"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <TextField
            label="Student Class"
            fullWidth
            margin="normal"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />
          <TextField
            label="Student ID"
            fullWidth
            margin="normal"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => setDialogOpen(false)}
            sx={{ mt: 2 }}
            disabled={!studentName || !studentClass || !studentId}
          >
            Start Quiz
          </Button>
        </DialogContent>
      </Dialog>

      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafbfc" }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            maxWidth: 600,
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

          {evaluation && (
            <Paper sx={{ mt: 4, p: 3, bgcolor: "#fff" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Evaluation Result
              </Typography>
              <Typography>
                <strong>Score:</strong> {evaluation.score}
              </Typography>
              <Typography>
                <strong>Feedback:</strong> {evaluation.feedback}
              </Typography>
              <Typography>
                <strong>Weak Points:</strong>{" "}
                {evaluation.weak_points?.join(", ")}
              </Typography>
              <Typography>
                <strong>Study Plan:</strong>
              </Typography>
              <ul>
                {evaluation.study_plan?.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Paper>
          )}
        </Box>
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
          <Typography mt={2}>Evaluating...</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentQuizPage;
