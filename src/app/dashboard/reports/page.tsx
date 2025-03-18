import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, BarChart, Download, Calendar, FileText, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Reports - SecureSEO",
  description: "View and download detailed reports for your websites",
};

type Report = {
  id: string;
  title: string;
  website: string;
  type: "security" | "seo" | "performance";
  date: string;
  summary: string;
};

const mockReports: Report[] = [
  {
    id: "report_1",
    title: "Security Scan Report",
    website: "example.com",
    type: "security",
    date: "May 15, 2023",
    summary: "1 high, 3 medium, 5 low vulnerabilities found",
  },
  {
    id: "report_2",
    title: "SEO Analysis Report",
    website: "example.com",
    type: "seo",
    date: "May 15, 2023",
    summary: "92/100 SEO score, 2 medium, 8 low issues found",
  },
  {
    id: "report_3",
    title: "Performance Analysis Report",
    website: "example.com",
    type: "performance",
    date: "May 15, 2023",
    summary: "78/100 performance score, 1.8s load time",
  },
  {
    id: "report_4",
    title: "Security Scan Report",
    website: "blog.example.com",
    type: "security",
    date: "May 14, 2023",
    summary: "0 high, 2 medium, 3 low vulnerabilities found",
  },
  {
    id: "report_5",
    title: "SEO Analysis Report",
    website: "blog.example.com",
    type: "seo",
    date: "May 14, 2023",
    summary: "88/100 SEO score, 3 medium, 5 low issues found",
  },
  {
    id: "report_6",
    title: "Performance Analysis Report",
    website: "blog.example.com",
    type: "performance",
    date: "May 14, 2023",
    summary: "82/100 performance score, 1.5s load time",
  },
];

export default function ReportsPage() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-5 w-5 text-primary" />;
      case "seo":
        return <Search className="h-5 w-5 text-purple-500" />;
      case "performance":
        return <BarChart className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "security":
        return <Badge className="bg-primary">Security</Badge>;
      case "seo":
        return <Badge className="bg-purple-500">SEO</Badge>;
      case "performance":
        return <Badge className="bg-orange-500">Performance</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="Reports"
        description="View and download detailed reports for your websites"
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockReports.map((report) => (
                  <Card key={report.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {getTypeIcon(report.type)}
                        {getTypeBadge(report.type)}
                      </div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {report.date}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-3">
                        <span className="font-medium text-sm">{report.website}</span>
                        <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{report.summary}</p>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="text-xs">
                          <FileText className="mr-1 h-3 w-3" />
                          View Report
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockReports
                  .filter(report => report.type === "security")
                  .map((report) => (
                    <Card key={report.id} className="overflow-hidden">
                      {/* Same card structure as above, filtered for security */}
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          {getTypeIcon(report.type)}
                          {getTypeBadge(report.type)}
                        </div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          {report.date}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-3">
                          <span className="font-medium text-sm">{report.website}</span>
                          <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{report.summary}</p>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" className="text-xs">
                            <FileText className="mr-1 h-3 w-3" />
                            View Report
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="seo" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockReports
                  .filter(report => report.type === "seo")
                  .map((report) => (
                    <Card key={report.i