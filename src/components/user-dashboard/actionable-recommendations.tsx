"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

type Recommendation = {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  category: "security" | "seo" | "performance";
  steps: string[];
  codeSnippet?: string;
  resources?: {
    title: string;
    url: string;
  }[];
  completed: boolean;
};

const mockRecommendations: Recommendation[] = [
  {
    id: "rec_1",
    title: "Implement Content-Security-Policy header",
    description:
      "Add a Content-Security-Policy header to your website to prevent XSS attacks.",
    severity: "high",
    category: "security",
    steps: [
      "Access your web server configuration",
      "Add the following header to your HTTP responses",
      "Test your website to ensure it still functions correctly",
    ],
    codeSnippet: `Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' https://trusted-cdn.com; img-src 'self' data: https://*;`,
    resources: [
      {
        title: "MDN Web Docs: Content-Security-Policy",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
      },
      {
        title: "CSP Evaluator Tool",
        url: "https://csp-evaluator.withgoogle.com/",
      },
    ],
    completed: false,
  },
  {
    id: "rec_2",
    title: "Add meta descriptions to missing pages",
    description:
      "Add descriptive meta descriptions to the 3 pages that are currently missing them.",
    severity: "medium",
    category: "seo",
    steps: [
      "Identify the pages missing meta descriptions (/about, /services, /contact)",
      "Create unique, descriptive meta descriptions for each page (150-160 characters)",
      "Add the meta description tags to the HTML head section of each page",
    ],
    codeSnippet: `<meta name="description" content="Your descriptive text here. Keep it between 150-160 characters for optimal display in search results." />`,
    resources: [
      {
        title: "Google: Create good meta descriptions",
        url: "https://developers.google.com/search/docs/appearance/snippet",
      },
    ],
    completed: false,
  },
  {
    id: "rec_3",
    title: "Optimize large images",
    description:
      "Compress and resize the large images on your website to improve loading times.",
    severity: "medium",
    category: "performance",
    steps: [
      "Identify the large images on your website",
      "Use an image optimization tool to compress the images without significant quality loss",
      "Resize images to the appropriate dimensions for their display size",
      "Replace the original images with the optimized versions",
      "Consider implementing responsive images using srcset",
    ],
    codeSnippet: `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w" sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 1500px" src="medium.jpg" alt="Responsive image" />`,
    resources: [
      {
        title: "Web.dev: Optimize your images",
        url: "https://web.dev/fast/#optimize-your-images",
      },
      {
        title: "TinyPNG - Image compression tool",
        url: "https://tinypng.com/",
      },
    ],
    completed: true,
  },
  {
    id: "rec_4",
    title: "Update jQuery to the latest version",
    description:
      "Update the outdated jQuery library to the latest version to fix security vulnerabilities.",
    severity: "medium",
    category: "security",
    steps: [
      "Download the latest version of jQuery from jquery.com",
      "Replace the old jQuery file with the new one",
      "Test your website thoroughly to ensure all functionality still works",
    ],
    codeSnippet: `<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>`,
    resources: [
      {
        title: "jQuery - Download",
        url: "https://jquery.com/download/",
      },
      {
        title: "jQuery Migration Guide",
        url: "https://jquery.com/upgrade-guide/",
      },
    ],
    completed: false,
  },
  {
    id: "rec_5",
    title: "Fix duplicate title tags",
    description:
      "Create unique title tags for the pages that currently have duplicate titles.",
    severity: "medium",
    category: "seo",
    steps: [
      "Identify the pages with duplicate title tags (/blog/post-1, /blog/post-2)",
      "Create unique, descriptive titles for each page (50-60 characters)",
      "Update the title tags in the HTML head section of each page",
    ],
    codeSnippet: `<title>Unique, Descriptive Title for Your Page | Your Brand Name</title>`,
    resources: [
      {
        title: "Moz: Title Tag SEO",
        url: "https://moz.com/learn/seo/title-tag",
      },
    ],
    completed: false,
  },
];

export function ActionableRecommendations() {
  const [expandedRecs, setExpandedRecs] = useState<string[]>([]);
  const [copiedSnippets, setCopiedSnippets] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    if (expandedRecs.includes(id)) {
      setExpandedRecs(expandedRecs.filter((recId) => recId !== id));
    } else {
      setExpandedRecs([...expandedRecs, id]);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippets([...copiedSnippets, id]);
    setTimeout(() => {
      setCopiedSnippets(copiedSnippets.filter((snippetId) => snippetId !== id));
    }, 2000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Actionable Recommendations</CardTitle>
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
            {mockRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="border rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer flex items-start justify-between"
                  onClick={() => toggleExpand(recommendation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <SeverityBadge severity={recommendation.severity} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{recommendation.title}</h3>
                        {recommendation.completed && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {recommendation.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    {expandedRecs.includes(recommendation.id) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {expandedRecs.includes(recommendation.id) && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="pl-8 border-l ml-4">
                      <h4 className="text-sm font-medium mb-2">
                        Steps to Implement:
                      </h4>
                      <ol className="list-decimal pl-5 space-y-1 mb-4">
                        {recommendation.steps.map((step, index) => (
                          <li key={index} className="text-sm">
                            {step}
                          </li>
                        ))}
                      </ol>

                      {recommendation.codeSnippet && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">
                              Code Snippet:
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(
                                  recommendation.codeSnippet!,
                                  recommendation.id,
                                );
                              }}
                            >
                              {copiedSnippets.includes(recommendation.id) ? (
                                <>
                                  <Check className="mr-1 h-3 w-3" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-1 h-3 w-3" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <pre className="bg-muted p-3 rounded-md overflow-x-auto text-xs">
                            <code>{recommendation.codeSnippet}</code>
                          </pre>
                        </div>
                      )}

                      {recommendation.resources &&
                        recommendation.resources.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Resources:
                            </h4>
                            <ul className="space-y-1">
                              {recommendation.resources.map(
                                (resource, index) => (
                                  <li
                                    key={index}
                                    className="text-sm flex items-center"
                                  >
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline flex items-center"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {resource.title}
                                      <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                      <div className="mt-4 flex justify-end">
                        <Button
                          variant={
                            recommendation.completed ? "outline" : "default"
                          }
                          size="sm"
                          className="text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {recommendation.completed
                            ? "Mark as Not Completed"
                            : "Mark as Completed"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            {mockRecommendations
              .filter((rec) => rec.category === "security")
              .map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="border rounded-lg overflow-hidden"
                >
                  {/* Same content structure as above, filtered for security */}
                  <div
                    className="p-4 cursor-pointer flex items-start justify-between"
                    onClick={() => toggleExpand(recommendation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <SeverityBadge severity={recommendation.severity} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {recommendation.title}
                          </h3>
                          {recommendation.completed && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {recommendation.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      {expandedRecs.includes(recommendation.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded content - same as above */}
                  {expandedRecs.includes(recommendation.id) && (
                    <div className="px-4 pb-4 pt-0">
                      {/* Same expanded content as above */}
                    </div>
                  )}
                </div>
              ))}
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            {mockRecommendations
              .filter((rec) => rec.category === "seo")
              .map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="border rounded-lg overflow-hidden"
                >
                  {/* Same content structure as above, filtered for SEO */}
                </div>
              ))}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            {mockRecommendations
              .filter((rec) => rec.category === "performance")
              .map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="border rounded-lg overflow-hidden"
                >
                  {/* Same content structure as above, filtered for performance */}
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
