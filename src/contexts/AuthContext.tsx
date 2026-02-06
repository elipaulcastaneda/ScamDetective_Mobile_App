"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export type AuthContextType = {
  isSignedIn: boolean;
  userEmail: string | null;
  userId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  userEmail: null,
  userId: null,
  loading: true,
  signOut: async () => {},
  refreshAuth: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsSignedIn(true);
        setUserEmail(data.user.email || null);
        setUserId(data.user.id);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("profile");
        setIsSignedIn(false);
        setUserEmail(null);
        setUserId(null);
      }
    } else {
      setIsSignedIn(false);
      setUserEmail(null);
      setUserId(null);
    }
    setLoading(false);
  };

  const signOut = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }

    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("profile");

    // Update state immediately
    setIsSignedIn(false);
    setUserEmail(null);
    setUserId(null);

    // Use client-side navigation instead of full page reload
    router.push("/auth/signin");
  };

  useEffect(() => {
    refreshAuth();

    // Listen for custom auth refresh event
    const handleAuthRefresh = () => {
      refreshAuth();
    };

    window.addEventListener("authRefresh", handleAuthRefresh);
    return () => window.removeEventListener("authRefresh", handleAuthRefresh);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        userEmail,
        userId,
        loading,
        signOut,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
