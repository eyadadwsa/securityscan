"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  HelpCircle,
  MessageSquare,
  FileText,
  Video,
  Send,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
} from "lucide-react";

type KnowledgeArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  views: number;
  url: string;
};

type SupportTicket = {
  id: string;
  subject: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  date: string;
  lastUpdate: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
};

const mockArticles: KnowledgeArticle[] = [
  {
    id: "article_1",
    title: "How to verify website ownership",
    excerpt:
      "Learn the different methods to verify ownership of your website in SecureSEO.",
    category: "Getting Started",
    views: 1245,
    url: "/help/verify-website",
  },
  {
    id: "article_2",
    title: "Understanding security scan results",
    excerpt:
      "A comprehensive guide to interpreting your security scan results and severity levels.",
    category: "Security",
    views: 982,
    url: "/help/security-scan-results",
  },
  {
    id: "article_3",
    title: "Improving your SEO score",
    excerpt:
      "Practical tips and best practices to improve your website's SEO score.",
    category: "SEO",
    views: 1567,
    url: "/help/improve-seo",
  },
  {
    id: "article_4",
    title: "Optimizing website performance",
    excerpt:
      "Learn how to optimize your website's performance based on our scan results.",
    category: "Performance",
    views: 1123,
    url: "/help/optimize-performance",
  },
  {
    id: "article_5",
    title: "Managing multiple websites",
    excerpt:
      "Tips for efficiently managing multiple websites in your SecureSEO dashboard.",
    category: "Account Management",
    views: 756,
    url: "/help/manage-multiple-sites",
  },
  {
    id: "article_6",
    title: "Subscription plans and billing",
    excerpt:
      "Information about our subscription plans, billing cycles, and payment methods.",
    category: "Billing",
    views: 892,
    url: "/help/subscription-billing",
  },
];

const mockTickets: SupportTicket[] = [
  {
    id: "ticket_1",
    subject: "Unable to complete website verification",
    status: "in_progress",
    date: "2023-05-14T10:30:00",
    lastUpdate: "2023-05-15T09:15:00",
    category: "Technical Support",
    priority: "high",
  },
  {
    id: "ticket_2",
    subject: "Question about SEO report findings",
    status: "open",
    date: "2023-05-15T14:45:00",
    lastUpdate: "2023-05-15T14:45:00",
    category: "SEO",
    priority: "medium",
  },
  {
    id: "ticket_3",
    subject: "Billing inquiry for Professional plan",
    status: "resolved",
    date: "2023-05-10T11:20:00",
    lastUpdate: "2023-05-12T16:30:00",
    category: "Billing",
    priority: "low",
  },
];

export function SupportHelp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newTicketForm, setNewTicketForm] = useState({
    subject: "",
    category: "Technical Support",
    description: "",
    priority: "medium",
  });

  const handleNewTicketChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewTicketForm({
      ...newTicketForm,
      [name]: value,
    });
  };

  const handleNewTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the ticket to the backend
    alert("Ticket submitted successfully!");
    setNewTicketForm({
      subject: "",
      category: "Technical Support",
      description: "",
      priority: "medium",
    });
  };

  const filteredArticles = mockArticles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support & Help Center</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="knowledge-base" className="space-y-4">
          <TabsList>
            <TabsTrigger
              value="knowledge-base"
              className="flex items-center gap-2"
            >
              <FileText size={16} />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <MessageSquare size={16} />
              Support Tickets
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <Video size={16} />
              Video Tutorials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="knowledge-base" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search knowledge base..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {article.views} views
                        </span>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {article.excerpt}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center justify-center gap-1"
                        asChild
                      >
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read Article
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center p-8">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-1">No articles found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try a different search term or browse our categories
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Popular Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("Getting Started")}
                >
                  Getting Started
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("Security")}
                >
                  Security
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("SEO")}
                >
                  SEO
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("Performance")}
                >
                  Performance
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("Account")}
                >
                  Account Management
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("Billing")}
                >
                  Billing
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">
                    Can't find what you're looking for?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our support team is here to help. Create a support ticket
                    and we'll get back to you as soon as possible.
                  </p>
                  <Button
                    className="mt-3"
                    size="sm"
                    onClick={() =>
                      document.getElementById("tickets-tab")?.click()
                    }
                  >
                    Create Support Ticket
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="font-medium">Your Support Tickets</h3>
              <Button className="flex items-center gap-2">
                <PlusCircle size={16} />
                New Ticket
              </Button>
            </div>

            {mockTickets.length > 0 ? (
              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{ticket.subject}</h4>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>ID: {ticket.id}</span>
                          <span>{ticket.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Created: {formatDate(ticket.date)}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Ticket
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border rounded-lg">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-1">No support tickets</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You don't have any support tickets yet
                </p>
                <Button>Create Your First Ticket</Button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium mb-4">Create New Support Ticket</h3>
              <form onSubmit={handleNewTicketSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={newTicketForm.subject}
                      onChange={handleNewTicketChange}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={newTicketForm.category}
                      onChange={handleNewTicketChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Billing">Billing</option>
                      <option value="Account">Account</option>
                      <option value="Security">Security</option>
                      <option value="SEO">SEO</option>
                      <option value="Performance">Performance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newTicketForm.description}
                    onChange={handleNewTicketChange}
                    placeholder="Please provide as much detail as possible about your issue"
                    rows={5}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      name="priority"
                      value={newTicketForm.priority}
                      onChange={handleNewTicketChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachment">Attachment (optional)</Label>
                    <Input id="attachment" type="file" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Send size={16} />
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search video tutorials..."
                className="pl-8"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg border">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">
                    Getting Started with SecureSEO
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn how to set up your account and verify your first
                    website
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">5:32</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Watch Now
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">
                    Understanding Security Scan Results
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    A detailed walkthrough of security scan results and how to
                    fix issues
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">8:15</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Watch Now
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">SEO Optimization Techniques</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn how to improve your website's SEO score with practical
                    tips
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">12:47</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Watch Now
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">
                    Website Performance Optimization
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tips and techniques to improve your website's loading speed
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">10:23</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Watch Now
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">Managing Multiple Websites</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Best practices for managing multiple websites in your
                    dashboard
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">7:18</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Watch Now
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">Advanced Security Features</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Explore advanced security features and how to use them
                    effectively
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">15:42</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Watch Now
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Need personalized assistance?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our support team can provide personalized training sessions
                    for your specific needs.
                  </p>
                  <Button className="mt-3" size="sm" variant="outline">
                    Request Training Session
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
