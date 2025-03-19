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
  Globe,
  Search,
  Plus,
  Save,
  Trash2,
  Upload,
  BarChart,
  Settings,
  AlertTriangle,
  FileText,
  RefreshCw,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Code,
  Link,
  Key,
  Lock,
  FileJson,
  Webhook,
  Server,
  Database,
  Layers,
  Zap,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface API {
  id: string;
  name: string;
  description: string;
  type: string;
  status: "enabled" | "disabled";
  endpoint: string;
  authType: string;
  apiKey?: string;
  username?: string;
  password?: string;
  responseTime?: number;
  errorRate?: number;
  usageCount?: number;
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
}

interface APIPerformance {
  apiId: string;
  apiName: string;
  date: string;
  responseTime: number;
  usageCount: number;
  errorRate: number;
  successRate: number;
}

export function APIIntegrationConfiguration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showAddAPIDialog, setShowAddAPIDialog] = useState(false);
  const [newAPI, setNewAPI] = useState({
    name: "",
    description: "",
    type: "rest",
    endpoint: "",
    authType: "api-key",
    apiKey: "",
    username: "",
    password: "",
  });

  // Sample APIs data
  const [apis, setApis] = useState<API[]>([
    {
      id: "1",
      name: "Google Search Console API",
      description: "Integration with Google Search Console for SEO data",
      type: "rest",
      status: "enabled",
      endpoint: "https://www.googleapis.com/webmasters/v3",
      authType: "oauth2",
      apiKey: "••••••••••••••••••••••••••••••••••",
      responseTime: 320,
      errorRate: 0.02,
      usageCount: 1856,
      lastUsed: "2023-10-16T14:30:00Z",
      createdAt: "2023-01-15T09:00:00Z",
      updatedAt: "2023-10-01T11:20:00Z",
    },
    {
      id: "2",
      name: "Bing Webmaster API",
      description: "Integration with Bing Webmaster Tools for SEO data",
      type: "rest",
      status: "enabled",
      endpoint: "https://ssl.bing.com/webmaster/api.svc/json",
      authType: "api-key",
      apiKey: "••••••••••••••••••••••••••••••••••",
      responseTime: 380,
      errorRate: 0.03,
      usageCount: 756,
      lastUsed: "2023-10-15T10:15:00Z",
      createdAt: "2023-02-20T14:30:00Z",
      updatedAt: "2023-09-25T16:45:00Z",
    },
    {
      id: "3",
      name: "Moz API",
      description: "Access to Moz's SEO metrics and data",
      type: "rest",
      status: "enabled",
      endpoint: "https://moz.com/api",
      authType: "basic",
      username: "••••••••••••",
      password: "••••••••••••",
      responseTime: 420,
      errorRate: 0.01,
      usageCount: 1245,
      lastUsed: "2023-10-16T16:45:00Z",
      createdAt: "2023-03-10T11:20:00Z",
      updatedAt: "2023-10-10T09:30:00Z",
    },
    {
      id: "4",
      name: "Ahrefs API",
      description: "Access to Ahrefs backlink and SEO data",
      type: "rest",
      status: "disabled",
      endpoint: "https://api.ahrefs.com",
      authType: "api-key",
      apiKey: "••••••••••••••••••••••••••••••••••",
      responseTime: 520,
      errorRate: 0.04,
      usageCount: 532,
      lastUsed: "2023-10-10T13:20:00Z",
      createdAt: "2023-04-25T08:15:00Z",
      updatedAt: "2023-10-05T14:10:00Z",
    },
    {
      id: "5",
      name: "Semrush API",
      description: "Access to Semrush competitive research data",
      type: "rest",
      status: "enabled",
      endpoint: "https://api.semrush.com",
      authType: "api-key",
      apiKey: "••••••••••••••••••••••••••••••••••",
      responseTime: 350,
      errorRate: 0.02,
      usageCount: 1432,
      lastUsed: "2023-10-15T09:10:00Z",
      createdAt: "2023-05-18T10:45:00Z",
      updatedAt: "2023-09-28T15:30:00Z",
    },
    {
      id: "6",
      name: "Majestic API",
      description: "Access to Majestic backlink data",
      type: "soap",
      status: "enabled",
      endpoint: "https://api.majestic.com/api",
      authType: "api-key",
      apiKey: "••••••••••••••••••••••••••••••••••",
      responseTime: 480,
      errorRate: 0.03,
      usageCount: 645,
      lastUsed: "2023-10-14T11:25:00Z",
      createdAt: "2023-06-05T13:40:00Z",
      updatedAt: "2023-10-02T10:15:00Z",
    },
  ]);

  // Sample performance data
  const [performanceData, setPerformanceData] = useState<APIPerformance[]>([
    {
      apiId: "1",
      apiName: "Google Search Console API",
      date: "2023-10-15",
      responseTime: 320,
      usageCount: 156,
      errorRate: 0.02,
      successRate: 0.98,
    },
    {
      apiId: "1",
      apiName: "Google Search Console API",
      date: "2023-10-14",
      responseTime: 315,
      usageCount: 142,
      errorRate: 0.03,
      successRate: 0.97,
    },
    {
      apiId: "2",
      apiName: "Bing Webmaster API",
      date: "2023-10-15",
      responseTime: 380,
      usageCount: 98,
      errorRate: 0.03,
      successRate: 0.97,
    },
    {
      apiId: "3",
      apiName: "Moz API",
      date: "2023-10-15",
      responseTime: 420,
      usageCount: 125,
      errorRate: 0.01,
      successRate: 0.99,
    },
    {
      apiId: "5",
      apiName: "Semrush API",
      date: "2023-10-15",
      responseTime: 350,
      usageCount: 176,
      errorRate: 0.02,
      successRate: 0.98,
    },
  ]);

  // Sample audit log data
  const auditLogs = [
    {
      id: "1",
      action: "API Enabled",
      apiName: "Google Search Console API",
      user: "admin@secureseo.com",
      timestamp: "2023-10-15T14:30:00Z",
      details: "Enabled Google Search Console API integration",
    },
    {
      id: "2",
      action: "API Key Updated",
      apiName: "Bing Webmaster API",
      user: "admin@secureseo.com",
      timestamp: "2023-10-14T11:15:00Z",
      details: "Updated API key for Bing Webmaster API",
    },
    {
      id: "3",
      action: "API Added",
      apiName: "Custom SEO API",
      user: "admin@secureseo.com",
      timestamp: "2023-10-12T09:45:00Z",
      details: "Added new custom API integration",
    },
    {
      id: "4",
      action: "API Disabled",
      apiName: "Ahrefs API",
      user: "admin@secureseo.com",
      timestamp: "2023-10-10T16:20:00Z",
      details: "Disabled Ahrefs API due to billing issues",
    },
    {
      id: "5",
      action: "Settings Updated",
      apiName: "Moz API",
      user: "admin@secureseo.com",
      timestamp: "2023-10-08T13:10:00Z",
      details: "Updated authentication credentials for Moz API",
    },
  ];

  const handleAddAPI = () => {
    const newAPIEntry: API = {
      id: (apis.length + 1).toString(),
      name: newAPI.name,
      description: newAPI.description,
      type: newAPI.type,
      status: "enabled",
      endpoint: newAPI.endpoint,
      authType: newAPI.authType,
      apiKey: newAPI.authType === "api-key" ? newAPI.apiKey : undefined,
      username: newAPI.authType === "basic" ? newAPI.username : undefined,
      password: newAPI.authType === "basic" ? newAPI.password : undefined,
      responseTime: 0,
      errorRate: 0,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setApis([...apis, newAPIEntry]);
    setShowAddAPIDialog(false);
    setNewAPI({
      name: "",
      description: "",
      type: "rest",
      endpoint: "",
      authType: "api-key",
      apiKey: "",
      username: "",
      password: "",
    });
  };

  const handleToggleAPIStatus = (apiId: string) => {
    setApis(
      apis.map((api) =>
        api.id === apiId
          ? {
              ...api,
              status: api.status === "enabled" ? "disabled" : "enabled",
              updatedAt: new Date().toISOString(),
            }
          : api,
      ),
    );
  };

  const handleDeleteAPI = (apiId: string) => {
    setApis(apis.filter((api) => api.id !== apiId));
  };

  const filteredAPIs = apis.filter((api) => {
    const matchesSearch = api.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? api.status === statusFilter : true;
    const matchesType = typeFilter ? api.type === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-4">
      <Tabs defaultValue="apis" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="apis" className="flex items-center gap-2">
            <Globe size={16} />
            <span className="hidden sm:inline">APIs</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart size={16} />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook size={16} />
            <span className="hidden sm:inline">Webhooks</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Audit Log</span>
          </TabsTrigger>
        </TabsList>

        {/* APIs Tab */}
        <TabsContent value="apis">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>API Integrations</CardTitle>
                  <CardDescription>
                    Manage third-party API integrations for your platform
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowAddAPIDialog(true)}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Plus size={16} />
                  Add API
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
                      placeholder="Search APIs..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={statusFilter || ""}
                      onValueChange={(value) =>
                        setStatusFilter(value || null)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <div className="flex items-center gap-2">
                          <Filter size={14} />
                          <SelectValue placeholder="Status" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>

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
                        <SelectItem value="rest">REST</SelectItem>
                        <SelectItem value="soap">SOAP</SelectItem>
                        <SelectItem value="graphql">GraphQL</SelectItem>
                        <SelectItem value="grpc">gRPC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Error Rate</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAPIs.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="h-24 text-center"
                          >
                            No APIs found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAPIs.map((api) => (
                          <TableRow key={api.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span>{api.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {api.description}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {api.type === "rest" && (
                                  <Globe
                                    size={14}
                                    className="text-blue-500"
                                  />
                                )}
                                {api.type === "soap" && (
                                  <FileJson
                                    size={14}
                                    className="text-purple-500"
                                  />
                                )}
                                {api.type === "graphql" && (
                                  <Database
                                    size={14}
                                    className="text-green-500"
                                  />
                                )}
                                {api.type === "grpc" && (
                                  <Layers
                                    size={14}
                                    className="text-amber-500"
                                  />
                                )}
                                <span className="uppercase">{api.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2.5 w-2.5 rounded-full ${api.status === "enabled" ? "bg-green-500" : "bg-red-500"}`}
                                />
                                <span className="capitalize">{api.status}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {api.responseTime ? (
                                <span
                                  className={`${api.responseTime < 350 ? "text-green-600" : api.responseTime < 450 ? "text-amber-600" : "text-red-600"}`}
                                >
                                  {api.responseTime}ms
                                </span>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              {api.errorRate !== undefined ? (
                                <span
                                  className={`${api.errorRate < 0.02 ? "text-green-600" : api.errorRate < 0.04 ? "text-amber-600" : "text-red-600"}`}
                                >
                                  {(api.errorRate * 100).toFixed(1)}%
                                </span>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              {api.usageCount?.toLocaleString() || "0"}
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
                                    Edit Settings
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      /* Test implementation */
                                    }}
                                    className="flex items-center gap-2"
                                  >
                                    <Zap size={14} />
                                    Test Connection
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleToggleAPIStatus(api.id)
                                    }
                                    className="flex items-center gap-2"
                                  >
                                    {api.status === "enabled" ? (
                                      <>
                                        <XCircle
                                          size={14}
                                          className="text-red-500"
                                        />
                                        Disable
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle
                                          size={14}
                                          className="text-green-500"
                                        />
                                        Enable
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteAPI(api.id)}
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

        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>API Performance</CardTitle>
              <CardDescription>
                Monitor the performance metrics of your API integrations
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
                    <Button variant="outline" className="flex items-center gap-2">
                      <RefreshCw size={14} />
                      Refresh
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download size={14} />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">375ms</div>
                      <p className="text-xs text-muted-foreground">-12ms from last period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">97.8%</div>
                      <p className="text-xs text-muted-foreground">+0.3% from last period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8,432</div>
                      <p className="text-xs text-muted-foreground">+15.2% from last period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.2%</div>
                      <p className="text-xs text-muted-foreground">-0.3% from last period</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>API Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Usage Count</TableHead>
                        <TableHead>Error Rate</TableHead>
                        <TableHead>Success Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {performanceData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{data.apiName}</TableCell>
                          <TableCell>{data.date}</TableCell>
                          <TableCell>
                            <span
                              className={`${data.responseTime < 350 ? "text-green-600" : data.responseTime < 450 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {data.responseTime}ms
                            </span>
                          </TableCell>
                          <TableCell>{data.usageCount}</TableCell>
                          <TableCell>
                            <span
                              className={`${data.errorRate < 0.02 ? "text-green-600" : data.errorRate < 0.04 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {(data.errorRate * 100).toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`${data.successRate > 0.98 ? "text-green-600" : data.successRate > 0.95 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {(data.successRate * 100).toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950 flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">
                    <p className="font-medium">Performance Notice</p>
                    <p>
                      The Ahrefs API has shown increased response times over the past 7 days.
                      Consider reviewing its configuration or temporarily disabling it if not critical.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks Tab */}
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>
                    Configure webhooks to receive real-time notifications from external services
                  </CardDescription>
                </div>
                <Button className="flex items-center gap-2 md:self-end">
                  <Plus size={16} />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Events</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Triggered</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>Scan Completion Webhook</span>
                            <span className="text-xs text-muted-foreground">
                              Notifies when a security or SEO scan is completed
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          https://example.com/webhooks/scan-complete
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                              scan.complete
                            </span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                              report.generated
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                            <span>Active</span>
                          </div>
                        </TableCell>
                        <TableCell>Oct 16, 2023 14:30</TableCell>
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
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit size={14} />
                                Edit Webhook
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Zap size={14} />
                                Test Webhook
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Eye size={14} />
                                View Logs
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 flex items-center gap-2">
                                <Trash2 size={14} />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>Security Alert Webhook</span>
                            <span className="text-xs text-muted-foreground">
                              Sends immediate notifications for critical security issues
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          https://example.com/webhooks/security-alert
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs">
                              security.critical
                            </span>
                            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs">
                              security.high
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                            <span>Active</span>
                          </div>
                        </TableCell>
                        <TableCell>Oct 15, 2023 09:15</TableCell>
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
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit size={14} />
                                Edit Webhook
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Zap size={14} />
                                Test Webhook
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Eye size={14} />
                                View Logs
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 flex items-center gap-2">
                                <Trash2 size={14} />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Webhook Security</CardTitle>
                      <CardDescription>
                        Configure security settings for your webhooks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signingSecret">Signing Secret</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="signingSecret"
                              type="password"
                              value="••••••••••••••••••••••••••••••••••"
                              readOnly
                            />
                            <Button variant="outline" size="icon">
                              <RefreshCw size={16} />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Used to verify webhook requests are coming from our service
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="enableIpWhitelist">IP Whitelist</Label>
                          <Switch id="enableIpWhitelist" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="enableRetries">Enable Retries</Label>
                          <Switch id="enableRetries" defaultChecked />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="retryAttempts">Retry Attempts</Label>
                          <Select defaultValue="3">
                            <SelectTrigger id="retryAttempts">
                              <SelectValue placeholder="Select retry attempts" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 attempt</SelectItem>
                              <SelectItem value="3">3 attempts</SelectItem>
                              <SelectItem value="5">5 attempts</SelectItem>
                              <SelectItem value="10">10 attempts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Webhook Events</CardTitle>
                      <CardDescription>
                        Available events that can trigger webhooks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Security Events</Label>
                            <p className="text-xs text-muted-foreground">
                              Security scan and alert related events
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Events