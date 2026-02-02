import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Role = "student" | "teacher" | "admin";

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: Role[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  // ❌ Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;
