import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, TrendingUp } from "lucide-react";
import ritaPortraitImage from "@assets/image_1759324778990.png";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                onClick={() => console.log("Book Free Call clicked")}
                data-testid="button-hero-book-call"
              >
                Book a Free Career Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("services");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-hero-explore"
              >
                Explore Our Services
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center" data-testid="stat-clients">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Clients Coached</div>
              </div>
              <div className="text-center" data-testid="stat-success">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center" data-testid="stat-experience">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={ritaPortraitImage}
                  alt="Rita D'Souza - Leadership Coach"
                  className="w-full h-auto object-cover"
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
