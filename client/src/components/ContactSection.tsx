import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { SiX } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/workerApi";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/platform";
import { insertContactSchema, type InsertContact } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: InsertContact) => {
    setIsSubmitting(true);
    try {
      await submitLead(data);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error: unknown) {
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Contact from ${data.name}`)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`)}`;
      window.location.href = mailto;
      const message = error instanceof Error ? error.message : "Fallback to mail app has been triggered.";
      toast({ title: "Email Draft Opened", description: message });
    } finally {
      setIsSubmitting(false);
    }
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your Email" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your Phone Number" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your goals and how we can help..."
                            rows={5}
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
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
                    <a href={`tel:${CONTACT_PHONE}`} className="text-muted-foreground hover:text-primary transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3" data-testid="contact-email">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3" data-testid="contact-location">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-muted-foreground">Mumbai, Maharashtra, India</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Follow Us</CardTitle>
                <CardDescription>Connect with us on social media for insights and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" onClick={() => window.open("https://linkedin.com", "_blank")} data-testid="button-linkedin">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => window.open("https://facebook.com", "_blank")} data-testid="button-facebook">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => window.open("https://instagram.com", "_blank")} data-testid="button-instagram">
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => window.open("https://twitter.com", "_blank")} data-testid="button-twitter">
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
