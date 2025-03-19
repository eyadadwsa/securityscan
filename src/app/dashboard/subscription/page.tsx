import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SubscriptionManagement } from "@/components/user-dashboard/subscription-management";

export const metadata: Metadata = {
  title: "Subscription Management - SecureSEO",
  description: "Manage your subscription plan and billing information",
};

export default function SubscriptionPage() {
  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="Subscription Management"
        description="Manage your subscription plan and billing information"
      />
      <SubscriptionManagement />
    </div>
  );
}
