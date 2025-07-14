"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreatePostModal } from "@/components/create-post-modal"
import { EnhancedPost } from "@/components/enhanced-post"
import { RecentPostsSidebar } from "@/components/recent-posts-sidebar"
import { Camera, MapPin, Calendar, UserPlus, MessageCircle } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user: currentUser, isLoading } = useAuth()
  const userId = Number.parseInt(params.userId as string)

  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      const profileData = await apiClient.getUserProfile(userId)
      setProfile(profileData)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const fetchUserPosts = async () => {
    try {
      const response = await apiClient.getUserPosts(userId)
      setPosts(response.results || response)
    } catch (error) {
      console.error("Error fetching user posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login")
      return
    }
    if (currentUser) {
      fetchProfile()
      fetchUserPosts()
    }
  }, [userId, currentUser, isLoading, router])

  const isOwnProfile = currentUser?.id === userId

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-80 bg-gray-800 rounded-b-lg"></div>
            <div className="px-6 pb-6">
              <div className="flex items-end space-x-6">
                <div className="h-40 w-40 bg-gray-800 rounded-full -mt-20"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-8 bg-gray-800 rounded w-48"></div>
                  <div className="h-4 bg-gray-800 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Main Profile Content */}
        <div className="flex-1 max-w-4xl">
          {/* Cover Photo */}
          <div className="relative h-80 bg-gradient-to-r from-purple-600 to-pink-600 rounded-b-lg overflow-hidden">
            {profile?.cover_photo ? (
              <Image
                src={`http://localhost:8000${profile.cover_photo}`}
                alt="Cover photo"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
            )}
            {isOwnProfile && (
              <Button
                variant="secondary"
                className="absolute bottom-4 right-4 bg-gray-800 text-white hover:bg-gray-700"
              >
                <Camera className="h-4 w-4 mr-2" />
                Edit Cover Photo
              </Button>
            )}
          </div>

          {/* Profile Header */}
          <div className="bg-gray-800 px-6 pb-6 border-b border-gray-700">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Profile Picture */}
              <div className="relative -mt-20 mb-4 md:mb-0">
                <Avatar className="h-40 w-40 border-4 border-gray-800">
                  <AvatarImage
                    src={profile?.avatar ? `http://localhost:8000${profile.avatar}` : "/placeholder-user.jpg"}
                    alt={profile?.user?.username}
                  />
                  <AvatarFallback className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {profile?.user?.first_name?.[0]}
                    {profile?.user?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-2 right-2 rounded-full bg-gray-700 hover:bg-gray-600"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white">
                  {profile?.user?.first_name} {profile?.user?.last_name}
                </h1>
                <p className="text-gray-400 mb-2">@{profile?.user?.username}</p>
                {profile?.bio && <p className="text-gray-300 mb-4">{profile.bio}</p>}

                {/* Profile Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  {profile?.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.location}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(profile?.user?.date_joined).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {isOwnProfile ? (
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Follow
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mt-6 space-y-4">
            {isOwnProfile && (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <CreatePostModal
                    onPostCreated={fetchUserPosts}
                    trigger={
                      <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                        <Avatar className="h-10 w-10 border border-purple-500">
                          <AvatarImage src="/placeholder-user.jpg" alt={currentUser?.username} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {currentUser?.first_name?.[0]}
                            {currentUser?.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-gray-300">What's on your mind, {profile?.user?.first_name}?</span>
                      </div>
                    }
                  />
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {posts.map((post: any) => (
                <EnhancedPost key={post.id} post={post} onUpdate={fetchUserPosts} />
              ))}
            </div>

            {posts.length === 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400">
                    <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
                    {isOwnProfile ? (
                      <p className="text-gray-400">Share your first post to get started!</p>
                    ) : (
                      <p className="text-gray-400">{profile?.user?.first_name} hasn't posted anything yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 space-y-4 mt-6">
          <RecentPostsSidebar />
        </div>
      </div>
    </div>
  )
}
