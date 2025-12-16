"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getMyProfile,
  login as apiLogin,
  UserProfile,
  getMyNotifications,
  Notification,
} from "@/lib/apihelper";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
  fetchUser: () => Promise<void>;
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  setTokenAndFetchUser: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();

  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await getMyProfile();
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setUser(null);
      }
    }
  };

  const fetchNotifications = async () => {
    if (!localStorage.getItem("authToken")) return;
    try {
      const res = await getMyNotifications();
      setNotifications(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    const checkUserSession = async () => {
      await fetchUser();
      await fetchNotifications();
      setLoading(false);
    };

    checkUserSession();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const login = async (credentials: any) => {
    setLoading(true);
    try {
      const response = await apiLogin(credentials);
      const { token, user: userData } = response.data;
      localStorage.setItem("authToken", token);
      setUser(userData);
      await fetchNotifications(); // Ambil notifikasi setelah login berhasil
      router.push("/");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setNotifications([]); // Kosongkan notifikasi saat logout
    router.push("/auth/login");
  };

  const setTokenAndFetchUser = async (token: string) => {
    localStorage.setItem("authToken", token);
    await fetchUser();
    await fetchNotifications();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    fetchUser,
    notifications,
    fetchNotifications,
    setTokenAndFetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
