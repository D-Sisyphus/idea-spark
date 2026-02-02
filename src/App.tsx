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
  <Route path="/" element={<Index />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
  <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
  <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
  <Route path="/exam/:examId" element={<TakeExam />} />
  <Route path="*" element={<NotFound />} />
</Routes>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
