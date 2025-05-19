import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, process.env.UPLOAD_DIR || "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use("/uploads", express.static(uploadDir));

// ▸ mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("💕  mongo connected"))
  .catch(console.error);

// ▸ schema
const chapterSchema = { title: String, studyTime: String };
const courseSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  img: String,
  chapters: Number,
  time: String,
  cost: String,
  color: String,
  details: {
    user: {
      name: String,
      avatar: String,
      progress: String,
    },
    content: [String],
    studyTime: String,
  },
  extraContent: [chapterSchema], // teacher uploads live here
});

const Course = mongoose.model("Course", courseSchema);

// ▸ CRUD routes
app.get("/api/courses", async (_, res) => res.json(await Course.find()));
app.post("/api/courses", async (req, res) =>
  res.json(await Course.create(req.body))
);

app.put("/api/courses/:name", async (req, res) =>
  res.json(
    await Course.findOneAndUpdate({ name: req.params.name }, req.body, {
      new: true,
    })
  )
);

app.delete("/api/courses/:name", async (req, res) =>
  res.json(await Course.findOneAndDelete({ name: req.params.name }))
);

// ▸ push chapter (TeacherUpload)
app.post("/api/courses/:name/details", async (req, res) => {
  const { title, studyTime } = req.body;
  const course = await Course.findOne({ name: req.params.name });
  course.extraContent.push({ title, studyTime });
  await course.save();
  res.json(course);
});

// Add file upload endpoint
app.post(
  "/api/courses/:name/upload",
  upload.array("files"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ name: req.params.name });
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Add file paths to the latest extraContent item
      const files = req.files;
      const filePaths = files.map((file) => `/uploads/${file.filename}`);

      // Update the latest extraContent item with file paths
      if (course.extraContent.length > 0) {
        const latestContent =
          course.extraContent[course.extraContent.length - 1];
        latestContent.filePath = filePaths[0]; // For now, just use the first file
      }

      await course.save();
      res.json(course);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  }
);

app.listen(4000, () => console.log("server 💫 4000"));
