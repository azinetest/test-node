import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Navigate } from 'react-router-dom';

// PermissionGuard: Protects routes by redirecting unauthorized users to forbidden page
const PermissionGuard = ({ permission, children }) => {
  const { user } = useUser();

  if (!user || !user.role_id || !user.role_id.permissions) return null;

  // Super admin has access to everything
  if (user.role_id.slug === 'super-admin') {
    return <>{children}</>;
  }

  // Check if user has required permission, redirect to forbidden if not
  if (user.role_id.permissions.includes(permission)) {
    return <>{children}</>;
  }

  return <Navigate to="/forbidden" />;
};

// Can: Conditionally renders children based on user permissions
const CanAccess = ({ permission, children }) => {
  const { user } = useUser();

  if (!user || !user.role_id || !user.role_id.permissions) return null;

  // Super admin has access to everything
  if (user.role_id.slug === 'super-admin') {
    return <>{children}</>;
  }

  // Render children only if user has required permission
  if (user.role_id.permissions.includes(permission)) {
    return <>{children}</>;
  }

  return null;
};

export { PermissionGuard, CanAccess };