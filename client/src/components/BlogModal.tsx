import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

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

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  if (!post) return null;

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" data-testid="dialog-blog-post">
        <DialogHeader>
          <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4">{post.category}</Badge>
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-heading">
            {post.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="prose prose-sm md:prose-base max-w-none">
          <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          <div className="whitespace-pre-line text-foreground leading-relaxed">
            {post.content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
