"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share, MoreHorizontal, Send, Expand } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ImageModal } from "@/components/image-modal"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

interface PostProps {
  post: {
    id: number
    author: {
      id: number
      username: string
      first_name: string
      last_name: string
    }
    content: string
    image?: string
    created_at: string
    likes_count: number
    comments_count: number
    shares_count: number
    is_liked: boolean
    is_shared: boolean
    comments: Array<{
      id: number
      user: {
        username: string
        first_name: string
        last_name: string
      }
      content: string
      created_at: string
    }>
  }
  onUpdate?: () => void
}

export function EnhancedPost({ post, onUpdate }: PostProps) {
  const { user } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(post.is_liked)
  const [isShared, setIsShared] = useState(post.is_shared)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [sharesCount, setSharesCount] = useState(post.shares_count)
  const [comments, setComments] = useState(post.comments)
  const [showImageModal, setShowImageModal] = useState(false)

  const handleLike = async () => {
    try {
      const response = await apiClient.likePost(post.id)
      setIsLiked(response.liked)
      setLikesCount(response.likes_count)
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const handleShare = async () => {
    try {
      const response = await apiClient.sharePost(post.id)
      setIsShared(response.shared)
      setSharesCount(response.shares_count)
    } catch (error) {
      console.error("Error sharing post:", error)
    }
  }

  const handleComment = async () => {
    if (!newComment.trim()) return

    try {
      const response = await apiClient.createComment(post.id, newComment)
      setComments([...comments, response])
      setNewComment("")
      onUpdate?.()
    } catch (error) {
      console.error("Error creating comment:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <>
      <Card className="bg-gray-800 border-gray-700 animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="border-2 border-blue-500">
                <AvatarImage src="/placeholder-user.jpg" alt={post.author.username} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                  {post.author.first_name?.[0]}
                  {post.author.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white">
                  {post.author.first_name} {post.author.last_name}
                </p>
                <p className="text-sm text-gray-400">
                  @{post.author.username} · {formatDate(post.created_at)}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700" align="end">
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  Save post
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  Hide post
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-gray-700">
                  Report post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div
            className="mb-3 prose prose-sm max-w-none text-gray-200"
            style={{ direction: "ltr", textAlign: "left" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.image && (
            <div className="mb-3 relative group">
              <div className="relative cursor-pointer" onClick={() => setShowImageModal(true)}>
                <Image
                  src={`${post.image}`}
                  alt="Post image"
                  // width={400}
                  // height={200}
                  className="w-[400px] h-[200px] rounded-lg object-cover border border-gray-700 hover:border-blue-500 transition-colors"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-2">
                    <Expand className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <span className="flex items-center space-x-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{likesCount} likes</span>
            </span>
            <div className="space-x-4">
              <span>{comments.length} comments</span>
              <span>{sharesCount} shares</span>
            </div>
          </div>

          <hr className="mb-3 border-gray-700" />

          <div className="flex justify-between mb-3">
            <Button
              variant="ghost"
              className={`flex-1 justify-center transition-all duration-300 ${
                isLiked
                  ? "text-red-500 hover:text-red-400 hover:bg-red-900/20"
                  : "text-gray-400 hover:text-red-400 hover:bg-gray-700"
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
              Like
            </Button>
            <Button
              variant="ghost"
              className="flex-1 justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all duration-300"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Comment
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 justify-center transition-all duration-300 ${
                isShared
                  ? "text-green-500 hover:text-green-400 hover:bg-green-900/20"
                  : "text-gray-400 hover:text-green-400 hover:bg-gray-700"
              }`}
              onClick={handleShare}
            >
              <Share className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>

          {showComments && (
            <div className="space-y-3">
              <hr className="border-gray-700" />

              {/* Comment input */}
              <div className="flex space-x-2">
                <Avatar className="h-8 w-8 border border-blue-500">
                  <AvatarImage src="/placeholder-user.jpg" alt={user?.username} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs">
                    {user?.first_name?.[0]}
                    {user?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleComment()}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                  <Button
                    size="icon"
                    onClick={handleComment}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-500"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-2">
                    <Avatar className="h-8 w-8 border border-blue-500">
                      <AvatarImage src="/placeholder-user.jpg" alt={comment.user.username} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs">
                        {comment.user.first_name?.[0]}
                        {comment.user.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-700 rounded-lg p-3">
                      <p className="font-semibold text-sm text-white">
                        {comment.user.first_name} {comment.user.last_name}
                      </p>
                      <p className="text-sm text-gray-200">{comment.content}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(comment.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Modal */}
      {post.image && (
        <ImageModal
          src={`${post.image}`}
          alt="Post image"
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </>
  )
}
