import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { sanityClient, type BlogPost } from "@/lib/sanity";

const fallbackPosts: BlogPost[] = [
  {
    slug: "career-clarity-leadership",
    title: "Building Career Clarity with Leadership Coaching",
    excerpt: "Practical steps to align your career goals with your strengths.",
    content:
      "Career clarity starts with self-awareness, guided exploration, and intentional decision-making supported by expert mentorship from a certified leadership coach.",
    publishedAt: new Date().toISOString(),
  },
];

export default function BlogSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const { data: posts = fallbackPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["sanity-blogs"],
    queryFn: async () =>
      sanityClient.fetch(
        `*[_type == "blogPost"] | order(publishedAt desc){ "slug": slug.current, title, excerpt, content, publishedAt }`,
      ),
  });

  const displayPosts = posts.length ? posts : fallbackPosts;

  return (
    <section id="blog" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
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

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post, index) => {
              const expanded = openSlug === post.slug;
              return (
                <Card
                  key={post.slug}
                  className="hover-elevate flex flex-col border-2 shadow-md transition-all duration-300"
                  data-testid={`card-blog-${index}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{format(new Date(post.publishedAt), "MMM dd, yyyy")}</span>
                    </div>
                    <CardTitle className="text-xl font-heading line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className={expanded ? "" : "line-clamp-3"}>
                      {expanded ? post.content : post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button
                      variant="ghost"
                      onClick={() => setOpenSlug(expanded ? null : post.slug)}
                      className="w-full justify-between group"
                      data-testid={`button-read-more-${index}`}
                    >
                      {expanded ? "Read Less" : "Read More"}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
