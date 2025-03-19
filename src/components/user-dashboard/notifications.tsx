"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle2,
  Trash2,
  Search,
  Filter,
  Settings,
  Save,
} from "lucide-react";

type Notification = {
  id: string;
  type: "alert" | "info" | "success";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  website?: string;
};

const mockNotifications: Notification[] = [
  {
    id: "notif_1",
    type: "alert",
    title: "Critical Security Vulnerability Detected",
    message:
      "A critical security vulnerability has been detected on example.com. Please review the security report immediately.",
    date: "2023-05-15T10:30:00",
    isRead: false,
    website: "example.com",
  },
  {
    id: "notif_2",
    type: "info",
    title: "SEO Scan Completed",
    message:
      "The SEO scan for blog.example.com has been completed. View the report to see the results.",
    date: "2023-05-15T09:15:00",
    isRead: true,
    website: "blog.example.com",
  },
  {
    id: "notif_3",
    type: "success",
    title: "Website Verification Successful",
    message:
      "Your website myshop.example.com has been successfully verified. You can now run scans on this website.",
    date: "2023-05-14T16:45:00",
    isRead: true,
    website: "myshop.example.com",
  },
  {
    id: "notif_4",
    type: "alert",
    title: "Performance Score Decreased",
    message:
      "The performance score for example.com has decreased by 15 points since the last scan. Check the report for details.",
    date: "2023-05-14T14:20:00",
    isRead: false,
    website: "example.com",
  },
  {
    id: "notif_5",
    type: "info",
    title: "New Feature Available",
    message:
      "We've added a new feature to help you track your website's performance over time. Check it out in the dashboard.",
    date: "2023-05-13T11:10:00",
    isRead: true,
  },
  {
    id: "notif_6",
    type: "success",
    title: "Security Scan Completed",
    message:
      "The security scan for example.com has been completed with no critical issues found.",
    date: "2023-05-13T09:30:00",
    isRead: true,
    website: "example.com",
  },
  {
    id: "notif_7",
    type: "alert",
    title: "SSL Certificate Expiring Soon",
    message:
      "The SSL certificate for blog.example.com will expire in 15 days. Please renew it to avoid security warnings.",
    date: "2023-05-12T15:45:00",
    isRead: false,
    website: "blog.example.com",
  },
];

export function NotificationsPanel() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationSettings, setNotificationSettings] = useState({
    securityAlerts: true,
    seoReports: true,
    performanceAlerts: true,
    weeklyDigest: true,
    productUpdates: false,
    marketingEmails: false,
  });

  const handleNotificationChange = (checked: boolean, name: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    return (
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notif.website &&
        notif.website.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge className="bg-primary">{unreadCount} unread</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${!notification.isRead ? "bg-muted/50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(notification.date)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      {notification.website && (
                        <div className="mt-2">
                          <Badge variant="outline">
                            {notification.website}
                          </Badge>
                        </div>
                      )}
                      {!notification.isRead && (
                        <div className="mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-1">No notifications found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "You're all caught up!"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {filteredNotifications.filter((n) => !n.isRead).length > 0 ? (
              filteredNotifications
                .filter((n) => !n.isRead)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border rounded-lg bg-muted/50"
                  >
                    {/* Same content structure as above */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.date)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        {notification.website && (
                          <div className="mt-2">
                            <Badge variant="outline">
                              {notification.website}
                            </Badge>
                          </div>
                        )}
                        <div className="mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center p-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-medium mb-1">No unread notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You're all caught up!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            {filteredNotifications.filter((n) => n.type === "alert").length >
            0 ? (
              filteredNotifications
                .filter((n) => n.type === "alert")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${!notification.isRead ? "bg-muted/50" : ""}`}
                  >
                    {/* Same content structure as above */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.date)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        {notification.website && (
                          <div className="mt-2">
                            <Badge variant="outline">
                              {notification.website}
                            </Badge>
                          </div>
                        )}
                        {!notification.isRead && (
                          <div className="mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center p-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-1">No alerts found</h3>
                <p className="text-sm text-muted-foreground">
                  No security or performance alerts at this time
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            {filteredNotifications.filter(
              (n) => n.type === "info" || n.type === "success",
            ).length > 0 ? (
              filteredNotifications
                .filter((n) => n.type === "info" || n.type === "success")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${!notification.isRead ? "bg-muted/50" : ""}`}
                  >
                    {/* Same content structure as above */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.date)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        {notification.website && (
                          <div className="mt-2">
                            <Badge variant="outline">
                              {notification.website}
                            </Badge>
                          </div>
                        )}
                        {!notification.isRead && (
                          <div className="mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center p-8">
                <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-1">
                  No information notifications
                </h3>
                <p className="text-sm text-muted-foreground">
                  No system or informational notifications at this time
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Notification Settings
            </h3>
            <Button className="flex items-center gap-2" size="sm">
              <Save size={16} />
              Save Changes
            </Button>
          </div>

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
                <Label htmlFor="seoReports">SEO Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when SEO reports are completed
                </p>
              </div>
              <Switch
                id="seoReports"
                checked={notificationSettings.seoReports}
                onCheckedChange={(checked) =>
                  handleNotificationChange(checked, "seoReports")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="performanceAlerts">Performance Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts when performance scores change significantly
                </p>
              </div>
              <Switch
                id="performanceAlerts"
                checked={notificationSettings.performanceAlerts}
                onCheckedChange={(checked) =>
                  handleNotificationChange(checked, "performanceAlerts")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary of your website's performance
                </p>
              </div>
              <Switch
                id="weeklyDigest"
                checked={notificationSettings.weeklyDigest}
                onCheckedChange={(checked) =>
                  handleNotificationChange(checked, "weeklyDigest")
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
        </div>
      </CardContent>
    </Card>
  );
}
