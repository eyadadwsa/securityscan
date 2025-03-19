"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type CouponFormProps = {
  onSubmit: (coupon: any) => void;
  onCancel: () => void;
  initialData?: any;
  isEditing?: boolean;
};

export function CouponForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: CouponFormProps) {
  const [coupon, setCoupon] = useState({
    code: initialData?.code || "",
    discountType: initialData?.type || "percentage",
    discountValue: initialData?.discount?.replace(/[^0-9.]/g, "") || "",
    validUntil: initialData?.validUntil || "",
    usageLimit: initialData?.usageLimit || "",
    description: initialData?.description || "",
    active: initialData?.active ?? true,
    applicablePlans: {
      Basic: initialData?.applicablePlans?.includes("Basic") ?? true,
      Professional:
        initialData?.applicablePlans?.includes("Professional") ?? true,
      Enterprise: initialData?.applicablePlans?.includes("Enterprise") ?? true,
    },
  });

  const handleChange = (field: string, value: any) => {
    setCoupon((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlanChange = (plan: string, checked: boolean) => {
    setCoupon((prev) => ({
      ...prev,
      applicablePlans: {
        ...prev.applicablePlans,
        [plan]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the discount value based on the type
    const formattedDiscount =
      coupon.discountType === "percentage"
        ? `${coupon.discountValue}%`
        : `$${coupon.discountValue}`;

    // Convert applicable plans to array
    const applicablePlans = Object.entries(coupon.applicablePlans)
      .filter(([_, isApplicable]) => isApplicable)
      .map(([plan]) => plan);

    onSubmit({
      ...coupon,
      discount: formattedDiscount,
      type: coupon.discountType,
      applicablePlans,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Coupon" : "Create New Coupon"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Coupon Code</Label>
            <Input
              id="code"
              placeholder="e.g., SUMMER2023"
              value={coupon.code}
              onChange={(e) => handleChange("code", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discountType">Discount Type</Label>
              <Select
                value={coupon.discountType}
                onValueChange={(value) => handleChange("discountType", value)}
              >
                <SelectTrigger id="discountType">
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountValue">
                {coupon.discountType === "percentage"
                  ? "Discount Percentage"
                  : "Discount Amount"}
              </Label>
              <div className="relative">
                {coupon.discountType === "fixed" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    $
                  </span>
                )}
                <Input
                  id="discountValue"
                  type="number"
                  placeholder={
                    coupon.discountType === "percentage"
                      ? "e.g., 20"
                      : "e.g., 10"
                  }
                  value={coupon.discountValue}
                  onChange={(e) =>
                    handleChange("discountValue", e.target.value)
                  }
                  className={coupon.discountType === "fixed" ? "pl-7" : ""}
                  min="0"
                  max={coupon.discountType === "percentage" ? "100" : undefined}
                  step="0.01"
                  required
                />
                {coupon.discountType === "percentage" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    %
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={coupon.validUntil}
                onChange={(e) => handleChange("validUntil", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usageLimit">Usage Limit</Label>
              <Input
                id="usageLimit"
                type="number"
                placeholder="e.g., 100"
                value={coupon.usageLimit}
                onChange={(e) => handleChange("usageLimit", e.target.value)}
                min="1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Applicable Plans</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="basic-plan"
                  checked={coupon.applicablePlans.Basic}
                  onCheckedChange={(checked) =>
                    handlePlanChange("Basic", checked as boolean)
                  }
                />
                <Label htmlFor="basic-plan" className="font-normal">
                  Basic Plan
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="professional-plan"
                  checked={coupon.applicablePlans.Professional}
                  onCheckedChange={(checked) =>
                    handlePlanChange("Professional", checked as boolean)
                  }
                />
                <Label htmlFor="professional-plan" className="font-normal">
                  Professional Plan
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enterprise-plan"
                  checked={coupon.applicablePlans.Enterprise}
                  onCheckedChange={(checked) =>
                    handlePlanChange("Enterprise", checked as boolean)
                  }
                />
                <Label htmlFor="enterprise-plan" className="font-normal">
                  Enterprise Plan
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter a description for this coupon"
              value={coupon.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={coupon.active}
              onCheckedChange={(checked) =>
                handleChange("active", checked as boolean)
              }
            />
            <Label htmlFor="active" className="font-normal">
              Active
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Coupon" : "Create Coupon"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
