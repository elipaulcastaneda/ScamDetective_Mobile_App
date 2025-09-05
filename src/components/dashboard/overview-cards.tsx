"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ShieldAlert, ShieldCheck, ShieldX, ScanLine } from "lucide-react";
import { Progress } from "../ui/progress";

const threatsData = [
  { type: "Phishing", count: 42, fill: "hsl(var(--destructive))" },
  { type: "Malware", count: 28, fill: "hsl(var(--primary))" },
  { type: "Spam", count: 78, fill: "hsl(var(--secondary))" },
];

const protectionRate = 98.6;

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Protection Rate</CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{protectionRate}%</div>
          <p className="text-xs text-muted-foreground">
            Of all threats analyzed were blocked
          </p>
        </CardContent>
        <CardFooter>
           <Progress value={protectionRate} aria-label={`${protectionRate}% protection rate`} />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
          <ScanLine className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,352</div>
          <p className="text-xs text-muted-foreground">
            +18.3% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
          <ShieldX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">148</div>
          <p className="text-xs text-muted-foreground">
            +5.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Threat Breakdown</CardTitle>
          <CardDescription>Types of threats detected this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatsData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent) / 0.5)' }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
