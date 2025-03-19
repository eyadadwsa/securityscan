"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  Globe,
  Server,
  FileText,
  Bell,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Laptop,
  ShieldAlert,
  Zap,
  Brain,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("month");
  const [activeTab, setActiveTab] = useState("performance");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights for your platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity size={16} />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-2">
            <Laptop size={16} />
            <span className="hidden sm:inline">Technical</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Zap size={16} />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">Features</span>
          </TabsTrigger>
        </TabsList>

        {/* Performance Overview Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Visits
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128,547</div>
                <p className="text-xs text-muted-foreground">
                  +12,234 this month
                </p>
                <div className="mt-4 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>+18.2% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Sites Inspected
                </CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,378</div>
                <p className="text-xs text-muted-foreground">+342 this month</p>
                <div className="mt-4 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>+7.8% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$89,647</div>
                <p className="text-xs text-muted-foreground">
                  +$7,892 this month
                </p>
                <div className="mt-4 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>+12.3% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Plans
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,156</div>
                <p className="text-xs text-muted-foreground">
                  Enterprise: 342 | Pro: 987 | Basic: 827
                </p>
                <div className="mt-4 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>+5.7% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visit Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Visit Trends Chart
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium">Search Engines</p>
                    <p className="text-2xl font-bold">42%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Referrals</p>
                    <p className="text-2xl font-bold">35%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Direct</p>
                    <p className="text-2xl font-bold">23%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Revenue Distribution Chart
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium">Enterprise</p>
                    <p className="text-2xl font-bold">58%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Professional</p>
                    <p className="text-2xl font-bold">32%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Basic</p>
                    <p className="text-2xl font-bold">10%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sites Inspected by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Sites by Type Chart
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium">E-commerce</p>
                    <p className="text-xl font-bold">32%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Blogs</p>
                    <p className="text-xl font-bold">28%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Corporate</p>
                    <p className="text-xl font-bold">25%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Other</p>
                    <p className="text-xl font-bold">15%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Usage Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Plan Usage Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Enterprise Plan</p>
                    <Badge>Most Profitable</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Professional Plan</p>
                    <Badge>Most Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Basic Plan</p>
                    <Badge>Highest Growth</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Technical Analysis Tab */}
        <TabsContent value="technical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Site Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Technologies Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">WordPress</p>
                    <p className="text-sm">42%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Joomla</p>
                    <p className="text-sm">12%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Drupal</p>
                    <p className="text-sm">8%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Custom</p>
                    <p className="text-sm">38%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Vulnerability Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">XSS</p>
                    <Badge className="bg-red-500">High Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">SQL Injection</p>
                    <Badge className="bg-red-500">High Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">CSRF</p>
                    <Badge className="bg-yellow-500">Medium Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Outdated Software</p>
                    <Badge className="bg-yellow-500">Medium Risk</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Geolocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">User Map</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">United States</p>
                    <p className="text-sm">32%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Europe</p>
                    <p className="text-sm">28%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Asia</p>
                    <p className="text-sm">22%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Other</p>
                    <p className="text-sm">18%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Common Vulnerabilities by Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">WordPress</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Plugin Vulnerabilities</p>
                        <p className="text-sm font-medium">48%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Theme Vulnerabilities</p>
                        <p className="text-sm font-medium">32%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Core Vulnerabilities</p>
                        <p className="text-sm font-medium">20%</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Joomla</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Extension Vulnerabilities</p>
                        <p className="text-sm font-medium">52%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Template Vulnerabilities</p>
                        <p className="text-sm font-medium">28%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Core Vulnerabilities</p>
                        <p className="text-sm font-medium">20%</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Custom Sites</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Input Validation</p>
                        <p className="text-sm font-medium">45%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Authentication Issues</p>
                        <p className="text-sm font-medium">35%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Insecure Dependencies</p>
                        <p className="text-sm font-medium">20%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language & Browser Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Languages</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">English</p>
                        <p className="text-sm font-medium">42%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Spanish</p>
                        <p className="text-sm font-medium">18%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Arabic</p>
                        <p className="text-sm font-medium">15%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">French</p>
                        <p className="text-sm font-medium">12%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Chinese</p>
                        <p className="text-sm font-medium">8%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Other</p>
                        <p className="text-sm font-medium">5%</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Browsers</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Chrome</p>
                        <p className="text-sm font-medium">58%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Safari</p>
                        <p className="text-sm font-medium">22%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Firefox</p>
                        <p className="text-sm font-medium">12%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Edge</p>
                        <p className="text-sm font-medium">6%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Other</p>
                        <p className="text-sm font-medium">2%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Analytics Tab */}
        <TabsContent value="advanced" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>User Behavior</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <Activity className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    User Behavior Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Avg. Session Duration</p>
                    <p className="text-sm">8m 42s</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Pages per Session</p>
                    <p className="text-sm">4.2</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Bounce Rate</p>
                    <p className="text-sm">32%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Conversion Rate</p>
                    <p className="text-sm">5.8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Server Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <Server className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Server Performance Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">CPU Usage</p>
                    <p className="text-sm">42%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Memory Usage</p>
                    <p className="text-sm">58%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-sm">245ms</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Error Rate</p>
                    <p className="text-sm">0.3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scan Tool Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <ShieldAlert className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Scan Performance Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Avg. Scan Time</p>
                    <p className="text-sm">3m 12s</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Scan Accuracy</p>
                    <p className="text-sm">97.8%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Failed Scans</p>
                    <p className="text-sm">1.2%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Resource Usage</p>
                    <p className="text-sm">Medium</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Custom Reports</CardTitle>
                <Button size="sm">Create Report</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Monthly Security Summary</p>
                      <p className="text-sm text-muted-foreground">
                        Generated on 1st of every month
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Revenue Breakdown</p>
                      <p className="text-sm text-muted-foreground">
                        Generated weekly
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">User Growth Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        Generated quarterly
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Vulnerability Trends</p>
                      <p className="text-sm text-muted-foreground">
                        Generated monthly
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-primary/5">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">
                          User Conversion Opportunity
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          There's a 32% increase in trial users from Europe.
                          Consider creating targeted marketing campaigns in
                          French and German to improve conversion rates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-primary/5">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Security Trend Alert</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          We've detected a 28% increase in XSS vulnerabilities
                          in WordPress sites using WooCommerce. Consider
                          creating an educational blog post to alert users.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-primary/5">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Revenue Optimization</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enterprise plan users are most likely to upgrade when
                          offered additional API access. Consider creating an
                          API add-on package for increased revenue.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-primary/5">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">
                          Performance Recommendation
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Server response times increase by 42% during peak
                          hours (2-4pm UTC). Consider optimizing database
                          queries or adding additional resources during this
                          window.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Additional Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Custom Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">
                          Critical Vulnerability Alert
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Triggers when critical vulnerabilities are detected
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Revenue Milestone</p>
                        <p className="text-sm text-muted-foreground">
                          Triggers when monthly revenue exceeds target
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">New Enterprise Signup</p>
                        <p className="text-sm text-muted-foreground">
                          Triggers when a new enterprise plan is purchased
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">Server Performance</p>
                        <p className="text-sm text-muted-foreground">
                          Triggers when server load exceeds 80%
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  <Bell className="mr-2 h-4 w-4" />
                  Create New Alert
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">User Settings Updated</p>
                      <p className="text-sm text-muted-foreground">
                        admin@example.com • 10 minutes ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">New Plan Created</p>
                      <p className="text-sm text-muted-foreground">
                        admin@example.com • 2 hours ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">Failed Login Attempt</p>
                      <p className="text-sm text-muted-foreground">
                        user@example.com • 3 hours ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">System Settings Changed</p>
                      <p className="text-sm text-muted-foreground">
                        admin@example.com • 5 hours ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">User Role Changed</p>
                      <p className="text-sm text-muted-foreground">
                        admin@example.com • 1 day ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View Full Audit Log
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Group Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Administrators</p>
                      <p className="text-sm text-muted-foreground">
                        5 users • Full access
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                      <Button variant="outline" size="sm">
                        Permissions
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Support Team</p>
                      <p className="text-sm text-muted-foreground">
                        12 users • Limited access
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                      <Button variant="outline" size="sm">
                        Permissions
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Content Managers</p>
                      <p className="text-sm text-muted-foreground">
                        8 users • Content access
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                      <Button variant="outline" size="sm">
                        Permissions
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Analysts</p>
                      <p className="text-sm text-muted-foreground">
                        7 users • Read-only access
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                      <Button variant="outline" size="sm">
                        Permissions
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4">Create New Group</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>UI Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dashboard-layout">Dashboard Layout</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="expanded">Expanded</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color-scheme">Color Scheme</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select color scheme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dashboard Widgets</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="widget-visits"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="widget-visits">Visits</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="widget-revenue"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="widget-revenue">Revenue</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="widget-users"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="widget-users">Users</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="widget-scans"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="widget-scans">Scans</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="widget-alerts"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="widget-alerts">Alerts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="widget-ai"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="widget-ai">AI Insights</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6">
                  <Palette className="mr-2 h-4 w-4" />
                  Save Customization
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
