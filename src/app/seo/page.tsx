import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  Link2,
  FileText,
  BarChart,
} from "lucide-react";

export default function SEOPage() {
  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="SEO Analysis"
        description="Comprehensive SEO assessment of your website"
        lastScanDate="May 15, 2023, 14:30 PM"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          title="Backlinks"
          value="127"
          description="Total backlinks detected"
          icon={<Link2 size={18} />}
          severity="low"
        />
        <StatsCard
          title="Core Web Vitals"
          value="Passed"
          icon={<CheckCircle2 size={18} />}
          severity="low"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search size={18} />
            Keyword Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-500" />
                <div>
                  <p className="font-medium">security analysis tool</p>
                  <p className="text-sm text-muted-foreground">
                    Position: #3 (Google)
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">+2</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-500" />
                <div>
                  <p className="font-medium">website security scanner</p>
                  <p className="text-sm text-muted-foreground">
                    Position: #5 (Google)
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">+1</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-yellow-500" />
                <div>
                  <p className="font-medium">seo optimization tool</p>
                  <p className="text-sm text-muted-foreground">
                    Position: #12 (Google)
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-destructive">-3</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={18} />
              Content Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} className="text-yellow-500" />
                  <div>
                    <p className="font-medium">Missing Meta Descriptions</p>
                    <p className="text-sm text-muted-foreground">
                      3 pages missing descriptions
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="medium" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} className="text-yellow-500" />
                  <div>
                    <p className="font-medium">Duplicate Title Tags</p>
                    <p className="text-sm text-muted-foreground">
                      2 pages with identical titles
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="medium" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">Good Content Length</p>
                    <p className="text-sm text-muted-foreground">
                      Average: 1,250 words per page
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="low" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart size={18} />
              Core Web Vitals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">
                      Largest Contentful Paint (LCP)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2.4s (Good: &lt; 2.5s)
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="low" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">First Input Delay (FID)</p>
                    <p className="text-sm text-muted-foreground">
                      18ms (Good: &lt; 100ms)
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="low" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">Cumulative Layout Shift (CLS)</p>
                    <p className="text-sm text-muted-foreground">
                      0.08 (Good: &lt; 0.1)
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="low" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
