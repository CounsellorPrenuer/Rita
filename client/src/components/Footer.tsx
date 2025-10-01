import { Button } from "@/components/ui/button";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { SiX } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-4">
              Fast Track <span className="text-primary">360</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering professionals to achieve their career goals through expert coaching and training.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("about")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-about"
              >
                About Rita
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-testimonials"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-blog"
              >
                Blog
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Services</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Career Guidance</div>
              <div>Leadership Workshops</div>
              <div>Corporate Training</div>
              <div>1-on-1 Coaching</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open("https://linkedin.com", "_blank")}
                data-testid="footer-button-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open("https://facebook.com", "_blank")}
                data-testid="footer-button-facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open("https://instagram.com", "_blank")}
                data-testid="footer-button-instagram"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open("https://twitter.com", "_blank")}
                data-testid="footer-button-twitter"
              >
                <SiX className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>rita@fasttrack360.com</div>
              <div>+91 98765 43210</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Fast Track 360 Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
