import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import CreateExam from "./pages/teacher/CreateExam";
import ManageExams from "./pages/teacher/ManageExams";
import ExamAnalytics from "./pages/teacher/ExamAnalytics";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TakeExam from "./pages/exam/TakeExam";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Teacher routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/exams"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <ManageExams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/exams/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/exams/:examId"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <ExamAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Student routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Exam attempt (student only) */}
        <Route
          path="/exam/:examId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <TakeExam />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
