import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NotificationsPanel } from "@/components/user-dashboard/notifications";

export const metadata: Metadata = {
  title: "Notifications - SecureSEO",
  description: "Manage your notifications and alerts",
};

export default function NotificationsPage() {
  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="Notifications"
        description="Manage your notifications and alerts"
      />
      <NotificationsPanel />
    </div>
  );
}
