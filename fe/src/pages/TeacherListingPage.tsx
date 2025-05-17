import React from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import Layout from "../Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import Sidebar from "../components/sidebar";

const students = [
  {
    id: 1,
    name: "Jimmy Henderson",
    email: "henderson399@gmail.com",
    avatar: "/assets/avatar1.png",
    score: 92,
    progress: "Chapter 12",
    date: "Mar 27, 2024",
  },
  {
    id: 2,
    name: "Eva W Ramirez",
    email: "eva.ramirez@gmail.com",
    avatar: "/assets/avatar2.png",
    score: 88,
    progress: "Chapter 10",
    date: "Apr 02, 2024",
  },
  {
    id: 3,
    name: "Bernita D Stubbs",
    email: "Subbsbernita@gmail.com",
    avatar: "/assets/avatar3.png",
    score: 95,
    progress: "Chapter 15",
    date: "May 12, 2024",
  },
  {
    id: 4,
    name: "Terrell Elliott",
    email: "elliottterrell@gmail.com",
    avatar: "/assets/avatar4.png",
    score: 80,
    progress: "Chapter 8",
    date: "Jun 01, 2024",
  },
];

const TeacherListingPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafbfc" }}>
      <Sidebar />
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, idx) => (
              <TableRow key={student.id} hover>
                <TableCell>
                  <Typography fontWeight="bold">{idx + 1}</Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={student.avatar} alt={student.name} />
                    <Box>
                      <Typography fontWeight="bold">{student.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {student.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">{student.score}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{student.progress}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">{student.date}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeacherListingPage;
