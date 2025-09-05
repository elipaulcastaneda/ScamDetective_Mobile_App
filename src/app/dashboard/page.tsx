import { DashboardOverview } from "@/components/dashboard/overview-cards";
import { QuickScanForm } from "@/components/dashboard/quick-scan-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardOverview />
      <Card>
        <CardHeader>
          <CardTitle>Quick Scan</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickScanForm />
        </CardContent>
      </Card>
    </div>
  );
}
