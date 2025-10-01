import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import BlogModal from "./BlogModal";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts", { published: true }],
    queryFn: async () => {
      const res = await fetch("/api/blog-posts?published=true");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    },
  });

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

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="hover-elevate flex flex-col overflow-hidden"
                  data-testid={`card-blog-${index}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Badge className="absolute top-4 left-4">{post.category}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(post.createdAt), "MMM dd, yyyy")}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
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
          )}
        </div>
      </section>

      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
}
