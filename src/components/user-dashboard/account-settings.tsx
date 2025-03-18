"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Lock,
  Bell,
  CreditCard,
  HelpCircle,
  Settings,
  Save,
} from "lucide-react";

export function AccountSettings() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Corp",
    phone: "+1 (555) 123-4567",
    bio: "Website owner and digital marketing specialist.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    securityAlerts: true,
    weeklyReports: true,
    scanCompletions: true,
    productUpdates: false,
    marketingEmails: false,
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleNotificationChange = (checked: boolean, name: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell size={16} />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="flex items-center gap-2"
            >
              <CreditCard size={16} />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock size={16} />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={profileData.company}
                  onChange={handleProfileChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="flex items-center gap-2">
                <Save size={16} />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="securityAlerts">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about critical security vulnerabilities
                  </p>
                </div>
                <Switch
                  id="securityAlerts"
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={(checked) =>
                    handleNotificationChange(checked, "securityAlerts")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyReports">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly summary reports of your website's performance
                  </p>
                </div>
                <Switch
                  id="weeklyReports"
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) =>
                    handleNotificationChange(checked, "weeklyReports")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="scanCompletions">Scan Completions</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when scans are completed
                  </p>
                </div>
                <Switch
                  id="scanCompletions"
                  checked={notificationSettings.scanCompletions}
                  onCheckedChange={(checked) =>
                    handleNotificationChange(checked, "scanCompletions")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="productUpdates">Product Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new features and improvements
                  </p>
                </div>
                <Switch
                  id="productUpdates"
                  checked={notificationSettings.productUpdates}
                  onCheckedChange={(checked) =>
                    handleNotificationChange(checked, "productUpdates")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional emails and special offers
                  </p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) =>
                    handleNotificationChange(checked, "marketingEmails")
                  }
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="flex items-center gap-2">
                <Save size={16} />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-primary">Professional</Badge>
                      <span className="text-sm text-muted-foreground">
                        $79/month
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Billing Cycle:</span> Monthly
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Next Billing Date:</span> June
                    15, 2023
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Payment Method:</span> Visa
                    ending in 4242
                  </p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Plan Features</h3>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Advanced security scanning
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Weekly SEO analysis
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Detailed performance metrics
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Up to 5 websites
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Email and PDF reports
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Billing History</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>May 15, 2023</span>
                    <span>$79.00</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View Invoice
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>April 15, 2023</span>
                    <span>$79.00</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View Invoice
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>March 15, 2023</span>
                    <span>$79.00</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" className="text-destructive">
                Cancel Subscription
              </Button>
              <Button>Update Payment Method</Button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Change Password</h3>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="w-full">Update Password</Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add an extra layer of security to your account
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Status: <span className="text-red-500">Not Enabled</span>
                    </p>
                  </div>
                  <Button>Enable 2FA</Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Login Sessions</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your active login sessions
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome on Windows • IP: 192.168.1.1
                      </p>
                    </div>
                    <Badge>Active Now</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Mobile App</p>
                      <p className="text-xs text-muted-foreground">
                        iPhone • Last active: 2 hours ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Revoke
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Logout from All Devices
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
