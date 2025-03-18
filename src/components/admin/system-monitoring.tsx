"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Server,
  Database,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  FileText,
  Download,
  Search,
  User,
  Shield,
  Lock,
} from "lucide-react";

type SystemComponent = {
  name: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
  uptime: string;
  lastIncident: string;
  icon: React.ReactNode;
};

type LogEntry = {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  source: string;
  message: string;
};

type AuditEntry = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ip: string;
};

const mockSystemComponents: SystemComponent[] = [
  {
    name: "Web Server",
    status: "operational",
    uptime: "99.98%",
    lastIncident: "15 days ago",
    icon: <Server size={18} />,
  },
  {
    name: "Database",
    status: "operational",
    uptime: "99.95%",
    lastIncident: "7 days ago",
    icon: <Database size={18} />,
  },
  {
    name: "API Service",
    status: "degraded",
    uptime: "98.72%",
    lastIncident: "2 hours ago",
    icon: <Globe size={18} />,
  },
  {
    name: "Security Scanner",
    status: "operational",
    uptime: "99.90%",
    lastIncident: "3 days ago",
    icon: <Shield size={18} />,
  },
  {
    name: "SEO Scanner",
    status: "operational",
    uptime: "99.93%",
    lastIncident: "5 days ago",
    icon: <Search size={18} />,
  },
  {
    name: "Authentication Service",
    status: "operational",
    uptime: "99.99%",
    lastIncident: "30 days ago",
    icon: <Lock size={18} />,
  },
];

const mockLogs: LogEntry[] = [
  {
    id: "log_1",
    timestamp: "2023-05-15 11:42:15",
    level: "error",
    source: "API Service",
    message: "Connection timeout when connecting to external API endpoint",
  },
  {
    id: "log_2",
    timestamp: "2023-05-15 11:40:03",
    level: "warning",
    source: "Database",
    message: "High CPU usage detected (78%)",
