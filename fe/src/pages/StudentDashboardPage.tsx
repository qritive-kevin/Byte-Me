import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../components/sidebar";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { courseService, Course } from "../services/courseService";

const StudentDashboardPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await courseService.getAllCourses();
        setCourses(courses);
        setError(null);
      } catch (error: any) {
        setError(
          error.message || "Failed to fetch courses. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course); // no API call needed
    courseService
      .updateCourseProgress(course.name, "in-progress")
      .catch(() => {});
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafbfc" }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafbfc" }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="error">{error}</Typography>
        </Box>
      </Box>
    );
  }

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
                    boxShadow: selectedCourse?.name === course.name ? 4 : 1,
                    border:
                      selectedCourse?.name === course.name
                        ? "2px solid #0042DC"
                        : "none",
                    transition: "0.2s",
                  }}
                  onClick={() => handleCourseSelect(course)}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={course.img}
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
              <Typography variant="h6" color="primary" mb={1}>
                {selectedCourse.name}
              </Typography>
              <Typography variant="subtitle2" mb={2}>
                Table of content
              </Typography>

              {selectedCourse.details.content.map((item, idx) => {
                const unlocked = idx === 0;
                return (
                  <Box
                    key={item}
                    display="flex"
                    alignItems="center"
                    mb={1}
                    gap={1}
                  >
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ minWidth: 32, fontWeight: 700 }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </Typography>

                    <Box flex={1}>
                      <Typography
                        variant="body1"
                        color={unlocked ? "text.primary" : "text.disabled"}
                      >
                        {item}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Study time: {selectedCourse.details.studyTime}
                      </Typography>
                    </Box>

                    <IconButton
                      size="small"
                      disabled={!unlocked}
                      sx={{
                        color: unlocked ? "primary.main" : "text.disabled",
                      }}
                      onClick={() => unlocked && navigate("/quiz")}
                    >
                      {unlocked ? (
                        <ArrowForwardIosIcon fontSize="small" />
                      ) : (
                        <LockIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                );
              })}

              {selectedCourse.extraContent.length > 0 && (
                <>
                  <Typography variant="subtitle2" mt={3} mb={2}>
                    Additional Materials
                  </Typography>
                  {selectedCourse.extraContent.map((item, idx) => (
                    <Box
                      key={item.title}
                      display="flex"
                      alignItems="center"
                      mb={1}
                      gap={1}
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ minWidth: 32, fontWeight: 700 }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </Typography>

                      <Box flex={1}>
                        <Typography variant="body1">{item.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Study time: {item.studyTime}
                        </Typography>
                        {item.filePath && (
                          <Typography
                            variant="caption"
                            color="primary"
                            display="block"
                          >
                            <a
                              href={item.filePath}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View PDF
                            </a>
                          </Typography>
                        )}
                      </Box>

                      <IconButton
                        size="small"
                        sx={{ color: "primary.main" }}
                        onClick={() => navigate("/quiz")}
                      >
                        <ArrowForwardIosIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </>
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
