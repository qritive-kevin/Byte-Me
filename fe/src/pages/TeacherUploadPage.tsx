import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Input,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../Layout";
import Sidebar from "../components/sidebar";

const validationSchema = Yup.object({
  file: Yup.mixed()
    .required("A file is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      return value instanceof File && value.type === "application/pdf";
    }),
});

const TeacherUploadPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const formik = useFormik<{ file: File | null }>({
    initialValues: { file: null },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        enqueueSnackbar("Upload success!", {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
        resetForm();
      }, 2000);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("file", e.target.files[0]);
    }
  };

  const handleRemove = () => {
    formik.setFieldValue("file", null);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafbfc" }}>
      <Sidebar />
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
          Teacher Upload
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Upload a PDF File
            </Typography>
            <Input
              type="file"
              onChange={handleFileChange}
              sx={{ display: "none" }}
              inputProps={{ id: "upload-input", accept: "application/pdf" }}
            />
            <label htmlFor="upload-input">
              <Button variant="outlined" component="span">
                <CloudUploadIcon sx={{ mr: 1 }} /> Choose File
              </Button>
            </label>
            {formik.errors.file && formik.touched.file && (
              <Typography
                color="error"
                variant="caption"
                display="block"
                mt={1}
              >
                {formik.errors.file}
              </Typography>
            )}
            {formik.values.file && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={2}
                p={1}
                sx={{ bgcolor: "#fff", borderRadius: 1 }}
              >
                <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                  {formik.values.file.name}
                </Typography>
                <IconButton onClick={handleRemove}>
                  <DeleteIcon color="error" />
                </IconButton>
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
