import { QuickScanForm } from "@/components/dashboard/quick-scan-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function QuickScanPage() {
  return (
      <Card>
        <CardHeader>
          <CardTitle>Quick Scan</CardTitle>
          <CardDescription>Analyze text, phone numbers, emails, or websites for potential scams.</CardDescription>
        </CardHeader>
        <CardContent>
          <QuickScanForm />
        </CardContent>
      </Card>
  );
}
