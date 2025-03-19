"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Save,
  Trash2,
  FileText,
  RefreshCw,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  BarChart,
  HelpCircle,
  Book,
  Ticket,
  MessageCircle,
  Users,
  Video,
  FileQuestion,
  ThumbsUp,
  ThumbsDown,
  Upload,
  Link,
  PenTool,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertCircle,
  Tag,
  Paperclip,
  Send,
  UserPlus,
  Settings,
  LayoutDashboard,
  Headphones,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  status: "published" | "draft";
  author: string;
  views: number;
  helpfulRating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  category: string;
  submittedBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  lastResponseAt?: string;
  responseTime?: number;
}

interface LiveChatSession {
  id: string;
  user: string;
  agent?: string;
  status: "active" | "waiting" | "ended";
  startTime: string;
  endTime?: string;
  duration?: number;
  messages: number;
  satisfaction?: "satisfied" | "neutral" | "unsatisfied";
}

interface ForumTopic {
  id: string;
  title: string;
  category: string;
  author: string;
  status: "open" | "closed" | "pinned";
  replies: number;
  views: number;
  lastActivity: string;
  createdAt: string;
}

export function SupportHelpManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showAddArticleDialog, setShowAddArticleDialog] = useState(false);
  const [showAddTicketDialog, setShowAddTicketDialog] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "security",
    content: "",
    status: "draft",
    tags: [],
  });
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    status: "open",
    priority: "medium",
    category: "technical",
    submittedBy: "",
    assignedTo: "",
  });

  // Sample knowledge base articles
  const [articles, setArticles] = useState<KnowledgeArticle[]>([
    {
      id: "1",
      title: "How to Interpret Security Scan Results",
      category: "security",
      content: "This guide explains how to understand and act on security scan results...",
      status: "published",
      author: "John Smith",
      views: 1245,
      helpfulRating: 0.92,
      tags: ["security", "scans", "vulnerabilities", "beginner"],
      createdAt: "2023-08-15T10:00:00Z",
      updatedAt: "2023-10-01T14:20:00Z",
    },
    {
      id: "2",
      title: "Optimizing Your Website for Better SEO Scores",
      category: "seo",
      content: "Learn the best practices for improving your website's SEO performance...",
      status: "published",
      author: "Emily Johnson",
      views: 2356,
      helpfulRating: 0.88,
      tags: ["seo", "optimization", "keywords", "ranking"],
      createdAt: "2023-09-05T11:30:00Z",
      updatedAt: "2023-10-10T09:15:00Z",
    },
    {
      id: "3",
      title: "Understanding Core Web Vitals and Their Impact",
      category: "performance",
      content: "This article explains what Core Web Vitals are and how they affect your website...",
      status: "published",
      author: "Michael Brown",
      views: 1876,
      helpfulRating: 0.95,
      tags: ["performance", "web vitals", "page speed", "user experience"],
      createdAt: "2023-07-20T13:45:00Z",
      updatedAt: "2023-09-25T10:20:00Z",
    },
    {
      id: "4",
      title: "Managing User Permissions and Roles",
      category: "account",
      content: "Learn how to set up and manage user permissions and roles in SecureSEO...",
      status: "draft",
      author: "Sarah Wilson",
      views: 0,
      helpfulRating: 0,
      tags: ["account", "users", "permissions", "administration"],
      createdAt: "2023-10-12T15:30:00Z",
      updatedAt: "2023-10-12T15:30:00Z",
    },
    {
      id: "5",
      title: "Integrating SecureSEO with Google Analytics",
      category: "integrations",
      content: "Step-by-step guide to connecting your SecureSEO account with Google Analytics...",
      status: "published",
      author: "David Lee",
      views: 1432,
      helpfulRating: 0.86,
      tags: ["integrations", "google analytics", "data", "tracking"],
      createdAt: "2023-09-01T09:30:00Z",
      updatedAt: "2023-09-15T14:10:00Z",
    },
  ]);

  // Sample support tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "T-1001",
      subject: "Cannot access security scan results",
      description: "I ran a security scan yesterday but cannot access the results. The page shows an error when I try to view the report.",
      status: "open",
      priority: "high",
      category: "technical",
      submittedBy: "user@example.com",
      assignedTo: "support@secureseo.com",
      createdAt: "2023-10-15T14:30:00Z",
      updatedAt: "2023-10-15T14:30:00Z",
      lastResponseAt: "2023-10-15T14:30:00Z",
      responseTime: 0,
    },
    {
      id: "T-1002",
      subject: "Billing issue with premium subscription",
      description: "I was charged twice for my premium subscription this month. Please help resolve this issue and refund the extra charge.",
      status: "in-progress",
      priority: "medium",
      category: "billing",
      submittedBy: "customer@example.com",
      assignedTo: "billing@secureseo.com",
      createdAt: "2023-10-14T10:15:00Z",
      updatedAt: "2023-10-14T11:20:00Z",
      lastResponseAt: "2023-10-14T11:20:00Z",
      responseTime: 65,
    },
    {
      id: "T-1003",
      subject: "Feature request: Export to PDF",
      description: "It would be very helpful if we could export the SEO analysis reports to PDF format for sharing with clients.",
      status: "resolved",
      priority: "low",
      category: "feature request",
      submittedBy: "agency@example.com",
      assignedTo: "product@secureseo.com",
      createdAt: "2023-10-10T16:45:00Z",
      updatedAt: "2023-10-12T09:30:00Z",
      lastResponseAt: "2023-10-12T09:30:00Z",
      responseTime: 2565,
    },
    {
      id: "T-1004",
      subject: "Website verification failing",
      description: "I've tried all verification methods but none are working. I've added the DNS TXT record as instructed but it's still not verifying.",
      status: "in-progress",
      priority: "critical",
      category: "technical",
      submittedBy: "webmaster@example.com",
      assignedTo: "tech@secureseo.com",
      createdAt: "2023-10-16T09:10:00Z",
      updatedAt: "2023-10-16T09:15:00Z",
      lastResponseAt: "2023-10-16T09:15:00Z",
      responseTime: 5,
    },
    {
      id: "T-1005",
      subject: "How to interpret backlink data",
      description: "I'm new to SEO and need help understanding the backlink data in my reports. Could you provide some guidance?",
      status: "closed",
      priority: "low",
      category: "general inquiry",
      submittedBy: "newuser@example.com",
      createdAt: "2023-10-05T13:20:00Z",
      updatedAt: "2023-10-07T10:45:00Z",
      lastResponseAt: "2023-10-07T10:45:00Z",
      responseTime: 2845,
    },
  ]);

  // Sample live chat sessions
  const [chatSessions, setChatSessions] = useState<LiveChatSession[]>([
    {
      id: "C-1001",
      user: "visitor@example.com",
      agent: "support1@secureseo.com",
      status: "active",
      startTime: "2023-10-16T14:30:00Z",
      messages: 12,
    },
    {
      id: "C-1002",
      user: "prospect@example.com",
      status: "waiting",
      startTime: "2023-10-16T14:45:00Z",
      messages: 1,
    },
    {
      id: "C-1003",
      user: "client@example.com",
      agent: "support2@secureseo.com",
      status: "ended",
      startTime: "2023-10-16T13:15:00Z",
      endTime: "2023-10-16T13:45:00Z",
      duration: 30,
      messages: 24,
      satisfaction: "satisfied",
    },
    {
      id: "C-1004",
      user: "user@example.com",
      agent: "support3@secureseo.com",
      status: "ended",
      startTime: "2023-10-16T12:00:00Z",
      endTime: "2023-10-16T12:20:00Z",
      duration: 20,
      messages: 15,
      satisfaction: "neutral",
    },
    {
      id: "C-1005",
      user: "unhappy@example.com",
      agent: "support1@secureseo.com",
      status: "ended",
      startTime: "2023-10-16T11:30:00Z",
      endTime: "2023-10-16T12:10:00Z",
      duration: 40,
      messages: 32,
      satisfaction: "unsatisfied",
    },
  ]);

  // Sample forum topics
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([
    {
      id: "F-1001",
      title: "Best practices for securing WordPress sites",
      category: "security",
      author: "security_expert",
      status: "open",
      replies: 24,
      views: 1245,
      lastActivity: "2023-10-15T14:30:00Z",
      createdAt: "2023-10-10T09:00:00Z",
    },
    {
      id: "F-1002",
      title: "How to improve Core Web Vitals scores",
      category: "performance",
      author: "web_developer",
      status: "pinned",
      replies: 36,
      views: 2356,
      lastActivity: "2023-10-16T10:15:00Z",
      createdAt: "2023-10-05T11:30:00Z",
    },
    {
      id: "F-1003",
      title: "Strategies for local SEO optimization",
      category: "seo",
      author: "seo_specialist",
      status: "open",
      replies: 18,
      views: 987,
      lastActivity: "2023-10-14T16:45:00Z",
      createdAt: "2023-10-12T13:20:00Z",
    },
    {
      id: "F-1004",
      title: "Dealing with Google algorithm updates",
      category: "seo",
      author: "digital_marketer",
      status: "closed",
      replies: 42,
      views: 3210,
      lastActivity: "2023-10-08T09:30:00Z",
      createdAt: "2023-09-25T14:15:00Z",
    },
    {
      id: "F-1005",
      title: "Integrating SecureSEO with other marketing tools",
      category: "integrations",
      author: "marketing_manager",
      status: "open",
      replies: 12,
      views: 756,
      lastActivity: "2023-10-13T11:20:00Z",
      createdAt: "2023-10-11T15:30:00Z",
    },
  ]);

  // Sample support stats
  const supportStats = {
    ticketsOpen: 15,
    ticketsResolved: 128,
    avgResponseTime: 3.2, // hours
    avgResolutionTime: 18.5, // hours
    satisfactionRate: 92, // percentage
    knowledgeBaseViews: 12450,
    chatSessionsToday: 45,
    forumPostsToday: 28,
  };

  const handleAddArticle = () => {
    const newArticleEntry: KnowledgeArticle = {
      id: (articles.length + 1).toString(),
      title: newArticle.title,
      category: newArticle.category,
      content: newArticle.content,
      status: newArticle.status as "published" | "draft",
      author: "Admin User",
      views: 0,
      helpfulRating: 0,
      tags: newArticle.tags as string[],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setArticles([...articles, newArticleEntry]);
    setShowAddArticleDialog(false);
    setNewArticle({
      title: "",
      category: "security",
      content: "",
      status: "draft",
      tags: [],
    });
  };

  const handleAddTicket = () => {
    const newTicketEntry: SupportTicket = {
      id: `T-${1000 + tickets.length + 1}`,
      subject: newTicket.subject,
      description: newTicket.description,
      status: newTicket.status as "open" | "in-progress" | "resolved" | "closed",
      priority: newTicket.priority as "low" | "medium" | "high" | "critical",
      category: newTicket.category,
      submittedBy: newTicket.submittedBy,
      assignedTo: newTicket.assignedTo || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastResponseAt: new Date().toISOString(),
      responseTime: 0,
    };

    setTickets([...tickets, newTicketEntry]);
    setShowAddTicketDialog(false);
    setNewTicket({
      subject: "",
      description: "",
      status: "open",
      priority: "medium",
      category: "technical",
      submittedBy: "",
      assignedTo: "",
    });
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? article.status === statusFilter : true;
    const matchesCategory = categoryFilter ? article.category === categoryFilter : true;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
    const matchesCategory = categoryFilter ? ticket.category === categoryFilter : true;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-6 md:w-auto w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2