import { DashboardOverview } from "@/components/dashboard/overview-cards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardOverview />
    </div>
  );
}
