"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MoreHorizontal,
  Filter,
  Plus,
  Download,
  CreditCard,
  Tag,
} from "lucide-react";

type Subscription = {
  id: string;
  user: string;
  email: string;
  plan: "Basic" | "Professional" | "Enterprise";
  status: "active" | "canceled" | "past_due" | "trialing";
  amount: number;
  billingCycle: "monthly" | "annual";
  startDate: string;
  nextBillingDate: string;
};

type Plan = {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  active: boolean;
};

const mockSubscriptions: Subscription[] = [
  {
    id: "sub_1",
    user: "John Doe",
    email: "john.doe@example.com",
    plan: "Professional",
    status: "active",
    amount: 79,
    billingCycle: "monthly",
    startDate: "2023-01-15",
    nextBillingDate: "2023-06-15",
  },
  {
    id: "sub_2",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "Enterprise",
    status: "active",
    amount: 1908, // $199 * 12 * 0.8 (20% discount)
    billingCycle: "annual",
    startDate: "2022-11-05",
    nextBillingDate: "2023-11-05",
  },
  {
    id: "sub_3",
    user: "Robert Johnson",
    email: "robert.johnson@example.com",
    plan: "Basic",
    status: "canceled",
    amount: 29,
    billingCycle: "monthly",
    startDate: "2023-02-20",
    nextBillingDate: "N/A",
  },
  {
    id: "sub_4",
    user: "Emily Chen",
    email: "emily.chen@example.com",
    plan: "Professional",
    status: "active",
    amount: 79,
    billingCycle: "monthly",
    startDate: "2023-03-10",
    nextBillingDate: "2023-06-10",
  },
  {
    id: "sub_5",
    user: "Michael Brown",
    email: "michael.brown@example.com",
    plan: "Basic",
    status: "trialing",
    amount: 0,
    billingCycle: "monthly",
    startDate: "2023-05-01",
    nextBillingDate: "2023-05-15",
  },
  {
    id: "sub_6",
    user: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    plan: "Enterprise",
    status: "past_due",
    amount: 199,
    billingCycle: "monthly",
    startDate: "2023-04-15",
    nextBillingDate: "2023-05-15",
  },
];

const mockPlans: Plan[] = [
  {
    id: "plan_1",
    name: "Basic",
    description: "Essential security and SEO tools for small websites",
    price: {
      monthly: 29,
      annual: 278,
    },
    features: [
      "Basic security scanning",
      "Monthly SEO analysis",
      "Basic performance metrics",
      "Single website",
      "Email reports",
    ],
    active: true,
  },
  {
    id: "plan_2",
    name: "Professional",
    description:
      "Comprehensive protection and optimization for growing businesses",
    price: {
      monthly: 79,
      annual: 758,
    },
    features: [
      "Advanced security scanning",
      "Weekly SEO analysis",
      "Detailed performance metrics",
      "Up to 5 websites",
      "Email and PDF reports",
      "Advanced vulnerability detection",
      "Continuous monitoring",
    ],
    active: true,
  },
  {
    id: "plan_3",
    name: "Enterprise",
    description:
      "Maximum security and SEO optimization for large organizations",
    price: {
      monthly: 199,
      annual: 1908,
    },
    features: [
      "Enterprise-grade security scanning",
      "Daily SEO analysis",
      "Real-time performance monitoring",
      "Unlimited websites",
      "Customizable reports",
      "Advanced vulnerability detection",
      "Continuous monitoring",
      "Custom recommendations",
      "24/7 priority support",
    ],
    active: true,
  },
];

const mockCoupons = [
  {
    id: "coupon_1",
    code: "WELCOME20",
    discount: "20%",
    type: "percentage",
    validUntil: "2023-12-31",
    usageLimit: 100,
    usageCount: 45,
    active: true,
  },
  {
    id: "coupon_2",
    code: "SUMMER2023",
    discount: "$10",
    type: "fixed",
    validUntil: "2023-08-31",
    usageLimit: 200,
    usageCount: 78,
    active: true,
  },
  {
    id: "coupon_3",
    code: "ENTERPRISE50",
    discount: "50%",
    type: "percentage",
    validUntil: "2023-06-30",
    usageLimit: 50,
    usageCount: 12,
    active: true,
  },
];

export function SubscriptionManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("subscriptions");

  const filteredSubscriptions = mockSubscriptions.filter(
    (subscription) =>
      subscription.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "canceled":
        return "bg-gray-500";
      case "past_due":
        return "bg-red-500";
      case "trialing":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "canceled":
        return <Badge variant="outline">Canceled</Badge>;
      case "past_due":
        return <Badge className="bg-red-500">Past Due</Badge>;
      case "trialing":
        return <Badge className="bg-blue-500">Trial</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            value="subscriptions"
            className="flex items-center gap-2"
          >
            <CreditCard size={16} />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <Tag size={16} />
            Plans
          </TabsTrigger>
          <TabsTrigger value="coupons" className="flex items-center gap-2">
            <Tag size={16} />
            Coupons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Subscription Management</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search subscriptions..."
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
                    Add Subscription
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Billing Cycle</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-8 text-muted-foreground"
                        >
                          No subscriptions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSubscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell className="font-medium">
                            {subscription.user}
                          </TableCell>
                          <TableCell>{subscription.email}</TableCell>
                          <TableCell>{subscription.plan}</TableCell>
                          <TableCell>
                            {getStatusBadge(subscription.status)}
                          </TableCell>
                          <TableCell>${subscription.amount}</TableCell>
                          <TableCell className="capitalize">
                            {subscription.billingCycle}
                          </TableCell>
                          <TableCell>{subscription.startDate}</TableCell>
                          <TableCell>{subscription.nextBillingDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Subscription
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Change Plan</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Apply Coupon
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Cancel Subscription
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredSubscriptions.length} of{" "}
                  {mockSubscriptions.length} subscriptions
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Subscriptions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Plan Management</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {mockPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className="border-2 hover:border-primary transition-colors"
                  >
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="text-3xl font-bold">
                          ${plan.price.monthly}
                        </span>
                        <span className="text-muted-foreground"> /month</span>
                      </div>
                      <div>
                        <span className="text-lg font-bold">
                          ${plan.price.annual}
                        </span>
                        <span className="text-muted-foreground"> /year</span>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 flex gap-2">
                        <Button className="flex-1">Edit</Button>
                        <Button variant="outline" className="flex-1">
                          {plan.active ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coupons">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Coupon Management</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Coupon
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCoupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell className="font-medium">
                          {coupon.code}
                        </TableCell>
                        <TableCell>{coupon.discount}</TableCell>
                        <TableCell className="capitalize">
                          {coupon.type}
                        </TableCell>
                        <TableCell>{coupon.validUntil}</TableCell>
                        <TableCell>
                          {coupon.usageCount} / {coupon.usageLimit}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={coupon.active ? "default" : "outline"}
                          >
                            {coupon.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit Coupon</DropdownMenuItem>
                              <DropdownMenuItem>
                                {coupon.active ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Delete Coupon
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
