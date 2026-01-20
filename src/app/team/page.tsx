import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Users, Activity, TrendingUp, AlertTriangle, UserCircle } from "lucide-react";

const metrics = [
  { title: "Total Scans", value: "3", icon: Activity, accent: "text-blue-600" },
  { title: "Threats Detected", value: "2", icon: AlertTriangle, accent: "text-red-600" },
  { title: "Avg Risk Score", value: "33%", icon: TrendingUp, accent: "text-amber-600" },
  { title: "High Risk Users", value: "1", icon: Users, accent: "text-purple-600" },
];

const teamMembers = [
  {
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    totalScans: 2,
    threatsBlocked: 2,
    protectionRate: "100%",
    riskLevel: "Medium Risk",
    riskBadge: "bg-amber-100 text-amber-700",
    lastScan: "7:32:39 PM",
    riskTypes: { low: 0, medium: 0, high: 0 },
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    totalScans: 1,
    threatsBlocked: 0,
    protectionRate: "0%",
    riskLevel: "Low Risk",
    riskBadge: "bg-emerald-100 text-emerald-700",
    lastScan: "7:29:39 PM",
    riskTypes: { low: 0, medium: 0, high: 0 },
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Team Monitoring</h1>
          <p className="text-muted-foreground">Monitor employee communications and scan activity</p>
          <p className="text-red-600 mt-2 text-sm">Team sync not configured. Showing mock data.</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 hidden md:inline-flex items-center gap-1">
          <ShieldAlert className="h-4 w-4" /> Admin Only
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <metric.icon className={`h-5 w-5 ${metric.accent}`} />
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${metric.accent}`}>{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Per-user scan activity and protection performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.email} className="rounded-xl border p-4 shadow-sm bg-card text-card-foreground space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                    {member.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={member.riskBadge}>{member.riskLevel}</Badge>
                  <span className="text-xs text-muted-foreground">Last scan: {member.lastScan}</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <MetricTile label="Total Scans" value={member.totalScans} icon={SearchIcon} />
                <MetricTile label="Threats Blocked" value={member.threatsBlocked} icon={ShieldIcon} valueClass="text-red-600" />
                <MetricTile label="Protection Rate" value={member.protectionRate} icon={CheckIcon} valueClass="text-emerald-600" />
                <RiskTypesTile riskTypes={member.riskTypes} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function MetricTile({ label, value, icon: Icon, valueClass }: { label: string; value: string | number; icon: React.ComponentType<{ className?: string }>; valueClass?: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className={`text-xl font-semibold ${valueClass ?? "text-foreground"}`}>{value}</div>
    </div>
  );
}

function RiskTypesTile({ riskTypes }: { riskTypes: { low: number; medium: number; high: number } }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Risk Types</span>
        <UserCircle className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Low</span>
          <span className="font-medium">{riskTypes.low}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" /> Medium</span>
          <span className="font-medium">{riskTypes.medium}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" /> High</span>
          <span className="font-medium">{riskTypes.high}</span>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: { className?: string }) {
  return <Activity {...props} />;
}

function ShieldIcon(props: { className?: string }) {
  return <ShieldAlert {...props} />;
}

function CheckIcon(props: { className?: string }) {
  return <TrendingUp {...props} />;
}
