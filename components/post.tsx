import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PostProps {
  post: {
    id: number
    author: {
      name: string
      avatar: string
      username: string
    }
    content: string
    image?: string
    timestamp: string
    likes: number
    comments: number
    shares: number
  }
}

export function Post({ post }: PostProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Hide post</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="mb-3">{post.content}</p>

        {post.image && (
          <div className="mb-3">
            <Image
              src={post.image || "/placeholder.svg"}
              alt="Post image"
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{post.likes} likes</span>
          <div className="space-x-2">
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        <hr className="mb-3" />

        <div className="flex justify-between">
          <Button variant="ghost" className="flex-1 justify-center">
            <Heart className="h-5 w-5 mr-2" />
            Like
          </Button>
          <Button variant="ghost" className="flex-1 justify-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" className="flex-1 justify-center">
            <Share className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
