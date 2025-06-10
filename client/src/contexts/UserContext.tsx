// contexts/UserContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { getMe } from "@/api/auth";

// Types based on API response
interface CompanyProfile {
  name: string;
  email: string;
  phone: string;
}

interface Role {
  _id: string;
  name: string;
  slug: string;
  permissions: string[];
}

export interface AuthUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: number;
  role_id: Role;
  parent_id: string | null;
  profile_pic: string;
  company_profile: CompanyProfile;
  subscribe_services: string[];
  expired_at: string;
  extra_user_limit: number;
  created_by: string | null;
  updated_by: string | null;
  createdAt: string;
  updatedAt: string;
  username: string;
}

interface UserContextType {
  user: AuthUser | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const fetchMe = async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    try {
      const response = await getMe();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refetchUser: fetchMe }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};