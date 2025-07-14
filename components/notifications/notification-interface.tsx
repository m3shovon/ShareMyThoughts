"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, UserPlus, Calendar, Gift, Settings, MoreHorizontal } from "lucide-react"

interface Notification {
  id: string
  type: "like" | "comment" | "friend_request" | "birthday" | "event" | "memory"
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  read: boolean
  actionable?: boolean
}

export function NotificationInterface() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "like",
      user: { name: "Sarah Johnson", avatar: "/placeholder-user.jpg" },
      content: "liked your photo",
      timestamp: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "comment",
      user: { name: "Mike Chen", avatar: "/placeholder-user.jpg" },
      content: "commented on your post: 'Great work on the project!'",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "friend_request",
      user: { name: "Emily Rodriguez", avatar: "/placeholder-user.jpg" },
      content: "sent you a friend request",
      timestamp: "2 hours ago",
      read: false,
      actionable: true,
    },
    {
      id: "4",
      type: "birthday",
      user: { name: "Alex Thompson", avatar: "/placeholder-user.jpg" },
      content: "has a birthday today",
      timestamp: "3 hours ago",
      read: true,
    },
    {
      id: "5",
      type: "like",
      user: { name: "Lisa Davis", avatar: "/placeholder-user.jpg" },
      content: "and 12 others liked your post",
      timestamp: "5 hours ago",
      read: true,
    },
    {
      id: "6",
      type: "event",
      user: { name: "Tech Meetup Group", avatar: "/placeholder-user.jpg" },
      content: "invited you to 'React Conference 2024'",
      timestamp: "1 day ago",
      read: true,
      actionable: true,
    },
    {
      id: "7",
      type: "memory",
      user: { name: "Facebook", avatar: "/placeholder-user.jpg" },
      content: "You have 3 memories to look back on today",
      timestamp: "2 days ago",
      read: true,
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "friend_request":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "birthday":
        return <Gift className="h-4 w-4 text-purple-500" />
      case "event":
        return <Calendar className="h-4 w-4 text-orange-500" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="max-w-2xl mx-auto bg-white">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-2xl">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-2 mt-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? "bg-blue-50 border-l-4 border-blue-500" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                      <AvatarFallback>
                        {notification.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">{notification.user.name}</span> {notification.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>

                    {notification.actionable && (
                      <div className="flex space-x-2 mt-2">
                        {notification.type === "friend_request" && (
                          <>
                            <Button size="sm" className="h-8">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 bg-transparent">
                              Decline
                            </Button>
                          </>
                        )}
                        {notification.type === "event" && (
                          <>
                            <Button size="sm" className="h-8">
                              Going
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 bg-transparent">
                              Maybe
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 bg-transparent">
                              Can't Go
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="unread" className="space-y-2 mt-4">
              {notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border-l-4 border-blue-500 hover:bg-blue-100 cursor-pointer"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={notification.user.avatar || "/placeholder.svg"}
                          alt={notification.user.name}
                        />
                        <AvatarFallback>
                          {notification.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-semibold">{notification.user.name}</span> {notification.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>

                      {notification.actionable && (
                        <div className="flex space-x-2 mt-2">
                          {notification.type === "friend_request" && (
                            <>
                              <Button size="sm" className="h-8">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 bg-transparent">
                                Decline
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="mentions" className="space-y-2 mt-4">
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No mentions yet</p>
                <p className="text-sm">When someone mentions you in a post or comment, you'll see it here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
