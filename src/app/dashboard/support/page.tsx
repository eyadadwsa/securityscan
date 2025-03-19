import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SupportHelp } from "@/components/user-dashboard/support-help";

export const metadata: Metadata = {
  title: "Support & Help - SecureSEO",
  description: "Get help and support for your SecureSEO account",
};

export default function SupportPage() {
  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="Support & Help Center"
        description="Get help and support for your SecureSEO account"
      />
      <SupportHelp />
    </div>
  );
}
