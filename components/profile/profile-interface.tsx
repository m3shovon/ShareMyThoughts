"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Camera,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Calendar,
  MoreHorizontal,
  MessageCircle,
  UserPlus,
} from "lucide-react"
import Image from "next/image"
import { Post } from "@/components/post"

export function ProfileInterface() {
  const [activeTab, setActiveTab] = useState("posts")

  const profileData = {
    name: "John Doe",
    username: "john.doe",
    bio: "Software Developer | React Enthusiast | Coffee Lover ☕",
    location: "San Francisco, CA",
    work: "Senior Developer at Tech Corp",
    education: "Computer Science at Stanford University",
    relationship: "Single",
    joined: "Joined March 2020",
    friends: 1247,
    photos: 89,
    coverPhoto: "/placeholder.svg?height=400&width=1200",
    profilePhoto: "/placeholder-user.jpg",
  }

  const userPosts = [
    {
      id: 1,
      author: {
        name: "John Doe",
        avatar: "/placeholder-user.jpg",
        username: "john.doe",
      },
      content:
        "Just deployed my latest project! Excited to share it with everyone. Built with Next.js and TypeScript 🚀",
      image: "/placeholder.svg?height=300&width=500",
      timestamp: "3 hours ago",
      likes: 45,
      comments: 12,
      shares: 8,
    },
    {
      id: 2,
      author: {
        name: "John Doe",
        avatar: "/placeholder-user.jpg",
        username: "john.doe",
      },
      content:
        "Beautiful sunset from my office window today. Sometimes you need to pause and appreciate the little things in life 🌅",
      timestamp: "1 day ago",
      likes: 32,
      comments: 6,
      shares: 3,
    },
  ]

  const photos = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    url: `/placeholder.svg?height=200&width=200&text=Photo${i + 1}`,
    alt: `Photo ${i + 1}`,
  }))

  const friends = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Friend ${i + 1}`,
    avatar: "/placeholder-user.jpg",
    mutualFriends: Math.floor(Math.random() * 50) + 1,
  }))

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Cover Photo */}
      <div className="relative h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-b-lg overflow-hidden">
        <Image src={profileData.coverPhoto || "/placeholder.svg"} alt="Cover photo" fill className="object-cover" />
        <Button variant="secondary" className="absolute bottom-4 right-4">
          <Camera className="h-4 w-4 mr-2" />
          Edit Cover Photo
        </Button>
      </div>

      {/* Profile Header */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
          {/* Profile Picture */}
          <div className="relative -mt-20 mb-4 md:mb-0">
            <Avatar className="h-40 w-40 border-4 border-white">
              <AvatarImage src={profileData.profilePhoto || "/placeholder.svg"} alt={profileData.name} />
              <AvatarFallback className="text-4xl">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 rounded-full">
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{profileData.name}</h1>
            <p className="text-gray-600 mb-2">{profileData.bio}</p>
            <p className="text-gray-500 mb-4">{profileData.friends} friends</p>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Friend
              </Button>
              <Button variant="secondary">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="secondary" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none">
            <TabsTrigger value="posts" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Posts
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              About
            </TabsTrigger>
            <TabsTrigger value="friends" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Friends
            </TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Photos
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="posts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {userPosts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Intro</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{profileData.work}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{profileData.education}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{profileData.joined}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Work and Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Senior Developer</p>
                        <p className="text-sm text-gray-500">at Tech Corp</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Stanford University</p>
                        <p className="text-sm text-gray-500">Computer Science</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Basic Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-gray-500" />
                      <span>{profileData.relationship}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span>{profileData.joined}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="friends">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Friends ({profileData.friends})</h2>
                  <Button variant="outline">Find Friends</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {friends.map((friend) => (
                    <Card key={friend.id} className="text-center">
                      <CardContent className="p-4">
                        <Avatar className="h-20 w-20 mx-auto mb-3">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                          <AvatarFallback>
                            {friend.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">{friend.name}</h3>
                        <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photos">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Photos ({profileData.photos})</h2>
                  <Button variant="outline">Add Photos</Button>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {photos.map((photo) => (
                    <div key={photo.id} className="aspect-square relative rounded-lg overflow-hidden">
                      <Image
                        src={photo.url || "/placeholder.svg"}
                        alt={photo.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
