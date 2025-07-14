"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Heart } from "lucide-react"
import { apiClient } from "@/lib/api"
import Image from "next/image"

interface RecentPost {
  id: number
  author: {
    username: string
    first_name: string
    last_name: string
  }
  content: string
  image?: string
  created_at: string
  likes_count: number
}

export function RecentPostsSidebar() {
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const posts = await apiClient.getRecentPosts()
        setRecentPosts(posts)
      } catch (error) {
        console.error("Error fetching recent posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentPosts()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const stripHtml = (html: string) => {
    const tmp = document.createElement("div")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-400" />
            <span>Recent Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-24"></div>
                </div>
                <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (recentPosts.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-400" />
            <span>Recent Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No recent posts yet</p>
            <p className="text-sm text-gray-500 mt-2">Posts will appear here as they're shared</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg text-white flex items-center space-x-2">
          <Clock className="h-5 w-5 text-purple-400" />
          <span>Recent Posts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="border-b border-gray-700 pb-3 last:border-b-0 hover:bg-gray-700/30 p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Avatar className="h-8 w-8 border border-purple-500">
                <AvatarImage src="/placeholder-user.jpg" alt={post.author.username} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                  {post.author.first_name?.[0]}
                  {post.author.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-white">
                  {post.author.first_name} {post.author.last_name}
                </p>
                <p className="text-xs text-gray-400">{formatDate(post.created_at)}</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-2 line-clamp-2">{stripHtml(post.content)}</p>

            {post.image && (
              <div className="mb-2">
                <Image
                  src={`http://localhost:8000${post.image}`}
                  alt="Post image"
                  width={200}
                  height={120}
                  className="w-full h-20 object-cover rounded border border-gray-600"
                />
              </div>
            )}

            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Heart className="h-3 w-3 text-red-500" />
              <span>{post.likes_count} likes</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
