"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, Plus, Settings, Globe, Lock, Eye } from "lucide-react"
import Image from "next/image"

interface Group {
  id: string
  name: string
  description: string
  members: number
  posts: number
  privacy: "public" | "private" | "secret"
  image: string
  joined: boolean
  admin?: boolean
}

export function GroupsInterface() {
  const [searchQuery, setSearchQuery] = useState("")

  const myGroups: Group[] = [
    {
      id: "1",
      name: "React Developers",
      description: "A community for React developers to share knowledge and help each other",
      members: 15420,
      posts: 234,
      privacy: "public",
      image: "/placeholder.svg?height=200&width=200",
      joined: true,
      admin: true,
    },
    {
      id: "2",
      name: "Next.js Community",
      description: "Everything about Next.js framework",
      members: 8930,
      posts: 156,
      privacy: "public",
      image: "/placeholder.svg?height=200&width=200",
      joined: true,
    },
    {
      id: "3",
      name: "UI/UX Designers",
      description: "Design inspiration and feedback",
      members: 5670,
      posts: 89,
      privacy: "private",
      image: "/placeholder.svg?height=200&width=200",
      joined: true,
    },
  ]

  const suggestedGroups: Group[] = [
    {
      id: "4",
      name: "JavaScript Enthusiasts",
      description: "All things JavaScript",
      members: 12340,
      posts: 445,
      privacy: "public",
      image: "/placeholder.svg?height=200&width=200",
      joined: false,
    },
    {
      id: "5",
      name: "Web Development Tips",
      description: "Tips and tricks for web developers",
      members: 9870,
      posts: 267,
      privacy: "public",
      image: "/placeholder.svg?height=200&width=200",
      joined: false,
    },
    {
      id: "6",
      name: "Startup Founders",
      description: "Connect with fellow entrepreneurs",
      members: 3450,
      posts: 123,
      privacy: "private",
      image: "/placeholder.svg?height=200&width=200",
      joined: false,
    },
  ]

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "private":
        return <Lock className="h-4 w-4" />
      case "secret":
        return <Eye className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getPrivacyColor = (privacy: string) => {
    switch (privacy) {
      case "public":
        return "text-green-600"
      case "private":
        return "text-orange-600"
      case "secret":
        return "text-red-600"
      default:
        return "text-green-600"
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search groups"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="your-groups" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="your-groups">Your Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>

        <TabsContent value="your-groups" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGroups.map((group) => (
              <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src={group.image || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
                  {group.admin && (
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      Admin
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <div className={`flex items-center ${getPrivacyColor(group.privacy)}`}>
                      {getPrivacyIcon(group.privacy)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{group.members.toLocaleString()} members</span>
                    <span>{group.posts} posts today</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1" size="sm">
                      View Group
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Suggested for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedGroups.map((group) => (
                <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-32">
                    <Image src={group.image || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{group.name}</h3>
                      <div className={`flex items-center ${getPrivacyColor(group.privacy)}`}>
                        {getPrivacyIcon(group.privacy)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{group.members.toLocaleString()} members</span>
                      <span>{group.posts} posts today</span>
                    </div>
                    <Button className="w-full" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="invites" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No group invites</h3>
            <p className="text-gray-500">When someone invites you to join a group, you'll see it here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
