// contexts/UserContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { getMe } from "@/api/auth";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setUser as setUserAction, clearUser } from '@/store/features/userSlice';

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
  sub_user_count: number;
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
  setUser?: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const fetchMe = async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    try {
      const response = await getMe();
      dispatch(setUserAction(response.data));
    } catch (error) {
      dispatch(clearUser());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser: (user) => dispatch(setUserAction(user)), loading, refetchUser: fetchMe }}
    >
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
