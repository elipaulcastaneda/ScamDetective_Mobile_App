"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (isSignedIn) {
      router.push("/quick-scan");
    } else {
      router.push("/auth/signin");
    }
  }, [isSignedIn, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
