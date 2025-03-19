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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { VerificationCard } from "@/components/dashboard/verification-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import {
  Globe,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  ExternalLink,
  Info,
  Eye,
} from "lucide-react";

interface Scan {
  id: string;
  siteUrl: string;
  scanType: "quick" | "full";
  createdAt: string;
  status: "running" | "completed" | "failed";
  progress?: number;
}

export function SiteInspectionPage() {
  const [siteUrl, setSiteUrl] = useState("");
  const [isFullScan, setIsFullScan] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isSiteVerified, setIsSiteVerified] = useState(true);
  const [showVerificationAlert, setShowVerificationAlert] =
    useState(!isSiteVerified);
  const [showLimitAlert, setShowLimitAlert] = useState(false);

  // Sample scans data
  const [scans, setScans] = useState<Scan[]>([
    {
      id: "1",
      siteUrl: "https://example.com",
      scanType: "full",
      createdAt: "2023-10-15T14:30:00Z",
      status: "completed",
    },
    {
      id: "2",
      siteUrl: "https://mysite.org",
      scanType: "quick",
      createdAt: "2023-10-16T10:15:00Z",
      status: "running",
      progress: 65,
    },
    {
      id: "3",
      siteUrl: "https://testsite.net",
      scanType: "quick",
      createdAt: "2023-10-14T09:45:00Z",
      status: "failed",
    },
  ]);

  const handleStartScan = () => {
    if (!siteUrl) return;

    if (!isSiteVerified) {
      setShowVerificationAlert(true);
      return;
    }

    // Check if user has reached scan limit (demo purposes)
    if (scans.length >= 5 && Math.random() > 0.7) {
      setShowLimitAlert(true);
      return;
    }

    setIsScanning(true);
    setScanProgress(0);

    // Add new scan to the list
    const newScan: Scan = {
      id: (scans.length + 1).toString(),
      siteUrl,
      scanType: isFullScan ? "full" : "quick",
      createdAt: new Date().toISOString(),
      status: "running",
      progress: 0,
    };

    setScans([newScan, ...scans]);

    // Simulate scan progress
    const interval = setInterval(
      () => {
        setScanProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 10);

          // Update the scan progress in the scans list
          setScans((prevScans) =>
            prevScans.map((scan) =>
              scan.id === newScan.id
                ? { ...scan, progress: newProgress > 100 ? 100 : newProgress }
                : scan,
            ),
          );

          if (newProgress >= 100) {
            clearInterval(interval);
            setIsScanning(false);

            // Update scan status to completed
            setScans((prevScans) =>
              prevScans.map((scan) =>
                scan.id === newScan.id
                  ? { ...scan, status: "completed", progress: undefined }
                  : scan,
              ),
            );

            return 100;
          }
          return newProgress;
        });
      },
      isFullScan ? 1000 : 500,
    ); // Full scans take longer

    return () => clearInterval(interval);
  };

  const filteredScans = scans.filter((scan) => {
    return statusFilter ? scan.status === statusFilter : true;
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
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Site Inspection"
        description="Scan your website for security vulnerabilities, SEO issues, and performance problems"
        onScan={handleStartScan}
        isScanning={isScanning}
      />

      {showVerificationAlert && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Required</AlertTitle>
          <AlertDescription>
            You need to verify your website ownership before scanning. Please
            complete the verification process below.
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => setShowVerificationAlert(false)}
          >
            Dismiss
          </Button>
        </Alert>
      )}

      {showLimitAlert && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Scan Limit Reached</AlertTitle>
          <AlertDescription>
            You have reached the maximum number of scans allowed in your current
            plan. Please upgrade to continue scanning.
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => setShowLimitAlert(false)}
          >
            Dismiss
          </Button>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Start New Scan</CardTitle>
            <CardDescription>
              Enter your website URL and select scan options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Website URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="siteUrl"
                      placeholder="https://example.com"
                      className="pl-8"
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      disabled={isScanning}
                    />
                  </div>
                  <Button
                    onClick={handleStartScan}
                    disabled={!siteUrl || isScanning}
                    className="flex items-center gap-2"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        Start Scan
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isScanning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Scan in progress...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="scan-type"
                  checked={isFullScan}
                  onCheckedChange={setIsFullScan}
                  disabled={isScanning}
                />
                <Label htmlFor="scan-type">Full Scan</Label>
                <Info
                  size={16}
                  className="text-muted-foreground cursor-help ml-1"
                  title="Full scans are more thorough but take longer to complete"
                />
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Scan Types:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Quick Scan</p>
                    <p className="text-muted-foreground">
                      Checks basic security and SEO issues. Takes 1-2 minutes.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Full Scan</p>
                    <p className="text-muted-foreground">
                      Comprehensive analysis of security, SEO, and performance.
                      Takes 5-10 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isSiteVerified ? (
          <VerificationCard
            domain={siteUrl || "example.com"}
            onVerify={() => setIsSiteVerified(true)}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Scan Limits</CardTitle>
              <CardDescription>Your current plan limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Quick Scans</p>
                  <div className="flex justify-between items-center mt-1">
                    <Progress value={30} className="h-2" />
                    <span className="text-sm ml-2">3/10</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Full Scans</p>
                  <div className="flex justify-between items-center mt-1">
                    <Progress value={50} className="h-2" />
                    <span className="text-sm ml-2">1/2</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>
                View and manage your recent website scans
              </CardDescription>
            </div>
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
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Website URL</TableHead>
                  <TableHead>Scan Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No scans found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredScans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-blue-500" />
                          <span className="truncate max-w-[200px]">
                            {scan.siteUrl}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{scan.scanType}</span>
                      </TableCell>
                      <TableCell>{formatDate(scan.createdAt)}</TableCell>
                      <TableCell>
                        {getStatusBadge(scan.status, scan.progress)}
                      </TableCell>
                      <TableCell className="text-right">
                        {scan.status === "completed" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            asChild
                          >
                            <a href="/dashboard/scan-results">
                              <Eye size={14} />
                              View Results
                            </a>
                          </Button>
                        ) : scan.status === "failed" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => {
                              setSiteUrl(scan.siteUrl);
                              setIsFullScan(scan.scanType === "full");
                            }}
                          >
                            <RefreshCw size={14} />
                            Retry
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled
                            className="flex items-center gap-1"
                          >
                            <Clock size={14} />
                            In Progress
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
