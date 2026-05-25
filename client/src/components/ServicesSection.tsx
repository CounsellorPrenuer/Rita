import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Presentation, UserCheck, Briefcase, Target, Award, Building2 } from "lucide-react";
import { sanityClient, type ServiceItem } from "@/lib/sanity";

const iconMap: Record<string, typeof Users> = {
  Users,
  Presentation,
  UserCheck,
  Briefcase,
  Target,
  Award,
  Building2,
};

const fallbackServices: (ServiceItem & { icon: typeof Users })[] = [
  {
    title: "Leadership Coaching",
    subtitle: "Executive and team leadership development",
    features: ["1:1 Leadership Coaching", "Emotional Intelligence Training", "Team Dynamics Workshops", "Executive Presence"],
    icon: Users,
  },
  {
    title: "Career Guidance",
    subtitle: "Strategic career planning and transitions",
    features: ["Career Assessment", "Resume & Interview Prep", "Career Transition Planning", "Professional Mentorship"],
    icon: Briefcase,
  },
  {
    title: "Corporate Workshops",
    subtitle: "Organizational development programs",
    features: ["Custom Workshop Design", "Team Building Sessions", "Communication Skills", "Change Management"],
    icon: Building2,
  },
];

export default function ServicesSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["sanity-services"],
    queryFn: async () =>
      sanityClient.fetch(`*[_type == "services"] | order(order asc){title,subtitle,features,order}`),
  });

  const services = (data?.length ? data : fallbackServices).map((s: ServiceItem, i: number) => ({
    ...s,
    icon: [Users, Briefcase, Building2][i % 3] || Briefcase,
  }));

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4" data-testid="badge-services">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Comprehensive Career Development Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the program that best fits your needs and start your transformation journey today.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon || Briefcase;
              return (
                <Card
                  key={index}
                  className="hover-elevate flex flex-col border-2 shadow-md transition-all duration-300"
                  data-testid={`card-service-${index}`}
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
                    <CardDescription>{service.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {(service.features || []).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" className="w-full" onClick={scrollToPricing} data-testid={`button-view-pricing-${index}`}>
                      View Pricing
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
