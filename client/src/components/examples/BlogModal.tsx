import { useState } from 'react'
import BlogModal from '../BlogModal'
import { Button } from '@/components/ui/button'
import leadershipImage from "@assets/generated_images/Leadership_blog_featured_image_8bd085f0.png";

export default function BlogModalExample() {
  const [isOpen, setIsOpen] = useState(false)
  
  const samplePost = {
    id: 1,
    title: "5 Essential Leadership Skills for 2025",
    excerpt: "Discover the key competencies every leader needs to thrive in today's rapidly changing business landscape.",
    content: "Leadership in 2025 requires a unique blend of traditional wisdom and modern adaptability. Here are the five essential skills every leader must cultivate:\n\n1. Adaptive Intelligence\n2. Digital Literacy\n3. Emotional Intelligence\n4. Strategic Communication\n5. Inclusive Decision-Making",
    category: "Leadership",
    date: "Jan 15, 2025",
    image: leadershipImage,
    readTime: "5 min read",
  }

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>Open Blog Modal</Button>
      <BlogModal 
        post={isOpen ? samplePost : null} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  )
}
