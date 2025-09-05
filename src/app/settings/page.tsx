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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account and app preferences.</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="two-factor-auth" className="flex flex-col space-y-1">
              <span>Enable Two-Factor Authentication</span>
              <span className="font-normal leading-snug text-muted-foreground">
                You'll be asked for a code from your authenticator app when you sign in.
              </span>
            </Label>
            <Switch id="two-factor-auth" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" disabled>Set Up Authenticator App</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize the app to your liking.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Theme</Label>
            {mounted && (
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="grid max-w-md grid-cols-3 gap-8 pt-2"
            >
              <div
              >
                <Label className="[&:has([data-state=checked])>div]:border-primary">
                  <RadioGroupItem value="light" className="sr-only" />
                  <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                    <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                      <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                        <div className="h-2 w-4/5 rounded-lg bg-[#ecedef]" />
                        <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                        <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                        <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                      </div>
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal">
                    Light
                  </span>
                </Label>
              </div>
              <div
              >
                <Label className="[&:has([data-state=checked])>div]:border-primary">
                  <RadioGroupItem value="dark" className="sr-only" />
                  <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:border-accent">
                    <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                      <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                        <div className="h-2 w-4/5 rounded-lg bg-slate-400" />
                        <div className="h-2 w-full rounded-lg bg-slate-400" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                        <div className="h-2 w-full rounded-lg bg-slate-400" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                        <div className="h-2 w-full rounded-lg bg-slate-400" />
                      </div>
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal">
                    Dark
                  </span>
                </Label>
              </div>
              <div
              >
                <Label className="[&:has([data-state=checked])>div]:border-primary">
                  <RadioGroupItem value="system" className="sr-only" />
                  <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                     <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                       <div className="h-14 w-full rounded-lg bg-slate-400/50" />
                     </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal">
                    System
                  </span>
                </Label>
              </div>
            </RadioGroup>
            )}
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="real-time-scanning" className="flex flex-col space-y-1">
              <span>Enable Real-time Scanning</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Automatically scan content when using the browser extension.
              </span>
            </Label>
            <Switch id="real-time-scanning" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive weekly summaries and security alerts via email.
              </span>
            </Label>
            <Switch id="email-notifications" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
