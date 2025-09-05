import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SubscriptionPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>
          Manage your billing and subscription plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Current Plan: <span className="text-primary">Pro</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Your plan renews on August 1, 2024.
            </p>
          </div>
          <Button variant="outline">Manage Subscription</Button>
        </div>
      </CardContent>
    </Card>
  );
}
