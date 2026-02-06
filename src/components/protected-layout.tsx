"use client";

import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/app-layout";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not signed in, show only auth pages (sign-in, sign-up)
  // Otherwise show the full app layout with navigation
  if (!isSignedIn) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
