"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Monitor, Database, LogOut, Trash2, Download, Lightbulb } from "lucide-react";
import { clearScanHistory } from "@/lib/scanHistory";

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [username, setUsername] = useState("BaritoneTiger01")
  const [email, setEmail] = useState("elipaulcastaneda@gmail.com")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveProfile = () => {
    // TODO: Save profile to backend
    console.log("Saving profile:", { username, email })
  }

  const handleExportData = () => {
    // TODO: Export scan history
    console.log("Exporting data...")
  }

  const handleSignOut = () => {
    // TODO: Sign out logic
    console.log("Signing out...")
  }

  const handleDeleteData = () => {
    if (confirm("Are you sure you want to permanently delete all your stored data? This action cannot be undone.")) {
      clearScanHistory()
      console.log("Data deleted")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Customize your Scam Detective experience</p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSaveProfile}>Save Profile</Button>
          <div className="flex items-start gap-2 mt-4 text-sm text-muted-foreground">
            <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>Your email and name are used for Team Management (admin registration and invitations)</p>
          </div>
        </CardContent>
      </Card>

      {/* Display Theme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Display Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mounted && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Light Mode */}
              <button
                onClick={() => setTheme("light")}
                className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                  theme === "light" 
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" 
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                {theme === "light" && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                      Selected
                    </span>
                  </div>
                )}
                <div className="space-y-3">
                  <div className="font-semibold text-lg">Light Mode</div>
                  <p className="text-sm text-muted-foreground">
                    Bright, high contrast for daytime viewing
                  </p>
                  <div className="rounded-lg border bg-card overflow-hidden">
                    <div className="flex items-center gap-2 border-b bg-background/50 px-3 py-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <div className="space-y-2 p-4 bg-white">
                      <div className="h-2 w-3/4 rounded bg-slate-200" />
                      <div className="h-2 w-full rounded bg-slate-200" />
                      <div className="h-2 w-5/6 rounded bg-slate-200" />
                    </div>
                  </div>
                  <Button 
                    variant={theme === "light" ? "default" : "outline"} 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setTheme("light")
                    }}
                  >
                    {theme === "light" ? "Using Light Mode" : "Use Light Mode"}
                  </Button>
                </div>
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setTheme("dark")}
                className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                  theme === "dark" 
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" 
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                {theme === "dark" && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                      Selected
                    </span>
                  </div>
                )}
                <div className="space-y-3">
                  <div className="font-semibold text-lg">Dark Mode</div>
                  <p className="text-sm text-muted-foreground">
                    Dimmed UI with light text for low light
                  </p>
                  <div className="rounded-lg border bg-card overflow-hidden">
                    <div className="flex items-center gap-2 border-b bg-slate-800 px-3 py-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <div className="space-y-2 p-4 bg-slate-900">
                      <div className="h-2 w-3/4 rounded bg-slate-700" />
                      <div className="h-2 w-full rounded bg-slate-700" />
                      <div className="h-2 w-5/6 rounded bg-slate-700" />
                    </div>
                  </div>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"} 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setTheme("dark")
                    }}
                  >
                    {theme === "dark" ? "Using Dark Mode" : "Use Dark Mode"}
                  </Button>
                </div>
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Privacy & Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground">
                Download a copy of your scan history and reports
              </p>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Sign Out
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Sign out of your account on this device</p>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Delete Data */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Delete Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Delete Data</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete all your stored data. This does not delete your account.
            </p>
          </div>
          <Button variant="destructive" onClick={handleDeleteData}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
