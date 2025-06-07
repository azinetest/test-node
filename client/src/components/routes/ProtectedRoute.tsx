import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/ui/loader";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/" />;
  return children;
};

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (user) return <Navigate to="/dashboard" />;
  return children;
};