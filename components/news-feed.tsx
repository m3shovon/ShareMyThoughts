import { CreatePost } from "@/components/create-post"
import { Post } from "@/components/post"

export function NewsFeed() {
  const posts = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder-user.jpg",
        username: "sarah.johnson",
      },
      content:
        "Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. 🏔️✨",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
    },
    {
      id: 2,
      author: {
        name: "Mike Chen",
        avatar: "/placeholder-user.jpg",
        username: "mike.chen",
      },
      content:
        "Excited to share that I just launched my new portfolio website! It's built with Next.js and Tailwind CSS. Check it out and let me know what you think! 🚀",
      timestamp: "4 hours ago",
      likes: 42,
      comments: 15,
      shares: 7,
    },
    {
      id: 3,
      author: {
        name: "Emily Rodriguez",
        avatar: "/placeholder-user.jpg",
        username: "emily.rodriguez",
      },
      content:
        "Coffee and code - the perfect combination for a productive morning! Working on some exciting new features today. ☕💻",
      image: "/placeholder.svg?height=300&width=500",
      timestamp: "6 hours ago",
      likes: 18,
      comments: 5,
      shares: 2,
    },
  ]

  return (
    <main className="flex-1 max-w-2xl mx-auto p-4 space-y-4">
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  )
}
