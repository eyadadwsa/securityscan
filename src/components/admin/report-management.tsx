"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Search,
  Plus,
  Calendar,
  Clock,
  Trash2,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Save,
  Copy,
  Settings,
  BarChart,
  Shield,
  Zap,
  Share2,
  MessageSquare,
  FileSpreadsheet,
  FileImage,
  FilePieChart,
  Users,
  Mail,
  Bell,
  Archive,
  Repeat,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Printer,
  RefreshCw,
  FileCode,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  name: string;
  type: "security" | "seo" | "performance" | "custom";
  createdAt: string;
  modifiedAt: string;
  status: "ready" | "under_construction" | "scheduled";
  format: "pdf" | "csv" | "excel" | "html";
  schedule?: {
    frequency: "daily" | "weekly" | "monthly";
    nextRun: string;
    recipients: string[];
  };
  template?: string;
  criteria: {
    timeRange?: string;
    siteUrl?: string;
    includeGraphs?: boolean;
    includeImages?: boolean;
    severityLevels?: string[];
    [key: string]: any;
  };
}

interface Template {
  id: string;
  name: string;
  type: "security" | "seo" | "performance" | "custom";
  description: string;
  createdAt: string;
  format: "pdf" | "csv" | "excel" | "html";
  criteria: {
    timeRange?: string;
    siteUrl?: string;
    includeGraphs?: boolean;
    includeImages?: boolean;
    severityLevels?: string[];
    [key: string]: any;
  };
}

interface AuditLogEntry {
  id: string;
  action: string;
  reportId?: string;
  reportName?: string;
  user: string;
  timestamp: string;
  details: string;
}

export function ReportManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showNewReportDialog, setShowNewReportDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  // New report form state
  const [newReport, setNewReport] = useState({
    name: "",
    type: "security",
    format: "pdf",
    criteria: {
      timeRange: "last_30_days",
      siteUrl: "https://example.com",
      includeGraphs: true,
      includeImages: true,
      severityLevels: ["critical", "high", "medium"],
    },
  });

  // Schedule form state
  const [scheduleSettings, setScheduleSettings] = useState({
    enabled: false,
    frequency: "weekly",
    startDate: "",
    startTime: "",
    recipients: ["admin@secureseo.com"],
  });

  // Template form state
  const [templateForm, setTemplateForm] = useState({
    name: "",
    description: "",
    type: "security",
    format: "pdf",
    criteria: {
      timeRange: "last_30_days",
      siteUrl: "https://example.com",
      includeGraphs: true,
      includeImages: true,
      severityLevels: ["critical", "high", "medium"],
    },
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    autoGenerateSecurityReports: true,
    autoGenerateSeoReports: false,
    autoGeneratePerformanceReports: false,
    notifyViaEmail: true,
    notifyInApp: true,
    archiveAfterDays: "90",
    defaultFormat: "pdf",
  });

  // Sample reports data
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      name: "Monthly Security Audit",
      type: "security",
      createdAt: "2023-10-15T14:30:00Z",
      modifiedAt: "2023-10-15T14:30:00Z",
      status: "ready",
      format: "pdf",
      schedule: {
        frequency: "monthly",
        nextRun: "2023-11-15T14:30:00Z",
        recipients: ["admin@secureseo.com", "security@secureseo.com"],
      },
      template: "Security Audit Template",
      criteria: {
        timeRange: "last_30_days",
        siteUrl: "https://example.com",
        includeGraphs: true,
        includeImages: true,
        severityLevels: ["critical", "high", "medium"],
      },
    },
    {
      id: "2",
      name: "Weekly SEO Performance",
      type: "seo",
      createdAt: "2023-10-16T10:15:00Z",
      modifiedAt: "2023-10-16T10:15:00Z",
      status: "ready",
      format: "excel",
      schedule: {
        frequency: "weekly",
        nextRun: "2023-10-23T10:15:00Z",
        recipients: ["marketing@secureseo.com"],
      },
      template: "SEO Weekly Template",
      criteria: {
        timeRange: "last_7_days",
        siteUrl: "https://example.com",
        includeGraphs: true,
        includeImages: false,
        keywordPerformance: true,
        backlinksAnalysis: true,
      },
    },
    {
      id: "3",
      name: "Q3 Performance Report",
      type: "performance",
      createdAt: "2023-10-14T09:45:00Z",
      modifiedAt: "2023-10-14T11:30:00Z",
      status: "ready",
      format: "pdf",
      criteria: {
        timeRange: "custom",
        startDate: "2023-07-01",
        endDate: "2023-09-30",
        siteUrl: "https://example.com",
        includeGraphs: true,
        includeImages: true,
        pageLoadTime: true,
        serverResponseTime: true,
        resourceUsage: true,
      },
    },
    {
      id: "4",
      name: "Custom Vulnerability Report",
      type: "custom",
      createdAt: "2023-10-13T11:20:00Z",
      modifiedAt: "2023-10-13T11:20:00Z",
      status: "under_construction",
      format: "html",
      criteria: {
        timeRange: "last_90_days",
        siteUrl: "https://example.com",
        includeGraphs: true,
        includeImages: true,
        customSections: [
          "XSS Vulnerabilities",
          "SQL Injection Risks",
          "CSRF Issues",
        ],
      },
    },
    {
      id: "5",
      name: "Daily Security Scan",
      type: "security",
      createdAt: "2023-10-17T08:00:00Z",
      modifiedAt: "2023-10-17T08:00:00Z",
      status: "scheduled",
      format: "pdf",
      schedule: {
        frequency: "daily",
        nextRun: "2023-10-18T08:00:00Z",
        recipients: ["security@secureseo.com"],
      },
      criteria: {
        timeRange: "last_24_hours",
        siteUrl: "https://example.com",
        includeGraphs: false,
        includeImages: false,
        severityLevels: ["critical", "high"],
        quickSummaryOnly: true,
      },
    },
  ]);

  // Sample templates data
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Security Audit Template",
      type: "security",
      description: "Comprehensive security audit with vulnerability analysis",
      createdAt: "2023-09-15T14:30:00Z",
      format: "pdf",
      criteria: {
        timeRange: "last_30_days",
        includeGraphs: true,
        includeImages: true,
        severityLevels: ["critical", "high", "medium"],
        sections: [
          "Executive Summary",
          "Vulnerability Details",
          "Remediation Steps",
        ],
      },
    },
    {
      id: "2",
      name: "SEO Weekly Template",
      type: "seo",
      description: "Weekly SEO performance tracking and analysis",
      createdAt: "2023-09-16T10:15:00Z",
      format: "excel",
      criteria: {
        timeRange: "last_7_days",
        includeGraphs: true,
        includeImages: false,
        keywordPerformance: true,
        backlinksAnalysis: true,
        sections: ["Keyword Rankings", "Backlink Analysis", "Organic Traffic"],
      },
    },
    {
      id: "3",
      name: "Performance Quarterly Template",
      type: "performance",
      description: "Quarterly website performance analysis",
      createdAt: "2023-09-14T09:45:00Z",
      format: "pdf",
      criteria: {
        timeRange: "last_90_days",
        includeGraphs: true,
        includeImages: true,
        pageLoadTime: true,
        serverResponseTime: true,
        resourceUsage: true,
        sections: [
          "Performance Overview",
          "Core Web Vitals",
          "Resource Optimization",
        ],
      },
    },
    {
      id: "4",
      name: "Executive Summary Template",
      type: "custom",
      description:
        "High-level executive summary of all security and SEO metrics",
      createdAt: "2023-09-13T11:20:00Z",
      format: "pdf",
      criteria: {
        timeRange: "last_30_days",
        includeGraphs: true,
        includeImages: false,
        sections: [
          "Security Highlights",
          "SEO Performance",
          "Performance Metrics",
          "Recommendations",
        ],
        executiveSummary: true,
      },
    },
  ]);

  // Sample audit log data
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "1",
      action: "Report Created",
      reportId: "1",
      reportName: "Monthly Security Audit",
      user: "admin@secureseo.com",
      timestamp: "2023-10-15T14:30:00Z",
      details: "Created new security report",
    },
    {
      id: "2",
      action: "Report Downloaded",
      reportId: "1",
      reportName: "Monthly Security Audit",
      user: "admin@secureseo.com",
      timestamp: "2023-10-15T15:45:00Z",
      details: "Downloaded report in PDF format",
    },
    {
      id: "3",
      action: "Report Scheduled",
      reportId: "1",
      reportName: "Monthly Security Audit",
      user: "admin@secureseo.com",
      timestamp: "2023-10-15T16:20:00Z",
      details: "Set monthly schedule for report",
    },
    {
      id: "4",
      action: "Template Created",
      reportName: "Security Audit Template",
      user: "admin@secureseo.com",
      timestamp: "2023-09-15T14:30:00Z",
      details: "Created new report template",
    },
    {
      id: "5",
      action: "Report Shared",
      reportId: "1",
      reportName: "Monthly Security Audit",
      user: "admin@secureseo.com",
      timestamp: "2023-10-16T09:15:00Z",
      details: "Shared report with security@secureseo.com",
    },
  ]);

  const handleCreateReport = () => {
    const newReportEntry: Report = {
      id: (reports.length + 1).toString(),
      name: newReport.name,
      type: newReport.type as "security" | "seo" | "performance" | "custom",
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      status: scheduleSettings.enabled ? "scheduled" : "ready",
      format: newReport.format as "pdf" | "csv" | "excel" | "html",
      criteria: newReport.criteria,
    };

    if (scheduleSettings.enabled) {
      newReportEntry.schedule = {
        frequency: scheduleSettings.frequency as "daily" | "weekly" | "monthly",
        nextRun: `${scheduleSettings.startDate}T${scheduleSettings.startTime}:00Z`,
        recipients: scheduleSettings.recipients,
      };
    }

    setReports([newReportEntry, ...reports]);
    setShowNewReportDialog(false);
    resetReportForm();
  };

  const handleCreateTemplate = () => {
    const newTemplateEntry: Template = {
      id: (templates.length + 1).toString(),
      name: templateForm.name,
      type: templateForm.type as "security" | "seo" | "performance" | "custom",
      description: templateForm.description,
      createdAt: new Date().toISOString(),
      format: templateForm.format as "pdf" | "csv" | "excel" | "html",
      criteria: templateForm.criteria,
    };

    setTemplates([newTemplateEntry, ...templates]);
    setShowTemplateDialog(false);
    resetTemplateForm();
  };

  const resetReportForm = () => {
    setNewReport({
      name: "",
      type: "security",
      format: "pdf",
      criteria: {
        timeRange: "last_30_days",
        siteUrl: "https://example.com",
        includeGraphs: true,
        includeImages: true,
        severityLevels: ["critical", "high", "medium"],
      },
    });
    setScheduleSettings({
      enabled: false,
      frequency: "weekly",
      startDate: "",
      startTime: "",
      recipients: ["admin@secureseo.com"],
    });
  };

  const resetTemplateForm = () => {
    setTemplateForm({
      name: "",
      description: "",
      type: "security",
      format: "pdf",
      criteria: {
        timeRange: "last_30_days",
        siteUrl: "https://example.com",
        includeGraphs: true,
        includeImages: true,
        severityLevels: ["critical", "high", "medium"],
      },
    });
  };

  const handleDeleteReport = (reportId: string) => {
    setReports(reports.filter((report) => report.id !== reportId));
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((template) => template.id !== templateId));
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? report.type === typeFilter : true;
    const matchesStatus = statusFilter ? report.status === statusFilter : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield size={16} className="text-red-500" />;
      case "seo":
        return <BarChart size={16} className="text-blue-500" />;
      case "performance":
        return <Zap size={16} className="text-amber-500" />;
      case "custom":
        return <FileText size={16} className="text-purple-500" />;
      default:
        return <FileText size={16} />;
    }
  };

  const getReportFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText size={16} className="text-red-500" />;
      case "csv":
        return <FileSpreadsheet size={16} className="text-green-500" />;
      case "excel":
        return <FileSpreadsheet size={16} className="text-blue-500" />;
      case "html":
        return <FileCode size={16} className="text-orange-500" />;
      default:
        return <FileText size={16} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <div className="flex items-center gap-1">
              <CheckCircle2 size={12} />
              <span>Ready</span>
            </div>
          </Badge>
        );
      case "under_construction":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>Under Construction</span>
            </div>
          </Badge>
        );
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>Scheduled</span>
            </div>
          </Badge>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Copy size={16} />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Clock size={16} />
            <span className="hidden sm:inline">Audit Log</span>
          </TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Report Management</CardTitle>
                  <CardDescription>
                    Create, schedule, and manage reports for security, SEO, and
                    performance analysis
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowNewReportDialog(true)}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Plus size={16} />
                  New Report
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
                      placeholder="Search reports..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={typeFilter || ""}
                      onValueChange={(value) => setTypeFilter(value || null)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <div className="flex items-center gap-2">
                          <Filter size={14} />
                          <SelectValue placeholder="Type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="seo">SEO</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={statusFilter || ""}
                      onValueChange={(value) => setStatusFilter(value || null)}
                    >
                      <SelectTrigger className="w-[150px]">
                        <div className="flex items-center gap-2">
                          <Filter size={14} />
                          <SelectValue placeholder="Status" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="under_construction">
                          Under Construction
                        </SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created/Modified</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No reports found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {getReportTypeIcon(report.type)}
                                {report.name}
                                {report.schedule && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 text-xs"
                                  >
                                    <Calendar size={10} className="mr-1" />
                                    {report.schedule.frequency}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="capitalize">{report.type}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getReportFormatIcon(report.format)}
                                <span className="uppercase">
                                  {report.format}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(report.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">
                                  Created: {formatDate(report.createdAt)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Modified: {formatDate(report.modifiedAt)}
                                </span>
                                {report.schedule && (
                                  <span className="text-xs text-blue-600">
                                    Next run:{" "}
                                    {formatDate(report.schedule.nextRun)}
                                  </span>
                                )}
                              </div>
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
                                    className="flex items-center gap-2"
                                    onClick={() => {
                                      setSelectedReport(report);
                                      /* View report implementation */
                                    }}
                                  >
                                    <Eye size={14} />
                                    View Report
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="flex items-center gap-2"
                                    onClick={() => {
                                      /* Download report implementation */
                                    }}
                                  >
                                    <Download size={14} />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="flex items-center gap-2"
                                    onClick={() => {
                                      /* Edit report implementation */
                                    }}
                                  >
                                    <Edit size={14} />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="flex items-center gap-2"
                                    onClick={() => {
                                      setSelectedReport(report);
                                      setShowScheduleDialog(true);
                                    }}
                                  >
                                    <Calendar size={14} />
                                    Schedule
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="flex items-center gap-2"
                                    onClick={() => {
                                      /* Share report implementation */
                                    }}
                                  >
                                    <Share2 size={14} />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="flex items-center gap-2 text-red-600"
                                    onClick={() =>
                                      handleDeleteReport(report.id)
                                    }
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
                  <CardTitle>Report Templates</CardTitle>
                  <CardDescription>
                    Create and manage reusable report templates
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowTemplateDialog(true)}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Plus size={16} />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Template Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {getReportTypeIcon(template.type)}
                              {template.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="capitalize">{template.type}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getReportFormatIcon(template.format)}
                              <span className="uppercase">
                                {template.format}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {template.description}
                          </TableCell>
                          <TableCell>
                            {formatDate(template.createdAt)}
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
                                  className="flex items-center gap-2"
                                  onClick={() => {
                                    /* Use template implementation */
                                    setSelectedTemplate(template);
                                    setNewReport({
                                      name: "",
                                      type: template.type,
                                      format: template.format,
                                      criteria: { ...template.criteria },
                                    });
                                    setShowNewReportDialog(true);
                                  }}
                                >
                                  <FileText size={14} />
                                  Create Report
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex items-center gap-2"
                                  onClick={() => {
                                    /* Edit template implementation */
                                    setSelectedTemplate(template);
                                    setTemplateForm({
                                      name: template.name,
                                      description: template.description,
                                      type: template.type,
                                      format: template.format,
                                      criteria: { ...template.criteria },
                                    });
                                    setShowTemplateDialog(true);
                                  }}
                                >
                                  <Edit size={14} />
                                  Edit Template
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex items-center gap-2 text-red-600"
                                  onClick={() =>
                                    handleDeleteTemplate(template.id)
                                  }
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
              <CardDescription>
                Configure global settings for report generation and
                notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Automatic Report Generation
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoGenerateSecurityReports">
                        Security Reports
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically generate reports when critical
                        vulnerabilities are detected
                      </p>
                    </div>
                    <Switch
                      id="autoGenerateSecurityReports"
                      checked={settingsForm.autoGenerateSecurityReports}
                      onCheckedChange={(checked) =>
                        setSettingsForm({
                          ...settingsForm,
                          autoGenerateSecurityReports: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoGenerateSeoReports">
                        SEO Reports
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically generate reports when significant SEO
                        changes are detected
                      </p>
                    </div>
                    <Switch
                      id="autoGenerateSeoReports"
                      checked={settingsForm.autoGenerateSeoReports}
                      onCheckedChange={(checked) =>
                        setSettingsForm({
                          ...settingsForm,
                          autoGenerateSeoReports: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoGeneratePerformanceReports">
                        Performance Reports
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically generate reports when performance issues
                        are detected
                      </p>
                    </div>
                    <Switch
                      id="autoGeneratePerformanceReports"
                      checked={settingsForm.autoGeneratePerformanceReports}
                      onCheckedChange={(checked) =>
                        setSettingsForm({
                          ...settingsForm,
                          autoGeneratePerformanceReports: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">
                  Notification Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyViaEmail">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications when reports are generated
                      </p>
                    </div>
                    <Switch
                      id="notifyViaEmail"
                      checked={settingsForm.notifyViaEmail}
                      onCheckedChange={(checked) =>
                        setSettingsForm({
                          ...settingsForm,
                          notifyViaEmail: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyInApp">In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show in-app notifications when reports are generated
                      </p>
                    </div>
                    <Switch
                      id="notifyInApp"
                      checked={settingsForm.notifyInApp}
                      onCheckedChange={(checked) =>
                        setSettingsForm({
                          ...settingsForm,
                          notifyInApp: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">Report Defaults</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="defaultFormat">Default Report Format</Label>
                    <Select
                      value={settingsForm.defaultFormat}
                      onValueChange={(value) =>
                        setSettingsForm({
                          ...settingsForm,
                          defaultFormat: value,
                        })
                      }
                    >
                      <SelectTrigger id="defaultFormat">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="archiveAfterDays">
                      Archive Reports After (days)
                    </Label>
                    <Input
                      id="archiveAfterDays"
                      type="number"
                      min="0"
                      value={settingsForm.archiveAfterDays}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          archiveAfterDays: e.target.value,
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Set to 0 to never archive automatically
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>
                Track all report-related activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={14} />
                    Export Log
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Report</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {log.action === "Report Created" && (
                                <Plus size={14} className="text-green-500" />
                              )}
                              {log.action === "Report Downloaded" && (
                                <Download size={14} className="text-blue-500" />
                              )}
                              {log.action === "Report Scheduled" && (
                                <Calendar
                                  size={14}
                                  className="text-amber-500"
                                />
                              )}
                              {log.action === "Template Created" && (
                                <Copy size={14} className="text-purple-500" />
                              )}
                              {log.action === "Report Shared" && (
                                <Share2 size={14} className="text-indigo-500" />
                              )}
                              {log.action}
                            </div>
                          </TableCell>
                          <TableCell>
                            {log.reportName ? log.reportName : "N/A"}
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{formatDate(log.timestamp)}</TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Report Dialog */}
      <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Configure the settings for your new report
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="reportName">Report Name</Label>
              <Input
                id="reportName"
                placeholder="Monthly Security Audit"
                value={newReport.name}
                onChange={(e) =>
                  setNewReport({ ...newReport, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select
                  value={newReport.type}
                  onValueChange={(value) =>
                    setNewReport({ ...newReport, type: value })
                  }
                >
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportFormat">Report Format</Label>
                <Select
                  value={newReport.format}
                  onValueChange={(value) =>
                    setNewReport({ ...newReport, format: value })
                  }
                >
                  <SelectTrigger id="reportFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeRange">Time Range</Label>
              <Select
                value={newReport.criteria.timeRange}
                onValueChange={(value) =>
                  setNewReport({
                    ...newReport,
                    criteria: { ...newReport.criteria, timeRange: value },
                  })
                }
              >
                <SelectTrigger id="timeRange">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_24_hours">Last 24 Hours</SelectItem>
                  <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                  <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                placeholder="https://example.com"
                value={newReport.criteria.siteUrl}
                onChange={(e) =>
                  setNewReport({
                    ...newReport,
                    criteria: {
                      ...newReport.criteria,
                      siteUrl: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Report Options</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeGraphs"
                    checked={newReport.criteria.includeGraphs}
                    onCheckedChange={(checked) =>
                      setNewReport({
                        ...newReport,
                        criteria: {
                          ...newReport.criteria,
                          includeGraphs: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label htmlFor="includeGraphs">Include Graphs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeImages"
                    checked={newReport.criteria.includeImages}
                    onCheckedChange={(checked) =>
                      setNewReport({
                        ...newReport,
                        criteria: {
                          ...newReport.criteria,
                          includeImages: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label htmlFor="includeImages">Include Images</Label>
                </div>
              </div>
            </div>

            {newReport.type === "security" && (
              <div className="space-y-2">
                <Label>Severity Levels to Include</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="criticalSeverity"
                      checked={
                        newReport.criteria.severityLevels?.includes(
                          "critical",
                        ) || false
                      }
                      onCheckedChange={(checked) => {
                        const severityLevels =
                          newReport.criteria.severityLevels || [];
                        if (checked) {
                          setNewReport({
                            ...newReport,
                            criteria: {
                              ...newReport.criteria,
                              severityLevels: [...severityLevels, "critical"],
                            },
                          });
                        } else {
                          setNewReport({
                            ...newReport,
                            criteria: {
                              ...newReport.criteria,
                              severityLevels: severityLevels.filter(
                                (level) => level !== "critical",
                              ),
                            },
                          });
                        }
                      }}
                    />
                    <Label htmlFor="criticalSeverity">Critical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="highSeverity"
                      checked={
                        newReport.criteria.severityLevels?.includes("high") ||
                        false
                      }
                      onCheckedChange={(checked) => {
                        const severityLevels =
                          newReport.criteria.severityLevels || [];
                        if (checked) {
                          setNewReport({
                            ...newReport,
                            criteria: {
                              ...newReport.criteria,
                              severityLevels: [...severityLevels, "high"],
                            },
                          });
                        } else {
                          setNewReport({
                            ...newReport,
                            criteria: {
                              ...newReport.criteria,
                              severityLevels: severityLevels.filter(
                                (level) => level !== "high",
                              ),
                            },
                          });
                        }
                      }}
                    />
                    <Label htmlFor="highSeverity">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mediumSeverity"
                      checked={
                        newReport.criteria.severityLevels?.includes("medium") ||
                        false
                      }
                      onCheckedChange={(checked) => {
                        const severityLevels =
                          newReport.criteria.severityLevels || [];
                        if (checked) {
                          setNewReport({
                            ...newReport,
                            criteria: {
                              ...newReport.criteria,
                              severityLevels: [...severityLevels, "medium"],
                            },
                          });
                        } else {
                          setNewReport({
                            ...newReport,
                            criteria: {
                              ...newReport.criteria,
                              severityLevels: severityLevels.filter(
                                (level) => level !== "medium",
                              ),
                            },
                          });
                        }
                      }}
                    />
                    <Label htmlFor="mediumSeverity">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowSeverity"
                      checked={
                        newReport.criteria.severityLevels?.includes("low") ||
                        false
                      }
                      onCheckedChange={(checked) => {
                        const severityLevels =
                          newReport.criteria.severityLevels || [];
                        if (checked) {
                          setNewReport({
                            ...newReport,
                            criteria: {
                              ...newReport.criteria,
                              severityLevels: [...severityLevels, "low"],
                            },
                          });
                        } else {
                          setNewReport({
                            ...newReport,
                            criteria: {
                              ...newReport.criteria,
                              severityLevels: severityLevels.filter(
                                (level) => level !== "low",
                              ),
                            },
                          });
                        }
                      }}
                    />
                    <Label htmlFor="lowSeverity">Low</Label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="schedule"
                checked={scheduleSettings.enabled}
                onCheckedChange={(checked) =>
                  setScheduleSettings({ ...scheduleSettings, enabled: checked })
                }
              />
              <Label htmlFor="schedule">Schedule this report</Label>
            </div>

            {scheduleSettings.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={scheduleSettings.frequency}
                    onValueChange={(value) =>
                      setScheduleSettings({
                        ...scheduleSettings,
                        frequency: value,
                      })
                    }
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={scheduleSettings.startDate}
                    onChange={(e) =>
                      setScheduleSettings({
                        ...scheduleSettings,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={scheduleSettings.startTime}
                    onChange={(e) =>
                      setScheduleSettings({
                        ...scheduleSettings,
                        startTime: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="recipients">
                    Recipients (comma separated)
                  </Label>
                  <Input
                    id="recipients"
                    placeholder="admin@example.com, user@example.com"
                    value={scheduleSettings.recipients.join(", ")}
                    onChange={(e) =>
                      setScheduleSettings({
                        ...scheduleSettings,
                        recipients: e.target.value
                          .split(",")
                          .map((email) => email.trim()),
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewReportDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateReport} disabled={!newReport.name}>
              {scheduleSettings.enabled ? "Schedule Report" : "Create Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate ? "Edit Template" : "Create Template"}
            </DialogTitle>
            <DialogDescription>
              {selectedTemplate
                ? "Modify the existing report template"
                : "Create a new reusable report template"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                placeholder="Security Audit Template"
                value={templateForm.name}
                onChange={(e) =>
                  setTemplateForm({ ...templateForm, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="templateDescription">Description</Label>
              <Textarea
                id="templateDescription"
                placeholder="Describe what this template is for"
                value={templateForm.description}
                onChange={(e) =>
                  setTemplateForm({
                    ...templateForm,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="templateType">Report Type</Label>
                <Select
                  value={templateForm.type}
                  onValueChange={(value) =>
                    setTemplateForm({ ...templateForm, type: value })
                  }
                >
                  <SelectTrigger id="templateType">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateFormat">Report Format</Label>
                <Select
                  value={templateForm.format}
                  onValueChange={(value) =>
                    setTemplateForm({ ...templateForm, format: value })
                  }
                >
                  <SelectTrigger id="templateFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Report Options</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="templateIncludeGraphs"
                    checked={templateForm.criteria.includeGraphs}
                    onCheckedChange={(checked) =>
                      setTemplateForm({
                        ...templateForm,
                        criteria: {
                          ...templateForm.criteria,
                          includeGraphs: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label htmlFor="templateIncludeGraphs">Include Graphs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="templateIncludeImages"
                    checked={templateForm.criteria.includeImages}
                    onCheckedChange={(checked) =>
                      setTemplateForm({
                        ...templateForm,
                        criteria: {
                          ...templateForm.criteria,
                          includeImages: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label htmlFor="templateIncludeImages">Include Images</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTemplateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTemplate}
              disabled={!templateForm.name}
            >
              {selectedTemplate ? "Update Template" : "Create Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report View Dialog */}
      {selectedReport && (
        <Dialog
          open={!!selectedReport}
          onOpenChange={(open) => !open && setSelectedReport(null)}
        >
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                {getReportTypeIcon(selectedReport.type)}
                <DialogTitle>{selectedReport.name}</DialogTitle>
              </div>
              <DialogDescription>
                {selectedReport.type.charAt(0).toUpperCase() +
                  selectedReport.type.slice(1)}{" "}
                report generated on {formatDate(selectedReport.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft size={16} />
                  </Button>
                  <span className="text-sm">Page 1 of 5</span>
                  <Button variant="outline" size="sm">
                    <ChevronRight size={16} />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Printer size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-6 bg-white">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">
                      {selectedReport.name}
                    </h2>
                    <p className="text-muted-foreground">
                      Generated on {formatDate(selectedReport.createdAt)}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 text-center">
                      <h3 className="text-lg font-medium">Security Score</h3>
                      <div className="text-3xl font-bold text-green-600">
                        92/100
                      </div>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <h3 className="text-lg font-medium">Issues Found</h3>
                      <div className="text-3xl font-bold text-amber-600">
                        12
                      </div>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <h3 className="text-lg font-medium">Critical Issues</h3>
                      <div className="text-3xl font-bold text-red-600">2</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Executive Summary</h3>
                    <p>
                      This security report identified 12 issues, including 2
                      critical vulnerabilities that require immediate attention.
                      The overall security score is 92/100, which is good but
                      there are areas for improvement.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Critical Findings</h3>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4 bg-red-50">
                        <h4 className="font-medium text-red-800">
                          Cross-Site Scripting (XSS)
                        </h4>
                        <p className="text-sm text-red-700">
                          A reflected XSS vulnerability was found in the search
                          form at /search.php?q=
                        </p>
                      </div>
                      <div className="border rounded-md p-4 bg-red-50">
                        <h4 className="font-medium text-red-800">
                          SQL Injection
                        </h4>
                        <p className="text-sm text-red-700">
                          A potential SQL injection vulnerability was found in
                          the user profile page at /user.php?id=
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Implement proper input validation and output encoding
                        for the search form
                      </li>
                      <li>Use prepared statements for all database queries</li>
                      <li>
                        Update the outdated WordPress plugins identified in the
                        report
                      </li>
                      <li>Enable Content Security Policy headers</li>
                      <li>Implement HTTPS across all pages</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare size={16} className="mr-1" />
                    Add Comment
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw size={16} className="mr-1" />
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
