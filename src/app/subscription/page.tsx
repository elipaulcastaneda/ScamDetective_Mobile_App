import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const personalTiers = [
  {
    name: "Basic",
    price: "Free",
    priceDetail: "",
    features: [
      "Manual text & URL scanning",
      "Limited to 10 scans per day",
      "Community support",
    ],
    buttonText: "Get Started",
    variant: "outline",
  },
  {
    name: "Advanced",
    price: "$0.99",
    priceDetail: "/ month",
    features: [
      "Everything in Basic",
      "Unlimited manual scans",
      "Browser extension access",
      "Email & phone number scanning",
    ],
    buttonText: "Upgrade to Advanced",
  },
  {
    name: "Comprehensive",
    price: "$2.99",
    priceDetail: "/ month",
    features: [
      "Everything in Advanced",
      "Real-time background scanning",
      "Automatic threat database updates",
      "Priority support",
    ],
    buttonText: "Upgrade to Comprehensive",
    isPrimary: true,
  },
];

const enterpriseTier = {
  name: "Enterprise",
  price: "$4.99",
  priceDetail: "/ month per device",
  description: "For businesses and organizations requiring advanced security and management tools.",
  features: [
    "All Comprehensive features",
    "Centralized dashboard for team management",
    "Customizable security policies",
    "Dedicated account manager",
    "24/7 priority support",
  ],
  buttonText: "Contact Sales",
};

function PlanCard({
  name,
  price,
  priceDetail,
  features,
  buttonText,
  variant,
  isPrimary,
}: {
  name: string;
  price: string;
  priceDetail: string;
  features: string[];
  buttonText: string;
  variant?: "outline" | "default";
  isPrimary?: boolean;
}) {
  return (
    <Card className={isPrimary ? "border-primary" : ""}>
      <CardHeader className="items-center">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <div className="text-4xl font-bold">
          {price}
          <span className="text-lg font-normal text-muted-foreground">{priceDetail}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={variant || "default"}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SubscriptionPage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Find Your Perfect Plan</h1>
        <p className="text-muted-foreground mt-2">
          Choose the plan that's right for you and stay protected.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {personalTiers.map((tier) => (
          <PlanCard key={tier.name} {...tier} />
        ))}
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Enterprise Plan</CardTitle>
          <CardDescription>{enterpriseTier.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-5xl font-bold mb-4">
                {enterpriseTier.price}
                <span className="text-xl font-normal text-muted-foreground">{enterpriseTier.priceDetail}</span>
              </div>
              <ul className="space-y-3">
                {enterpriseTier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="h-12 text-lg px-10">
                {enterpriseTier.buttonText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
