import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Search, BarChart, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - SecureSEO",
  description: "Flexible pricing plans for security and SEO analysis",
};

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText: string;
  icon: React.ReactNode;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    description: "Essential security and SEO tools for small websites",
    price: "$29",
    period: "per month",
    features: [
      { name: "Basic security scanning", included: true },
      { name: "Monthly SEO analysis", included: true },
      { name: "Basic performance metrics", included: true },
      { name: "Single website", included: true },
      { name: "Email reports", included: true },
      { name: "Advanced vulnerability detection", included: false },
      { name: "Continuous monitoring", included: false },
      { name: "Custom recommendations", included: false },
      { name: "Priority support", included: false },
    ],
    buttonText: "Get Started",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    name: "Professional",
    description:
      "Comprehensive protection and optimization for growing businesses",
    price: "$79",
    period: "per month",
    features: [
      { name: "Advanced security scanning", included: true },
      { name: "Weekly SEO analysis", included: true },
      { name: "Detailed performance metrics", included: true },
      { name: "Up to 5 websites", included: true },
      { name: "Email and PDF reports", included: true },
      { name: "Advanced vulnerability detection", included: true },
      { name: "Continuous monitoring", included: true },
      { name: "Custom recommendations", included: false },
      { name: "Priority support", included: false },
    ],
    popular: true,
    buttonText: "Get Started",
    icon: <Search className="h-5 w-5" />,
  },
  {
    name: "Enterprise",
    description:
      "Maximum security and SEO optimization for large organizations",
    price: "$199",
    period: "per month",
    features: [
      { name: "Enterprise-grade security scanning", included: true },
      { name: "Daily SEO analysis", included: true },
      { name: "Real-time performance monitoring", included: true },
      { name: "Unlimited websites", included: true },
      { name: "Customizable reports", included: true },
      { name: "Advanced vulnerability detection", included: true },
      { name: "Continuous monitoring", included: true },
      { name: "Custom recommendations", included: true },
      { name: "24/7 priority support", included: true },
    ],
    buttonText: "Contact Sales",
    icon: <BarChart className="h-5 w-5" />,
  },
];

export default function PricingPage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Pricing Plans
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect plan for your security and SEO needs
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-muted inline-flex items-center p-1 rounded-lg">
          <Button variant="ghost" className="rounded-md">
            Monthly
          </Button>
          <Button className="rounded-md">Annual (Save 20%)</Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${plan.popular ? "border-primary shadow-md relative" : ""}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`p-2 rounded-full ${plan.popular ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {plan.icon}
                </div>
                <CardTitle>{plan.name}</CardTitle>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.included ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.included ? "" : "text-muted-foreground"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-8">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Need a Custom Plan?</h2>
            <p className="text-muted-foreground mb-6">
              We understand that every business has unique requirements. Our
              team can create a tailored solution that perfectly fits your needs
              and budget.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Custom security scanning frequency</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Tailored reporting and analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Integration with your existing tools</span>
              </li>
            </ul>
            <Button size="lg">Contact Our Sales Team</Button>
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Can I change plans later?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Is there a free trial?</h4>
                <p className="text-sm text-muted-foreground">
                  We offer a 14-day free trial for all plans. No credit card
                  required.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">
                  What payment methods do you accept?
                </h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers
                  for annual plans.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Can I cancel anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time with no
                  cancellation fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
