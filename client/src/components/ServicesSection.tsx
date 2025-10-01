import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Presentation, UserCheck } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  price: string;
  icon: typeof Users;
}

export default function ServicesSection() {
  //todo: remove mock functionality
  const services: Service[] = [
    {
      id: 1,
      title: "One-on-One Career Guidance",
      description: "Personalized coaching sessions to help you navigate career transitions and achieve your professional goals.",
      features: [
        "90-minute intensive sessions",
        "Personalized action plans",
        "Email support between sessions",
        "Career assessment tools"
      ],
      price: "₹5,000",
      icon: UserCheck,
    },
    {
      id: 2,
      title: "Leadership Workshops",
      description: "Interactive group workshops designed to develop essential leadership and management skills.",
      features: [
        "Half-day or full-day formats",
        "Interactive exercises",
        "Team building activities",
        "Workbook and materials"
      ],
      price: "₹25,000",
      icon: Users,
    },
    {
      id: 3,
      title: "Corporate Training Programs",
      description: "Customized training programs for organizations to enhance team performance and leadership capabilities.",
      features: [
        "Customized curriculum",
        "Pre & post assessments",
        "Follow-up sessions",
        "Certificate of completion"
      ],
      price: "Custom",
      icon: Presentation,
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="hover-elevate flex flex-col"
                data-testid={`card-service-${index}`}
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-muted-foreground">Starting at</div>
                    <div className="text-2xl font-bold text-foreground">{service.price}</div>
                  </div>
                  <Button
                    variant="default"
                    onClick={() => console.log(`Book ${service.title} clicked`)}
                    data-testid={`button-book-service-${index}`}
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
