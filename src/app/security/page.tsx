import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Lock,
  FileWarning,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="container py-6 space-y-8">
      <DashboardHeader
        title="Security Analysis"
        description="Comprehensive security assessment of your website"
        lastScanDate="May 15, 2023, 14:30 PM"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Security Score"
          value="85/100"
          icon={<Shield size={18} />}
          severity="medium"
          trend={5}
          trendLabel="since last scan"
        />
        <StatsCard
          title="Critical Issues"
          value="0"
          icon={<AlertTriangle size={18} />}
          severity="low"
        />
        <StatsCard
          title="High Issues"
          value="1"
          icon={<AlertTriangle size={18} />}
          severity="high"
        />
        <StatsCard
          title="Medium Issues"
          value="3"
          icon={<AlertTriangle size={18} />}
          severity="medium"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={18} />
            OWASP Top 10 Vulnerabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-orange-500" />
                <div>
                  <p className="font-medium">
                    A05:2021 - Security Misconfiguration
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Missing Content-Security-Policy header
                  </p>
                </div>
              </div>
              <SeverityBadge severity="high" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-yellow-500" />
                <div>
                  <p className="font-medium">
                    A06:2021 - Vulnerable Components
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Outdated jQuery library (v1.12.4)
                  </p>
                </div>
              </div>
              <SeverityBadge severity="medium" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-yellow-500" />
                <div>
                  <p className="font-medium">
                    A05:2021 - Security Misconfiguration
                  </p>
                  <p className="text-sm text-muted-foreground">
                    X-Frame-Options header not set
                  </p>
                </div>
              </div>
              <SeverityBadge severity="medium" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-500" />
                <div>
                  <p className="font-medium">
                    A07:2021 - Identification and Authentication Failures
                  </p>
                  <p className="text-sm text-muted-foreground">
                    No issues detected
                  </p>
                </div>
              </div>
              <SeverityBadge severity="low" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={18} />
              SSL/TLS Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">SSL Certificate Valid</p>
                    <p className="text-sm text-muted-foreground">
                      Expires in 245 days
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="low" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">Strong Cipher Suites</p>
                    <p className="text-sm text-muted-foreground">
                      TLS 1.2 and TLS 1.3 supported
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="low" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} className="text-yellow-500" />
                  <div>
                    <p className="font-medium">HSTS Not Implemented</p>
                    <p className="text-sm text-muted-foreground">
                      Strict-Transport-Security header missing
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="medium" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileWarning size={18} />
              Malware Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">No Malware Detected</p>
                    <p className="text-sm text-muted-foreground">
                      All files scanned: 342
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="low" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">No Suspicious Scripts</p>
                    <p className="text-sm text-muted-foreground">
                      JavaScript files analyzed: 28
                    </p>
                  </div>
                </div>
                <SeverityBadge severity="low" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <div>
                    <p className="font-medium">Clean Domain Reputation</p>
                    <p className="text-sm text-muted-foreground">
                      No blacklist records found
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
