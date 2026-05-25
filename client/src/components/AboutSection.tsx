import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { urlFor } from "@/lib/sanityImage";
import fallbackAbout from "@assets/generated_images/Rita_conducting_workshop_session_5f68a2ef.png";

export default function AboutSection() {
  const { data: settings } = useSiteSettings();
  const aboutSrc = urlFor(settings?.aboutImage, { width: 1000 }) ?? fallbackAbout;

  const credentials = [
    "ICF Certified Professional Coach (PCC)",
    "Emotional Intelligence Trainer (EQ-i 2.0)",
    "MBA in Human Resources",
    "Certified Facilitator - Leadership Development",
  ];

  return (
    <section id="about" className="py-20 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4" data-testid="badge-about">
            About Rita D'Souza
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Your Partner in Professional Growth
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            With over 15 years of experience in leadership coaching and emotional intelligence training,
            Rita D'Souza has helped hundreds of professionals unlock their potential.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl" />
            <img
              src={aboutSrc}
              alt={settings?.aboutImage?.alt || "Rita D'Souza conducting workshop"}
              className="relative rounded-2xl w-full h-auto object-cover shadow-lg border-2 border-primary/10"
              data-testid="img-about-workshop"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Experience That Makes a Difference
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Rita specializes in helping mid to senior-level professionals navigate career transitions,
                develop leadership skills, and enhance their emotional intelligence to create lasting impact
                in their organizations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Her approach combines evidence-based coaching methodologies with practical insights gained
                from working with Fortune 500 companies, startups, and individual professionals across
                diverse industries.
              </p>
            </div>

            <Card className="p-6 border-2 shadow-md">
              <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
                Certifications & Credentials
              </h4>
              <div className="space-y-3">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`credential-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{credential}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
