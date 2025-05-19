import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  IconButton,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../Layout";
import Sidebar from "../components/sidebar";
import { courseService, Course } from "../services/courseService";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  courseName: Yup.string().required("Course is required"),
  studyTime: Yup.string().required("Study time is required"),
  files: Yup.array()
    .of(
      Yup.mixed().test("fileType", "Only PDF files are allowed", (value) => {
        return value instanceof File && value.type === "application/pdf";
      })
    )
    .min(1, "At least one PDF file is required"),
});

const TeacherUploadPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<Array<{ name: string }>>([]);

  // Fetch available courses on component mount
  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await courseService.getAllCourses();
        setCourses(courses);
      } catch (error) {
        enqueueSnackbar("Failed to fetch courses", { variant: "error" });
      }
    };
    fetchCourses();
  }, []);

  const formik = useFormik<{
    title: string;
    courseName: string;
    studyTime: string;
    files: File[];
  }>({
    initialValues: {
      title: "",
      courseName: "",
      studyTime: "",
      files: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setOpen(true);
      try {
        await courseService.addCourseContent(values.courseName, {
          title: values.title,
          studyTime: values.studyTime,
          files: values.files,
        });

        enqueueSnackbar("Upload success!", {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
        resetForm();
      } catch (error: any) {
        enqueueSnackbar(error.message || "Upload failed. Please try again.", {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      } finally {
        setOpen(false);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      formik.setFieldValue("files", [...formik.values.files, ...newFiles]);
    }
  };

  const handleRemove = (index: number) => {
    const updatedFiles = [...formik.values.files];
    updatedFiles.splice(index, 1);
    formik.setFieldValue("files", updatedFiles);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafbfc" }}>
      <Sidebar />
      <Box
        sx={{
          maxWidth: 500,
          mt: 5,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Teacher Upload
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Course
            </Typography>
            <FormControl
              fullWidth
              error={
                formik.touched.courseName && Boolean(formik.errors.courseName)
              }
            >
              <Select
                name="courseName"
                value={formik.values.courseName}
                onChange={formik.handleChange}
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
              >
                {courses.map((course) => (
                  <MenuItem key={course.name} value={course.name}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter a title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ bgcolor: "#fff", borderRadius: 2 }}
            />
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Study Time
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. 30 min"
              name="studyTime"
              value={formik.values.studyTime}
              onChange={formik.handleChange}
              error={
                formik.touched.studyTime && Boolean(formik.errors.studyTime)
              }
              helperText={formik.touched.studyTime && formik.errors.studyTime}
              sx={{ bgcolor: "#fff", borderRadius: 2 }}
            />
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Upload PDF Files
            </Typography>
            <Input
              type="file"
              onChange={handleFileChange}
              sx={{ display: "none" }}
              inputProps={{
                id: "upload-input",
                accept: "application/pdf",
                multiple: true,
              }}
            />
            <label htmlFor="upload-input">
              <Button variant="outlined" component="span">
                <CloudUploadIcon sx={{ mr: 1 }} /> Choose Files
              </Button>
            </label>
            {formik.errors.files && formik.touched.files && (
              <Typography
                color="error"
                variant="caption"
                display="block"
                mt={1}
              >
                {typeof formik.errors.files === "string"
                  ? formik.errors.files
                  : "One or more files are invalid."}
              </Typography>
            )}
            {formik.values.files.length > 0 && (
              <Box mt={2}>
                {formik.values.files.map((file, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={1}
                    sx={{ bgcolor: "#fff", borderRadius: 1, mb: 1 }}
                  >
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {file.name}
                    </Typography>
                    <IconButton onClick={() => handleRemove(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
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
          <Typography mt={2}>Uploading...</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TeacherUploadPage;
