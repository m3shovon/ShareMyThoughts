"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { LeftSidebar } from "@/components/layout/left-sidebar"
import { CreatePostModal } from "@/components/create-post-modal"
import { EnhancedPost } from "@/components/enhanced-post"
import { RecentPostsSidebar } from "@/components/recent-posts-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Waves } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"

export default function EventsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentFilter, setCurrentFilter] = useState("recent")

  const fetchPosts = async () => {
    try {
      const response = await apiClient.getPosts()
      const postsData = response.results || response
      setPosts(postsData)
      setFilteredPosts(postsData)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    filterPosts(query, currentFilter)
  }

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter)
    filterPosts(searchQuery, filter)
  }

  const filterPosts = (query: string, filter: string) => {
    let filtered = [...posts]

    // Apply search filter
    if (query.trim()) {
      filtered = filtered.filter(
        (post: any) =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.author.first_name.toLowerCase().includes(query.toLowerCase()) ||
          post.author.last_name.toLowerCase().includes(query.toLowerCase()) ||
          post.author.username.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply sort filter
    switch (filter) {
      case "recent":
        filtered.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "popular":
        filtered.sort((a: any, b: any) => b.likes_count - a.likes_count)
        break
      case "trending":
        filtered.sort(
          (a: any, b: any) =>
            b.likes_count + b.comments_count + b.shares_count - (a.likes_count + a.comments_count + a.shares_count),
        )
        break
      case "following":
        // For now, show all posts. In a real app, you'd filter by followed users
        break
      default:
        break
    }

    setFilteredPosts(filtered)
  }

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }
    if (user) {
      fetchPosts()
    }
  }, [user, isLoading, router])

  useEffect(() => {
    filterPosts(searchQuery, currentFilter)
  }, [posts])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto flex gap-6 p-4">
        {/* Left Sidebar */}
        <LeftSidebar
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          currentFilter={currentFilter}
        />

        {/* Main Content */}
        <div className="flex-1 max-w-2xl space-y-6">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-blue-500 border-none">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Waves className="h-8 w-8 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Welcome to Events Feed</h1>
                  <p className="text-blue-100">Share your thoughts and connect with others</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Post */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <CreatePostModal
                onPostCreated={fetchPosts}
                trigger={
                  <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                    <Plus className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300">What's on your mind, {user.first_name}?</span>
                  </div>
                }
              />
            </CardContent>
          </Card>

          {/* Posts Feed */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-32"></div>
                        <div className="h-3 bg-gray-700 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Waves className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchQuery ? "No posts found" : "No posts yet"}
                </h3>
                <p className="text-gray-400">
                  {searchQuery
                    ? `No posts match "${searchQuery}". Try a different search term.`
                    : "Be the first to share something amazing!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post: any) => (
                <EnhancedPost key={post.id} post={post} onUpdate={fetchPosts} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 space-y-4">
          <RecentPostsSidebar />
        </div>
      </div>
    </div>
  )
}
