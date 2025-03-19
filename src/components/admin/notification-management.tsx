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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Search,
  Plus,
  Save,
  Trash2,
  Calendar,
  Users,
  Settings,
  AlertTriangle,
  FileText,
  RefreshCw,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  MessageSquare,
  Smartphone,
  BarChart,
  FileTemplate,
  Send,
  ChevronDown,
  ChevronUp,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: string;
  recipient: string;
  recipientType: string;
  subject: string;
  message: string;
  status: "sent" | "scheduled" | "draft";
  readStatus: "read" | "unread" | "n/a";
  channels: string[];
  sentAt?: string;
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  message: string;
  channels: string[];
  createdAt: string;
  updatedAt: string;
  lastUsed?: string;
}

interface NotificationStat {
  notificationId: string;
  notificationName: string;
  date: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  openRate: number;
  clickRate: number;
}

export function NotificationManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showAddNotificationDialog, setShowAddNotificationDialog] =
    useState(false);
  const [showAddTemplateDialog, setShowAddTemplateDialog] = useState(false);
  const [newNotification, setNewNotification] = useState({
    type: "security-alert",
    recipientType: "all-users",
    recipient: "",
    subject: "",
    message: "",
    channels: ["email", "in-app"],
    status: "draft",
    scheduledFor: "",
  });
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "security-alert",
    subject: "",
    message: "",
    channels: ["email", "in-app"],
  });

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "security-alert",
      recipient: "all-users",
      recipientType: "group",
      subject: "Critical Security Vulnerability Detected",
      message:
        "We've detected a critical security vulnerability on your website. Please log in to your dashboard to view the details and take immediate action.",
      status: "sent",
      readStatus: "read",
      channels: ["email", "in-app"],
      sentAt: "2023-10-15T14:30:00Z",
      createdAt: "2023-10-15T14:25:00Z",
      updatedAt: "2023-10-15T14:30:00Z",
    },
    {
      id: "2",
      type: "system-update",
      recipient: "all-users",
      recipientType: "group",
      subject: "Platform Maintenance Scheduled",
      message:
        "We will be performing scheduled maintenance on our platform on October 20th from 2:00 AM to 4:00 AM UTC. During this time, the service may be temporarily unavailable.",
      status: "sent",
      readStatus: "unread",
      channels: ["email", "in-app"],
      sentAt: "2023-10-14T10:15:00Z",
      createdAt: "2023-10-14T09:00:00Z",
      updatedAt: "2023-10-14T10:15:00Z",
    },
    {
      id: "3",
      type: "report-ready",
      recipient: "john.doe@example.com",
      recipientType: "user",
      subject: "Your SEO Analysis Report is Ready",
      message:
        "Your weekly SEO analysis report is now available. Log in to your dashboard to view the results and recommendations for improving your website's search engine ranking.",
      status: "sent",
      readStatus: "read",
      channels: ["email", "in-app", "sms"],
      sentAt: "2023-10-13T16:45:00Z",
      createdAt: "2023-10-13T16:40:00Z",
      updatedAt: "2023-10-13T16:45:00Z",
    },
    {
      id: "4",
      type: "promotional",
      recipient: "premium-users",
      recipientType: "group",
      subject: "New Premium Features Available",
      message:
        "We've added exciting new features to our premium plan! Check out the enhanced security scanning, advanced SEO tools, and improved performance analytics.",
      status: "scheduled",
      readStatus: "n/a",
      channels: ["email", "in-app"],
      scheduledFor: "2023-10-20T09:00:00Z",
      createdAt: "2023-10-12T11:20:00Z",
      updatedAt: "2023-10-12T11:20:00Z",
    },
    {
      id: "5",
      type: "welcome",
      recipient: "jane.smith@example.com",
      recipientType: "user",
      subject: "Welcome to SecureSEO!",
      message:
        "Welcome to SecureSEO! We're excited to have you on board. Here's how to get started with our platform and make the most of your website security and SEO optimization.",
      status: "draft",
      readStatus: "n/a",
      channels: ["email"],
      createdAt: "2023-10-11T15:30:00Z",
      updatedAt: "2023-10-11T15:30:00Z",
    },
  ]);

  // Sample templates data
  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      id: "1",
      name: "Security Alert Template",
      type: "security-alert",
      subject: "Security Alert: {alert_type} Detected",
      message:
        "We've detected a {alert_severity} security issue ({alert_type}) on your website. Please log in to your dashboard to view the details and take immediate action. Impact: {alert_impact}\n\nRecommended action: {recommended_action}",
      channels: ["email", "in-app"],
      createdAt: "2023-09-15T10:00:00Z",
      updatedAt: "2023-10-01T14:20:00Z",
      lastUsed: "2023-10-15T14:25:00Z",
    },
    {
      id: "2",
      name: "Weekly Report Template",
      type: "report-ready",
      subject: "Your {report_type} Report for {website_name} is Ready",
      message:
        "Your {report_frequency} {report_type} report for {website_name} is now available. Log in to your dashboard to view the results and recommendations.\n\nReport highlights:\n- {highlight_1}\n- {highlight_2}\n- {highlight_3}\n\nView your full report here: {report_link}",
      channels: ["email", "in-app"],
      createdAt: "2023-09-20T11:30:00Z",
      updatedAt: "2023-09-25T09:15:00Z",
      lastUsed: "2023-10-13T16:40:00Z",
    },
    {
      id: "3",
      name: "Welcome Email Template",
      type: "welcome",
      subject: "Welcome to SecureSEO, {user_name}!",
      message:
        "Hi {user_name},\n\nWelcome to SecureSEO! We're excited to have you on board. Here's how to get started with our platform:\n\n1. Verify your website ownership\n2. Run your first security scan\n3. Check your initial SEO score\n\nIf you need any help, our support team is available 24/7.\n\nBest regards,\nThe SecureSEO Team",
      channels: ["email"],
      createdAt: "2023-08-10T13:45:00Z",
      updatedAt: "2023-09-05T10:20:00Z",
      lastUsed: "2023-10-11T15:30:00Z",
    },
    {
      id: "4",
      name: "System Maintenance Template",
      type: "system-update",
      subject: "Scheduled Maintenance: {maintenance_date}",
      message:
        "We will be performing scheduled maintenance on our platform on {maintenance_date} from {start_time} to {end_time} {timezone}. During this time, the service may be temporarily unavailable.\n\nWe apologize for any inconvenience this may cause and appreciate your understanding as we work to improve our platform.\n\nThe SecureSEO Team",
      channels: ["email", "in-app"],
      createdAt: "2023-09-01T09:30:00Z",
      updatedAt: "2023-09-01T09:30:00Z",
      lastUsed: "2023-10-14T09:00:00Z",
    },
  ]);

  // Sample performance data
  const [performanceData, setPerformanceData] = useState<NotificationStat[]>([
    {
      notificationId: "1",
      notificationName: "Critical Security Vulnerability Detected",
      date: "2023-10-15",
      sent: 1250,
      delivered: 1245,
      opened: 1050,
      clicked: 980,
      openRate: 0.84,
      clickRate: 0.78,
    },
    {
      notificationId: "2",
      notificationName: "Platform Maintenance Scheduled",
      date: "2023-10-14",
      sent: 2500,
      delivered: 2490,
      opened: 1800,
      clicked: 450,
      openRate: 0.72,
      clickRate: 0.18,
    },
    {
      notificationId: "3",
      notificationName: "Your SEO Analysis Report is Ready",
      date: "2023-10-13",
      sent: 850,
      delivered: 848,
      opened: 720,
      clicked: 680,
      openRate: 0.85,
      clickRate: 0.8,
    },
  ]);

  // Sample audit log data
  const auditLogs = [
    {
      id: "1",
      action: "Notification Sent",
      notificationName: "Critical Security Vulnerability Detected",
      user: "admin@secureseo.com",
      timestamp: "2023-10-15T14:30:00Z",
      details: "Sent to all users (1250 recipients)",
    },
    {
      id: "2",
      action: "Template Updated",
      notificationName: "Security Alert Template",
      user: "admin@secureseo.com",
      timestamp: "2023-10-01T14:20:00Z",
      details: "Updated message content and subject line",
    },
    {
      id: "3",
      action: "Notification Scheduled",
      notificationName: "New Premium Features Available",
      user: "admin@secureseo.com",
      timestamp: "2023-10-12T11:20:00Z",
      details: "Scheduled for 2023-10-20T09:00:00Z",
    },
    {
      id: "4",
      action: "Notification Cancelled",
      notificationName: "Beta Feature Announcement",
      user: "admin@secureseo.com",
      timestamp: "2023-10-10T16:20:00Z",
      details: "Cancelled scheduled notification",
    },
    {
      id: "5",
      action: "Settings Updated",
      notificationName: "System Notification Settings",
      user: "admin@secureseo.com",
      timestamp: "2023-10-08T13:10:00Z",
      details: "Updated default notification channels",
    },
  ];

  const handleAddNotification = () => {
    const newNotificationEntry: Notification = {
      id: (notifications.length + 1).toString(),
      type: newNotification.type,
      recipient:
        newNotification.recipientType === "user"
          ? newNotification.recipient
          : newNotification.recipientType,
      recipientType: newNotification.recipientType,
      subject: newNotification.subject,
      message: newNotification.message,
      status: newNotification.status as "sent" | "scheduled" | "draft",
      readStatus: "n/a",
      channels: newNotification.channels as string[],
      scheduledFor:
        newNotification.status === "scheduled"
          ? newNotification.scheduledFor
          : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotifications([...notifications, newNotificationEntry]);
    setShowAddNotificationDialog(false);
    setNewNotification({
      type: "security-alert",
      recipientType: "all-users",
      recipient: "",
      subject: "",
      message: "",
      channels: ["email", "in-app"],
      status: "draft",
      scheduledFor: "",
    });
  };

  const handleAddTemplate = () => {
    const newTemplateEntry: NotificationTemplate = {
      id: (templates.length + 1).toString(),
      name: newTemplate.name,
      type: newTemplate.type,
      subject: newTemplate.subject,
      message: newTemplate.message,
      channels: newTemplate.channels as string[],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTemplates([...templates, newTemplateEntry]);
    setShowAddTemplateDialog(false);
    setNewTemplate({
      name: "",
      type: "security-alert",
      subject: "",
      message: "",
      channels: ["email", "in-app"],
    });
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(
      notifications.filter(
        (notification) => notification.id !== notificationId,
      ),
    );
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((template) => template.id !== templateId));
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter
      ? notification.status === statusFilter
      : true;
    const matchesType = typeFilter ? notification.type === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-4">
      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell size={16} />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileTemplate size={16} />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart size={16} />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Notification Management</CardTitle>
                  <CardDescription>
                    Create, schedule, and manage notifications sent to users
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowAddNotificationDialog(true)}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Plus size={16} />
                  Create Notification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search notifications..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={statusFilter || ""}
                      onValueChange={(value) => setStatusFilter(value || null)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <div className="flex items-center gap-2">
                          <Filter size={14} />
                          <SelectValue placeholder="Status" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={typeFilter || ""}
                      onValueChange={(value) => setTypeFilter(value || null)}
                    >
                      <SelectTrigger className="w-[160px]">
                        <div className="flex items-center gap-2">
                          <Filter size={14} />
                          <SelectValue placeholder="Type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="security-alert">
                          Security Alert
                        </SelectItem>
                        <SelectItem value="system-update">
                          System Update
                        </SelectItem>
                        <SelectItem value="report-ready">
                          Report Ready
                        </SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="welcome">Welcome</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Channels</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNotifications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No notifications found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredNotifications.map((notification) => (
                          <TableRow key={notification.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span>{notification.subject}</span>
                                <span className="text-xs text-muted-foreground truncate max-w-[250px]">
                                  {notification.message}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {notification.type === "security-alert" && (
                                  <AlertTriangle
                                    size={14}
                                    className="text-red-500"
                                  />
                                )}
                                {notification.type === "system-update" && (
                                  <RefreshCw
                                    size={14}
                                    className="text-blue-500"
                                  />
                                )}
                                {notification.type === "report-ready" && (
                                  <FileText
                                    size={14}
                                    className="text-green-500"
                                  />
                                )}
                                {notification.type === "promotional" && (
                                  <Bell size={14} className="text-purple-500" />
                                )}
                                {notification.type === "welcome" && (
                                  <Users size={14} className="text-amber-500" />
                                )}
                                <span className="capitalize">
                                  {notification.type.replace("-", " ")}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {notification.recipientType === "user" && (
                                  <span className="text-xs">
                                    {notification.recipient}
                                  </span>
                                )}
                                {notification.recipientType === "group" && (
                                  <span className="capitalize">
                                    {notification.recipient.replace("-", " ")}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {notification.status === "sent" && (
                                  <div className="flex items-center gap-1">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                                    <span>Sent</span>
                                    {notification.readStatus === "read" && (
                                      <span className="text-xs text-green-600 ml-1">
                                        (Read)
                                      </span>
                                    )}
                                    {notification.readStatus === "unread" && (
                                      <span className="text-xs text-amber-600 ml-1">
                                        (Unread)
                                      </span>
                                    )}
                                  </div>
                                )}
                                {notification.status === "scheduled" && (
                                  <div className="flex items-center gap-1">
                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                    <span>Scheduled</span>
                                  </div>
                                )}
                                {notification.status === "draft" && (
                                  <div className="flex items-center gap-1">
                                    <div className="h-2.5 w-2.5 rounded-full bg-gray-500" />
                                    <span>Draft</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {notification.channels.includes("email") && (
                                  <Mail
                                    size={14}
                                    className="text-blue-500"
                                    title="Email"
                                  />
                                )}
                                {notification.channels.includes("in-app") && (
                                  <MessageSquare
                                    size={14}
                                    className="text-green-500"
                                    title="In-app"
                                  />
                                )}
                                {notification.channels.includes("sms") && (
                                  <Smartphone
                                    size={14}
                                    className="text-purple-500"
                                    title="SMS"
                                  />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {notification.status === "sent" &&
                              notification.sentAt
                                ? new Date(
                                    notification.sentAt,
                                  ).toLocaleDateString()
                                : notification.status === "scheduled" &&
                                    notification.scheduledFor
                                  ? new Date(
                                      notification.scheduledFor,
                                    ).toLocaleDateString()
                                  : new Date(
                                      notification.createdAt,
                                    ).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      /* View details implementation */
                                    }}
                                    className="flex items-center gap-2"
                                  >
                                    <Eye size={14} />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      /* Edit implementation */
                                    }}
                                    className="flex items-center gap-2"
                                  >
                                    <Edit size={14} />
                                    Edit
                                  </DropdownMenuItem>
                                  {notification.status === "draft" && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        /* Send now implementation */
                                      }}
                                      className="flex items-center gap-2"
                                    >
                                      <Send size={14} />
                                      Send Now
                                    </DropdownMenuItem>
                                  )}
                                  {notification.status === "draft" && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        /* Schedule implementation */
                                      }}
                                      className="flex items-center gap-2"
                                    >
                                      <Calendar size={14} />
                                      Schedule
                                    </DropdownMenuItem>
                                  )}
                                  {notification.status === "scheduled" && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        /* Cancel schedule implementation */
                                      }}
                                      className="flex items-center gap-2 text-amber-600"
                                    >
                                      <XCircle size={14} />
                                      Cancel Schedule
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={() => {
                                      /* Duplicate implementation */
                                    }}
                                    className="flex items-center gap-2"
                                  >
                                    <Copy size={14} />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleDeleteNotification(notification.id)
                                    }
                                    className="text-red-600 flex items-center gap-2"
                                  >
                                    <Trash2 size={14} />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Notification Templates</CardTitle>
                  <CardDescription>
                    Create and manage reusable notification templates
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowAddTemplateDialog(true)}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Plus size={16} />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search templates..."
                    className="pl-8"
                  />
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Template Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Channels</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">
                            {template.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {template.type === "security-alert" && (
                                <AlertTriangle
                                  size={14}
                                  className="text-red-500"
                                />
                              )}
                              {template.type === "system-update" && (
                                <RefreshCw
                                  size={14}
                                  className="text-blue-500"
                                />
                              )}
                              {template.type === "report-ready" && (
                                <FileText
                                  size={14}
                                  className="text-green-500"
                                />
                              )}
                              {template.type === "promotional" && (
                                <Bell size={14} className="text-purple-500" />
                              )}
                              {template.type === "welcome" && (
                                <Users size={14} className="text-amber-500" />
                              )}
                              <span className="capitalize">
                                {template.type.replace("-", " ")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[250px] truncate">
                            {template.subject}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {template.channels.includes("email") && (
                                <Mail
                                  size={14}
                                  className="text-blue-500"
                                  title="Email"
                                />
                              )}
                              {template.channels.includes("in-app") && (
                                <MessageSquare
                                  size={14}
                                  className="text-green-500"
                                  title="In-app"
                                />
                              )}
                              {template.channels.includes("sms") && (
                                <Smartphone
                                  size={14}
                                  className="text-purple-500"
                                  title="SMS"
                                />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {template.lastUsed
                              ? new Date(template.lastUsed).toLocaleDateString()
                              : "Never"}
                          </TableCell>
                          <TableCell>
                            {new Date(template.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => {
                                    /* View details implementation */
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <Eye size={14} />
                                  View Template
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    /* Edit implementation */
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <Edit size={14} />
                                  Edit Template
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    /* Use template implementation */
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <Send size={14} />
                                  Use Template
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    /* Duplicate implementation */
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <Copy size={14} />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteTemplate(template.id)
                                  }
                                  className="text-red-600 flex items-center gap-2"
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-950 flex items-start gap-2">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    <p className="font-medium">Template Variables</p>
                    <p>
                      Use variables in your templates to personalize
                      notifications. Variables are enclosed in curly braces,
                      e.g., {"{user_name}"}, {"{website_name}"},{" "}
                      {"{report_link}"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Notification Performance</CardTitle>
              <CardDescription>
                Track and analyze notification engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 hours</SelectItem>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw size={14} />
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download size={14} />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Sent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4,600</div>
                      <p className="text-xs text-muted-foreground">
                        +12.5% from last period
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Delivery Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">99.6%</div>
                      <p className="text-xs text-muted-foreground">
                        +0.2% from last period
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Open Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78.3%</div>
                      <p className="text-xs text-muted-foreground">
                        +5.1% from last period
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Click Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">45.9%</div>
                      <p className="text-xs text-muted-foreground">
                        +3.2% from last period
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Notification</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Sent</TableHead>
                        <TableHead>Delivered</TableHead>
                        <TableHead>Opened</TableHead>
                        <TableHead>Clicked</TableHead>
                        <TableHead>Open Rate</TableHead>
                        <TableHead>Click Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {performanceData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium max-w-[200px] truncate">
                            {data.notificationName}
                          </TableCell>
                          <TableCell>{data.date}</TableCell>
                          <TableCell>{data.sent.toLocaleString()}</TableCell>
                          <TableCell>
                            {data.delivered.toLocaleString()}
                          </TableCell>
                          <TableCell>{data.opened.toLocaleString()}</TableCell>
                          <TableCell>{data.clicked.toLocaleString()}</TableCell>
                          <TableCell>
                            <span
                              className={`${data.openRate >= 0.8 ? "text-green-600" : data.openRate >= 0.6 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {(data.openRate * 100).toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`${data.clickRate >= 0.5 ? "text-green-600" : data.clickRate >= 0.3 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {(data.clickRate * 100).toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-600 dark:text-green-400">
                    <p className="font-medium">Performance Insight</p>
                    <p>
                      Security alert notifications have the highest engagement
                      rates. Consider using similar formatting and urgency in
                      other important notifications to improve engagement.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure global notification settings and defaults
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Default Notification Channels
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableEmail">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications via email
                        </p>
                      </div>
                      <Switch id="enableEmail" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableInApp">
                          In-App Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Show notifications within the application
                        </p>
                      </div>
                      <Switch id="enableInApp" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableSMS">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications via SMS (additional charges may
                          apply)
                        </p>
                      </div>
                      <Switch id="enableSMS" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Automatic Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="securityAlerts">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically send notifications for security issues
                        </p>
                      </div>
                      <Switch id="securityAlerts" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reportNotifications">
                          Report Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically notify users when reports are ready
                        </p>
                      </div>
                      <Switch id="reportNotifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="systemUpdates">System Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications about system updates and
                          maintenance
                        </p>
                      </div>
                      <Switch id="systemUpdates" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketingNotifications">
                          Marketing Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Send promotional and feature announcement
                          notifications
                        </p>
                      </div>
                      <Switch id="marketingNotifications" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Notification Frequency
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="securityAlertFrequency">
                        Security Alert Frequency
                      </Label>
                      <Select defaultValue="immediate">
                        <SelectTrigger id="securityAlertFrequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reportFrequency">
                        Report Notification Frequency
                      </Label>
                      <Select defaultValue="immediate">
                        <SelectTrigger id="reportFrequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="marketingFrequency">
                        Marketing Notification Frequency
                      </Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger id="marketingFrequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                          <SelectItem value="monthly">
                            Monthly Digest
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quietHours">Quiet Hours</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="22">
                          <SelectTrigger>
                            <SelectValue placeholder="From" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i.toString().padStart(2, "0")}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="flex items-center">to</span>
                        <Select defaultValue="7">
                          <SelectTrigger>
                            <SelectValue placeholder="To" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i.toString().padStart(2, "0")}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="emailSender">Sender Name</Label>
                    <Input
                      id="emailSender"
                      defaultValue="SecureSEO Notifications"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailFooter">Email Footer Text</Label>
                    <Textarea
                      id="emailFooter"
                      rows={3}
                      defaultValue="© 2023 SecureSEO. All rights reserved. You're receiving this email because you have an account with SecureSEO. You can update your notification preferences in your account settings."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save size={16} />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Notification Dialog */}
      <Dialog
        open={showAddNotificationDialog}
        onOpenChange={setShowAddNotificationDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Notification</DialogTitle>
            <DialogDescription>
              Create a new notification to send to users
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Notification Type</Label>
                <Select
                  value={newNotification.type}
                  onValueChange={(value) =>
                    setNewNotification({ ...newNotification, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="security-alert">
                      Security Alert
                    </SelectItem>
                    <SelectItem value="system-update">System Update</SelectItem>
                    <SelectItem value="report-ready">Report Ready</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="welcome">Welcome</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientType">Recipient</Label>
                <Select
                  value={newNotification.recipientType}
                  onValueChange={(value) =>
                    setNewNotification({
                      ...newNotification,
                      recipientType: value,
                    })
                  }
                >
                  <SelectTrigger id="recipientType">
                    <SelectValue placeholder="Select recipient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-users">All Users</SelectItem>
                    <SelectItem value="premium-users">Premium Users</SelectItem>
                    <SelectItem value="free-users">Free Users</SelectItem>
                    <SelectItem value="user">Specific User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newNotification.recipientType === "user" && (
                <div className="space-y-2">
                  <Label htmlFor="recipient">User Email</Label>
                  <Input
                    id="recipient"
                    type="email"
                    value={newNotification.recipient}
                    onChange={(e) =>
                      setNewNotification({
                        ...newNotification,
                        recipient: e.target.value,
                      })
                    }
                    placeholder="user@example.com"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newNotification.subject}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      subject: e.target.value,
                    })
                  }
                  placeholder="Enter notification subject"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      message: e.target.value,
                    })
                  }
                  placeholder="Enter notification message"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emailChannel"
                      checked={newNotification.channels.includes("email")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewNotification({
                            ...newNotification,
                            channels: [...newNotification.channels, "email"],
                          });
                        } else {
                          setNewNotification({
                            ...newNotification,
                            channels: newNotification.channels.filter(
                              (channel) => channel !== "email",
                            ),
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="emailChannel" className="cursor-pointer">
                      Email
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="inAppChannel"
                      checked={newNotification.channels.includes("in-app")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewNotification({
                            ...newNotification,
                            channels: [...newNotification.channels, "in-app"],
                          });
                        } else {
                          setNewNotification({
                            ...newNotification,
                            channels: newNotification.channels.filter(
                              (channel) => channel !== "in-app",
                            ),
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="inAppChannel" className="cursor-pointer">
                      In-App
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="smsChannel"
                      checked={newNotification.channels.includes("sms")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewNotification({
                            ...newNotification,
                            channels: [...newNotification.channels, "sms"],
                          });
                        } else {
                          setNewNotification({
                            ...newNotification,
                            channels: newNotification.channels.filter(
                              (channel) => channel !== "sms",
                            ),
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="smsChannel" className="cursor-pointer">
                      SMS
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Notification Status</Label>
                <Select
                  value={newNotification.status}
                  onValueChange={(value) =>
                    setNewNotification({ ...newNotification, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                    <SelectItem value="scheduled">
                      Schedule for Later
                    </SelectItem>
                    <SelectItem value="sent">Send Immediately</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newNotification.status === "scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledFor">Schedule Date and Time</Label>
                  <Input
                    id="scheduledFor"
                    type="datetime-local"
                    value={newNotification.scheduledFor}
                    onChange={(e) =>
                      setNewNotification({
                        ...newNotification,
                        scheduledFor: e.target.value,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddNotificationDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddNotification}
              disabled={
                !newNotification.subject ||
                !newNotification.message ||
                (newNotification.recipientType === "user" &&
                  !newNotification.recipient) ||
                (newNotification.status === "scheduled" &&
                  !newNotification.scheduledFor)
              }
            >
              {newNotification.status === "sent"
                ? "Send Notification"
                : newNotification.status === "scheduled"
                  ? "Schedule Notification"
                  : "Save as Draft"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Template Dialog */}
      <Dialog
        open={showAddTemplateDialog}
        onOpenChange={setShowAddTemplateDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Notification Template</DialogTitle>
            <DialogDescription>
              Create a reusable template for notifications
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  value={newTemplate.name}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, name: e.target.value })
                  }
                  placeholder="Enter template name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateType">Notification Type</Label>
                <Select
                  value={newTemplate.type}
                  onValueChange={(value) =>
                    setNewTemplate({ ...newTemplate, type: value })
                  }
                >
                  <SelectTrigger id="templateType">
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="security-alert">
                      Security Alert
                    </SelectItem>
                    <SelectItem value="system-update">System Update</SelectItem>
                    <SelectItem value="report-ready">Report Ready</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="welcome">Welcome</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateSubject">Subject Template</Label>
                <Input
                  id="templateSubject"
                  value={newTemplate.subject}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, subject: e.target.value })
                  }
                  placeholder="Enter subject template with {variables}"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateMessage">Message Template</Label>
                <Textarea
                  id="templateMessage"
                  value={newTemplate.message}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, message: e.target.value })
                  }
                  placeholder="Enter message template with {variables}"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="templateEmailChannel"
                      checked={newTemplate.channels.includes("email")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewTemplate({
                            ...newTemplate,
                            channels: [...newTemplate.channels, "email"],
                          });
                        } else {
                          setNewTemplate({
                            ...newTemplate,
                            channels: newTemplate.channels.filter(
                              (channel) => channel !== "email",
                            ),
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label
                      htmlFor="templateEmailChannel"
                      className="cursor-pointer"
                    >
                      Email
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="templateInAppChannel"
                      checked={newTemplate.channels.includes("in-app")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewTemplate({
                            ...newTemplate,
                            channels: [...newTemplate.channels, "in-app"],
                          });
                        } else {
                          setNewTemplate({
                            ...newTemplate,
                            channels: newTemplate.channels.filter(
                              (channel) => channel !== "in-app",
                            ),
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label
                      htmlFor="templateInAppChannel"
                      className="cursor-pointer"
                    >
                      In-App
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="templateSmsChannel"
                      checked={newTemplate.channels.includes("sms")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewTemplate({
                            ...newTemplate,
                            channels: [...newTemplate.channels, "sms"],
                          });
                        } else {
                          setNewTemplate({
                            ...newTemplate,
                            channels: newTemplate.channels.filter(
                              (channel) => channel !== "sms",
                            ),
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label
                      htmlFor="templateSmsChannel"
                      className="cursor-pointer"
                    >
                      SMS
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddTemplateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTemplate}
              disabled={
                !newTemplate.name ||
                !newTemplate.subject ||
                !newTemplate.message
              }
            >
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
