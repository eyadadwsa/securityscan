"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, LogOut, Clock, Shield, AlertTriangle, Lock, Smartphone, Fingerprint, Key, Save, Eye, EyeOff, X } from "lucide-react";

type Session = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  startTime: string;
  lastActivity: string;
  status: "active" | "expired" | "terminated";
};

type SecuritySetting = {
  id: string;
  name: string;
  description: string;
  value: boolean | string | number;
  type: "boolean" | "string" | "number" | "select";
  options?: string[];
  category: "authentication" | "session" | "password" | "notification";
};

type SecurityEvent = {
  id: string;
  userId: string;
  userName: string;
  eventType: string;
  description: string;
  ip: string;
  location: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "resolved" | "unresolved" | "investigating";
};

export function UserSessionManager() {
  // Sample data
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      device: "Windows PC",
      browser: "Chrome 98.0.4758",
      ip: "192.168.1.1",
      location: "New York, USA",
      startTime: "2023-10-15T14:30:00Z",
      lastActivity: "2023-10-15T15:45:00Z",
      status: "active",
    },
    {
      id: "2",
      userId: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      device: "iPhone 13",
      browser: "Safari Mobile 15.4",
      ip: "203.0.113.1",
      location: "Boston, USA",
      startTime: "2023-10-14T09:15:00Z",
      lastActivity: "2023-10-14T10:30:00Z",
      status: "active",
    },
    {
      id: "3",
      userId: "2",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      device: "MacBook Pro",
      browser: "Firefox 97.0",
      ip: "198.51.100.1",
      location: "London, UK",
      startTime: "2023-10-15T08:45:00Z",
      lastActivity: "2023-10-15T09:30:00Z",
      status: "active",
    },
    {
      id: "4",
      userId: "3",
      userName: "Bob Johnson",
      userEmail: "bob@example.com",
      device: "Android Phone",
      browser: "Chrome Mobile 98.0.4758",
      ip: "203.0.113.2",
      location: "Unknown",
      startTime: "2023-10-13T16:20:00Z",
      lastActivity: "2023-10-13T16:45:00Z",
      status: "terminated",
    },
    {
      id: "5",
      userId: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      device: "iPad Pro",
      browser: "Safari 15.4",
      ip: "192.168.1.2",
      location: "New York, USA",
      startTime: "2023-10-12T11:30:00Z",
      lastActivity: "2023-10-12T12:15:00Z",
      status: "expired",
    },
  ]);

  const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
    {
      id: "1",
      name: "Two-Factor Authentication",
      description: "Require 2FA for all users",
      value: true,
      type: "boolean",
      category: "authentication",
    },
    {
      id: "2",
      name: "2FA Method",
      description: "Default two-factor authentication method",
      value: "app",
      type: "select",
      options: ["app", "sms", "email", "security_key"],
      category: "authentication",
    },
    {
      id: "3",
      name: "Biometric Authentication",
      description: "Allow biometric authentication",
      value: true,
      type: "boolean",
      category: "authentication",
    },
    {
      id: "4",
      name: "Social Login",
      description: "Allow login with social accounts",
      value: true,
      type: "boolean",
      category: "authentication",
    },
    {
      id: "5",
      name: "Session Timeout",
      description: "Automatically log out users after inactivity (minutes)",
      value: 30,
      type: "number",
      category: "session",
    },
    {
      id: "6",
      name: "Max Sessions Per User",
      description: "Maximum number of concurrent sessions per user",
      value: 5,
      type: "number",
      category: "session",
    },
    {
      id: "7",
      name: "Remember Me Duration",
      description: "Duration for 'Remember Me' option (days)",
      value: 30,
      type: "number",
      category: "session",
    },
    {
      id: "8",
      name: "Minimum Password Length",
      description: "Minimum number of characters required for passwords",
      value: 12,
      type: "number",
      category: "password",
    },
    {
      id: "9",
      name: "Password Complexity",
      description: "Require complex passwords (uppercase, lowercase, numbers, symbols)",
      value: true,
      type: "boolean",
      category: "password",
    },
    {
      id: "10",
      name: "Password Expiry",
      description: "Force password change after days (0 = never)",
      value: 90,
      type: "number",
      category: "password",
    },
    {
      id: "11",
      name: "Password History",
      description: "Prevent reuse of previous passwords",
      value: 5,
      type: "number",
      category: "password",
    },
    {
      id: "12",
      name: "Login Notification",
      description: "Send email notification on new login",
      value: true,
      type: "boolean",
      category: "notification",
    },
    {
      id: "13",
      name: "Suspicious Activity Alerts",
      description: "Send alerts for suspicious login attempts",
      value: true,
      type: "boolean",
      category: "notification",
    },
  ]);

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      eventType: "login_attempt_failed",
      description: "Multiple failed login attempts",
      ip: "203.0.113.5",
      location: "Moscow, Russia",
      timestamp: "2023-10-15T08:30:00Z",
      severity: "high",
      status: "unresolved",
    },
    {
      id: "2",
      userId: "2",
      userName: "Jane Smith",
      eventType: "password_reset",
      description: "Password reset requested",
      ip: "198.51.100.5",
      location: "London, UK",
      timestamp: "2023-10-14T15:45:00Z",
      severity: "medium",
      status: "resolved",
    },
    {
      id: "3",
      userId: "3",
      userName: "Bob Johnson",
      eventType: "new_location",
      description: "Login from new location",
      ip: "203.0.113.10",
      location: "Sydney, Australia",
      timestamp: "2023-10-14T22:15:00Z",
      severity: "medium",
      status: "resolved",
    },
    {
      id: "4",
      userId: "1",
      userName: "John Doe",
      eventType: "suspicious_activity",
      description: "Unusual account activity detected",
      ip: "203.0.113.15",
      location: "Beijing, China",
      timestamp: "2023-10-13T14:20:00Z",
      severity: "critical",
      status: "investigating",
    },
    {
      id: "5",
      userId: "4",
      userName: "Alice Williams",
      eventType: "account_locked",
      description: "Account locked after multiple failed attempts",
      ip: "198.51.100.20",
      location: "Toronto, Canada",
      timestamp: "2023-10-12T18:30:00Z",
      severity: "high",
      status: "resolved",
    },
  ]);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [selectedSession, setSelecte