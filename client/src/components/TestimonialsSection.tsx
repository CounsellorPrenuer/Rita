import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { sanityClient, type TestimonialItem } from "@/lib/sanity";

const fallbackTestimonials: TestimonialItem[] = [
  {
    name: "Priya S.",
    role: "Marketing Manager",
    achievement: "Promoted to Senior Manager",
    quote: "Rita's coaching helped me navigate a challenging career transition with confidence and clarity.",
  },
  {
    name: "Rajesh K.",
    role: "Software Engineer",
    achievement: "Leadership Role",
    quote: "The emotional intelligence training transformed how I lead my team and communicate with stakeholders.",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonials = fallbackTestimonials, isLoading } = useQuery<TestimonialItem[]>({
    queryKey: ["sanity-testimonials"],
    queryFn: async () =>
      sanityClient.fetch(`*[_type == "testimonials"] | order(order asc){name,role,achievement,quote}`),
  });

  const display = testimonials.length ? testimonials : fallbackTestimonials;

  const next = () => setCurrentIndex((prev) => (prev + 1) % display.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + display.length) % display.length);

  return (
    <section id="testimonials" className="py-20 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4" data-testid="badge-testimonials">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real transformations from professionals who took the leap.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 border-2 shadow-xl">
              <CardContent className="p-0">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <Quote className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed" data-testid="text-testimonial-content">
                  &ldquo;{display[currentIndex].quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-foreground" data-testid="text-testimonial-name">
                    {display[currentIndex].name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid="text-testimonial-role">
                    {display[currentIndex].role}
                    {display[currentIndex].achievement ? ` — ${display[currentIndex].achievement}` : ""}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prev} data-testid="button-testimonial-prev">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {display.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-8" : "bg-border"
                    }`}
                    data-testid={`button-testimonial-dot-${index}`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={next} data-testid="button-testimonial-next">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
