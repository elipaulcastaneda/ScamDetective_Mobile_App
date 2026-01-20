"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Shield, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "../ui/progress";

const riskDistributionData = [
  { name: 'Low Risk', value: 900, color: 'bg-green-500' },
  { name: 'Medium Risk', value: 200, color: 'bg-yellow-500' },
  { name: 'High Risk', value: 45, color: 'bg-red-500' },
];

const threatTypesData = [
  { name: 'Phishing', value: 35, color: 'bg-blue-500' },
  { name: 'Malware', value: 20, color: 'bg-purple-500' },
  { name: 'Fake Website', value: 15, color: 'bg-orange-500' },
  { name: 'Identity Theft', value: 10, color: 'bg-pink-500' },
  { name: 'Phone Scam', value: 7, color: 'bg-yellow-600' },
  { name: 'Other', value: 2, color: 'bg-gray-500' },
];

const recentActivityData = [
  { type: 'Phishing Email', time: '1/19/2026, 7:29:39 PM', risk: 'high' },
  { type: 'Suspicious Website', time: '1/19/2026, 7:19:39 PM', risk: 'medium' },
  { type: 'Safe Link', time: '1/19/2026, 7:04:39 PM', risk: 'low' },
  { type: 'Malware Detection', time: '1/19/2026, 6:49:39 PM', risk: 'high' },
];

const totalScans = 1234;
const threatsBlocked = 89;
const protectionRate = 7;

export function DashboardOverview() {
  const totalRisk = riskDistributionData.reduce((acc, curr) => acc + curr.value, 0);
  const maxThreat = Math.max(...threatTypesData.map(t => t.value));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your scam protection activity</p>
      </div>

      {/* Top Metric Cards - Horizontal Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Total Scans</CardTitle>
            <Search className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-3xl font-bold">{totalScans.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Threats Blocked</CardTitle>
            <Shield className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-3xl font-bold text-red-600">{threatsBlocked}</div>
            <p className="text-sm text-muted-foreground">Potential scams detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Protection Rate</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-3xl font-bold text-green-600">{protectionRate}%</div>
            <p className="text-sm text-muted-foreground">Scams successfully identified</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - 3 Cards Horizontally */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Risk Level Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Risk Level Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskDistributionData.map((risk) => (
              <div key={risk.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${risk.color}`} />
                    <span className="text-sm font-medium">{risk.name}</span>
                  </div>
                  <span className="text-sm font-bold">{risk.value}</span>
                </div>
                <Progress 
                  value={(risk.value / totalRisk) * 100} 
                  className="h-2"
                  indicatorClassName={risk.color}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Threat Types Detected */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Threat Types Detected</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {threatTypesData.map((threat) => (
              <div key={threat.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${threat.color}`} />
                    <span className="text-sm font-medium">{threat.name}</span>
                  </div>
                  <span className="text-sm font-bold">{threat.value}</span>
                </div>
                <Progress 
                  value={(threat.value / maxThreat) * 100} 
                  className="h-2"
                  indicatorClassName={threat.color}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivityData.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                  activity.risk === 'high' ? 'bg-red-500' : 
                  activity.risk === 'medium' ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.type}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge 
                  variant={activity.risk === 'high' ? 'destructive' : 'secondary'}
                  className={
                    activity.risk === 'high' ? 'bg-red-500/10 text-red-700 dark:text-red-400' :
                    activity.risk === 'medium' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' :
                    'bg-green-500/10 text-green-700 dark:text-green-400'
                  }
                >
                  {activity.risk}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
