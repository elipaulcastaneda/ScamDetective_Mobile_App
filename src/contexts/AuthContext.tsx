"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

export type AuthContextType = {
  isSignedIn: boolean;
  userEmail: string | null;
  userId: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  userEmail: null,
  userId: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      // Check if we have a token in localStorage
      const token = localStorage.getItem("authToken");
      if (token) {
        // Try to get the current user
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setIsSignedIn(true);
          setUserEmail(data.user.email || null);
          setUserId(data.user.id);
        } else {
          // Token invalid, clear it
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("profile");
        }
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for storage changes (sign-out from another tab)
    const handleStorageChange = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsSignedIn(false);
        setUserEmail(null);
        setUserId(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        userEmail,
        userId,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
