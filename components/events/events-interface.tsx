"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Search, Plus, Filter } from "lucide-react"
import Image from "next/image"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: {
    name: string
    avatar: string
  }
  attendees: number
  interested: number
  image: string
  category: string
  price: number | "free"
  status: "going" | "interested" | "not-going" | null
}

export function EventsInterface() {
  const [searchQuery, setSearchQuery] = useState("")

  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "React Conference 2024",
      description: "Join us for the biggest React conference of the year with amazing speakers and workshops.",
      date: "2024-03-15",
      time: "9:00 AM",
      location: "San Francisco Convention Center",
      organizer: {
        name: "React Community",
        avatar: "/placeholder-user.jpg",
      },
      attendees: 1250,
      interested: 3400,
      image: "/placeholder.svg?height=200&width=400",
      category: "Technology",
      price: 299,
      status: "going",
    },
    {
      id: "2",
      title: "Local Photography Meetup",
      description: "Monthly meetup for photography enthusiasts. Bring your camera and let's explore the city!",
      date: "2024-02-20",
      time: "2:00 PM",
      location: "Golden Gate Park",
      organizer: {
        name: "SF Photo Group",
        avatar: "/placeholder-user.jpg",
      },
      attendees: 45,
      interested: 120,
      image: "/placeholder.svg?height=200&width=400",
      category: "Photography",
      price: "free",
      status: "interested",
    },
    {
      id: "3",
      title: "Startup Networking Night",
      description: "Connect with fellow entrepreneurs and investors in the Bay Area startup scene.",
      date: "2024-02-25",
      time: "6:00 PM",
      location: "WeWork SOMA",
      organizer: {
        name: "Startup SF",
        avatar: "/placeholder-user.jpg",
      },
      attendees: 180,
      interested: 450,
      image: "/placeholder.svg?height=200&width=400",
      category: "Business",
      price: 25,
      status: null,
    },
  ]

  const myEvents: Event[] = [
    {
      id: "4",
      title: "Team Building Workshop",
      description: "Monthly team building event for our development team.",
      date: "2024-02-18",
      time: "10:00 AM",
      location: "Company Office",
      organizer: {
        name: "HR Team",
        avatar: "/placeholder-user.jpg",
      },
      attendees: 25,
      interested: 5,
      image: "/placeholder.svg?height=200&width=400",
      category: "Work",
      price: "free",
      status: "going",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "going":
        return "bg-green-100 text-green-800"
      case "interested":
        return "bg-blue-100 text-blue-800"
      case "not-going":
        return "bg-red-100 text-red-800"
      default:
        return ""
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="your-events">Your Events</TabsTrigger>
          <TabsTrigger value="going">Going</TabsTrigger>
          <TabsTrigger value="interested">Interested</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  {event.status && (
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        {event.category}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} going · {event.interested} interested
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} alt={event.organizer.name} />
                        <AvatarFallback>
                          {event.organizer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{event.organizer.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-green-600">
                        {event.price === "free" ? "Free" : `$${event.price}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1" size="sm">
                      Going
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      Interested
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="your-events" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <Badge className="absolute top-2 right-2 bg-purple-100 text-purple-800">Organizer</Badge>
                </div>

                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    {event.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} going · {event.interested} interested
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1" size="sm">
                      Edit Event
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="going" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents
              .filter((event) => event.status === "going")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">Going</Badge>
                  </div>

                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {event.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(event.date)} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      View Event Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="interested" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents
              .filter((event) => event.status === "interested")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-800">Interested</Badge>
                  </div>

                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {event.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(event.date)} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1" size="sm">
                        Going
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                        Not Interested
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
