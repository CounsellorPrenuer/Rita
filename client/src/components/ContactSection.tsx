import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { SiX } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4" data-testid="badge-contact">
            Get in Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Let's Start Your Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your career? Reach out and let's discuss how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your goals and how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    data-testid="textarea-message"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-submit">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3" data-testid="contact-phone">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium text-foreground">Phone</div>
                    <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3" data-testid="contact-email">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <a href="mailto:rita@fasttrack360.com" className="text-muted-foreground hover:text-primary transition-colors">
                      rita@fasttrack360.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3" data-testid="contact-location">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-muted-foreground">
                      Mumbai, Maharashtra, India
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Follow Us</CardTitle>
                <CardDescription>
                  Connect with us on social media for insights and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open("https://linkedin.com", "_blank")}
                    data-testid="button-linkedin"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open("https://facebook.com", "_blank")}
                    data-testid="button-facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open("https://instagram.com", "_blank")}
                    data-testid="button-instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open("https://twitter.com", "_blank")}
                    data-testid="button-twitter"
                  >
                    <SiX className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
