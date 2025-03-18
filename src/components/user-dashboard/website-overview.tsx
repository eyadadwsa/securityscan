"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Shield, Search, BarChart, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

export function UserWebsiteOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">example.com</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Verified</span>
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <StatsCard
                title="Security Score"
                value="85/100"
                icon={<Shield size={18} />}
                severity="medium"
                trend={5}
                trendLabel="since last scan"
              />
              <StatsCard
                title="SEO Score"
                value="92/100"
                icon={<Search size={18} />}
                severity="low"
                trend={2}
                trendLabel="since last scan"
              />
              <StatsCard
                title="Performance Score"
                value="78/100"
                icon={<BarChart size={18} />}
                severity="medium"
                trend={-3}
                trendLabel="since last scan"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Last Scan Summary</h3>
                <div className="text-sm">
                  <p><span className="font-medium">Date:</span> May 15, 2023</p>
                  <p><span className="font-medium">Duration:</span> 2m 15s</p>
                  <p><span className="font-medium">Pages Scanned:</span> 32</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Issues Found</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-destructive mr-1"></div>
                    <span className="text-sm">0 Critical</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-orange-500 mr-1"></div>
                    <span className="text-sm">1 High</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-sm">3 Medium</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-sm">5 Low</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <StatsCard
                title="Security Score"
                value="85/100"
                icon={<Shield size={18} />}
                severity="medium"
                trend={5}
                trendLabel="since last scan"
              />
              <StatsCard
                title="Vulnerabilities"
                value="4"
                description="1 high, 3 medium"
                icon={<AlertTriangle size={18} />}
                severity="medium"
              />
              <StatsCard
                title="SSL Certificate"
                value="Valid"
                description="Expires in 245 days"
                icon={<CheckCircle2 size={18} />}
                severity="low"
              />
            </div>
            
            <div className="p-4 border rounded-md bg-muted">
              <h3 className="font-medium mb-2">Security Highlights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Missing Content-Security-Policy header</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span>Outdated jQuery library (v1.12.4)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span>X-Frame-Options header not set</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>SSL Certificate valid and properly configured</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <StatsCard
                title="SEO Score"
                value="92/100"
                icon={<Search size={18} />}
                severity="low"
                trend={2}
                trendLabel="since last scan"
              />
              <StatsCard
                title="Keywords Ranking"
                value="15"
                description="Keywords in top 10 results"
                icon={<Search size={18} />}
                severity="low"
              />
              <StatsCard
                title="Core Web Vitals"
                value="Passed"
                icon={<CheckCircle2 size={18} />}
                severity="low"
              />
            </div>
            
            <div className="p-4 border rounded-md bg-muted">
              <h3 className="font-medium mb-2">SEO Highlights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span>Missing meta descriptions on 3 pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span>Duplicate title tags on 2 pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Good content length (avg. 1,250 words per page)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Mobile-friendly design</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <StatsCard
                title="Performance Score"
                value="78/100"
                icon={<BarChart size={18} />}
                severity="medium"
                trend={-3}
                trendLabel="since last scan"
              />
              <StatsCard
                title="Load Time"
                value="1.8s"
                icon={<Clock size={18} />}
                severity="medium"
              />
              <StatsCard
                title="First Contentful Paint"
                value="0.9s"
                icon={<Clock size={18} />}
                severity="low"
              />
            </div>
            
            <div className="p-4 border rounded-md bg-muted">
              <h3 className="font-medium mb-2">Performance Highlights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span>Large images not optimized (3 images > 1MB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span>Render-blocking JavaScript (2 resources)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Good server response time (TTFB: 0.2s)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Efficient cache policy for static assets</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
