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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";

type PlanFormProps = {
  onSubmit: (plan: any) => void;
  onCancel: () => void;
  initialData?: any;
  isEditing?: boolean;
};

export function PlanForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: PlanFormProps) {
  const [plan, setPlan] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: {
      monthly: initialData?.price?.monthly || "",
      annual: initialData?.price?.annual || "",
    },
    features: initialData?.features || [""],
    active: initialData?.active ?? true,
  });

  const handleChange = (field: string, value: any) => {
    setPlan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePriceChange = (type: "monthly" | "annual", value: string) => {
    setPlan((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [type]: value,
      },
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...plan.features];
    updatedFeatures[index] = value;
    handleChange("features", updatedFeatures);
  };

  const addFeature = () => {
    handleChange("features", [...plan.features, ""]);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = plan.features.filter((_, i) => i !== index);
    handleChange("features", updatedFeatures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty features
    const filteredFeatures = plan.features.filter(
      (feature) => feature.trim() !== "",
    );

    onSubmit({
      ...plan,
      features: filteredFeatures,
      price: {
        monthly: Number(plan.price.monthly),
        annual: Number(plan.price.annual),
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Plan" : "Create New Plan"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              placeholder="e.g., Professional"
              value={plan.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a description for this plan"
              value={plan.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyPrice">Monthly Price ($)</Label>
              <Input
                id="monthlyPrice"
                type="number"
                placeholder="e.g., 79"
                value={plan.price.monthly}
                onChange={(e) => handlePriceChange("monthly", e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualPrice">Annual Price ($)</Label>
              <Input
                id="annualPrice"
                type="number"
                placeholder="e.g., 790"
                value={plan.price.annual}
                onChange={(e) => handlePriceChange("annual", e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Features</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFeature}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </Button>
            </div>
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  {plan.features.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={plan.active}
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
            {isEditing ? "Update Plan" : "Create Plan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
