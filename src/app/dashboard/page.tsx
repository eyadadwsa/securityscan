import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserWebsiteOverview } from "@/components/user-dashboard/website-overview";
import { WebsiteList } from "@/components/user-dashboard/website-list";
import { RecentScans } from "@/components/user-dashboard/recent-scans";
import { ActionableRecommendations } from "@/components/user-dashboard/actionable-recommendations";
import { KeyFindings } from "@/components/user-dashboard/key-findings";

export const metadata: Metadata = {
  title: "User Dashboard - SecureSEO",
  description: "Monitor and manage your website security and SEO performance",
};

export default function UserDashboardPage() {
  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="My Dashboard"
        description="Monitor and manage your website security and SEO performance"
        lastScanDate="May 15, 2023, 14:30 PM"
      />

      <WebsiteList />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <UserWebsiteOverview />
          <KeyFindings />
          <ActionableRecommendations />
        </div>
        <div className="space-y-6">
          <RecentScans />
        </div>
      </div>
    </div>
  );
}
