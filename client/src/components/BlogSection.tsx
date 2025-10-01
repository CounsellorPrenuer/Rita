import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import BlogModal from "./BlogModal";
import leadershipImage from "@assets/generated_images/Leadership_blog_featured_image_8bd085f0.png";
import careerGrowthImage from "@assets/generated_images/Career_growth_blog_image_9c3b8354.png";
import emotionalIntelligenceImage from "@assets/generated_images/Emotional_intelligence_blog_image_e6df2a03.png";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  //todo: remove mock functionality
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "5 Essential Leadership Skills for 2025",
      excerpt: "Discover the key competencies every leader needs to thrive in today's rapidly changing business landscape.",
      content: `Leadership in 2025 requires a unique blend of traditional wisdom and modern adaptability. Here are the five essential skills every leader must cultivate:\n\n1. Adaptive Intelligence: The ability to quickly pivot strategies based on changing circumstances while maintaining team morale.\n\n2. Digital Literacy: Understanding technology's role in business operations, even if you're not a technical expert.\n\n3. Emotional Intelligence: Reading the room, understanding team dynamics, and responding with empathy.\n\n4. Strategic Communication: Conveying complex ideas simply and inspiring action through words.\n\n5. Inclusive Decision-Making: Creating environments where diverse perspectives are valued and integrated.\n\nThese skills aren't innate - they're developed through practice, feedback, and continuous learning.`,
      category: "Leadership",
      date: "Jan 15, 2025",
      image: leadershipImage,
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Navigating Career Transitions with Confidence",
      excerpt: "A practical guide to making successful career changes without compromising your professional growth.",
      content: `Career transitions can be daunting, but with the right approach, they become opportunities for growth. Here's your roadmap:\n\nAssess Your Current Position: Take stock of your skills, achievements, and what truly motivates you. This clarity forms the foundation of any successful transition.\n\nIdentify Your Target: Research roles and industries that align with your strengths and interests. Don't just chase titles - seek opportunities that energize you.\n\nBridge the Gap: Identify skills you need to develop and create a learning plan. Online courses, certifications, and mentorship can accelerate your readiness.\n\nNetwork Strategically: Connect with professionals in your target field. Informational interviews are invaluable for understanding the real day-to-day of a role.\n\nCraft Your Narrative: Your career story should highlight transferable skills and demonstrate clear motivation for the change.\n\nRemember: Career transitions take time. Patience and persistence are your allies.`,
      category: "Career Development",
      date: "Jan 10, 2025",
      image: careerGrowthImage,
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "The Power of Emotional Intelligence in the Workplace",
      excerpt: "Learn how developing your EQ can transform your professional relationships and career trajectory.",
      content: `Emotional Intelligence (EQ) is no longer a nice-to-have - it's a must-have for professional success. Here's why:\n\nSelf-Awareness: Understanding your emotions helps you recognize triggers and respond rather than react. This leads to better decision-making under pressure.\n\nSelf-Regulation: Managing your emotions means you can stay calm in crises, think clearly, and maintain professional composure.\n\nMotivation: High EQ individuals maintain drive despite setbacks. They find meaning in their work beyond external rewards.\n\nEmpathy: Understanding others' perspectives builds trust and strengthens relationships. This is crucial for leadership and collaboration.\n\nSocial Skills: Effective communication, conflict resolution, and relationship building all stem from emotional intelligence.\n\nThe good news? EQ can be developed. Start by:\n- Practicing mindfulness\n- Seeking feedback regularly\n- Reflecting on your interactions\n- Reading emotional cues in conversations\n- Managing stress proactively\n\nYour EQ is your career superpower. Invest in it.`,
      category: "Emotional Intelligence",
      date: "Jan 5, 2025",
      image: emotionalIntelligenceImage,
      readTime: "6 min read",
    },
  ];

  return (
    <>
      <section id="blog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4" data-testid="badge-blog">
              Insights & Articles
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Latest from the Blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Practical insights on career development, leadership, and professional growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className="hover-elevate flex flex-col overflow-hidden"
                data-testid={`card-blog-${index}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4">{post.category}</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl font-heading line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedPost(post)}
                    className="w-full justify-between group"
                    data-testid={`button-read-more-${index}`}
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
}
