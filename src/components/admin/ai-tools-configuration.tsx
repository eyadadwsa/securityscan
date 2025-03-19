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
  Brain,
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
  Image,
  MessageSquare,
  FileCode,
  Database,
  ChevronDown,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Sliders,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AITool {
  id: string;
  name: string;
  description: string;
  type: string;
  status: "enabled" | "disabled";
  apiKey?: string;
  endpoint?: string;
  model?: string;
  accuracy?: number;
  responseTime?: number;
  usageCount?: number;
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
}

interface AIToolPerformance {
  toolId: string;
  toolName: string;
  date: string;
  accuracy: number;
  responseTime: number;
  usageCount: number;
  errorRate: number;
  resourceUsage: number;
}

export function AIToolsConfiguration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showAddToolDialog, setShowAddToolDialog] = useState(false);
  const [newTool, setNewTool] = useState({
    name: "",
    description: "",
    type: "text-analysis",
    apiKey: "",
    endpoint: "",
    model: "",
  });

  // Sample AI tools data
  const [aiTools, setAiTools] = useState<AITool[]>([
    {
      id: "1",
      name: "Text Analysis Engine",
      description: "Natural language processing for content analysis",
      type: "text-analysis",
      status: "enabled",
      apiKey: "••••••••••••••••••••••••••••••••••",
      endpoint: "https://api.ai-service.com/text-analysis",
      model: "nlp-v3",
      accuracy: 0.92,
      responseTime: 245,
      usageCount: 1243,
      lastUsed: "2023-10-15T14:30:00Z",
      createdAt: "2023-01-10T09:00:00Z",
      updatedAt: "2023-10-01T11:20:00Z",
    },
    {
      id: "2",
      name: "Image Recognition",
      description: "Visual content analysis and object detection",
      type: "image-analysis",
      status: "enabled",
      apiKey: "••••••••••••••••••••••••••••••••••",
      endpoint: "https://api.ai-service.com/image-recognition",
      model: "vision-v2",
      accuracy: 0.89,
      responseTime: 320,
      usageCount: 856,
      lastUsed: "2023-10-16T10:15:00Z",
      createdAt: "2023-02-15T14:30:00Z",
      updatedAt: "2023-09-20T16:45:00Z",
    },
    {
      id: "3",
      name: "Sentiment Analyzer",
      description: "Analyze sentiment in user feedback and comments",
      type: "text-analysis",
      status: "enabled",
      apiKey: "••••••••••••••••••••••••••••••••••",
      endpoint: "https://api.ai-service.com/sentiment",
      model: "sentiment-v1",
      accuracy: 0.87,
      responseTime: 180,
      usageCount: 2156,
      lastUsed: "2023-10-16T16:45:00Z",
      createdAt: "2023-03-05T11:20:00Z",
      updatedAt: "2023-10-10T09:30:00Z",
    },
    {
      id: "4",
      name: "Content Generator",
      description: "AI-powered content creation for marketing",
      type: "content-generation",
      status: "disabled",
      apiKey: "••••••••••••••••••••••••••••••••••",
      endpoint: "https://api.ai-service.com/content-gen",
      model: "gpt-lite",
      accuracy: 0.85,
      responseTime: 450,
      usageCount: 532,
      lastUsed: "2023-10-10T13:20:00Z",
      createdAt: "2023-04-20T08:15:00Z",
      updatedAt: "2023-10-05T14:10:00Z",
    },
    {
      id: "5",
      name: "Data Analysis Engine",
      description: "Statistical analysis and pattern recognition",
      type: "data-analysis",
      status: "enabled",
      apiKey: "••••••••••••••••••••••••••••••••••",
      endpoint: "https://api.ai-service.com/data-analysis",
      model: "stats-v2",
      accuracy: 0.94,
      responseTime: 380,
      usageCount: 789,
      lastUsed: "2023-10-15T09:10:00Z",
      createdAt: "2023-05-12T10:45:00Z",
      updatedAt: "2023-09-28T15:30:00Z",
    },
  ]);

  // Sample performance data
  const [performanceData, setPerformanceData] = useState<AIToolPerformance[]>([
    {
      toolId: "1",
      toolName: "Text Analysis Engine",
      date: "2023-10-15",
      accuracy: 0.92,
      responseTime: 245,
      usageCount: 156,
      errorRate: 0.03,
      resourceUsage: 0.45,
    },
    {
      toolId: "1",
      toolName: "Text Analysis Engine",
      date: "2023-10-14",
      accuracy: 0.91,
      responseTime: 250,
      usageCount: 142,
      errorRate: 0.04,
      resourceUsage: 0.43,
    },
    {
      toolId: "2",
      toolName: "Image Recognition",
      date: "2023-10-15",
      accuracy: 0.89,
      responseTime: 320,
      usageCount: 98,
      errorRate: 0.05,
      resourceUsage: 0.62,
    },
    {
      toolId: "3",
      toolName: "Sentiment Analyzer",
      date: "2023-10-15",
      accuracy: 0.87,
      responseTime: 180,
      usageCount: 215,
      errorRate: 0.06,
      resourceUsage: 0.38,
    },
    {
      toolId: "5",
      toolName: "Data Analysis Engine",
      date: "2023-10-15",
      accuracy: 0.94,
      responseTime: 380,
      usageCount: 76,
      errorRate: 0.02,
      resourceUsage: 0.58,
    },
  ]);

  // Sample audit log data
  const auditLogs = [
    {
      id: "1",
      action: "Tool Enabled",
      toolName: "Text Analysis Engine",
      user: "admin@secureseo.com",
      timestamp: "2023-10-15T14:30:00Z",
      details: "Enabled Text Analysis Engine",
    },
    {
      id: "2",
      action: "API Key Updated",
      toolName: "Image Recognition",
      user: "admin@secureseo.com",
      timestamp: "2023-10-14T11:15:00Z",
      details: "Updated API key for Image Recognition",
    },
    {
      id: "3",
      action: "Tool Added",
      toolName: "Custom Classification Model",
      user: "admin@secureseo.com",
      timestamp: "2023-10-12T09:45:00Z",
      details: "Added new custom AI tool",
    },
    {
      id: "4",
      action: "Tool Disabled",
      toolName: "Content Generator",
      user: "admin@secureseo.com",
      timestamp: "2023-10-10T16:20:00Z",
      details: "Disabled Content Generator due to high error rate",
    },
    {
      id: "5",
      action: "Settings Updated",
      toolName: "Sentiment Analyzer",
      user: "admin@secureseo.com",
      timestamp: "2023-10-08T13:10:00Z",
      details: "Updated endpoint URL for Sentiment Analyzer",
    },
  ];

  const handleAddTool = () => {
    const newToolEntry: AITool = {
      id: (aiTools.length + 1).toString(),
      name: newTool.name,
      description: newTool.description,
      type: newTool.type,
      status: "enabled",
      apiKey: newTool.apiKey,
      endpoint: newTool.endpoint,
      model: newTool.model,
      accuracy: 0,
      responseTime: 0,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setAiTools([...aiTools, newToolEntry]);
    setShowAddToolDialog(false);
    setNewTool({
      name: "",
      description: "",
      type: "text-analysis",
      apiKey: "",
      endpoint: "",
      model: "",
    });
  };

  const handleToggleToolStatus = (toolId: string) => {
    setAiTools(
      aiTools.map((tool) =>
        tool.id === toolId
          ? {
              ...tool,
              status: tool.status === "enabled" ? "disabled" : "enabled",
              updatedAt: new Date().toISOString(),
            }
          : tool,
      ),
    );
  };

  const handleDeleteTool = (toolId: string) => {
    setAiTools(aiTools.filter((tool) => tool.id !== toolId));
  };

  const filteredTools = aiTools.filter((tool) => {
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? tool.status === statusFilter : true;
    const matchesType = typeFilter ? tool.type === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-4">
      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Brain size={16} />
            <span className="hidden sm:inline">AI Tools</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart size={16} />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Sliders size={16} />
            <span className="hidden sm:inline">Custom Models</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Audit Log</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Tools Tab */}
        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>AI Tools Management</CardTitle>
                  <CardDescription>
                    Manage artificial intelligence tools integrated with your
                    platform
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowAddToolDialog(true)}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Plus size={16} />
                  Add AI Tool
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
                      placeholder="Search AI tools..."
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
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={typeFilter || ""}
                      onValueChange={(value) => setTypeFilter(value || null)}
                    >
                      <SelectTrigger className="w-[160px]">
                        <div className="flex items-center gap-2">
                          <Filter size={14} />
                          <SelectValue placeholder="Type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="text-analysis">
                          Text Analysis
                        </SelectItem>
                        <SelectItem value="image-analysis">
                          Image Analysis
                        </SelectItem>
                        <SelectItem value="data-analysis">
                          Data Analysis
                        </SelectItem>
                        <SelectItem value="content-generation">
                          Content Generation
                        </SelectItem>
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
                        <TableHead>Accuracy</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTools.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No AI tools found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTools.map((tool) => (
                          <TableRow key={tool.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span>{tool.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {tool.description}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {tool.type === "text-analysis" && (
                                  <MessageSquare
                                    size={14}
                                    className="text-blue-500"
                                  />
                                )}
                                {tool.type === "image-analysis" && (
                                  <Image
                                    size={14}
                                    className="text-purple-500"
                                  />
                                )}
                                {tool.type === "data-analysis" && (
                                  <Database
                                    size={14}
                                    className="text-green-500"
                                  />
                                )}
                                {tool.type === "content-generation" && (
                                  <FileCode
                                    size={14}
                                    className="text-amber-500"
                                  />
                                )}
                                <span className="capitalize">
                                  {tool.type.replace("-", " ")}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2.5 w-2.5 rounded-full ${tool.status === "enabled" ? "bg-green-500" : "bg-red-500"}`}
                                />
                                <span className="capitalize">
                                  {tool.status}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {tool.accuracy ? (
                                <span
                                  className={`${tool.accuracy >= 0.9 ? "text-green-600" : tool.accuracy >= 0.8 ? "text-amber-600" : "text-red-600"}`}
                                >
                                  {(tool.accuracy * 100).toFixed(1)}%
                                </span>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              {tool.responseTime ? (
                                <span
                                  className={`${tool.responseTime < 200 ? "text-green-600" : tool.responseTime < 350 ? "text-amber-600" : "text-red-600"}`}
                                >
                                  {tool.responseTime}ms
                                </span>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              {tool.usageCount?.toLocaleString() || "0"}
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
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleToggleToolStatus(tool.id)
                                    }
                                    className="flex items-center gap-2"
                                  >
                                    {tool.status === "enabled" ? (
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
                                    onClick={() => handleDeleteTool(tool.id)}
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
              <CardTitle>AI Tools Performance</CardTitle>
              <CardDescription>
                Monitor the performance metrics of your AI tools
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
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw size={14} />
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download size={14} />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Average Accuracy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">91.4%</div>
                      <p className="text-xs text-muted-foreground">
                        +2.1% from last period
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Avg Response Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">275ms</div>
                      <p className="text-xs text-muted-foreground">
                        -15ms from last period
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5,576</div>
                      <p className="text-xs text-muted-foreground">
                        +12.3% from last period
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Error Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3.8%</div>
                      <p className="text-xs text-muted-foreground">
                        -0.5% from last period
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tool Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Accuracy</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Usage Count</TableHead>
                        <TableHead>Error Rate</TableHead>
                        <TableHead>Resource Usage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {performanceData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {data.toolName}
                          </TableCell>
                          <TableCell>{data.date}</TableCell>
                          <TableCell>
                            <span
                              className={`${data.accuracy >= 0.9 ? "text-green-600" : data.accuracy >= 0.8 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {(data.accuracy * 100).toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`${data.responseTime < 200 ? "text-green-600" : data.responseTime < 350 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {data.responseTime}ms
                            </span>
                          </TableCell>
                          <TableCell>{data.usageCount}</TableCell>
                          <TableCell>
                            <span
                              className={`${data.errorRate < 0.03 ? "text-green-600" : data.errorRate < 0.06 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {(data.errorRate * 100).toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`${data.resourceUsage < 0.4 ? "text-green-600" : data.resourceUsage < 0.6 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {(data.resourceUsage * 100).toFixed(1)}%
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
                      The Content Generator tool has shown increased error rates
                      over the past 7 days. Consider reviewing its configuration
                      or temporarily disabling it.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom Models Tab */}
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Custom AI Models</CardTitle>
                  <CardDescription>
                    Create and manage custom AI models for your specific needs
                  </CardDescription>
                </div>
                <Button className="flex items-center gap-2 md:self-end">
                  <Plus size={16} />
                  Create Custom Model
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model Name</TableHead>
                        <TableHead>Base Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Training Data</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>Custom Classification Model</span>
                            <span className="text-xs text-muted-foreground">
                              Specialized for industry-specific content
                              classification
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>Text Analysis</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                            <span>Active</span>
                          </div>
                        </TableCell>
                        <TableCell>2,450 samples</TableCell>
                        <TableCell>Oct 12, 2023</TableCell>
                        <TableCell>Oct 15, 2023</TableCell>
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
                                <Eye size={14} />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit size={14} />
                                Edit Model
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Zap size={14} />
                                Retrain Model
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
                            <span>SEO Content Optimizer</span>
                            <span className="text-xs text-muted-foreground">
                              Custom model for SEO content optimization
                              suggestions
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>Text Analysis</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                            <span>Training</span>
                          </div>
                        </TableCell>
                        <TableCell>1,850 samples</TableCell>
                        <TableCell>Oct 10, 2023</TableCell>
                        <TableCell>Oct 16, 2023</TableCell>
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
                                <Eye size={14} />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Clock size={14} />
                                Training Status
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
                      <CardTitle className="text-lg">
                        Upload Training Data
                      </CardTitle>
                      <CardDescription>
                        Upload datasets to train your custom AI models
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium mb-1">
                          Drag and drop files here
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Supports CSV, JSON, and TXT files up to 50MB
                        </p>
                        <Button variant="secondary" size="sm">
                          Browse Files
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Model Training Settings
                      </CardTitle>
                      <CardDescription>
                        Configure how your custom models are trained
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="trainingEpochs">
                            Training Epochs
                          </Label>
                          <Input
                            id="trainingEpochs"
                            type="number"
                            defaultValue="10"
                            min="1"
                            max="100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="batchSize">Batch Size</Label>
                          <Select defaultValue="32">
                            <SelectTrigger id="batchSize">
                              <SelectValue placeholder="Select batch size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="16">16</SelectItem>
                              <SelectItem value="32">32</SelectItem>
                              <SelectItem value="64">64</SelectItem>
                              <SelectItem value="128">128</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="enableGPU">
                            Enable GPU Acceleration
                          </Label>
                          <Switch id="enableGPU" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="saveCheckpoints">
                            Save Training Checkpoints
                          </Label>
                          <Switch id="saveCheckpoints" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>AI Tools Audit Log</CardTitle>
              <CardDescription>
                Track all changes and activities related to AI tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search audit logs..."
                      className="pl-8"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download size={14} />
                      Export Logs
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Tool</TableHead>
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
                              {log.action === "Tool Enabled" && (
                                <CheckCircle
                                  size={14}
                                  className="text-green-500"
                                />
                              )}
                              {log.action === "Tool Disabled" && (
                                <XCircle size={14} className="text-red-500" />
                              )}
                              {log.action === "API Key Updated" && (
                                <RefreshCw
                                  size={14}
                                  className="text-blue-500"
                                />
                              )}
                              {log.action === "Tool Added" && (
                                <Plus size={14} className="text-purple-500" />
                              )}
                              {log.action === "Settings Updated" && (
                                <Settings
                                  size={14}
                                  className="text-amber-500"
                                />
                              )}
                              {log.action}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {log.toolName}
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>
                            {new Date(log.timestamp).toLocaleString()}
                          </TableCell>
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

      {/* Add AI Tool Dialog */}
      <Dialog open={showAddToolDialog} onOpenChange={setShowAddToolDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New AI Tool</DialogTitle>
            <DialogDescription>
              Configure a new artificial intelligence tool to integrate with
              your platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tool Name</Label>
                <Input
                  id="name"
                  value={newTool.name}
                  onChange={(e) =>
                    setNewTool({ ...newTool, name: e.target.value })
                  }
                  placeholder="Enter tool name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTool.description}
                  onChange={(e) =>
                    setNewTool({ ...newTool, description: e.target.value })
                  }
                  placeholder="Describe what this AI tool does"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tool Type</Label>
                <Select
                  value={newTool.type}
                  onValueChange={(value) =>
                    setNewTool({ ...newTool, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select tool type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-analysis">Text Analysis</SelectItem>
                    <SelectItem value="image-analysis">
                      Image Analysis
                    </SelectItem>
                    <SelectItem value="data-analysis">Data Analysis</SelectItem>
                    <SelectItem value="content-generation">
                      Content Generation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model Name/Version</Label>
                <Input
                  id="model"
                  value={newTool.model}
                  onChange={(e) =>
                    setNewTool({ ...newTool, model: e.target.value })
                  }
                  placeholder="e.g., gpt-3.5-turbo, bert-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={newTool.apiKey}
                  onChange={(e) =>
                    setNewTool({ ...newTool, apiKey: e.target.value })
                  }
                  placeholder="Enter API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint">API Endpoint</Label>
                <Input
                  id="endpoint"
                  value={newTool.endpoint}
                  onChange={(e) =>
                    setNewTool({ ...newTool, endpoint: e.target.value })
                  }
                  placeholder="https://api.example.com/v1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddToolDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTool}
              disabled={!newTool.name || !newTool.type}
            >
              Add Tool
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
