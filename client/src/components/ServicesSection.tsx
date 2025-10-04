import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Presentation, UserCheck, Briefcase, Target, Award } from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import type { Service } from "@shared/schema";

const iconMap: { [key: string]: any } = {
  Users,
  Presentation,
  UserCheck,
  Briefcase,
  Target,
  Award,
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
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
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Briefcase;
                return (
                  <Card
                    key={service.id}
                    className="hover-elevate flex flex-col border-2 shadow-md transition-all duration-300"
                    data-testid={`card-service-${index}`}
                  >
                    <CardHeader>
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
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
                        <div className="text-2xl font-bold text-foreground">
                          ₹{(service.price / 100).toLocaleString("en-IN")}
                        </div>
                      </div>
                      <Button
                        variant="default"
                        onClick={() => handleBookService(service)}
                        data-testid={`button-book-service-${index}`}
                      >
                        Book Now
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <PaymentModal
        service={selectedService}
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSuccess={() => {
          setSelectedService(null);
        }}
      />
    </>
  );
}
