import api from "../utils/axiosConfig";

export interface Course {
  name: string;
  img: string;
  chapters: number;
  time: string;
  cost: string;
  color: string;
  details: {
    user: {
      name: string;
      avatar: string;
      progress: string;
    };
    content: string[];
    studyTime: string;
  };
  extraContent: Array<{
    title: string;
    studyTime: string;
    filePath?: string;
  }>;
}

export interface CourseContent {
  title: string;
  studyTime: string;
  files: File[];
}

export const courseService = {
  // Get all courses
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const response = await api.get<Course[]>("/courses");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch courses");
    }
  },

  // Add new course content (for teachers)
  addCourseContent: async (courseName: string, content: CourseContent): Promise<Course> => {
    try {
      // First upload files if any
      if (content.files.length > 0) {
        const formData = new FormData();
        content.files.forEach((file) => {
          formData.append("files", file);
        });
        await api.post(`/courses/${courseName}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Then add the course content
      const response = await api.post<Course>(`/courses/${courseName}/details`, {
        title: content.title,
        studyTime: content.studyTime,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to add course content");
    }
  },

  // Get course details
  getCourseDetails: async (courseName: string): Promise<Course> => {
    try {
      const response = await api.get<Course>(`/courses/${courseName}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch course details");
    }
  },

  // Update course progress (for students)
  updateCourseProgress: async (courseName: string, progress: string): Promise<Course> => {
    try {
      const response = await api.put<Course>(`/courses/${courseName}/progress`, { progress });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to update course progress");
    }
  }
}; 