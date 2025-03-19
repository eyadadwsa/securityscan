"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Calendar,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: string[];
  isPopular?: boolean;
  websiteLimit: number;
};

type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  downloadUrl: string;
};

type PaymentMethod = {
  id: string;
  type: "credit_card" | "paypal";
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
};

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    billingCycle: "monthly",
    features: [
      "Basic security scanning",
      "Monthly SEO analysis",
      "Basic performance metrics",
      "Up to 3 websites",
      "Email reports",
    ],
    websiteLimit: 3,
  },
  {
    id: "professional",
    name: "Professional",
    price: 79,
    billingCycle: "monthly",
    features: [
      "Advanced security scanning",
      "Weekly SEO analysis",
      "Detailed performance metrics",
      "Up to 5 websites",
      "Email and PDF reports",
      "Priority support",
    ],
    isPopular: true,
    websiteLimit: 5,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    billingCycle: "monthly",
    features: [
      "Enterprise-grade security scanning",
      "Daily SEO analysis",
      "Advanced performance metrics",
      "Unlimited websites",
      "Custom reports and API access",
      "Dedicated support",
      "White-label reports",
    ],
    websiteLimit: Infinity,
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "INV-2023-05-15",
    date: "2023-05-15",
    amount: 79,
    status: "paid",
    downloadUrl: "/invoices/INV-2023-05-15.pdf",
  },
  {
    id: "INV-2023-04-15",
    date: "2023-04-15",
    amount: 79,
    status: "paid",
    downloadUrl: "/invoices/INV-2023-04-15.pdf",
  },
  {
    id: "INV-2023-03-15",
    date: "2023-03-15",
    amount: 79,
    status: "paid",
    downloadUrl: "/invoices/INV-2023-03-15.pdf",
  },
  {
    id: "INV-2023-02-15",
    date: "2023-02-15",
    amount: 79,
    status: "paid",
    downloadUrl: "/invoices/INV-2023-02-15.pdf",
  },
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "credit_card",
    lastFour: "4242",
    expiryDate: "05/25",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "paypal",
    isDefault: false,
  },
];

export function SubscriptionManagement() {
  const [currentPlan, setCurrentPlan] = useState(plans[1]); // Professional plan
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);

  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate the promo code with the backend
    alert(`Promo code ${promoCode} applied!`);
    setPromoCode("");
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current-plan" className="space-y-4">
          <TabsList>
            <TabsTrigger
              value="current-plan"
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              Current Plan
            </TabsTrigger>
            <TabsTrigger
              value="billing-history"
              className="flex items-center gap-2"
            >
              <Calendar size={16} />
              Billing History
            </TabsTrigger>
            <TabsTrigger
              value="payment-methods"
              className="flex items-center gap-2"
            >
              <CreditCard size={16} />
              Payment Methods
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current-plan" className="space-y-6">
            <div className="p-4 border rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">
                      {currentPlan.name} Plan
                    </h3>
                    {currentPlan.isPopular && (
                      <Badge className="bg-primary">Popular</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">
                      ${currentPlan.price}
                    </span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Next billing date: June 15, 2023
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button
                    variant="outline"
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Plan Features</h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Usage</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Websites</span>
                      <span>
                        3 /{" "}
                        {currentPlan.websiteLimit === Infinity
                          ? "Unlimited"
                          : currentPlan.websiteLimit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${currentPlan.websiteLimit === Infinity ? 30 : (3 / currentPlan.websiteLimit) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`overflow-hidden ${plan.id === currentPlan.id ? "border-primary" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.isPopular && (
                        <Badge className="bg-primary">Popular</Badge>
                      )}
                    </div>
                    <div className="flex items-baseline mt-1">
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-1">
                        / month
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.id === currentPlan.id ? (
                      <Button className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        {plan.price > currentPlan.price
                          ? "Upgrade"
                          : "Downgrade"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3">Have a Promo Code?</h4>
              <form onSubmit={handlePromoCodeSubmit} className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="submit" disabled={!promoCode}>
                  Apply
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="billing-history" className="space-y-6">
            <div className="rounded-md border">
              <div className="p-4 bg-muted/50">
                <h3 className="font-medium">Billing History</h3>
              </div>
              <div className="divide-y">
                {mockInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{invoice.id}</h4>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        ${invoice.amount.toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">
                    Need a copy of a specific invoice?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    If you need a specific invoice that's not listed here,
                    please contact our support team.
                  </p>
                  <Button className="mt-3" size="sm" variant="outline">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-6">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="p-4 border rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {method.type === "credit_card" ? (
                        <CreditCard className="h-8 w-8 text-primary" />
                      ) : (
                        <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
                          P
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {method.type === "credit_card"
                              ? `Visa ending in ${method.lastFour}`
                              : "PayPal"}
                          </h4>
                          {method.isDefault && (
                            <Badge variant="outline">Default</Badge>
                          )}
                        </div>
                        {method.type === "credit_card" && method.expiryDate && (
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expiryDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDefaultPaymentMethod(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
                        onClick={() => removePaymentMethod(method.id)}
                        disabled={method.isDefault}
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Payment Method
            </Button>

            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Payment Security</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your payment information is securely stored and processed.
                    We use industry-standard encryption to protect your
                    sensitive data.
                  </p>
                  <Button
                    className="mt-3"
                    size="sm"
                    variant="link"
                    className="p-0 h-auto"
                  >
                    Learn more about our security measures
                    <ArrowRight className="ml-1 h-3 w-3" />
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
