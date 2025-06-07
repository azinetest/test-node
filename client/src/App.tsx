import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "@/components/routes/ProtectedRoute";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import TokenInvalid from "@/pages/auth/TokenInvalid";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import RoleList from "@/pages/role/RoleList";
import RoleForm from "@/pages/role/RoleForm";
import RoleView from "@/pages/role/RoleView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public (unauthenticated-only) Routes */}
              <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/token-invalid" element={<PublicRoute><TokenInvalid /></PublicRoute>} />

              {/* Protected Routes */}
              <Route element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                {/* Dashboard route */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Roles routes */}
                <Route path="roles">
                  <Route index element={<RoleList />} />
                  <Route path="create" element={<RoleForm />} />
                  <Route path="edit/:id" element={<RoleForm />} />
                  <Route path="view/:id" element={<RoleView />} />
                </Route>

              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;