import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AccountSettings } from "@/components/user-dashboard/account-settings";

export const metadata: Metadata = {
  title: "Account Settings - SecureSEO",
  description: "Manage your account settings and preferences",
};

export default function AccountPage() {
  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="Account Settings"
        description="Manage your account settings and preferences"
      />

      <AccountSettings />
    </div>
  );
}
