"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MoreHorizontal,
  Filter,
  Download,
  Shield,
  ExternalLink,
} from "lucide-react";
import { SeverityBadge } from "@/components/dashboard/severity-badge";

type Scan = {
  id: string;
  website: string;
  user: string;
  type: "security" | "seo" | "performance";
  status: "completed" | "in_progress" | "failed" | "queued";
  startTime: string;
  endTime: string;
  duration: string;
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
};

const mockScans: Scan[] = [
  {
    id: "scan_1",
    website: "example.com",
    user: "John Doe",
    type: "security",
    status: "completed",
    startTime: "2023-05-15 10:30",
    endTime: "2023-05-15 10:45",
    duration: "15m",
    findings: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 5,
      info: 12,
    },
  },
  {
    id: "scan_2",
    website: "techstart.io",
    user: "Jane Smith",
    type: "seo",
    status: "completed",
    startTime: "2023-05-15 09:15",
    endTime: "2023-05-15 09:25",
    duration: "10m",
    findings: {
      critical: 0,
      high: 0,
      medium: 2,
      low: 8,
      info: 5,
    },
  },
  {
    id: "scan_3",
    website: "globalreach.com",
    user: "Robert Johnson",
    type: "performance",
    status: "completed",
    startTime: "2023-05-15 08:00",
    endTime: "2023-05-15 08:10",
    duration: "10m",
    findings: {
      critical: 0,
      high: 0,
      medium: 1,
      low: 3,
      info: 2,
    },
  },
  {
    id: "scan_4",
    website: "acme-corp.com",
    user: "Emily Chen",
    type: "security",
    status: "in_progress",
    startTime: "2023-05-15 11:00",
    endTime: "",
    duration: "",
    findings: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
  },
  {
    id: "scan_5",
    website: "artisan-crafts.com",
    user: "Michael Brown",
    type: "seo",
    status: "queued",
    startTime: "",
    endTime: "",
    duration: "",
    findings: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
  },
  {
    id: "scan_6",
    website: "securehosting.net",
    user: "Sarah Wilson",
    type: "security",
    status: "failed",
    startTime: "2023-05-15 07:30",
    endTime: "2023-05-15 07:32",
    duration: "2m",
    findings: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
  },
];

export function ScanManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScans = mockScans.filter(
    (scan) =>
      scan.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.user.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      case "queued":
        return <Badge variant="outline">Queued</Badge>;
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

  const getSeverityCount = (scan: Scan) => {
    if (scan.status !== "completed") return null;

    return (
      <div className="flex items-center gap-1">
        {scan.findings.critical > 0 && (
          <div className="flex items-center">
            <SeverityBadge severity="critical" />
            <span className="ml-1">{scan.findings.critical}</span>
          </div>
        )}
        {scan.findings.high > 0 && (
          <div className="flex items-center ml-2">
            <SeverityBadge severity="high" />
            <span className="ml-1">{scan.findings.high}</span>
          </div>
        )}
        {scan.findings.medium > 0 && (
          <div className="flex items-center ml-2">
            <SeverityBadge severity="medium" />
            <span className="ml-1">{scan.findings.medium}</span>
          </div>
        )}
        {scan.findings.low > 0 && (
          <div className="flex items-center ml-2">
            <SeverityBadge severity="low" />
            <span className="ml-1">{scan.findings.low}</span>
          </div>
        )}
        {scan.findings.critical === 0 &&
          scan.findings.high === 0 &&
          scan.findings.medium === 0 &&
          scan.findings.low === 0 && (
            <span className="text-sm text-muted-foreground">
              No issues found
            </span>
          )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Scan Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search scans..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Website</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScans.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No scans found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredScans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {scan.website}
                          <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell>{scan.user}</TableCell>
                      <TableCell>{getTypeBadge(scan.type)}</TableCell>
                      <TableCell>{getStatusBadge(scan.status)}</TableCell>
                      <TableCell>{scan.startTime || "--"}</TableCell>
                      <TableCell>{scan.endTime || "--"}</TableCell>
                      <TableCell>{scan.duration || "--"}</TableCell>
                      <TableCell>{getSeverityCount(scan)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Report</DropdownMenuItem>
                            <DropdownMenuItem>View Raw Data</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {scan.status === "in_progress" && (
                              <DropdownMenuItem className="text-destructive">
                                Cancel Scan
                              </DropdownMenuItem>
                            )}
                            {scan.status === "completed" && (
                              <DropdownMenuItem>Re-run Scan</DropdownMenuItem>
                            )}
                            {scan.status === "failed" && (
                              <DropdownMenuItem>Retry Scan</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredScans.length} of {mockScans.length} scans
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Scan History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
