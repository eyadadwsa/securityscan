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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import {
  Shield,
  Globe,
  Zap,
  Download,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  Eye,
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ScanResult {
  id: string;
  siteUrl: string;
  scanType: string;
  scanDate: string;
  securityScore: number;
  seoScore: number;
  performanceScore: number;
  vulnerabilities: Vulnerability[];
  seoIssues: SEOIssue[];
  performanceIssues: PerformanceIssue[];
}

interface Vulnerability {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  recommendation: string;
  isFixed: boolean;
  notes?: string;
}

interface SEOIssue {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  recommendation: string;
  isFixed: boolean;
  notes?: string;
}

interface PerformanceIssue {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  recommendation: string;
  metric?: string;
  value?: string;
  isFixed: boolean;
  notes?: string;
}

export function ScanResultsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedIssue, setSelectedIssue] = useState<any | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [fixedIssues, setFixedIssues] = useState<Record<string, boolean>>({});

  // Sample scan result data
  const scanResult: ScanResult = {
    id: "1",
    siteUrl: "https://example.com",
    scanType: "full",
    scanDate: "2023-10-15T14:30:00Z",
    securityScore: 78,
    seoScore: 85,
    performanceScore: 92,
    vulnerabilities: [
      {
        id: "v1",
        name: "Cross-Site Scripting (XSS)",
        description: "Reflected XSS vulnerability in search form",
        severity: "high",
        recommendation: "Implement proper input validation and output encoding",
        isFixed: false,
      },
      {
        id: "v2",
        name: "Outdated WordPress Version",
        description: "Running WordPress 5.8.1 which has known vulnerabilities",
        severity: "medium",
        recommendation:
          "Update to the latest WordPress version (6.0.1 or newer)",
        isFixed: false,
      },
      {
        id: "v3",
        name: "Insecure Cookie Settings",
        description: "Cookies are set without the secure flag",
        severity: "medium",
        recommendation: "Set the 'secure' flag for all cookies",
        isFixed: false,
      },
    ],
    seoIssues: [
      {
        id: "s1",
        name: "Missing Meta Descriptions",
        description: "Several pages are missing meta descriptions",
        severity: "medium",
        recommendation:
          "Add unique and descriptive meta descriptions to each page",
        isFixed: false,
      },
      {
        id: "s2",
        name: "Duplicate Title Tags",
        description: "Multiple pages have identical title tags",
        severity: "high",
        recommendation: "Create unique title tags for each page",
        isFixed: false,
      },
      {
        id: "s3",
        name: "Low Word Count",
        description: "Several pages have less than 300 words of content",
        severity: "medium",
        recommendation: "Expand content to at least 500 words per page",
        isFixed: false,
      },
    ],
    performanceIssues: [
      {
        id: "p1",
        name: "Large JavaScript Files",
        description:
          "Several unminified JavaScript files are slowing down page load",
        severity: "high",
        recommendation: "Minify and combine JavaScript files",
        metric: "File Size",
        value: "2.3MB",
        isFixed: false,
      },
      {
        id: "p2",
        name: "Unoptimized Images",
        description: "Images are not properly sized or compressed",
        severity: "medium",
        recommendation: "Compress images and use responsive image sizes",
        metric: "Potential Savings",
        value: "4.7MB",
        isFixed: false,
      },
      {
        id: "p3",
        name: "Render-Blocking Resources",
        description: "CSS and JavaScript files are blocking page rendering",
        severity: "medium",
        recommendation:
          "Use async or defer attributes for scripts and inline critical CSS",
        metric: "Blocking Time",
        value: "1.2s",
        isFixed: false,
      },
    ],
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Poor";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreRingColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-amber-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleViewDetails = (issue: any) => {
    setSelectedIssue(issue);
    setShowDetailsDialog(true);
  };

  const handleAddNote = (issueId: string, note: string) => {
    setUserNotes((prev) => ({
      ...prev,
      [issueId]: note,
    }));
  };

  const handleToggleFixed = (issueId: string) => {
    setFixedIssues((prev) => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
  };

  const getIssuesByCategory = (category: string) => {
    switch (category) {
      case "security":
        return scanResult.vulnerabilities;
      case "seo":
        return scanResult.seoIssues;
      case "performance":
        return scanResult.performanceIssues;
      default:
        return [];
    }
  };

  const getHighSeverityCount = (issues: any[]) => {
    return issues.filter(
      (issue) => issue.severity === "critical" || issue.severity === "high",
    ).length;
  };

  const getMediumSeverityCount = (issues: any[]) => {
    return issues.filter((issue) => issue.severity === "medium").length;
  };

  const getLowSeverityCount = (issues: any[]) => {
    return issues.filter(
      (issue) => issue.severity === "low" || issue.severity === "info",
    ).length;
  };

  const ScoreRing = ({
    score,
    size = "lg",
  }: {
    score: number;
    size?: "sm" | "md" | "lg";
  }) => {
    const sizeClasses = {
      sm: "w-16 h-16",
      md: "w-24 h-24",
      lg: "w-32 h-32",
    };

    const textSizeClasses = {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
    };

    const ringColor = getScoreRingColor(score);
    const circumference = 2 * Math.PI * 45; // 45 is the radius
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-muted-foreground/20"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          {/* Foreground circle */}
          <circle
            className={ringColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span
            className={`${textSizeClasses[size]} font-bold ${getScoreColor(score)}`}
          >
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scan Results</h1>
          <p className="text-muted-foreground">
            Detailed analysis of {scanResult.siteUrl}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Scan completed on {formatDate(scanResult.scanDate)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export PDF
          </Button>
          <Button className="flex items-center gap-2">
            <Shield size={16} />
            Rescan Site
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield size={16} />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4">
            <ScoreRing score={scanResult.securityScore} />
            <div className="mt-4 text-center">
              <p
                className={`text-lg font-semibold ${getScoreColor(scanResult.securityScore)}`}
              >
                {getScoreLabel(scanResult.securityScore)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {getHighSeverityCount(scanResult.vulnerabilities)} high,{" "}
                {getMediumSeverityCount(scanResult.vulnerabilities)} medium
                issues
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe size={16} />
              SEO Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4">
            <ScoreRing score={scanResult.seoScore} />
            <div className="mt-4 text-center">
              <p
                className={`text-lg font-semibold ${getScoreColor(scanResult.seoScore)}`}
              >
                {getScoreLabel(scanResult.seoScore)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {getHighSeverityCount(scanResult.seoIssues)} high,{" "}
                {getMediumSeverityCount(scanResult.seoIssues)} medium issues
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap size={16} />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4">
            <ScoreRing score={scanResult.performanceScore} />
            <div className="mt-4 text-center">
              <p
                className={`text-lg font-semibold ${getScoreColor(scanResult.performanceScore)}`}
              >
                {getScoreLabel(scanResult.performanceScore)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {getHighSeverityCount(scanResult.performanceIssues)} high,{" "}
                {getMediumSeverityCount(scanResult.performanceIssues)} medium
                issues
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scan Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scan Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Site URL
              </h3>
              <p className="flex items-center gap-2 mt-1">
                <Globe size={16} className="text-blue-500" />
                <a
                  href={scanResult.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  {scanResult.siteUrl}
                  <ExternalLink size={12} />
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Scan Type
              </h3>
              <p className="mt-1 capitalize">{scanResult.scanType} Scan</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Scan Date
              </h3>
              <p className="mt-1">{formatDate(scanResult.scanDate)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe size={16} />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap size={16} />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Key Findings</CardTitle>
              <CardDescription>
                Summary of the most important issues found during the scan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Security Findings */}
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                    <Shield size={18} className="text-red-500" />
                    Security Findings
                  </h3>
                  <div className="space-y-3">
                    {scanResult.vulnerabilities
                      .filter(
                        (v) =>
                          v.severity === "critical" || v.severity === "high",
                      )
                      .slice(0, 3)
                      .map((vulnerability) => (
                        <Card key={vulnerability.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">
                                  {vulnerability.name}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {vulnerability.description}
                                </p>
                              </div>
                              <div>
                                <SeverityBadge
                                  severity={vulnerability.severity}
                                />
                              </div>
                            </div>
                            <Button
                              variant="link"
                              className="px-0 mt-2"
                              onClick={() => handleViewDetails(vulnerability)}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    {scanResult.vulnerabilities.filter(
                      (v) => v.severity === "critical" || v.severity === "high",
                    ).length === 0 && (
                      <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-green-600 dark:text-green-400">
                          <p className="font-medium">
                            No Critical Security Issues
                          </p>
                          <p>
                            No critical or high severity security
                            vulnerabilities were found.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* SEO Findings */}
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                    <Globe size={18} className="text-blue-500" />
                    SEO Findings
                  </h3>
                  <div className="space-y-3">
                    {scanResult.seoIssues
                      .filter(
                        (s) =>
                          s.severity === "critical" || s.severity === "high",
                      )
                      .slice(0, 3)
                      .map((seoIssue) => (
                        <Card key={seoIssue.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{seoIssue.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {seoIssue.description}
                                </p>
                              </div>
                              <div>
                                <SeverityBadge severity={seoIssue.severity} />
                              </div>
                            </div>
                            <Button
                              variant="link"
                              className="px-0 mt-2"
                              onClick={() => handleViewDetails(seoIssue)}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    {scanResult.seoIssues.filter(
                      (s) => s.severity === "critical" || s.severity === "high",
                    ).length === 0 && (
                      <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-green-600 dark:text-green-400">
                          <p className="font-medium">No Critical SEO Issues</p>
                          <p>
                            No critical or high severity SEO issues were found.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance Findings */}
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                    <Zap size={18} className="text-amber-500" />
                    Performance Findings
                  </h3>
                  <div className="space-y-3">
                    {scanResult.performanceIssues
                      .filter(
                        (p) =>
                          p.severity === "critical" || p.severity === "high",
                      )
                      .slice(0, 3)
                      .map((performanceIssue) => (
                        <Card key={performanceIssue.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">
                                  {performanceIssue.name}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {performanceIssue.description}
                                </p>
                              </div>
                              <div>
                                <SeverityBadge
                                  severity={performanceIssue.severity}
                                />
                              </div>
                            </div>
                            <Button
                              variant="link"
                              className="px-0 mt-2"
                              onClick={() =>
                                handleViewDetails(performanceIssue)
                              }
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    {scanResult.performanceIssues.filter(
                      (p) => p.severity === "critical" || p.severity === "high",
                    ).length === 0 && (
                      <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-green-600 dark:text-green-400">
                          <p className="font-medium">
                            No Critical Performance Issues
                          </p>
                          <p>
                            No critical or high severity performance issues were
                            found.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security, SEO, and Performance Tabs */}
        {["security", "seo", "performance"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="capitalize">
                      {tab === "seo" ? "SEO" : tab} Issues
                    </CardTitle>
                    <CardDescription>
                      {tab === "security" &&
                        "Security vulnerabilities found during the scan"}
                      {tab === "seo" &&
                        "SEO issues that may affect your search engine rankings"}
                      {tab === "performance" &&
                        "Performance problems that may slow down your website"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {getIssuesByCategory(tab).map((issue, index) => (
                      <AccordionItem key={issue.id} value={issue.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-2">
                              <SeverityBadge severity={issue.severity} />
                              <span className="font-medium">{issue.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {fixedIssues[issue.id] && (
                                <span className="text-green-500 flex items-center gap-1 text-xs">
                                  <CheckCircle size={12} />
                                  Fixed
                                </span>
                              )}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div>
                              <h4 className="text-sm font-medium">
                                Description
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {issue.description}
                              </p>
                            </div>

                            {tab === "performance" &&
                              issue.metric &&
                              issue.value && (
                                <div>
                                  <h4 className="text-sm font-medium">
                                    {issue.metric}
                                  </h4>
                                  <p className="text-sm font-semibold mt-1">
                                    {issue.value}
                                  </p>
                                </div>
                              )}

                            <div>
                              <h4 className="text-sm font-medium">
                                Recommendation
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {issue.recommendation}
                              </p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`fixed-${issue.id}`}
                                checked={fixedIssues[issue.id] || false}
                                onCheckedChange={() =>
                                  handleToggleFixed(issue.id)
                                }
                              />
                              <Label htmlFor={`fixed-${issue.id}`}>
                                Mark as fixed
                              </Label>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium">
                                Your Notes
                              </h4>
                              <Textarea
                                placeholder="Add your notes here..."
                                className="mt-1"
                                value={userNotes[issue.id] || ""}
                                onChange={(e) =>
                                  handleAddNote(issue.id, e.target.value)
                                }
                              />
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <HelpCircle size={14} />
                                Get Help
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {getIssuesByCategory(tab).length === 0 && (
                    <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-600 dark:text-green-400">
                        <p className="font-medium">No Issues Found</p>
                        <p>No {tab} issues were found during the scan.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Export {tab === "seo" ? "SEO" : tab} Report
                </Button>
                <Button className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  Contact Support
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Issue Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedIssue && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <SeverityBadge severity={selectedIssue.severity} />
                  {selectedIssue.name}
                </DialogTitle>
                <DialogDescription>
                  Detailed information about this issue
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedIssue.description}
                  </p>
                </div>

                {selectedIssue.metric && selectedIssue.value && (
                  <div>
                    <h4 className="text-sm font-medium">
                      {selectedIssue.metric}
                    </h4>
                    <p className="text-sm font-semibold mt-1">
                      {selectedIssue.value}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium">Recommendation</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedIssue.recommendation}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`dialog-fixed-${selectedIssue.id}`}
                    checked={fixedIssues[selectedIssue.id] || false}
                    onCheckedChange={() => handleToggleFixed(selectedIssue.id)}
                  />
                  <Label htmlFor={`dialog-fixed-${selectedIssue.id}`}>
                    Mark as fixed
                  </Label>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Your Notes</h4>
                  <Textarea
                    placeholder="Add your notes here..."
                    className="mt-1"
                    value={userNotes[selectedIssue.id] || ""}
                    onChange={(e) =>
                      handleAddNote(selectedIssue.id, e.target.value)
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsDialog(false)}
                >
                  Close
                </Button>
                <Button className="flex items-center gap-1">
                  <HelpCircle size={14} />
                  Get Help
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
