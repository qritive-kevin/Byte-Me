# Edu Qwen - Educational Platform

A modern educational platform that connects teachers and students through an interactive learning experience.

## Project Structure

```
edu-qwen/
├── fe/                 # Frontend React application
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/           # Backend Node.js/Express server
    ├── server.js
    ├── seed.js
    ├── package.json
    └── ...
```

## Features

### Teacher Features

#### Teacher Upload Page (`/teacher/upload`)

The Teacher Upload Page allows educators to upload and manage course materials:

- **Course Selection**: Choose from available courses to add new materials
- **Content Upload**:
  - Upload PDF files (multiple files supported)
  - Add title and study time for each upload
  - Real-time validation for file types (PDF only)
- **User Interface**:
  - Clean, intuitive form interface
  - File preview with delete capability
  - Progress indicator during upload
  - Success/error notifications
- **Backend Integration**:
  - Connects to `/api/courses` endpoint for course listing
  - Uses `/api/courses/:name/details` for content upload
  - Handles file uploads and course content updates

### Student Features

#### Student Dashboard Page (`/dashboard`)

The Student Dashboard provides students with an interactive course browsing experience:

- **Course Overview**:
  - List of available courses with key information
  - Visual course cards with images and details
  - Course selection with interactive UI
- **Course Content**:
  - Detailed course information
  - Chapter-by-chapter content listing
  - Study time indicators
  - Progress tracking
- **Additional Materials**:
  - Access to teacher-uploaded materials
  - Separate section for supplementary content
  - Study time tracking for each material
- **Interactive Elements**:
  - Chapter unlocking system
  - Navigation to quiz sections
  - Visual progress indicators
- **Backend Integration**:
  - Fetches course data from `/api/courses`
  - Real-time updates for new content
  - Error handling and loading states

## Technical Implementation

### Frontend Technologies

- React with TypeScript
- Material-UI for components
- Formik for form handling
- Yup for validation
- Axios for API communication
- React Router for navigation

### Backend Technologies

- Node.js with Express
- MongoDB with Mongoose
- Multer for file uploads
- CORS for cross-origin requests
- Environment variables with dotenv

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install backend dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edu-qwen
UPLOAD_DIR=uploads
```

4. Start MongoDB:

- Make sure MongoDB is installed and running on your system
- Or use MongoDB Atlas (cloud service)

5. Start the backend server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

6. (Optional) Seed the database with initial data:

```bash
npm run seed
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd fe
```

2. Install frontend dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm start
```

5. Access the application:

- Teacher Portal: `http://localhost:3000/teacher/upload`
- Student Dashboard: `http://localhost:3000/dashboard`

## Environment Variables

### Backend (.env)

```env
PORT=5000                    # Backend server port
MONGODB_URI=mongodb://...    # MongoDB connection string
UPLOAD_DIR=uploads          # Directory for uploaded files
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
```

## API Endpoints

### Course Management

- `GET /api/courses` - Fetch all available courses
- `POST /api/courses/:name/details` - Add new course content
  - Required fields: `title`, `studyTime`
  - Optional: PDF file uploads

### File Upload

- `POST /api/courses/:name/upload` - Upload PDF files
  - Accepts multipart/form-data
  - Files are stored in the UPLOAD_DIR

## Database Schema

```javascript
// Course Schema
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
  extraContent: [
    {
      title: String,
      studyTime: String,
      filePath: String, // Path to uploaded PDF
    },
  ],
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
