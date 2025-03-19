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
import {
  Globe,
  Search,
  Plus,
  Calendar,
  Clock,
  Trash2,
  RefreshCw,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Play,
  Pause,
  Save,
  Copy,
  FileText,
  Settings,
  List,
  BarChart,
  Shield,
  Zap,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface Scan {
  id: string;
  siteUrl: string;
  scanType: string;
  technologies: string[];
  createdAt: string;
  scheduledFor?: string;
  frequency?: string;
  status: "running" | "completed" | "failed" | "scheduled";
  progress?: number;
  depth: number;
  securityChecks: string[];
  seoChecks: string[];
  performanceChecks: string[];
  additionalChecks: string[];
}

export function SiteInspection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [scanTypeFilter, setScanTypeFilter] = useState<string | null>(null);
  const [showNewScanDialog, setShowNewScanDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const [newScan, setNewScan] = useState({
    siteUrl: "",
    scanType: "quick",
    technologies: [],
    depth: 10,
    securityChecks: ["owasp-top-10", "malware"],
    seoChecks: ["keywords", "backlinks", "core-web-vitals"],
    performanceChecks: ["page-speed", "resource-usage"],
    additionalChecks: ["broken-links"],
  });

  const [scheduleSettings, setScheduleSettings] = useState({
    enabled: false,
    frequency: "weekly",
    startDate: "",
    startTime: "",
  });

  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  // Sample scans data
  const [scans, setScans] = useState<Scan[]>([
    {
      id: "1",
      siteUrl: "https://example.com",
      scanType: "full",
      technologies: ["WordPress", "PHP"],
      createdAt: "2023-10-15T14:30:00Z",
      status: "completed",
      depth: 50,
      securityChecks: ["owasp-top-10", "malware", "ssl"],
      seoChecks: [
        "keywords",
        "backlinks",
        "core-web-vitals",
        "mobile-friendly",
      ],
      performanceChecks: ["page-speed", "resource-usage", "server-response"],
      additionalChecks: ["broken-links", "cookies"],
    },
    {
      id: "2",
      siteUrl: "https://mysite.org",
      scanType: "quick",
      technologies: ["Joomla"],
      createdAt: "2023-10-16T10:15:00Z",
      status: "running",
      progress: 65,
      depth: 10,
      securityChecks: ["owasp-top-10", "malware"],
      seoChecks: ["keywords", "backlinks"],
      performanceChecks: ["page-speed"],
      additionalChecks: [],
    },
    {
      id: "3",
      siteUrl: "https://testsite.net",
      scanType: "custom",
      technologies: ["Drupal", "JavaScript"],
      createdAt: "2023-10-14T09:45:00Z",
      status: "failed",
      depth: 25,
      securityChecks: ["owasp-top-10", "ssl"],
      seoChecks: ["keywords", "mobile-friendly"],
      performanceChecks: ["page-speed", "server-response"],
      additionalChecks: ["broken-links"],
    },
    {
      id: "4",
      siteUrl: "https://scheduled-example.com",
      scanType: "full",
      technologies: ["WordPress", "PHP"],
      createdAt: "2023-10-13T11:20:00Z",
      scheduledFor: "2023-10-20T09:00:00Z",
      frequency: "weekly",
      status: "scheduled",
      depth: 50,
      securityChecks: ["owasp-top-10", "malware", "ssl"],
      seoChecks: ["keywords", "backlinks", "core-web-vitals"],
      performanceChecks: ["page-speed", "resource-usage"],
      additionalChecks: ["broken-links"],
    },
  ]);

  // Sample scan templates
  const scanTemplates = [
    {
      id: "1",
      name: "Basic WordPress Scan",
      description: "Quick security and SEO scan for WordPress sites",
      scanType: "quick",
      technologies: ["WordPress"],
      depth: 10,
      securityChecks: ["owasp-top-10", "malware"],
      seoChecks: ["keywords", "backlinks"],
      performanceChecks: ["page-speed"],
      additionalChecks: ["broken-links"],
    },
    {
      id: "2",
      name: "Comprehensive E-commerce Scan",
      description:
        "Detailed security, SEO and performance scan for e-commerce sites",
      scanType: "full",
      technologies: ["WooCommerce", "Magento"],
      depth: 100,
      securityChecks: ["owasp-top-10", "malware", "ssl", "pci-dss"],
      seoChecks: [
        "keywords",
        "backlinks",
        "core-web-vitals",
        "mobile-friendly",
        "structured-data",
      ],
      performanceChecks: [
        "page-speed",
        "resource-usage",
        "server-response",
        "caching",
      ],
      additionalChecks: ["broken-links", "cookies", "accessibility"],
    },
  ];

  // Sample audit log data
  const auditLogs = [
    {
      id: "1",
      action: "Scan Started",
      siteUrl: "https://example.com",
      user: "admin@secureseo.com",
      timestamp: "2023-10-15T14:30:00Z",
      details: "Full scan initiated for example.com",
    },
    {
      id: "2",
      action: "Scan Completed",
      siteUrl: "https://example.com",
      user: "admin@secureseo.com",
      timestamp: "2023-10-15T15:45:00Z",
      details: "Full scan completed for example.com",
    },
    {
      id: "3",
      action: "Scan Scheduled",
      siteUrl: "https://scheduled-example.com",
      user: "admin@secureseo.com",
      timestamp: "2023-10-13T11:20:00Z",
      details: "Weekly scan scheduled for scheduled-example.com",
    },
    {
      id: "4",
      action: "Scan Failed",
      siteUrl: "https://testsite.net",
      user: "admin@secureseo.com",
      timestamp: "2023-10-14T10:30:00Z",
      details: "Custom scan failed for testsite.net due to connection timeout",
    },
    {
      id: "5",
      action: "Template Created",
      siteUrl: "",
      user: "admin@secureseo.com",
      timestamp: "2023-10-12T09:15:00Z",
      details: "Created new scan template: Basic WordPress Scan",
    },
  ];

  const handleStartScan = () => {
    const newScanEntry: Scan = {
      id: (scans.length + 1).toString(),
      siteUrl: newScan.siteUrl,
      scanType: newScan.scanType,
      technologies: newScan.technologies as string[],
      createdAt: new Date().toISOString(),
      status: scheduleSettings.enabled ? "scheduled" : "running",
      progress: scheduleSettings.enabled ? undefined : 0,
      scheduledFor: scheduleSettings.enabled
        ? `${scheduleSettings.startDate}T${scheduleSettings.startTime}:00Z`
        : undefined,
      frequency: scheduleSettings.enabled
        ? scheduleSettings.frequency
        : undefined,
      depth: newScan.depth,
      securityChecks: newScan.securityChecks as string[],
      seoChecks: newScan.seoChecks as string[],
      performanceChecks: newScan.performanceChecks as string[],
      additionalChecks: newScan.additionalChecks as string[],
    };

    setScans([newScanEntry, ...scans]);
    setShowNewScanDialog(false);
    resetScanForm();
  };

  const resetScanForm = () => {
    setNewScan({
      siteUrl: "",
      scanType: "quick",
      technologies: [],
      depth: 10,
      securityChecks: ["owasp-top-10", "malware"],
      seoChecks: ["keywords", "backlinks", "core-web-vitals"],
      performanceChecks: ["page-speed", "resource-usage"],
      additionalChecks: ["broken-links"],
    });
    setScheduleSettings({
      enabled: false,
      frequency: "weekly",
      startDate: "",
      startTime: "",
    });
  };

  const handleSaveTemplate = () => {
    // Logic to save the template would go here
    setShowTemplateDialog(false);
    setTemplateName("");
    setTemplateDescription("");
  };

  const handleDeleteScan = (scanId: string) => {
    setScans(scans.filter((scan) => scan.id !== scanId));
  };

  const handlePauseScan = (scanId: string) => {
    // Logic to pause a scan would go here
  };

  const handleResumeScan = (scanId: string) => {
    // Logic to resume a scan would go here
  };

  const handleCancelScan = (scanId: string) => {
    setScans(
      scans.map((scan) =>
        scan.id === scanId
          ? {
              ...scan,
              status: "failed",
            }
          : scan,
      ),
    );
  };

  const handleRescheduleScan = (scanId: string) => {
    // Logic to reschedule a scan would go here
  };

  const filteredScans = scans.filter((scan) => {
    const matchesSearch = scan.siteUrl
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? scan.status === statusFilter : true;
    const matchesScanType = scanTypeFilter
      ? scan.scanType === scanTypeFilter
      : true;

    return matchesSearch && matchesStatus && matchesScanType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string, progress?: number) => {
    switch (status) {
      case "running":
        return (
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span>
              Running {progress !== undefined ? `(${progress}%)` : ""}
            </span>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span>Completed</span>
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span>Failed</span>
          </div>
        );
      case "scheduled":
        return (
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span>Scheduled</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="scans" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-auto w-full">
          <TabsTrigger value="scans" className="flex items-center gap-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Scans</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Copy size={16} />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Audit Log</span>
          </TabsTrigger>
        </TabsList>

        {/* Scans Tab */}
        <TabsContent value="scans">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Site Inspection</CardTitle>
                  <CardDescription>
                    Scan websites for security vulnerabilities, SEO issues, and
                    performance problems
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowNewScanDialog(true)}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Plus size={16} />
                  New Scan
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
                      placeholder="Search by site URL..."
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
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={scanTypeFilter || ""}
                      onValueChange={(value) =>
                        setScanTypeFilter(value || null)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <div className="flex items-center gap-2">
                          <Filter size={14} />
                          <SelectValue placeholder="Scan Type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="quick">Quick</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Site URL</TableHead>
                        <TableHead>Scan Type</TableHead>
                        <TableHead>Technologies</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created/Scheduled</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredScans.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No scans found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredScans.map((scan) => (
                          <TableRow key={scan.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Globe size={16} className="text-blue-500" />
                                {scan.siteUrl}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="capitalize">
                                {scan.scanType}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {scan.technologies.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(scan.status, scan.progress)}
                            </TableCell>
                            <TableCell>
                              {scan.status === "scheduled" ? (
                                <div className="flex flex-col">
                                  <span>
                                    {formatDate(scan.scheduledFor || "")}
                                  </span>
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {scan.frequency} scan
                                  </span>
                                </div>
                              ) : (
                                formatDate(scan.createdAt)
                              )}
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
                                  {scan.status === "completed" && (
                                    <DropdownMenuItem
                                      className="flex items-center gap-2"
                                      onClick={() => {
                                        /* View results implementation */
                                      }}
                                    >
                                      <Eye size={14} />
                                      View Results
                                    </DropdownMenuItem>
                                  )}
                                  {scan.status === "running" && (
                                    <>
                                      <DropdownMenuItem
                                        className="flex items-center gap-2"
                                        onClick={() => handlePauseScan(scan.id)}
                                      >
                                        <Pause size={14} />
                                        Pause Scan
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="flex items-center gap-2 text-red-600"
                                        onClick={() =>
                                          handleCancelScan(scan.id)
                                        }
                                      >
                                        <XCircle size={14} />
                                        Cancel Scan
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {scan.status === "scheduled" && (
                                    <>
                                      <DropdownMenuItem
                                        className="flex items-center gap-2"
                                        onClick={() =>
                                          handleRescheduleScan(scan.id)
                                        }
                                      >
                                        <Calendar size={14} />
                                        Reschedule
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="flex items-center gap-2"
                                        onClick={() => {
                                          /* Run now implementation */
                                        }}
                                      >
                                        <Play size={14} />
                                        Run Now
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {(scan.status === "completed" ||
                                    scan.status === "failed") && (
                                    <DropdownMenuItem
                                      className="flex items-center gap-2"
                                      onClick={() => {
                                        /* Rescan implementation */
                                      }}
                                    >
                                      <RefreshCw size={14} />
                                      Rescan
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="flex items-center gap-2 text-red-600"
                                    onClick={() => handleDeleteScan(scan.id)}
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
                  <CardTitle>Scan Templates</CardTitle>
                  <CardDescription>
                    Create and manage reusable scan templates
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
                        <TableHead>Description</TableHead>
                        <TableHead>Scan Type</TableHead>
                        <TableHead>Technologies</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scanTemplates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">
                            {template.name}
                          </TableCell>
                          <TableCell>{template.description}</TableCell>
                          <TableCell>
                            <span className="capitalize">
                              {template.scanType}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {template.technologies.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
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
                                  }}
                                >
                                  <Play size={14} />
                                  Use Template
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex items-center gap-2"
                                  onClick={() => {
                                    /* Edit template implementation */
                                  }}
                                >
                                  <Edit size={14} />
                                  Edit Template
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex items-center gap-2 text-red-600"
                                  onClick={() => {
                                    /* Delete template implementation */
                                  }}
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

        {/* Audit Log Tab */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>
                Track all scan-related activities
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
                        <TableHead>Site</TableHead>
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
                              {log.action === "Scan Started" && (
                                <Play size={14} className="text-blue-500" />
                              )}
                              {log.action === "Scan Completed" && (
                                <CheckCircle2
                                  size={14}
                                  className="text-green-500"
                                />
                              )}
                              {log.action === "Scan Failed" && (
                                <XCircle size={14} className="text-red-500" />
                              )}
                              {log.action === "Scan Scheduled" && (
                                <Calendar
                                  size={14}
                                  className="text-amber-500"
                                />
                              )}
                              {log.action === "Template Created" && (
                                <Plus size={14} className="text-purple-500" />
                              )}
                              {log.action}
                            </div>
                          </TableCell>
                          <TableCell>
                            {log.siteUrl ? log.siteUrl : "N/A"}
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

      {/* New Scan Dialog */}
      <Dialog open={showNewScanDialog} onOpenChange={setShowNewScanDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>New Site Scan</DialogTitle>
            <DialogDescription>
              Configure the scan settings for your website
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                placeholder="https://example.com"
                value={newScan.siteUrl}
                onChange={(e) =>
                  setNewScan({ ...newScan, siteUrl: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scanType">Scan Type</Label>
                <Select
                  value={newScan.scanType}
                  onValueChange={(value) =>
                    setNewScan({ ...newScan, scanType: value })
                  }
                >
                  <SelectTrigger id="scanType">
                    <SelectValue placeholder="Select scan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick Scan</SelectItem>
                    <SelectItem value="full">Full Scan</SelectItem>
                    <SelectItem value="custom">Custom Scan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies</Label>
                <Select
                  value={newScan.technologies[0] || ""}
                  onValueChange={(value) =>
                    setNewScan({ ...newScan, technologies: [value] })
                  }
                >
                  <SelectTrigger id="technologies">
                    <SelectValue placeholder="Select technology" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WordPress">WordPress</SelectItem>
                    <SelectItem value="Joomla">Joomla</SelectItem>
                    <SelectItem value="Drupal">Drupal</SelectItem>
                    <SelectItem value="Magento">Magento</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scanDepth">Scan Depth (pages)</Label>
              <Input
                id="scanDepth"
                type="number"
                min="1"
                max="1000"
                value={newScan.depth}
                onChange={(e) =>
                  setNewScan({ ...newScan, depth: parseInt(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Security Checks</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="owasp"
                    checked={newScan.securityChecks.includes("owasp-top-10")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewScan({
                          ...newScan,
                          securityChecks: [
                            ...newScan.securityChecks,
                            "owasp-top-10",
                          ],
                        });
                      } else {
                        setNewScan({
                          ...newScan,
                          securityChecks: newScan.securityChecks.filter(
                            (check) => check !== "owasp-top-10",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="owasp">OWASP Top 10</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="malware"
                    checked={newScan.securityChecks.includes("malware")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewScan({
                          ...newScan,
                          securityChecks: [
                            ...newScan.securityChecks,
                            "malware",
                          ],
                        });
                      } else {
                        setNewScan({
                          ...newScan,
                          securityChecks: newScan.securityChecks.filter(
                            (check) => check !== "malware",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="malware">Malware Detection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ssl"
                    checked={newScan.securityChecks.includes("ssl")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewScan({
                          ...newScan,
                          securityChecks: [...newScan.securityChecks, "ssl"],
                        });
                      } else {
                        setNewScan({
                          ...newScan,
                          securityChecks: newScan.securityChecks.filter(
                            (check) => check !== "ssl",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="ssl">SSL/TLS Issues</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>SEO Checks</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keywords"
                    checked={newScan.seoChecks.includes("keywords")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewScan({
                          ...newScan,
                          seoChecks: [...newScan.seoChecks, "keywords"],
                        });
                      } else {
                        setNewScan({
                          ...newScan,
                          seoChecks: newScan.seoChecks.filter(
                            (check) => check !== "keywords",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="keywords">Keyword Analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="backlinks"
                    checked={newScan.seoChecks.includes("backlinks")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewScan({
                          ...newScan,
                          seoChecks: [...newScan.seoChecks, "backlinks"],
                        });
                      } else {
                        setNewScan({
                          ...newScan,
                          seoChecks: newScan.seoChecks.filter(
                            (check) => check !== "backlinks",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="backlinks">Backlink Analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="core-web-vitals"
                    checked={newScan.seoChecks.includes("core-web-vitals")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewScan({
                          ...newScan,
                          seoChecks: [...newScan.seoChecks, "core-web-vitals"],
                        });
                      } else {
                        setNewScan({
                          ...newScan,
                          seoChecks: newScan.seoChecks.filter(
                            (check) => check !== "core-web-vitals",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="core-web-vitals">Core Web Vitals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mobile-friendly"
                    checked={newScan.seoChecks.includes("mobile-friendly")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewScan({
                          ...newScan,
                          seoChecks: [...newScan.seoChecks, "mobile-friendly"],
                        });
                      } else {
                        setNewScan({
                          ...newScan,
                          seoChecks: newScan.seoChecks.filter(
                            (check) => check !== "mobile-friendly",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="mobile-friendly">Mobile Friendly</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="schedule"
                checked={scheduleSettings.enabled}
                onCheckedChange={(checked) =>
                  setScheduleSettings({ ...scheduleSettings, enabled: checked })
                }
              />
              <Label htmlFor="schedule">Schedule this scan</Label>
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
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewScanDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleStartScan} disabled={!newScan.siteUrl}>
              {scheduleSettings.enabled ? "Schedule Scan" : "Start Scan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
            <DialogDescription>
              Save current scan settings as a reusable template
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                placeholder="E.g., Basic WordPress Scan"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="templateDescription">Description</Label>
              <Textarea
                id="templateDescription"
                placeholder="Describe what this template is for"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTemplateDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate} disabled={!templateName}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
