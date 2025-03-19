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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Globe,
  Search,
  Download,
  ExternalLink,
  Filter,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  FileText,
  BarChart,
  Shield,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronRight,
  Link2,
  Code,
  Smartphone,
  Laptop,
  Share2,
  Printer,
  Mail,
  Calendar,
  Bookmark,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  location: string;
  solution: string;
  cveId?: string;
  category: string;
}

interface SEOIssue {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  location: string;
  solution: string;
  category: string;
}

interface PerformanceIssue {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  location: string;
  solution: string;
  category: string;
  metric?: string;
  value?: string;
}

export function ScanResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedScanId, setSelectedScanId] = useState("1"); // Default to first scan

  // Sample scan results data
  const scanResults: ScanResult[] = [
    {
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
          location: "/search.php?q=",
          solution: "Implement proper input validation and output encoding",
          cveId: "CVE-2023-1234",
          category: "injection",
        },
        {
          id: "v2",
          name: "Outdated WordPress Version",
          description: "Running WordPress 5.8.1 which has known vulnerabilities",
          severity: "medium",
          location: "/wp-includes/version.php",
          solution: "Update to the latest WordPress version (6.0.1 or newer)",
          category: "outdated-software",
        },
        {
          id: "v3",
          name: "Insecure Cookie Settings",
          description: "Cookies are set without the secure flag",
          severity: "medium",
          location: "HTTP Response Headers",
          solution: "Set the 'secure' flag for all cookies",
          category: "configuration",
        },
        {
          id: "v4",
          name: "Directory Listing Enabled",
          description: "Directory listing is enabled on the server",
          severity: "low",
          location: "/uploads/",
          solution: "Disable directory listing in server configuration",
          category: "configuration",
        },
        {
          id: "v5",
          name: "Information Disclosure",
          description: "Server version information is exposed in HTTP headers",
          severity: "info",
          location: "HTTP Response Headers",
          solution: "Configure server to hide version information",
          category: "information-disclosure",
        },
      ],
      seoIssues: [
        {
          id: "s1",
          name: "Missing Meta Descriptions",
          description: "Several pages are missing meta descriptions",
          severity: "medium",
          location: "/about.html, /services.html",
          solution: "Add unique and descriptive meta descriptions to each page",
          category: "meta-tags",
        },
        {
          id: "s2",
          name: "Duplicate Title Tags",
          description: "Multiple pages have identical title tags",
          severity: "high",
          location: "/products/item1.html, /products/item2.html",
          solution: "Create unique title tags for each page",
          category: "meta-tags",
        },
        {
          id: "s3",
          name: "Low Word Count",
          description: "Several pages have less than 300 words of content",
          severity: "medium",
          location: "/blog/post1.html, /blog/post2.html",
          solution: "Expand content to at least 500 words per page",
          category: "content",
        },
        {
          id: "s4",
          name: "Missing Alt Text",
          description: "Images are missing alt text attributes",
          severity: "medium",
          location: "Multiple locations",
          solution: "Add descriptive alt text to all images",
          category: "accessibility",
        },
        {
          id: "s5",
          name: "No XML Sitemap",
          description: "Website does not have an XML sitemap",
          severity: "low",
          location: "/sitemap.xml",
          solution: "Generate and submit an XML sitemap to search engines",
          category: "indexing",
        },
      ],
      performanceIssues: [
        {
          id: "p1",
          name: "Large JavaScript Files",
          description: "Several unminified JavaScript files are slowing down page load",
          severity: "high",
          location: "/js/main.js, /js/plugins.js",
          solution: "Minify and combine JavaScript files",
          category: "resource-size",
          metric: "File Size",
          value: "2.3MB",
        },
        {
          id: "p2",
          name: "Unoptimized Images",
          description: "Images are not properly sized or compressed",
          severity: "medium",
          location: "/images/hero.jpg, /images/products/*",
          solution: "Compress images and use responsive image sizes",
          category: "images",
          metric: "Potential Savings",
          value: "4.7MB",
        },
        {
          id: "p3",
          name: "Render-Blocking Resources",
          description: "CSS and JavaScript files are blocking page rendering",
          severity: "medium",
          location: "Multiple locations",
          solution: "Use async or defer attributes for scripts and inline critical CSS",
          category: "render-blocking",
          metric: "Blocking Time",
          value: "1.2s",
        },
        {
          id: "p4",
          name: "No Browser Caching",
          description: "Static resources are not leveraging browser caching",
          severity: "low",
          location: "HTTP Response Headers",
          solution: "Set appropriate cache-control headers",
          category: "caching",
          metric: "Cache TTL",
          value: "0s",
        },
        {
          id: "p5",
          name: "No Compression",
          description: "Text-based resources are not being compressed",
          severity: "medium",
          location: "HTTP Response Headers",
          solution: "Enable GZIP or Brotli compression",
          category: "compression",
          metric: "Potential Savings",
          value: "1.8MB",
        },
      ],
    },
    {
      id: "2",
      siteUrl: "https://anotherexample.org",
      scanType: "quick",
      scanDate: "2023-10-16T10:15:00Z",
      securityScore: 92,
      seoScore: 76,
      performanceScore: 88,
      vulnerabilities: [
        {
          id: "v1",
          name: "Missing Security Headers",
          description: "Several important security headers are missing",
          severity: "medium",
          location: "HTTP Response Headers",
          solution: "Implement Content-Security-Policy, X-XSS-Protection, and other security headers",
          category: "configuration",
        },
        {
          id: "v2",
          name: "Exposed .git Directory",
          description: "Git repository is publicly accessible",
          severity: "high",
          location: "/.git/",
          solution: "Block access to .git directory in server configuration",
          category: "information-disclosure",
        },
      ],
      seoIssues: [
        {
          id: "s1",
          name: "Broken Links",
          description: "Several links on the site are broken",
          severity: "high",
          location: "Multiple locations",
          solution: "Fix or remove broken links",
          category: "links",
        },
        {
          id: "s2",
          name: "Missing H1 Tags",
          description: "Some pages don't have H1 headings",
          severity: "medium",
          location: "/about.html, /contact.html",
          solution: "Add H1 headings to all pages",
          category: "structure",
        },
        {
          id: "s3",
          name: "Poor Mobile Usability",
          description: "Site is not properly optimized for mobile devices",
          severity: "high",
          location: "All pages",
          solution: "Implement responsive design",
          category: "mobile",
        },
      ],
      performanceIssues: [
        {
          id: "p1",
          name: "Slow Server Response Time",
          description: "Server takes too long to respond to requests",
          severity: "high",
          location: "Server",
          solution: "Optimize server configuration and database queries",
          category: "server",
          metric: "TTFB",
          value: "2.8s",
        },
        {
          id: "p2",
          name: "Too Many HTTP Requests",
          description: "Page makes excessive HTTP requests",
          severity: "medium",
          location: "All pages",
          solution: "Combine files and use sprites for images",
          category: "requests",
          metric: "Request Count",
          value: "87",
        },
      ],
    },
  ];

  const selectedScan = scanResults.find((scan) => scan.id === selectedScanId) || scanResults[0];

  const getIssuesByTab = () => {
    switch (selectedTab) {
      case "security":
        return selectedScan.vulnerabilities;
      case "seo":
        return selectedScan.seoIssues;
      case "performance":
        return selectedScan.performanceIssues;
      default:
        return [];
    }
  };

  const filteredIssues = getIssuesByTab().filter((issue) => {
    const matchesSearch = issue.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter ? issue.severity === severityFilter : true;
    const matchesCategory = categoryFilter ? issue.category === categoryFilter : true;

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  const getSeverityCount = (severity: string, issues: any[]) => {
    return issues.filter((issue) => issue.severity === severity).length;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs font-medium">
            Critical
          </span>
        );
      case "high":
        return (
          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-xs font-medium">
            High
          </span>
        );
      case "medium":
        return (
          <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs font-medium">
            Medium
          </span>
        );
      case "low":
        return (
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
            Low
          </span>
        );
      case "info":
        return (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-xs font-medium">
            Info
          </span>
        );
      default:
        return <span>{severity}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleViewDetails = (issue: any) => {
    setSelectedIssue(issue);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Scan Results</CardTitle>
              <CardDescription>
                Detailed analysis of security vulnerabilities, SEO issues, and performance problems
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedScanId}
                onValueChange={setSelectedScanId}
              >
                <SelectTrigger className="w-[250px]">
                  <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <SelectValue placeholder="Select scan" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {scanResults.map((scan) => (
                    <SelectItem key={scan.id} value={scan.id}>
                      {scan.siteUrl} ({formatDate(scan.scanDate)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={14} />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Shield size={16} />
                    Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${getScoreColor(selectedScan.securityScore)}`}>
                    {selectedScan.securityScore}/100
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertTriangle size={12} /> Critical/High
                      </span>
                      <span>
                        {getSeverityCount("critical", selectedScan.vulnerabilities) + 
                         getSeverityCount("high", selectedScan.vulnerabilities)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-600 flex items-center gap-1">
                        <AlertTriangle size={12} /> Medium
                      </span>
                      <span>{getSeverityCount("medium", selectedScan.vulnerabilities)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600 flex items-center gap-1">
                        <Info size={12} /> Low/Info
                      </span>
                      <span>
                        {getSeverityCount("low", selectedScan.vulnerabilities) + 
                         getSeverityCount("info", selectedScan.vulnerabilities)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BarChart size={16} />
                    SEO Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${getScoreColor(selectedScan.seoScore)}`}>
                    {selectedScan.seoScore}/100
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertTriangle size={12} /> Critical/High
                      </span>
                      <span>
                        {getSeverityCount("critical", selectedScan.seoIssues) + 
                         getSeverityCount("high", selectedScan.seoIssues)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-600 flex items-center gap-1">
                        <AlertTriangle size={12} /> Medium
                      </span>
                      <span>{getSeverityCount("medium", selectedScan.seoIssues)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600 flex items-center gap-1">
                        <Info size={12} /> Low/Info
                      </span>
                      <span>
                        {getSeverityCount("low", selectedScan.seoIssues) + 
                         getSeverityCount("info", selectedScan.seoIssues)}
                      </span>
                    </div>
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
                <CardContent>
                  <div className={`text-3xl font-bold ${getScoreColor(selectedScan.performanceScore)}`}>
                    {selectedScan.performanceScore}/100
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertTriangle size={12} /> Critical/High
                      </span>
                      <span>
                        {getSeverityCount("critical", selectedScan.performanceIssues) + 
                         getSeverityCount("high", selectedScan.performanceIssues)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-600 flex items-center gap-1">
                        <AlertTriangle size={12} /> Medium
                      </span>
                      <span>{getSeverityCount("medium", selectedScan.performanceIssues)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600 flex items-center gap-1">
                        <Info size={12} /> Low/Info
                      </span>
                      <span>
                        {getSeverityCount("low", selectedScan.performanceIssues) + 
                         getSeverityCount("info", selectedScan.performanceIssues)}
                      </span>
                    </div>
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
                    <h3 className="text-sm font-medium text-muted-foreground">Site URL</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <Globe size={16} className="text-blue-500" />
                      <a
                        href={selectedScan.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {selectedScan.siteUrl}
                        <ExternalLink size={12} />
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Scan Type</h3>
                    <p className="mt-1 capitalize">{selectedScan.scanType} Scan</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Scan Date</h3>
                    <p className="mt-1">{formatDate(selectedScan.scanDate)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results Tabs */}
            <Tabs
              defaultValue="overview"
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-4 md:w-auto w-full">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart size={16} />
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
                          {selectedScan.vulnerabilities
                            .filter((v) => v.severity === "critical" || v.severity === "high")
                            .slice(0, 3)
                            .map((vulnerability) => (
                              <Card key={vulnerability.id}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{vulnerability.name}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {vulnerability.description}
                                      </p>
                                    </div>
                                    <div>{getSeverityBadge(vulnerability.severity)}</div>
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
                          {selectedScan.vulnerabilities.filter(
                            (v) => v.severity === "critical" || v.severity === "high"
                          ).length === 0 && (
                            <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                              <div className="text-sm text-green-600 dark:text-green-400">
                                <p className="font-medium">No Critical Security Issues</p>
                                <p>
                                  No critical or high severity security vulnerabilities were found.
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
                          {selectedScan.seoIssues
                            .filter((s) => s.severity === "critical" || s.severity === "high")
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
                                    <div>{getSeverityBadge(seoIssue.severity)}</div>
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
                          {selectedScan.seoIssues.filter(
                            (s) => s.severity === "critical" || s.severity === "high"
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
                          {selectedScan.performanceIssues
                            .filter((p) => p.severity === "critical" || p.severity === "high")
                            .slice(0, 3)
                            .map((performanceIssue) => (
                              <Card key={performanceIssue.id}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{performanceIssue.name}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {performanceIssue.description}
                                      </p>
                                    </div>
                                    <div>{getSeverityBadge(performanceIssue.severity)}</div>
                                  </div>
                                  <Button
                                    variant="link"
                                    className="px-0 mt-2"
                                    onClick={() => handleViewDetails(performanceIssue)}
                                  >
                                    View Details
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          {selectedScan.performanceIssues.filter(
                            (p) => p.severity === "critical" || p.severity === "high"
                          ).length === 0 && (
                            <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                              <div className="text-sm text-green-600 dark:text-green-400">
                                <p className="font-medium">No Critical Performance Issues</p>
                                <p>
                                  No critical or high severity performance issues were found.
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
                            {tab === "security" && "Security vulnerabilities found during the scan"}
                            {tab === "seo" && "SEO issues that may affect your search engine rankings"}
                            {tab === "performance" && "Performance problems that may slow down your website"}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex items-center gap-2">
                            <Download size={14} />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="Search issues..."
                              className="pl-8"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Select
                              value={severityFilter || ""}
                              onValueChange={(value) => setSeverityFilter(value || null)}
                            >
                              <SelectTrigger className="w-[130px]">
                                <div className="flex items-center gap-2">
                                  <Filter size={14} />
                                  <SelectValue placeholder="Severity" />
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">All Severities</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="info">Info</SelectItem>
                              </SelectContent>
                            </Select>

                            <Select
                              value={categoryFilter || ""}
                              onValueChange={(value) => setCategoryFilter(value || null)}
                            >
                              <SelectTrigger className="w-[130px]">
                                <div className="flex items-center gap-2">
                                  <Filter size={14} />
                                  <SelectValue placeholder="Category" />
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">All Categories</SelectItem>
                                {/* Security Categories */}
                                {tab === "security" && (
                                  <>
                                    <SelectItem value="injection">Injection</SelectItem>
                                    <SelectItem value="outdated-software">Outdated Software</SelectItem>
                                    <SelectItem value="configuration">Configuration</SelectItem>
                                    <SelectItem value="information-disclosure">Information Disclosure</SelectItem>
                                  </>
                                )}
                                {/* SEO Categories */}
                                {tab === "seo" && (
                                  <>
                                    <SelectItem value="meta-tags">Meta Tags</SelectItem>
                                    <SelectItem value="content">Content</SelectItem>
                                    <SelectItem value="links">Links</SelectItem>
                                    <SelectItem value="structure">Structure</SelectItem>
                                    <SelectItem value="mobile">Mobile</SelectItem>
                                    <SelectItem value="accessibility">Accessibility</SelectItem>
                                    <SelectItem value="indexing">Indexing</SelectItem>
                                  </>
                                )}
                                {/* Performance Categories */}
                                {tab === "performance" && (
                                  <>
                                    <SelectItem value="resource-size">Resource Size</SelectItem>
                                    <SelectItem value="images">Images</SelectItem>
                                    <SelectItem value="render-blocking">Render Blocking</SelectItem>
                                    <SelectItem value="caching">Caching</SelectItem>
                                    <SelectItem value="compression">Compression</SelectItem>
                                    <SelectItem value="server">Server</SelectItem>
                                    <SelectItem value="requests">Requests</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Issue</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead>Location</TableHead>
                                {tab === "performance" && <TableHead>Metric</TableHead>}
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredIssues.length === 0 ? (
                                <TableRow>
                                  <TableCell
                                    colSpan={tab === "performance" ? 5 : 4}
                                    className="h-24 text-center"
                                  >
                                    No issues found.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filteredIssues.map((issue) => (
                                  <TableRow key={issue.id}>
                                    <TableCell>
                                      <div className="font-medium">{issue.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {issue.description}
                                      </div>
                                    </TableCell>
                                    <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                                    <TableCell>
                                      <div className="font-mono text-xs">{issue.location}</div>
                                    </TableCell>
                                    {tab === "performance" && (
                                      <TableCell>
                                        {issue.metric && issue.value ? (
                                          <div>
                                            <div className="text-xs text-muted-foreground">
                                              {issue.metric}
                                            </div>
                                            <div className="font-medium">{issue.value}</div>
                                          </div>
                                        ) : (
                                          "N/A"
                                        )}
                                      </TableCell>
                                    )}
                                    <TableCell className="text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleViewDetails(issue)}
                                      >
                                        <Eye size={16} />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>