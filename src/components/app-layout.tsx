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
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "./logo";

const menuItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/quick-scan", icon: ScanLine, label: "Quick Scan" },
  { href: "/history", icon: History, label: "Scan History" },
  { href: "/report", icon: Flag, label: "Report a Scam" },
  { href: "/extension", icon: Puzzle, label: "Web Extension" },
  { href: "/subscription", icon: CreditCard, label: "Subscription" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <SidebarTrigger />
            </Button>
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
      <SidebarInset>
        <header className="flex items-center justify-end md:justify-between p-4 border-b">
          <div className="hidden md:block">
            <SidebarTrigger />
          </div>
          {/* Header content like user menu could go here */}
        </header>
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
