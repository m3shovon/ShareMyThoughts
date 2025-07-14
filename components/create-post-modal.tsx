"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, X, Sparkles } from "lucide-react"
import { TextEditor } from "./text-editor"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

interface CreatePostModalProps {
  onPostCreated?: () => void
  trigger?: React.ReactNode
}

export function CreatePostModal({ onPostCreated, trigger }: CreatePostModalProps) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async () => {
    if (!content.trim() && !image) return

    setIsLoading(true)
    try {
      await apiClient.createPost(content, image || undefined)
      setContent("")
      setImage(null)
      setImagePreview(null)
      setOpen(false)
      onPostCreated?.()
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 transform hover:scale-105">
            <Sparkles className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span>Create Post</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="border-2 border-purple-500">
              <AvatarImage src="/placeholder-user.jpg" alt={user?.username} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm text-gray-400">@{user?.username}</p>
            </div>
          </div>

          <TextEditor value={content} onChange={setContent} placeholder="What's on your mind?" />

          {imagePreview && (
            <div className="relative">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                width={500}
                height={300}
                className="w-full h-64 object-cover rounded-lg border border-gray-700"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <ImageIcon className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-white">Add Photo</span>
                </div>
              </Label>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={(!content.trim() && !image) || isLoading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Posting...</span>
                  </div>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
