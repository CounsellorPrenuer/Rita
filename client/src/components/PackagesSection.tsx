import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createOrder, previewCoupon, verifyPayment } from "@/lib/workerApi";
import { sanityClient, type CustomPlan, type StandardPlan } from "@/lib/sanity";

declare global {
  interface Window {
    Razorpay: unknown;
  }
}

type Tab = "8-10" | "10-12" | "college" | "working";

const PRICING_TABS: { id: Tab; label: string }[] = [
  { id: "8-10", label: "Grades 8–10" },
  { id: "10-12", label: "Grades 10–12" },
  { id: "college", label: "College Students" },
  { id: "working", label: "Working Professionals" },
];

const subgroupLabel = (subgroup: Tab) =>
  PRICING_TABS.find((t) => t.id === subgroup)?.label ?? subgroup;

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatInr = (amount: number) => {
  const formatted = inrFormatter.format(amount);
  return formatted.includes("₹") ? formatted : formatted.replace("INR", "Rs.");
};

const fallbackStandard: StandardPlan[] = [
  { planId: "pkg-1", title: "Discover", subgroup: "8-10", price: 5500, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"], order: 1 },
  { planId: "pkg-2", title: "Discover Plus+", subgroup: "8-10", price: 15000, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"], order: 2 },
  { planId: "pkg-3", title: "Achieve Online", subgroup: "10-12", price: 5999, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"], order: 3 },
  { planId: "pkg-4", title: "Achieve Plus+", subgroup: "10-12", price: 10599, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"], order: 4 },
  { planId: "pkg-5", title: "Ascend Online", subgroup: "college", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"], order: 5 },
  { planId: "pkg-6", title: "Ascend Plus+", subgroup: "college", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"], order: 6 },
  { planId: "mp-3", title: "Ascend Online", subgroup: "working", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"], order: 7 },
  { planId: "mp-2", title: "Ascend Plus+", subgroup: "working", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"], order: 8 },
];

const fallbackCustom: CustomPlan[] = [
  { planId: "career-report", title: "Career Report", price: 1500, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.", order: 1 },
  { planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at.", order: 2 },
  { planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love.", order: 3 },
  { planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.", order: 4 },
  { planId: "college-admission-planning", title: "College Admission Planning", price: 3000, description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.", order: 5 },
  { planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind.", order: 6 },
  { planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, description: "Rs. 199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!", order: 7 },
];

export default function PackagesSection() {
  const [selectedTab, setSelectedTab] = useState<Tab>("8-10");
  const [selectedPlan, setSelectedPlan] = useState<StandardPlan | CustomPlan | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [payerInfo, setPayerInfo] = useState({ name: "", email: "", phone: "" });
  const [couponCode, setCouponCode] = useState("");
  const [couponState, setCouponState] = useState<{ ok: boolean; message: string; finalAmount?: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { data } = useQuery({
    queryKey: ["sanity-pricing"],
    queryFn: async () => {
      const standardPlan = await sanityClient.fetch(
        `*[_type == "standardPlan"] | order(order asc){planId,title,subgroup,price,features,order}`,
      );
      const customPlan = await sanityClient.fetch(
        `*[_type == "customPlan"] | order(order asc){planId,title,price,description,order}`,
      );
      return { standardPlan, customPlan };
    },
  });

  const standardPlans = (data?.standardPlan?.length ? data.standardPlan : fallbackStandard) as StandardPlan[];
  const customPlans = (data?.customPlan?.length ? data.customPlan : fallbackCustom) as CustomPlan[];

  const tabPlans = useMemo(
    () => standardPlans.filter((p) => p.subgroup === selectedTab),
    [selectedTab, standardPlans],
  );

  const handleBuyNow = (plan: StandardPlan | CustomPlan) => {
    setSelectedPlan(plan);
    setCouponCode("");
    setCouponState(null);
    setIsPaymentDialogOpen(true);
  };

  const applyCoupon = async () => {
    if (!selectedPlan || !couponCode.trim()) return;
    try {
      const res = (await previewCoupon({
        plan_id: selectedPlan.planId,
        coupon_code: couponCode.trim(),
      })) as { message?: string; final_amount?: number; amount?: number };
      setCouponState({
        ok: true,
        message: res.message || "Coupon applied successfully",
        finalAmount: Number(res.final_amount || res.amount || selectedPlan.price),
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Coupon invalid";
      setCouponState({ ok: false, message });
    }
  };

  const initiatePayment = async () => {
    if (!selectedPlan || !payerInfo.name || !payerInfo.email || !payerInfo.phone) {
      toast({ title: "Missing Information", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = (await createOrder({
        plan_id: selectedPlan.planId,
        coupon_code: couponCode.trim() || undefined,
        customer: payerInfo,
      })) as { key_id?: string; order_id?: string; amount?: number; currency?: string };

      const Razorpay = window.Razorpay as new (options: Record<string, unknown>) => { open: () => void };
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Fast Track 360 Consultancy",
        description: selectedPlan.title,
        order_id: orderData.order_id,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            await verifyPayment({
              plan_id: selectedPlan.planId,
              coupon_code: couponCode.trim() || undefined,
              customer: payerInfo,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast({ title: "Payment Successful", description: "Your payment has been verified successfully." });
            setIsPaymentDialogOpen(false);
            setPayerInfo({ name: "", email: "", phone: "" });
          } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Please contact support";
            toast({ title: "Payment Verification Failed", description: message, variant: "destructive" });
          }
        },
        prefill: {
          name: payerInfo.name,
          email: payerInfo.email,
          contact: payerInfo.phone,
        },
        theme: { color: "#dc2626" },
      };

      new Razorpay(options).open();
    } catch (error: unknown) {
      const rawMessage = error instanceof Error ? error.message : "";
      const friendlyMessage =
        rawMessage.includes("Invalid project_id")
          ? "Payment is temporarily unavailable. Please try again shortly or contact support."
          : rawMessage || "Failed to initiate payment";
      toast({ title: "Payment Failed", description: friendlyMessage, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="pricing" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Mentoria Packages</Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Choose Your Mentorship Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your stage below to view packages tailored for students and professionals.
          </p>
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={(v) => setSelectedTab(v as Tab)}
          className="mb-10"
        >
          <TabsList className="mx-auto flex h-auto w-full max-w-3xl flex-wrap justify-center gap-1 rounded-full bg-muted/60 p-1.5">
            {PRICING_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                data-testid={`tab-${tab.id}`}
                className="rounded-full px-4 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tabPlans.map((pkg) => (
            <Card key={pkg.planId} className="border-2 shadow-md flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="font-normal">
                  {subgroupLabel(pkg.subgroup as Tab)}
                </Badge>
                <CardTitle className="font-heading">{pkg.title}</CardTitle>
                <div className="text-3xl font-bold text-primary">{formatInr(pkg.price)}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleBuyNow(pkg)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-heading font-bold mb-2">
            Want To Customise Your Mentorship Plan?
          </h3>
          <p className="text-muted-foreground mb-8">
            If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customPlans.map((plan) => (
              <Card key={plan.planId} className="border-2 shadow-md flex flex-col">
                <CardHeader>
                  <CardTitle className="font-heading">{plan.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{formatInr(plan.price)}</div>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleBuyNow(plan)}>
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="space-y-3">
              <p className="font-semibold">{selectedPlan.title}</p>
              <p className="text-xl text-primary">
                {formatInr(couponState?.finalAmount ?? selectedPlan.price)}
              </p>
              <Label htmlFor="payer-name">Full Name</Label>
              <Input
                id="payer-name"
                value={payerInfo.name}
                onChange={(e) => setPayerInfo({ ...payerInfo, name: e.target.value })}
              />
              <Label htmlFor="payer-email">Email</Label>
              <Input
                id="payer-email"
                type="email"
                value={payerInfo.email}
                onChange={(e) => setPayerInfo({ ...payerInfo, email: e.target.value })}
              />
              <Label htmlFor="payer-phone">Phone</Label>
              <Input
                id="payer-phone"
                value={payerInfo.phone}
                onChange={(e) => setPayerInfo({ ...payerInfo, phone: e.target.value })}
              />
              <Label htmlFor="coupon">Coupon</Label>
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon"
                />
                <Button type="button" variant="outline" onClick={applyCoupon}>
                  Apply
                </Button>
              </div>
              {couponState && (
                <p className={couponState.ok ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
                  {couponState.message}
                </p>
              )}
              <Button onClick={initiatePayment} disabled={isProcessing} className="w-full">
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
