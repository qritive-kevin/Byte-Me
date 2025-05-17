import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  InputBase,
  Paper,
  Avatar,
} from "@mui/material";
import Sidebar from "../components/sidebar";
import courseImg from "../assets/image-avatar.png";

type CourseKey = "Computer" | "History";

type Course = {
  name: CourseKey;
  chapters: number;
  time: string;
  cost: string;
  color: string;
};

type CourseDetails = {
  user: {
    name: string;
    avatar: string;
    progress: string;
  };
  content: string[];
  studyTime: string;
};

const courses: Course[] = [
  {
    name: "Computer",
    chapters: 24,
    time: "62hrs",
    cost: "$25",
    color: "#e0f7fa",
  },
  {
    name: "History",
    chapters: 22,
    time: "48hrs",
    cost: "$18",
    color: "#ffe0b2",
  },
];

const courseDetails: Record<CourseKey, CourseDetails> = {
  Computer: {
    user: {
      name: "Lisha Lokwani",
      avatar: courseImg,
      progress: "Progress Report",
    },
    content: [
      "Introduction to Computer",
      "Computer Hardware",
      "System Software",
      "Communications Literacy",
      "Software Development",
      "Networks and Security",
      "Utility Software",
    ],
    studyTime: "34 min",
  },
  History: {
    user: {
      name: "Wakanda Forever",
      avatar: courseImg,
      progress: "Progress Report",
    },
    content: [
      "Ancient Civilizations",
      "Medieval Times",
      "Renaissance & Exploration",
      "Industrial Revolution",
      "World Wars Overview",
      "Modern History",
    ],
    studyTime: "125 min",
  },
};

const StudentDashboardPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseKey | null>(null);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafbfc" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", p: 3 }}>
        <Box sx={{ flex: 2, pr: 3 }}>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Hey Sunshine,
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Let's find a perfect course
          </Typography>

          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} key={course.name}>
                <Card
                  sx={{
                    background: course.color,
                    borderRadius: 3,
                    cursor: "pointer",
                    boxShadow: selectedCourse === course.name ? 4 : 1,
                    border:
                      selectedCourse === course.name
                        ? "2px solid #0042DC"
                        : "none",
                    transition: "0.2s",
                  }}
                  onClick={() => setSelectedCourse(course.name)}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={courseImg}
                        alt={course.name}
                        sx={{ width: 48, height: 48, bgcolor: "#fff" }}
                        variant="rounded"
                      />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {course.name}
                        </Typography>
                        <Typography variant="body2">
                          Chapter: {course.chapters}
                        </Typography>
                        <Typography variant="body2">
                          Study Time: {course.time}
                        </Typography>
                        <Typography variant="body2">
                          Cost: {course.cost}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            borderRadius: 3,
            p: 3,
            minWidth: 300,
            boxShadow: 2,
            display: selectedCourse ? "block" : "none",
            ml: 2,
            height: "100%",
            alignSelf: "flex-start",
          }}
        >
          {selectedCourse ? (
            <>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={courseDetails[selectedCourse].user.avatar}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography fontWeight="bold">
                    {courseDetails[selectedCourse].user.name}
                  </Typography>

                  <Typography variant="caption" color="primary">
                    {courseDetails[selectedCourse].user.progress}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" color="primary" mb={1}>
                {selectedCourse}
              </Typography>
              <Typography variant="subtitle2" mb={2}>
                Table of content
              </Typography>

              {courseDetails[selectedCourse].content.map(
                (item: string, idx: number) => (
                  <Box key={item} display="flex" alignItems="center" mb={1}>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ minWidth: 32, fontWeight: 700 }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </Typography>
                    <Box>
                      <Typography variant="body1">{item}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Study time: {courseDetails[selectedCourse].studyTime}
                      </Typography>
                    </Box>
                  </Box>
                )
              )}
            </>
          ) : (
            <Typography color="text.secondary" align="center">
              Select a course to see details
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboardPage;
