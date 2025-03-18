"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import {
  AlertTriangle,
  Shield,
  Search,
  BarChart,
  ArrowRight,
} from "lucide-react";

type Finding = {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  category: "security" | "seo" | "performance";
  affectedPages?: string[];
  impact: string;
};

const mockFindings: Finding[] = [
  {
    id: "finding_1",
    title: "Missing Content-Security-Policy header",
    description:
      "Your website does not have a Content-Security-Policy header, which helps prevent XSS attacks.",
    severity: "high",
    category: "security",
    impact:
      "This can allow attackers to inject malicious scripts into your website.",
  },
  {
    id: "finding_2",
    title: "Missing meta descriptions on 3 pages",
    description:
      "3 pages on your website are missing meta descriptions, which are important for SEO.",
    severity: "medium",
    category: "seo",
    affectedPages: ["/about", "/services", "/contact"],
    impact:
      "Meta descriptions help improve click-through rates from search results.",
  },
  {
    id: "finding_3",
    title: "Large unoptimized images",
    description:
      "3 images on your website are larger than 1MB and not properly optimized.",
    severity: "medium",
    category: "performance",
    affectedPages: ["/gallery", "/products"],
    impact:
      "Large images slow down page loading times and affect user experience.",
  },
  {
    id: "finding_4",
    title: "Outdated jQuery library",
    description:
      "Your website is using jQuery v1.12.4, which has known security vulnerabilities.",
    severity: "medium",
    category: "security",
    impact:
      "Outdated libraries can contain security vulnerabilities that can be exploited.",
  },
  {
    id: "finding_5",
    title: "Duplicate title tags",
    description: "2 pages on your website have identical title tags.",
    severity: "medium",
    category: "seo",
    affectedPages: ["/blog/post-1", "/blog/post-2"],
    impact:
      "Duplicate titles can confuse search engines and affect your rankings.",
  },
];

export function KeyFindings() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <Shield className="h-4 w-4" />;
      case "seo":
        return <Search className="h-4 w-4" />;
      case "performance":
        return <BarChart className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Key Findings</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockFindings.map((finding) => (
              <div key={finding.id} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <SeverityBadge severity={finding.severity} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{finding.title}</h3>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground border px-2 py-0.5 rounded-full">
                        {getCategoryIcon(finding.category)}
                        <span className="capitalize">{finding.category}</span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {finding.description}
                    </p>

                    {finding.affectedPages &&
                      finding.affectedPages.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium">Affected Pages:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {finding.affectedPages.map((page, index) => (
                              <span
                                key={index}
                                className="text-xs bg-muted px-2 py-0.5 rounded"
                              >
                                {page}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="mt-2">
                      <p className="text-xs font-medium">Impact:</p>
                      <p className="text-xs text-muted-foreground">
                        {finding.impact}
                      </p>
                    </div>

                    <div className="mt-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View Recommendations
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            {mockFindings
              .filter((finding) => finding.category === "security")
              .map((finding) => (
                <div key={finding.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <SeverityBadge severity={finding.severity} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{finding.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {finding.description}
                      </p>

                      {finding.affectedPages &&
                        finding.affectedPages.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium">
                              Affected Pages:
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {finding.affectedPages.map((page, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-muted px-2 py-0.5 rounded"
                                >
                                  {page}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      <div className="mt-2">
                        <p className="text-xs font-medium">Impact:</p>
                        <p className="text-xs text-muted-foreground">
                          {finding.impact}
                        </p>
                      </div>

                      <div className="mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          View Recommendations
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            {mockFindings
              .filter((finding) => finding.category === "seo")
              .map((finding) => (
                <div key={finding.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <SeverityBadge severity={finding.severity} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{finding.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {finding.description}
                      </p>

                      {finding.affectedPages &&
                        finding.affectedPages.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium">
                              Affected Pages:
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {finding.affectedPages.map((page, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-muted px-2 py-0.5 rounded"
                                >
                                  {page}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      <div className="mt-2">
                        <p className="text-xs font-medium">Impact:</p>
                        <p className="text-xs text-muted-foreground">
                          {finding.impact}
                        </p>
                      </div>

                      <div className="mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          View Recommendations
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            {mockFindings
              .filter((finding) => finding.category === "performance")
              .map((finding) => (
                <div key={finding.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <SeverityBadge severity={finding.severity} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{finding.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {finding.description}
                      </p>

                      {finding.affectedPages &&
                        finding.affectedPages.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium">
                              Affected Pages:
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {finding.affectedPages.map((page, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-muted px-2 py-0.5 rounded"
                                >
                                  {page}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      <div className="mt-2">
                        <p className="text-xs font-medium">Impact:</p>
                        <p className="text-xs text-muted-foreground">
                          {finding.impact}
                        </p>
                      </div>

                      <div className="mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          View Recommendations
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
