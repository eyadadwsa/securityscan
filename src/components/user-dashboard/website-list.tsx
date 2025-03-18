"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Globe,
  ExternalLink,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Website = {
  id: string;
  domain: string;
  favicon: string;
  securityScore: number;
  seoScore: number;
  performanceScore: number;
  lastScan: string;
  status: "verified" | "pending" | "error";
  group?: string;
};

const mockWebsites: Website[] = [
  {
    id: "1",
    domain: "example.com",
    favicon: "https://api.dicebear.com/7.x/initials/svg?seed=EC",
    securityScore: 85,
    seoScore: 92,
    performanceScore: 78,
    lastScan: "2023-05-15",
    status: "verified",
    group: "Business",
  },
  {
    id: "2",
    domain: "myshop.example.com",
    favicon: "https://api.dicebear.com/7.x/initials/svg?seed=MS",
    securityScore: 72,
    seoScore: 85,
    performanceScore: 65,
    lastScan: "2023-05-14",
    status: "verified",
    group: "Business",
  },
  {
    id: "3",
    domain: "blog.example.com",
    favicon: "https://api.dicebear.com/7.x/initials/svg?seed=BE",
    securityScore: 90,
    seoScore: 88,
    performanceScore: 82,
    lastScan: "2023-05-15",
    status: "verified",
    group: "Blog",
  },
  {
    id: "4",
    domain: "new-project.com",
    favicon: "https://api.dicebear.com/7.x/initials/svg?seed=NP",
    securityScore: 0,
    seoScore: 0,
    performanceScore: 0,
    lastScan: "N/A",
    status: "pending",
  },
  {
    id: "5",
    domain: "personal-site.com",
    favicon: "https://api.dicebear.com/7.x/initials/svg?seed=PS",
    securityScore: 0,
    seoScore: 0,
    performanceScore: 0,
    lastScan: "N/A",
    status: "error",
  },
];

export function WebsiteList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredWebsites = mockWebsites.filter((website) => {
    const matchesSearch = website.domain
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "verified" && website.status === "verified") ||
      (activeTab === "pending" && website.status === "pending") ||
      (activeTab === "error" && website.status === "error");
    return matchesSearch && matchesTab;
  });

  const getScoreColor = (score: number) => {
    if (score === 0) return "bg-gray-200 text-gray-500";
    if (score >= 90) return "bg-green-500 text-white";
    if (score >= 70) return "bg-yellow-500 text-white";
    return "bg-orange-500 text-white";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>;
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-500"
          >
            Pending
          </Badge>
        );
      case "error":
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>My Websites</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search websites..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Website
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="all">All Websites</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredWebsites.map((website) => (
                <div
                  key={website.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={website.favicon}
                          alt={website.domain}
                          className="h-8 w-8 rounded-full bg-muted"
                        />
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{website.domain}</h3>
                            <a
                              href={`https://${website.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusBadge(website.status)}
                            {website.group && (
                              <Badge variant="outline" className="ml-1">
                                {website.group}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Run New Scan</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Website</DropdownMenuItem>
                          <DropdownMenuItem>Manage Group</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remove Website
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {website.status === "verified" ? (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div
                            className={`text-xs font-medium py-1 px-2 rounded ${getScoreColor(website.securityScore)}`}
                          >
                            {website.securityScore}/100
                          </div>
                          <p className="text-xs mt-1 text-muted-foreground">
                            Security
                          </p>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-xs font-medium py-1 px-2 rounded ${getScoreColor(website.seoScore)}`}
                          >
                            {website.seoScore}/100
                          </div>
                          <p className="text-xs mt-1 text-muted-foreground">
                            SEO
                          </p>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-xs font-medium py-1 px-2 rounded ${getScoreColor(website.performanceScore)}`}
                          >
                            {website.performanceScore}/100
                          </div>
                          <p className="text-xs mt-1 text-muted-foreground">
                            Performance
                          </p>
                        </div>
                      </div>
                    ) : website.status === "pending" ? (
                      <div className="mt-4 p-2 bg-muted rounded text-center text-sm">
                        <p>Verification in progress</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Please complete the verification steps
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4 p-2 bg-red-50 dark:bg-red-950 rounded text-center text-sm">
                        <p className="text-red-600 dark:text-red-400">
                          Verification failed
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Please check verification settings
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last scan: {website.lastScan}</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Website Card */}
              <div className="border rounded-lg overflow-hidden border-dashed flex items-center justify-center p-8">
                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-8 px-4"
                >
                  <Plus className="h-8 w-8 mb-2" />
                  <span>Add New Website</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
