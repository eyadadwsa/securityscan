"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, BarChart, Download, ExternalLink } from "lucide-react";

type Scan = {
  id: string;
  website: string;
  type: "security" | "seo" | "performance";
  status: "completed" | "in_progress" | "failed";
  date: string;
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
};

const mockScans: Scan[] = [
  {
    id: "scan_1",
    website: "example.com",
    type: "security",
    status: "completed",
    date: "May 15, 2023",
    findings: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 5,
    },
  },
  {
    id: "scan_2",
    website: "example.com",
    type: "seo",
    status: "completed",
    date: "May 15, 2023",
    findings: {
      critical: 0,
      high: 0,
      medium: 2,
      low: 8,
    },
  },
  {
    id: "scan_3",
    website: "blog.example.com",
    type: "performance",
    status: "completed",
    date: "May 14, 2023",
    findings: {
      critical: 0,
      high: 0,
      medium: 1,
      low: 3,
    },
  },
  {
    id: "scan_4",
    website: "myshop.example.com",
    type: "security",
    status: "in_progress",
    date: "May 15, 2023",
    findings: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
  },
  {
    id: "scan_5",
    website: "personal-site.com",
    type: "seo",
    status: "failed",
    date: "May 13, 2023",
    findings: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
  },
];

export function RecentScans() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-4 w-4 text-primary" />;
      case "seo":
        return <Search className="h-4 w-4 text-purple-500" />;
      case "performance":
        return <BarChart className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Scans</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockScans.map((scan) => (
            <div key={scan.id} className="flex flex-col p-3 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(scan.type)}
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">
                        {scan.website}
                      </span>
                      <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {getTypeBadge(scan.type)}
                      <span className="text-xs text-muted-foreground ml-1">
                        {scan.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div>{getStatusBadge(scan.status)}</div>
              </div>

              {scan.status === "completed" && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {scan.findings.critical > 0 && (
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-destructive mr-1"></div>
                          <span>{scan.findings.critical} Critical</span>
                        </div>
                      )}
                      {scan.findings.high > 0 && (
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-orange-500 mr-1"></div>
                          <span>{scan.findings.high} High</span>
                        </div>
                      )}
                      {scan.findings.medium > 0 && (
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                          <span>{scan.findings.medium} Medium</span>
                        </div>
                      )}
                      {scan.findings.critical === 0 &&
                        scan.findings.high === 0 &&
                        scan.findings.medium === 0 && (
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                            <span>No major issues</span>
                          </div>
                        )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}

              {scan.status === "in_progress" && (
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full w-2/3"></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Scan in progress (67%)
                  </p>
                </div>
              )}

              {scan.status === "failed" && (
                <div className="mt-2">
                  <p className="text-xs text-red-500">
                    Scan failed - Unable to access website
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
