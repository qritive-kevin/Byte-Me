import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/HomePage";

import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import WizardzPage from "./pages/landings/wizardz";
import AboutUsPage from "./pages/AboutUsPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import StudentBotPage from "./pages/StudentBotPage";
import TeacherListingPage from "./pages/TeacherListingPage";
import TeacherUploadPage from "./pages/TeacherUploadPage";
import StudentQuizPage from "./pages/StudentQuizPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use the Layout as the top-level route element
    errorElement: <ErrorPage />, // Set a default error element here
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/ai-bot", element: <StudentBotPage /> },
      { path: "/dashboard", element: <StudentDashboardPage /> },
      { path: "/quiz", element: <StudentQuizPage /> },
      { path: "/teacher/tracking", element: <TeacherListingPage /> },
      { path: "/teacher/uplaod", element: <TeacherUploadPage /> },
      { path: "/wizardz", element: <WizardzPage /> },
      // {
      //   path: "/member/profile",
      //   element: (
      //     <ProtectedRoute>
      //       {/* <Profile /> */}
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
]);

function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
