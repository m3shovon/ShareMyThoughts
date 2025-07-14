"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Heart, MessageCircle, Filter, Plus } from "lucide-react"
import Image from "next/image"

interface MarketplaceItem {
  id: string
  title: string
  price: number
  location: string
  seller: {
    name: string
    avatar: string
    rating: number
  }
  images: string[]
  category: string
  condition: "new" | "like-new" | "good" | "fair"
  description: string
  postedAt: string
  saved: boolean
}

export function MarketplaceInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  const items: MarketplaceItem[] = [
    {
      id: "1",
      title: "MacBook Pro 16-inch M2",
      price: 2200,
      location: "San Francisco, CA",
      seller: {
        name: "John Smith",
        avatar: "/placeholder-user.jpg",
        rating: 4.8,
      },
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Electronics",
      condition: "like-new",
      description: "Excellent condition MacBook Pro with M2 chip. Barely used, comes with original box and charger.",
      postedAt: "2 hours ago",
      saved: false,
    },
    {
      id: "2",
      title: "Vintage Leather Sofa",
      price: 800,
      location: "Oakland, CA",
      seller: {
        name: "Sarah Johnson",
        avatar: "/placeholder-user.jpg",
        rating: 4.9,
      },
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Furniture",
      condition: "good",
      description: "Beautiful vintage leather sofa in great condition. Perfect for living room or office.",
      postedAt: "5 hours ago",
      saved: true,
    },
    {
      id: "3",
      title: "iPhone 15 Pro Max",
      price: 1100,
      location: "San Jose, CA",
      seller: {
        name: "Mike Chen",
        avatar: "/placeholder-user.jpg",
        rating: 4.7,
      },
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Electronics",
      condition: "new",
      description: "Brand new iPhone 15 Pro Max, still in sealed box. Unwanted gift.",
      postedAt: "1 day ago",
      saved: false,
    },
    {
      id: "4",
      title: "Mountain Bike - Trek",
      price: 450,
      location: "Berkeley, CA",
      seller: {
        name: "Emily Rodriguez",
        avatar: "/placeholder-user.jpg",
        rating: 4.6,
      },
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Sports",
      condition: "good",
      description: "Trek mountain bike in good condition. Great for trails and city riding.",
      postedAt: "2 days ago",
      saved: false,
    },
  ]

  const categories = [
    "All Categories",
    "Electronics",
    "Furniture",
    "Clothing",
    "Sports",
    "Books",
    "Home & Garden",
    "Automotive",
  ]

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "bg-green-100 text-green-800"
      case "like-new":
        return "bg-blue-100 text-blue-800"
      case "good":
        return "bg-yellow-100 text-yellow-800"
      case "fair":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Sell Something
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search Marketplace"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-100">Under $100</SelectItem>
            <SelectItem value="100-500">$100 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
            <SelectItem value="over-1000">Over $1,000</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative">
              <Image
                src={item.images[0] || "/placeholder.svg"}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                  item.saved ? "text-red-500" : "text-gray-600"
                }`}
              >
                <Heart className={`h-4 w-4 ${item.saved ? "fill-current" : ""}`} />
              </Button>
              <Badge className={`absolute top-2 left-2 ${getConditionColor(item.condition)}`}>
                {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                <span className="font-bold text-lg text-green-600">${item.price.toLocaleString()}</span>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {item.location}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.seller.avatar || "/placeholder.svg"} alt={item.seller.name} />
                    <AvatarFallback>
                      {item.seller.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{item.seller.name}</span>
                  <span className="text-xs text-gray-500">★ {item.seller.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{item.postedAt}</span>
              </div>

              <div className="flex space-x-2 mt-3">
                <Button className="flex-1" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Items
        </Button>
      </div>
    </div>
  )
}
