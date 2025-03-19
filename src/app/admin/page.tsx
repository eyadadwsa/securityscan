import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Users,
  CreditCard,
  Settings,
  Shield,
  Search,
  AlertTriangle,
  CheckCircle2,
  Server,
  Activity,
  FileText,
  PieChart,
} from "lucide-react";
import { AdminOverview } from "@/components/admin/admin-overview";
import { UserManagement } from "@/components/admin/user-management";
import { SubscriptionManagement } from "@/components/admin/subscription-management";
import { ScanManagement } from "@/components/admin/scan-management";
import { SystemConfiguration } from "@/components/admin/system-configuration";
import { SystemMonitoring } from "@/components/admin/system-monitoring";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard - SecureSEO",
  description: "Administration dashboard for the SecureSEO platform",
};

export default function AdminDashboardPage() {
  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="Administration Dashboard"
        description="Manage users, subscriptions, and system settings"
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-7 md:w-auto w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart size={16} />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <PieChart size={16} />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={16} />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="flex items-center gap-2"
          >
            <CreditCard size={16} />
            <span className="hidden sm:inline">Subscriptions</span>
          </TabsTrigger>
          <TabsTrigger value="scans" className="flex items-center gap-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Scans</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity size={16} />
            <span className="hidden sm:inline">Monitoring</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <AdminOverview />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <SubscriptionManagement />
        </TabsContent>

        <TabsContent value="scans" className="space-y-4">
          <ScanManagement />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SystemConfiguration />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <SystemMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
}
