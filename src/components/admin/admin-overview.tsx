"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Users,
  CreditCard,
  Shield,
  Search,
  AlertTriangle,
  CheckCircle2,
  Server,
  Activity,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">+180 this month</p>
            <div className="mt-4 flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,429</div>
            <p className="text-xs text-muted-foreground">+43 this month</p>
            <div className="mt-4 flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scans Today</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              Security: 187 | SEO: 155
            </p>
            <div className="mt-4 flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+5.3% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <p className="text-xs text-muted-foreground">
              All services operational
            </p>
            <div className="mt-4 flex items-center text-xs">
              <span>Last incident: 15 days ago</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registration</p>
                  <p className="text-xs text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">5 min ago</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Security scan completed</p>
                  <p className="text-xs text-muted-foreground">example.com</p>
                </div>
                <div className="text-xs text-muted-foreground">12 min ago</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Subscription upgraded</p>
                  <p className="text-xs text-muted-foreground">acme-corp.com</p>
                </div>
                <div className="text-xs text-muted-foreground">28 min ago</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Critical vulnerability detected
                  </p>
                  <p className="text-xs text-muted-foreground">techstart.io</p>
                </div>
                <div className="text-xs text-muted-foreground">45 min ago</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <Search className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">SEO scan completed</p>
                  <p className="text-xs text-muted-foreground">
                    globalreach.com
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">1 hour ago</div>
              </div>
            </div>
            <Button variant="ghost" className="mt-4 w-full">
              View all activity
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-yellow-500/10 p-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Database load high</p>
                  <p className="text-xs text-muted-foreground">
                    CPU usage at 78%
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-500/10 p-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">API service recovered</p>
                  <p className="text-xs text-muted-foreground">
                    After 5 minutes of degraded performance
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-yellow-500/10 p-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Disk space warning</p>
                  <p className="text-xs text-muted-foreground">
                    Storage at 82% capacity
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-500/10 p-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System update completed</p>
                  <p className="text-xs text-muted-foreground">
                    Version 2.4.1 deployed successfully
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-500/10 p-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Backup completed</p>
                  <p className="text-xs text-muted-foreground">
                    Daily backup finished successfully
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
            <Button variant="ghost" className="mt-4 w-full">
              View all alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                User Growth Chart
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Subscription Chart
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
