"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, TrendingUp, Clock, Heart, Hash } from "lucide-react"

interface LeftSidebarProps {
  onSearchChange: (query: string) => void
  onFilterChange: (filter: string) => void
  currentFilter: string
}

export function LeftSidebar({ onSearchChange, onFilterChange, currentFilter }: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearchChange(query)
  }

  const filters = [
    { id: "recent", label: "Recent", icon: Clock, description: "Latest posts" },
    { id: "popular", label: "Popular", icon: TrendingUp, description: "Most liked posts" },
    { id: "trending", label: "Trending", icon: Hash, description: "Trending topics" },
    { id: "following", label: "Following", icon: Heart, description: "Posts from people you follow" },
  ]

  const trendingTopics = [
    { tag: "#ReactJS", posts: 1234 },
    { tag: "#WebDev", posts: 856 },
    { tag: "#JavaScript", posts: 743 },
    { tag: "#NextJS", posts: 521 },
    { tag: "#TailwindCSS", posts: 389 },
  ]

  return (
    <div className="w-80 space-y-4">
      {/* Search */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Search className="h-5 w-5 text-blue-400" />
            <span>Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search posts, users..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-400" />
            <span>Filter Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={currentFilter === filter.id ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-300 ${
                currentFilter === filter.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => onFilterChange(filter.id)}
            >
              <filter.icon className="h-4 w-4 mr-3" />
              <div className="text-left">
                <div className="font-medium">{filter.label}</div>
                <div className="text-xs opacity-75">{filter.description}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <span>Trending</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.tag}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-white">{topic.tag}</p>
                  <p className="text-xs text-gray-400">{topic.posts.toLocaleString()} posts</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                Trending
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-500 border-none">
        <CardContent className="p-4">
          <div className="text-center text-white">
            <h3 className="font-bold text-lg mb-2">Your Activity</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-2xl">24</div>
                <div className="opacity-90">Posts</div>
              </div>
              <div>
                <div className="font-semibold text-2xl">156</div>
                <div className="opacity-90">Likes</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
