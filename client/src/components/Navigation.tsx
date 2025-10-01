import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/image_1759324735001.png";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover-elevate px-2 py-1 rounded-md"
              data-testid="link-logo"
            >
              <img
                src={logoImage}
                alt="Fast Track Consulting"
                className="h-10 w-auto"
              />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("about")}
              data-testid="link-about"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("services")}
              data-testid="link-services"
            >
              Services
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("testimonials")}
              data-testid="link-testimonials"
            >
              Testimonials
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("blog")}
              data-testid="link-blog"
            >
              Blog
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact")}
              data-testid="link-contact"
            >
              Contact
            </Button>
            <Button
              variant="default"
              onClick={() => console.log("Book Free Call clicked")}
              data-testid="button-book-call"
            >
              Book Free Call
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("about")}
              data-testid="link-about-mobile"
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("services")}
              data-testid="link-services-mobile"
            >
              Services
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("testimonials")}
              data-testid="link-testimonials-mobile"
            >
              Testimonials
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("blog")}
              data-testid="link-blog-mobile"
            >
              Blog
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("contact")}
              data-testid="link-contact-mobile"
            >
              Contact
            </Button>
            <Button
              variant="default"
              className="w-full"
              onClick={() => console.log("Book Free Call clicked")}
              data-testid="button-book-call-mobile"
            >
              Book Free Call
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
