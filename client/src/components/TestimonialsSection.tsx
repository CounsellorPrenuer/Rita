import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import avatarMale from "@assets/generated_images/Client_testimonial_avatar_male_2bfbfb3e.png";
import avatarFemale from "@assets/generated_images/Client_testimonial_avatar_female_b80a6e9b.png";
import avatarYoung from "@assets/generated_images/Client_testimonial_avatar_young_ea49000b.png";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  //todo: remove mock functionality
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Manager",
      company: "Tech Solutions Inc.",
      content: "Rita's coaching helped me navigate a critical career transition. Her insights on emotional intelligence transformed how I lead my team. Within 6 months, I received a promotion to Director level.",
      image: avatarMale,
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Product Lead",
      company: "Innovation Labs",
      content: "The leadership workshop was eye-opening. Rita's practical approach to handling workplace challenges gave me tools I use daily. My confidence in decision-making has grown tremendously.",
      image: avatarFemale,
    },
    {
      id: 3,
      name: "Ananya Patel",
      role: "Marketing Executive",
      company: "Brand Dynamics",
      content: "I was stuck in my career for years. Rita's one-on-one sessions helped me identify my strengths and create a clear roadmap. I've since switched to my dream role and couldn't be happier.",
      image: avatarYoung,
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="relative max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <CardContent className="p-0">
              <Quote className="h-12 w-12 text-primary mb-6" />
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed" data-testid="text-testimonial-content">
                "{testimonials[currentIndex].content}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="h-16 w-16 rounded-full object-cover"
                  data-testid="img-testimonial-avatar"
                />
                <div>
                  <div className="font-semibold text-foreground" data-testid="text-testimonial-name">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid="text-testimonial-role">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
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
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
