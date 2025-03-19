import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "lucide-react";

export interface AnalyticsDashboardProps {
  sites?: Array<{
    id: string;
    name: string;
    url: string;
    securityScore: number;
    seoScore: number;
    performanceScore: number;
    vulnerabilities: number;
    loadTime: number;
  }>;
  vulnerabilityData?: {
    byType: Array<{ type: string; count: number }>;
    bySeverity: Array<{ severity: string; count: number }>;
    topVulnerabilities: Array<{
      id: string;
      name: string;
      severity: "high" | "medium" | "low";
      reportUrl: string;
    }>;
  };
  seoData?: {
    scoreDistribution: Array<{ score: string; count: number }>;
    keywordDistribution: Array<{ keyword: string; count: number }>;
    topIssues: Array<{
      id: string;
      name: string;
      impact: "high" | "medium" | "low";
      reportUrl: string;
    }>;
  };
  performanceData?: {
    loadTimeDistribution: Array<{ time: string; count: number }>;
    resourceDistribution: Array<{ resource: string; usage: number }>;
    topIssues: Array<{
      id: string;
      name: string;
      impact: "high" | "medium" | "low";
      reportUrl: string;
    }>;
  };
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  sites = [
    {
      id: "1",
      name: "Main Website",
      url: "https://example.com",
      securityScore: 85,
      seoScore: 78,
      performanceScore: 92,
      vulnerabilities: 3,
      loadTime: 1.2,
    },
    {
      id: "2",
      name: "Blog",
      url: "https://blog.example.com",
      securityScore: 72,
      seoScore: 89,
      performanceScore: 81,
      vulnerabilities: 5,
      loadTime: 1.8,
    },
    {
      id: "3",
      name: "E-commerce Store",
      url: "https://store.example.com",
      securityScore: 91,
      seoScore: 84,
      performanceScore: 76,
      vulnerabilities: 1,
      loadTime: 2.1,
    },
  ],
  vulnerabilityData = {
    byType: [
      { type: "XSS", count: 12 },
      { type: "SQL Injection", count: 5 },
      { type: "CSRF", count: 8 },
      { type: "Outdated Libraries", count: 15 },
      { type: "Misconfiguration", count: 10 },
    ],
    bySeverity: [
      { severity: "High", count: 7 },
      { severity: "Medium", count: 18 },
      { severity: "Low", count: 25 },
    ],
    topVulnerabilities: [
      {
        id: "v1",
        name: "Cross-Site Scripting in Contact Form",
        severity: "high",
        reportUrl: "/dashboard/reports/v1",
      },
      {
        id: "v2",
        name: "Outdated jQuery Library",
        severity: "medium",
        reportUrl: "/dashboard/reports/v2",
      },
      {
        id: "v3",
        name: "Missing Content Security Policy",
        severity: "medium",
        reportUrl: "/dashboard/reports/v3",
      },
      {
        id: "v4",
        name: "Insecure Cookie Settings",
        severity: "low",
        reportUrl: "/dashboard/reports/v4",
      },
    ],
  },
  seoData = {
    scoreDistribution: [
      { score: "90-100", count: 2 },
      { score: "80-89", count: 5 },
      { score: "70-79", count: 8 },
      { score: "60-69", count: 3 },
      { score: "Below 60", count: 1 },
    ],
    keywordDistribution: [
      { keyword: "security", count: 45 },
      { keyword: "analysis", count: 32 },
      { keyword: "website", count: 67 },
      { keyword: "performance", count: 28 },
      { keyword: "optimization", count: 41 },
    ],
    topIssues: [
      {
        id: "s1",
        name: "Missing Meta Descriptions",
        impact: "high",
        reportUrl: "/dashboard/reports/s1",
      },
      {
        id: "s2",
        name: "Low Keyword Density",
        impact: "medium",
        reportUrl: "/dashboard/reports/s2",
      },
      {
        id: "s3",
        name: "Broken Links Detected",
        impact: "high",
        reportUrl: "/dashboard/reports/s3",
      },
      {
        id: "s4",
        name: "Images Missing Alt Text",
        impact: "medium",
        reportUrl: "/dashboard/reports/s4",
      },
    ],
  },
  performanceData = {
    loadTimeDistribution: [
      { time: "Under 1s", count: 3 },
      { time: "1-2s", count: 7 },
      { time: "2-3s", count: 5 },
      { time: "3-4s", count: 2 },
      { time: "Over 4s", count: 1 },
    ],
    resourceDistribution: [
      { resource: "Images", usage: 42 },
      { resource: "JavaScript", usage: 28 },
      { resource: "CSS", usage: 15 },
      { resource: "Fonts", usage: 8 },
      { resource: "Other", usage: 7 },
    ],
    topIssues: [
      {
        id: "p1",
        name: "Large Unoptimized Images",
        impact: "high",
        reportUrl: "/dashboard/reports/p1",
      },
      {
        id: "p2",
        name: "Render-Blocking Resources",
        impact: "high",
        reportUrl: "/dashboard/reports/p2",
      },
      {
        id: "p3",
        name: "Excessive DOM Size",
        impact: "medium",
        reportUrl: "/dashboard/reports/p3",
      },
      {
        id: "p4",
        name: "Inefficient Cache Policy",
        impact: "low",
        reportUrl: "/dashboard/reports/p4",
      },
    ],
  },
}) => {
  return (
    <div className="w-full bg-background p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="other">Other Regions</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <span className="mr-2">Export Report</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </Button>
        </div>
      </div>

      {/* Sites Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sites Overview</CardTitle>
          <CardDescription>
            Performance summary of your verified websites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sites.map((site) => (
              <Card key={site.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50 pb-2">
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <CardDescription className="text-xs truncate">
                    {site.url}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Security Score</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mr-2">
                          <div
                            className={`h-full ${site.securityScore >= 90 ? "bg-green-500" : site.securityScore >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${site.securityScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {site.securityScore}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SEO Score</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mr-2">
                          <div
                            className={`h-full ${site.seoScore >= 90 ? "bg-green-500" : site.seoScore >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${site.seoScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {site.seoScore}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Performance Score</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mr-2">
                          <div
                            className={`h-full ${site.performanceScore >= 90 ? "bg-green-500" : site.performanceScore >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${site.performanceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {site.performanceScore}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                      <span>
                        Vulnerabilities: <strong>{site.vulnerabilities}</strong>
                      </span>
                      <span>
                        Load Time: <strong>{site.loadTime}s</strong>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="security" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Security Analysis
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            SEO Analysis
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            Performance Analysis
          </TabsTrigger>
        </TabsList>

        {/* Security Analysis Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Vulnerability Types
                </CardTitle>
                <CardDescription>
                  Distribution of vulnerability types across all sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center p-4">
                    <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interactive pie chart showing vulnerability distribution
                      by type
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {vulnerabilityData.byType.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{item.type}</span>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Vulnerability Severity
                </CardTitle>
                <CardDescription>
                  Distribution of vulnerability severity across all sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center p-4">
                    <BarChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interactive bar chart showing vulnerability distribution
                      by severity
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {vulnerabilityData.bySeverity.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${item.severity === "High" ? "bg-red-500" : item.severity === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}
                        ></div>
                        <span className="text-sm">{item.severity}</span>
                      </div>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Security Vulnerabilities</CardTitle>
              <CardDescription>
                Most critical security issues detected across your sites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilityData.topVulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{vuln.name}</h3>
                        <div className="mt-1 flex items-center">
                          <div
                            className={`px-2 py-0.5 text-xs rounded-full ${vuln.severity === "high" ? "bg-red-100 text-red-800" : vuln.severity === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                          >
                            {vuln.severity.charAt(0).toUpperCase() +
                              vuln.severity.slice(1)}{" "}
                            Severity
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={vuln.reportUrl}>View Details</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Vulnerabilities
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Analysis Tab */}
        <TabsContent value="seo" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  SEO Score Distribution
                </CardTitle>
                <CardDescription>
                  Distribution of SEO scores across all sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center p-4">
                    <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interactive pie chart showing SEO score distribution
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {seoData.scoreDistribution.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{item.score}</span>
                      <span className="text-sm font-medium">
                        {item.count} sites
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Keyword Distribution
                </CardTitle>
                <CardDescription>
                  Most common keywords across all sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center p-4">
                    <BarChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interactive bar chart showing keyword distribution
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {seoData.keywordDistribution.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{item.keyword}</span>
                      <span className="text-sm font-medium">
                        {item.count} occurrences
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top SEO Issues</CardTitle>
              <CardDescription>
                Most critical SEO issues detected across your sites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoData.topIssues.map((issue) => (
                  <div key={issue.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{issue.name}</h3>
                        <div className="mt-1 flex items-center">
                          <div
                            className={`px-2 py-0.5 text-xs rounded-full ${issue.impact === "high" ? "bg-red-100 text-red-800" : issue.impact === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                          >
                            {issue.impact.charAt(0).toUpperCase() +
                              issue.impact.slice(1)}{" "}
                            Impact
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={issue.reportUrl}>View Details</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All SEO Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analysis Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2" />
                  Load Time Distribution
                </CardTitle>
                <CardDescription>
                  Distribution of page load times across all sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center p-4">
                    <LineChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interactive line chart showing load time distribution
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {performanceData.loadTimeDistribution.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{item.time}</span>
                      <span className="text-sm font-medium">
                        {item.count} pages
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Resource Usage
                </CardTitle>
                <CardDescription>
                  Distribution of resource usage across all sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center p-4">
                    <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interactive pie chart showing resource usage distribution
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {performanceData.resourceDistribution.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{item.resource}</span>
                      <span className="text-sm font-medium">{item.usage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performance Issues</CardTitle>
              <CardDescription>
                Most critical performance issues detected across your sites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.topIssues.map((issue) => (
                  <div key={issue.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{issue.name}</h3>
                        <div className="mt-1 flex items-center">
                          <div
                            className={`px-2 py-0.5 text-xs rounded-full ${issue.impact === "high" ? "bg-red-100 text-red-800" : issue.impact === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                          >
                            {issue.impact.charAt(0).toUpperCase() +
                              issue.impact.slice(1)}{" "}
                            Impact
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={issue.reportUrl}>View Details</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Performance Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Custom Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Reports</CardTitle>
          <CardDescription>
            Create and schedule custom reports based on specific criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Create Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate a new custom report with specific filters and
                  criteria
                </p>
                <Button className="w-full" variant="default">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Create New Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Schedule Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Set up automated reports to be sent on a regular schedule
                </p>
                <Button className="w-full" variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Schedule Reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Export your analytics data in various formats
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                    </svg>
                    Excel
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Additional Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Recommendations</CardTitle>
            <CardDescription>
              Personalized suggestions to improve your websites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500 mr-3 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div>
                    <h3 className="font-medium text-blue-700 dark:text-blue-300">
                      Security Recommendation
                    </h3>
                    <p className="text-sm mt-1 text-blue-600 dark:text-blue-400">
                      Consider implementing Content Security Policy headers on
                      your main website to prevent XSS attacks.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mr-3 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-300">
                      SEO Recommendation
                    </h3>
                    <p className="text-sm mt-1 text-green-600 dark:text-green-400">
                      Adding meta descriptions to your blog posts could improve
                      click-through rates by approximately 15%.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500 mr-3 mt-0.5"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <div>
                    <h3 className="font-medium text-purple-700 dark:text-purple-300">
                      Performance Recommendation
                    </h3>
                    <p className="text-sm mt-1 text-purple-600 dark:text-purple-400">
                      Optimizing the images on your e-commerce store could
                      reduce page load time by up to 40%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>
              Compare your websites with competitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Keyword Comparison</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your competitors are ranking higher for keywords: "security
                  analysis", "website optimization"
                </p>
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    View Keyword Analysis
                  </Button>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Performance Benchmarking</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your main website loads 1.5s faster than the industry average
                </p>
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    View Performance Comparison
                  </Button>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Security Posture</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your security measures are in the top 25% of similar websites
                </p>
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    View Security Comparison
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Add Competitor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
