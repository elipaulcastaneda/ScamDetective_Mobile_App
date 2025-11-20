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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ShieldAlert, ShieldCheck, ShieldX, ScanLine } from "lucide-react";
import { Progress } from "../ui/progress";

const threatsData = [
  { type: "Phishing", count: 42, fill: "hsl(var(--chart-1))" },
  { type: "Malware", count: 28, fill: "hsl(var(--chart-2))" },
  { type: "Spam", count: 78, fill: "hsl(var(--chart-3))" },
];

const riskDistributionData = [
    { name: 'Low', value: 811, fill: 'hsl(var(--chart-2))' },
    { name: 'Medium', value: 352, fill: 'hsl(var(--chart-4))' },
    { name: 'High', value: 189, fill: 'hsl(var(--chart-1))' },
];

const totalScans = riskDistributionData.reduce((acc, curr) => acc + curr.value, 0);

const protectionRate = 98.6;

export function DashboardOverview() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="text-2xl font-bold">{totalScans.toLocaleString()}</div>
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
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Risk Levels</CardTitle>
          <ShieldAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex items-center justify-center p-0">
          <ChartContainer config={{}} className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--accent) / 0.5)' }}
                        content={<ChartTooltipContent />}
                    />
                    <Pie
                        data={riskDistributionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                    >
                        {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                     <ChartLegendContent />
                </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="sm:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Threat Breakdown</CardTitle>
          <CardDescription>Types of threats detected this month.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <ChartContainer config={{}} className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatsData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
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
