"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Download,
  Edit,
  Mail,
  RefreshCw,
  Save,
  Send,
  User,
} from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type PaymentHistory = {
  id: string;
  date: string;
  amount: number;
  status: "successful" | "failed" | "refunded";
  method: string;
  invoiceNumber: string;
};

type SubscriptionDetail = {
  id: string;
  user: string;
  email: string;
  plan: "Basic" | "Professional" | "Enterprise";
  status: "active" | "canceled" | "past_due" | "trialing" | "expired";
  amount: number;
  billingCycle: "monthly" | "annual";
  startDate: string;
  nextBillingDate: string;
  endDate?: string;
  notes?: string;
  paymentMethod: string;
  paymentHistory: PaymentHistory[];
  appliedDiscounts: {
    code: string;
    amount: number;
    appliedDate: string;
  }[];
};

// Mock data for a single subscription
const mockSubscriptionDetail: SubscriptionDetail = {
  id: "sub_1",
  user: "John Doe",
  email: "john.doe@example.com",
  plan: "Professional",
  status: "active",
  amount: 79,
  billingCycle: "monthly",
  startDate: "2023-01-15",
  nextBillingDate: "2023-06-15",
  paymentMethod: "Visa ending in 4242",
  notes: "Customer requested priority support for their account.",
  paymentHistory: [
    {
      id: "pay_1",
      date: "2023-05-15",
      amount: 79,
      status: "successful",
      method: "Visa ending in 4242",
      invoiceNumber: "INV-2023-05-15",
    },
    {
      id: "pay_2",
      date: "2023-04-15",
      amount: 79,
      status: "successful",
      method: "Visa ending in 4242",
      invoiceNumber: "INV-2023-04-15",
    },
    {
      id: "pay_3",
      date: "2023-03-15",
      amount: 79,
      status: "successful",
      method: "Visa ending in 4242",
      invoiceNumber: "INV-2023-03-15",
    },
    {
      id: "pay_4",
      date: "2023-02-15",
      amount: 79,
      status: "successful",
      method: "Visa ending in 4242",
      invoiceNumber: "INV-2023-02-15",
    },
  ],
  appliedDiscounts: [
    {
      code: "WELCOME20",
      amount: 15.8,
      appliedDate: "2023-01-15",
    },
  ],
};

export function SubscriptionDetail({ id = "sub_1" }: { id?: string }) {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionDetail>(
    mockSubscriptionDetail,
  );
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubscription, setEditedSubscription] = useState(subscription);
  const [showApplyCouponDialog, setShowApplyCouponDialog] = useState(false);
  const [couponCode, setCouponCode] = useState("");

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
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-500 text-white">
            Expired
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "successful":
        return <Badge className="bg-green-500">Successful</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      case "refunded":
        return <Badge className="bg-yellow-500">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSaveChanges = () => {
    setSubscription(editedSubscription);
    setIsEditing(false);
    // In a real app, you would save changes to the backend here
  };

  const handleCancelEditing = () => {
    setEditedSubscription(subscription);
    setIsEditing(false);
  };

  const handleApplyCoupon = () => {
    // In a real app, you would validate the coupon code and apply it
    setShowApplyCouponDialog(false);
    setCouponCode("");
    // Show success message
  };

  const handleManualInvoice = () => {
    // In a real app, you would create a manual invoice
    // Show success message
  };

  const handleProcessPayment = () => {
    // In a real app, you would process a manual payment
    // Show success message
  };

  const handleRefundPayment = (paymentId: string) => {
    // In a real app, you would process a refund
    // Show success message
  };

  const handleSendNotification = () => {
    // In a real app, you would send a notification to the user
    // Show success message
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Back to Subscriptions
        </Button>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelEditing}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Subscription
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Subscription Details</CardTitle>
              <CardDescription>ID: {subscription.id}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(subscription.status)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
              <TabsTrigger value="discounts">Discounts</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="user">Name</Label>
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-muted-foreground" />
                            <Input
                              id="user"
                              value={editedSubscription.user}
                              onChange={(e) =>
                                setEditedSubscription({
                                  ...editedSubscription,
                                  user: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              value={editedSubscription.email}
                              onChange={(e) =>
                                setEditedSubscription({
                                  ...editedSubscription,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-muted-foreground" />
                          <span className="font-medium">
                            {subscription.user}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-muted-foreground" />
                          <span>{subscription.email}</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Subscription Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="plan">Plan</Label>
                          <Select
                            value={editedSubscription.plan}
                            onValueChange={(value) =>
                              setEditedSubscription({
                                ...editedSubscription,
                                plan: value as any,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Basic">Basic</SelectItem>
                              <SelectItem value="Professional">
                                Professional
                              </SelectItem>
                              <SelectItem value="Enterprise">
                                Enterprise
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={editedSubscription.status}
                            onValueChange={(value) =>
                              setEditedSubscription({
                                ...editedSubscription,
                                status: value as any,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="canceled">Canceled</SelectItem>
                              <SelectItem value="past_due">Past Due</SelectItem>
                              <SelectItem value="trialing">Trial</SelectItem>
                              <SelectItem value="expired">Expired</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingCycle">Billing Cycle</Label>
                          <Select
                            value={editedSubscription.billingCycle}
                            onValueChange={(value) =>
                              setEditedSubscription({
                                ...editedSubscription,
                                billingCycle: value as any,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a billing cycle" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="annual">Annual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plan:</span>
                          <span className="font-medium">
                            {subscription.plan}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span>{getStatusBadge(subscription.status)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-medium">
                            ${subscription.amount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Billing Cycle:
                          </span>
                          <span className="font-medium capitalize">
                            {subscription.billingCycle}
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <div className="flex items-center gap-2">
                            <Calendar
                              size={16}
                              className="text-muted-foreground"
                            />
                            <Input
                              id="startDate"
                              type="date"
                              value={editedSubscription.startDate}
                              onChange={(e) =>
                                setEditedSubscription({
                                  ...editedSubscription,
                                  startDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nextBillingDate">
                            Next Billing Date
                          </Label>
                          <div className="flex items-center gap-2">
                            <Calendar
                              size={16}
                              className="text-muted-foreground"
                            />
                            <Input
                              id="nextBillingDate"
                              type="date"
                              value={editedSubscription.nextBillingDate}
                              onChange={(e) =>
                                setEditedSubscription({
                                  ...editedSubscription,
                                  nextBillingDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">
                            End Date (if applicable)
                          </Label>
                          <div className="flex items-center gap-2">
                            <Calendar
                              size={16}
                              className="text-muted-foreground"
                            />
                            <Input
                              id="endDate"
                              type="date"
                              value={editedSubscription.endDate || ""}
                              onChange={(e) =>
                                setEditedSubscription({
                                  ...editedSubscription,
                                  endDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Start Date:
                          </span>
                          <span className="font-medium">
                            {subscription.startDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Next Billing Date:
                          </span>
                          <span className="font-medium">
                            {subscription.nextBillingDate}
                          </span>
                        </div>
                        {subscription.endDate && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              End Date:
                            </span>
                            <span className="font-medium">
                              {subscription.endDate}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <div className="flex items-center gap-2">
                          <CreditCard
                            size={16}
                            className="text-muted-foreground"
                          />
                          <Input
                            id="paymentMethod"
                            value={editedSubscription.paymentMethod}
                            onChange={(e) =>
                              setEditedSubscription({
                                ...editedSubscription,
                                paymentMethod: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CreditCard
                          size={16}
                          className="text-muted-foreground"
                        />
                        <span>{subscription.paymentMethod}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={editedSubscription.notes || ""}
                      onChange={(e) =>
                        setEditedSubscription({
                          ...editedSubscription,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Add notes about this subscription"
                      className="min-h-[100px]"
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      {subscription.notes || "No notes available."}
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Change Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Subscription Plan</DialogTitle>
                      <DialogDescription>
                        Select a new plan for this subscription. This will take
                        effect on the next billing cycle.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPlan">New Plan</Label>
                        <Select defaultValue={subscription.plan}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">
                              Basic - $29/month
                            </SelectItem>
                            <SelectItem value="Professional">
                              Professional - $79/month
                            </SelectItem>
                            <SelectItem value="Enterprise">
                              Enterprise - $199/month
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="effectiveDate">Effective Date</Label>
                        <Select defaultValue="next">
                          <SelectTrigger>
                            <SelectValue placeholder="Select when to apply" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="next">
                              Next Billing Cycle
                            </SelectItem>
                            <SelectItem value="immediate">
                              Immediately (Prorated)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={showApplyCouponDialog}
                  onOpenChange={setShowApplyCouponDialog}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">Apply Coupon</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply Coupon</DialogTitle>
                      <DialogDescription>
                        Enter a coupon code to apply to this subscription.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="couponCode">Coupon Code</Label>
                        <Input
                          id="couponCode"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleApplyCoupon}>Apply Coupon</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Cancel Subscription</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this subscription? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        No, keep subscription
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        Yes, cancel subscription
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-lg">Payment History</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Issue Invoice
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Issue Manual Invoice</DialogTitle>
                            <DialogDescription>
                              Create a manual invoice for this subscription.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="invoiceAmount">Amount</Label>
                              <Input
                                id="invoiceAmount"
                                type="number"
                                placeholder="Enter amount"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="invoiceDescription">
                                Description
                              </Label>
                              <Textarea
                                id="invoiceDescription"
                                placeholder="Enter description"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="invoiceDueDate">Due Date</Label>
                              <Input id="invoiceDueDate" type="date" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleManualInvoice}>
                              Create Invoice
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Process Payment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Process Manual Payment</DialogTitle>
                            <DialogDescription>
                              Record a manual payment for this subscription.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="paymentAmount">Amount</Label>
                              <Input
                                id="paymentAmount"
                                type="number"
                                placeholder="Enter amount"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="paymentMethod">
                                Payment Method
                              </Label>
                              <Select defaultValue="card">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="card">
                                    Credit Card
                                  </SelectItem>
                                  <SelectItem value="bank">
                                    Bank Transfer
                                  </SelectItem>
                                  <SelectItem value="paypal">PayPal</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="paymentNotes">Notes</Label>
                              <Textarea
                                id="paymentNotes"
                                placeholder="Enter notes"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleProcessPayment}>
                              Record Payment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Invoice</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subscription.paymentHistory.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.invoiceNumber}</TableCell>
                            <TableCell>${payment.amount}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>
                              {getPaymentStatusBadge(payment.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                                {payment.status === "successful" && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        Refund
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Refund Payment
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to refund this
                                          payment? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleRefundPayment(payment.id)
                                          }
                                        >
                                          Refund
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discounts" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-lg">Applied Discounts</CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setShowApplyCouponDialog(true)}
                    >
                      Apply New Discount
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {subscription.appliedDiscounts.length === 0 ? (
                    <p className="text-muted-foreground py-4 text-center">
                      No discounts have been applied to this subscription.
                    </p>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Applied Date</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscription.appliedDiscounts.map(
                            (discount, index) => (
                              <TableRow key={index}>
                                <TableCell>{discount.code}</TableCell>
                                <TableCell>${discount.amount}</TableCell>
                                <TableCell>{discount.appliedDate}</TableCell>
                                <TableCell>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        Remove
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Remove Discount
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to remove this
                                          discount? This will affect future
                                          billing.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction>
                                          Remove Discount
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Send Notification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notificationType">
                        Notification Type
                      </Label>
                      <Select defaultValue="renewal">
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="renewal">
                            Renewal Reminder
                          </SelectItem>
                          <SelectItem value="payment">
                            Payment Receipt
                          </SelectItem>
                          <SelectItem value="expiration">
                            Expiration Notice
                          </SelectItem>
                          <SelectItem value="custom">Custom Message</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notificationSubject">Subject</Label>
                      <Input
                        id="notificationSubject"
                        placeholder="Enter subject"
                        defaultValue="Your subscription is due for renewal"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notificationMessage">Message</Label>
                      <Textarea
                        id="notificationMessage"
                        placeholder="Enter message"
                        className="min-h-[150px]"
                        defaultValue={`Dear ${subscription.user},\n\nYour subscription to the Professional plan is due for renewal on ${subscription.nextBillingDate}.\n\nPlease ensure your payment method is up to date to avoid any interruption in service.\n\nThank you for your continued support!\n\nBest regards,\nThe Team`}
                      />
                    </div>
                    <Button onClick={handleSendNotification}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Notification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
