"use client";

import { useEffect, useState } from "react";
import appPackage from "../../package.json";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ReleaseInfo = {
  tag: string;
  url: string;
};

const DISMISSED_KEY = "scam_detective_update_dismissed";

function parseVersion(value: string): number[] {
  const cleaned = value.trim().replace(/^v/i, "");
  return cleaned.split(".").map((part) => Number(part) || 0);
}

function isNewerVersion(latest: string, current: string): boolean {
  const latestParts = parseVersion(latest);
  const currentParts = parseVersion(current);
  const maxLength = Math.max(latestParts.length, currentParts.length);

  for (let i = 0; i < maxLength; i += 1) {
    const latestValue = latestParts[i] ?? 0;
    const currentValue = currentParts[i] ?? 0;
    if (latestValue > currentValue) return true;
    if (latestValue < currentValue) return false;
  }

  return false;
}

export function UpdateCheck() {
  const [open, setOpen] = useState(false);
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);

  useEffect(() => {
    const checkForUpdate = async () => {
      const currentVersion = appPackage.version || "0.0.0";
      if (!currentVersion) return;

      try {
        const response = await fetch(
          "https://api.github.com/repos/elipaulcastaneda/ScamDetective_Mobile_App/releases/latest",
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!response.ok) return;
        const data = (await response.json()) as { tag_name?: string; html_url?: string };
        if (!data.tag_name || !data.html_url) return;

        const dismissed = localStorage.getItem(DISMISSED_KEY);
        const latestTag = data.tag_name;

        if (dismissed === latestTag) return;
        if (!isNewerVersion(latestTag, currentVersion)) return;

        setReleaseInfo({ tag: latestTag, url: data.html_url });
        setOpen(true);
      } catch (error) {
        console.warn("Update check failed", error);
      }
    };

    checkForUpdate();
  }, []);

  const handleLater = () => {
    if (releaseInfo) {
      localStorage.setItem(DISMISSED_KEY, releaseInfo.tag);
    }
    setOpen(false);
  };

  const handleUpdateNow = () => {
    if (releaseInfo?.url) {
      window.open(releaseInfo.url, "_blank", "noopener,noreferrer");
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Available</AlertDialogTitle>
          <AlertDialogDescription>
            A newer version ({releaseInfo?.tag}) is available. Please update to get the latest fixes and features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleLater}>Later</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdateNow}>Update Now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
