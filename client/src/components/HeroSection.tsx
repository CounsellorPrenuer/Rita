import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, TrendingUp } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { urlFor } from "@/lib/sanityImage";
import fallbackPortrait from "@assets/image_1759324778990.png";

export default function HeroSection() {
  const { data: settings } = useSiteSettings();
  const portraitSrc =
    urlFor(settings?.heroPortrait, { width: 900, height: 1100 }) ?? fallbackPortrait;

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <Badge variant="secondary" className="mb-4" data-testid="badge-professional">
              Certified Leadership Coach
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Transform Your Career Journey
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Expert guidance from Rita D'Souza, a Certified Leadership Coach & Emotional Intelligence Trainer with 15+ years of experience helping professionals achieve their career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                variant="default"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-book-call"
              >
                Book a Free Career Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-explore"
              >
                Explore Our Services
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center" data-testid="stat-clients">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Clients Coached</div>
              </div>
              <div className="text-center" data-testid="stat-success">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center" data-testid="stat-experience">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-primary/10">
                <img
                  src={portraitSrc}
                  alt={settings?.heroPortrait?.alt || "Rita D'Souza - Leadership Coach"}
                  className="w-full h-auto max-h-[600px] object-cover object-center"
                  data-testid="img-hero-portrait"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
