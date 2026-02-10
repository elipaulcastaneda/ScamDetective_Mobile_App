"use client";

import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  History,
  Flag,
  Puzzle,
  Settings,
  ScanLine,
  CreditCard,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { UpdateCheck } from "@/components/update-check";

const menuItems = [
  // { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/quick-scan", icon: ScanLine, label: "Quick Scan" },
  { href: "/history", icon: History, label: "Scan History" },
  // { href: "/team", icon: Users, label: "Team Admin" },
  // { href: "/report", icon: Flag, label: "Report a Scam" },
  { href: "/extension", icon: Puzzle, label: "Web Extension" },
  // { href: "/subscription", icon: CreditCard, label: "Subscription" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

// Show all items in bottom nav on mobile
const mobileMenuItems = menuItems;

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      {/* Desktop Sidebar - hidden on mobile */}
      <Sidebar className="hidden md:flex">
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Logo className="h-8 w-8 text-primary" />
            <div className="group-data-[collapsible=icon]:hidden">
              <h2 className="text-lg font-headline font-bold">ScamDetective</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* Footer content if any */}
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="flex flex-col md:h-screen">
        <UpdateCheck />
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 border-b md:hidden">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <h2 className="text-lg font-headline font-bold">ScamDetective</h2>
          </div>
        </header>
        
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-4 border-b">
          <SidebarTrigger />
        </header>
        
        {/* Main Content - with bottom padding on mobile for nav */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24 md:pb-4">{children}</main>
      </SidebarInset>
      
      {/* Mobile Bottom Navigation - Outside SidebarInset */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden h-16">
        <div className="flex items-center h-full w-full">
          {mobileMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center h-full gap-1 text-xs transition-colors",
                  isActive 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px]">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </SidebarProvider>
  );
}
