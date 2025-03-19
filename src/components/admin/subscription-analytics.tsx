"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Download,
  TrendingUp,
  Users,
  CreditCard,
  Calendar,
} from "lucide-react";

export function SubscriptionAnalytics() {
  // In a real app, these would be calculated from actual data
  const subscriptionStats = {
    totalActive: 245,
    totalCanceled: 32,
    totalExpired: 18,
    totalTrialing: 15,
    totalRevenue: 24680,
    averageValue: 79.5,
    growthRate: 12.4,
    retentionRate: 87.6,
    planDistribution: {
      Basic: 82,
      Professional: 128,
      Enterprise: 35,
    },
    monthlyGrowth: [
      { month: "Jan", subscriptions: 180 },
      { month: "Feb", subscriptions: 195 },
      { month: "Mar", subscriptions: 210 },
      { month: "Apr", subscriptions: 225 },
      { month: "May", subscriptions: 245 },
    ],
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Subscription Analytics</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscriptionStats.totalActive}
            </div>
            <p className="text-xs text-muted-foreground">
              +{subscriptionStats.growthRate}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${subscriptionStats.totalRevenue}
            </div>
            <p className="text-xs text-muted-foreground">
              +{subscriptionStats.growthRate}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Subscription Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${subscriptionStats.averageValue}
            </div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Retention Rate
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscriptionStats.retentionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="churn">Churn</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full max-w-md">
                  {/* In a real app, this would be a chart component */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span>Active</span>
                        </div>
                        <span>
                          {subscriptionStats.totalActive} (
                          {Math.round(
                            (subscriptionStats.totalActive /
                              (subscriptionStats.totalActive +
                                subscriptionStats.totalCanceled +
                                subscriptionStats.totalExpired +
                                subscriptionStats.totalTrialing)) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{
                            width: `${Math.round((subscriptionStats.totalActive / (subscriptionStats.totalActive + subscriptionStats.totalCanceled + subscriptionStats.totalExpired + subscriptionStats.totalTrialing)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span>Trialing</span>
                        </div>
                        <span>
                          {subscriptionStats.totalTrialing} (
                          {Math.round(
                            (subscriptionStats.totalTrialing /
                              (subscriptionStats.totalActive +
                                subscriptionStats.totalCanceled +
                                subscriptionStats.totalExpired +
                                subscriptionStats.totalTrialing)) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{
                            width: `${Math.round((subscriptionStats.totalTrialing / (subscriptionStats.totalActive + subscriptionStats.totalCanceled + subscriptionStats.totalExpired + subscriptionStats.totalTrialing)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                          <span>Canceled</span>
                        </div>
                        <span>
                          {subscriptionStats.totalCanceled} (
                          {Math.round(
                            (subscriptionStats.totalCanceled /
                              (subscriptionStats.totalActive +
                                subscriptionStats.totalCanceled +
                                subscriptionStats.totalExpired +
                                subscriptionStats.totalTrialing)) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-gray-500"
                          style={{
                            width: `${Math.round((subscriptionStats.totalCanceled / (subscriptionStats.totalActive + subscriptionStats.totalCanceled + subscriptionStats.totalExpired + subscriptionStats.totalTrialing)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span>Expired</span>
                        </div>
                        <span>
                          {subscriptionStats.totalExpired} (
                          {Math.round(
                            (subscriptionStats.totalExpired /
                              (subscriptionStats.totalActive +
                                subscriptionStats.totalCanceled +
                                subscriptionStats.totalExpired +
                                subscriptionStats.totalTrialing)) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-red-500"
                          style={{
                            width: `${Math.round((subscriptionStats.totalExpired / (subscriptionStats.totalActive + subscriptionStats.totalCanceled + subscriptionStats.totalExpired + subscriptionStats.totalTrialing)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full max-w-md">
                  {/* In a real app, this would be a chart component */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                          <span>Basic</span>
                        </div>
                        <span>
                          {subscriptionStats.planDistribution.Basic} (
                          {Math.round(
                            (subscriptionStats.planDistribution.Basic /
                              subscriptionStats.totalActive) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-blue-400"
                          style={{
                            width: `${Math.round((subscriptionStats.planDistribution.Basic / subscriptionStats.totalActive) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          <span>Professional</span>
                        </div>
                        <span>
                          {subscriptionStats.planDistribution.Professional} (
                          {Math.round(
                            (subscriptionStats.planDistribution.Professional /
                              subscriptionStats.totalActive) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-purple-500"
                          style={{
                            width: `${Math.round((subscriptionStats.planDistribution.Professional / subscriptionStats.totalActive) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                          <span>Enterprise</span>
                        </div>
                        <span>
                          {subscriptionStats.planDistribution.Enterprise} (
                          {Math.round(
                            (subscriptionStats.planDistribution.Enterprise /
                              subscriptionStats.totalActive) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{
                            width: `${Math.round((subscriptionStats.planDistribution.Enterprise / subscriptionStats.totalActive) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Subscription Growth</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {/* In a real app, this would be a chart component */}
              <div className="w-full max-w-4xl h-full flex items-end justify-between px-4">
                {subscriptionStats.monthlyGrowth.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="w-16 bg-primary rounded-t-md"
                      style={{
                        height: `${(item.subscriptions / Math.max(...subscriptionStats.monthlyGrowth.map((i) => i.subscriptions))) * 200}px`,
                      }}
                    ></div>
                    <span className="text-sm text-muted-foreground">
                      {item.month}
                    </span>
                    <span className="text-sm font-medium">
                      {item.subscriptions}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plan Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Basic Plan</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Subscribers
                      </p>
                      <p className="text-2xl font-bold">
                        {subscriptionStats.planDistribution.Basic}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Monthly Revenue
                      </p>
                      <p className="text-2xl font-bold">
                        ${subscriptionStats.planDistribution.Basic * 29}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Conversion Rate
                      </p>
                      <p className="text-2xl font-bold">68%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Professional Plan
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Subscribers
                      </p>
                      <p className="text-2xl font-bold">
                        {subscriptionStats.planDistribution.Professional}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Monthly Revenue
                      </p>
                      <p className="text-2xl font-bold">
                        ${subscriptionStats.planDistribution.Professional * 79}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Conversion Rate
                      </p>
                      <p className="text-2xl font-bold">72%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Enterprise Plan</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Subscribers
                      </p>
                      <p className="text-2xl font-bold">
                        {subscriptionStats.planDistribution.Enterprise}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Monthly Revenue
                      </p>
                      <p className="text-2xl font-bold">
                        ${subscriptionStats.planDistribution.Enterprise * 199}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Conversion Rate
                      </p>
                      <p className="text-2xl font-bold">58%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    New Subscriptions
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="font-medium">32</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Last Month</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Growth</span>
                      <span className="font-medium text-green-500">+14.3%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Upgrades</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Basic to Professional
                      </span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Professional to Enterprise
                      </span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Upgrade Rate
                      </span>
                      <span className="font-medium text-green-500">8.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="churn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Churn Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Cancellations</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Last Month</span>
                      <span className="font-medium">10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Churn Rate</span>
                      <span className="font-medium text-green-500">3.2%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Cancellation Reasons
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Too Expensive
                      </span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Missing Features
                      </span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Switched to Competitor
                      </span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Other</span>
                      <span className="font-medium">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
