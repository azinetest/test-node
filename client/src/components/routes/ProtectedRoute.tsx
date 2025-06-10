import { Navigate } from "react-router-dom";
import { UserProvider, useUser } from '@/contexts/UserContext';
import Loader from "@/components/ui/loader";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/" />;
  return children;
};

export const PublicRoute = ({ children }) => {
  const { user, loading } = useUser();
  if (loading) return <Loader />;
  if (user) return <Navigate to="/dashboard" />;
  return children;
};