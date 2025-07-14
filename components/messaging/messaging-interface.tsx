"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Phone, Video, Info, Smile, ImageIcon, Send } from "lucide-react"

interface Message {
  id: number
  senderId: string
  content: string
  timestamp: string
  type: "text" | "image"
}

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

export function MessagingInterface() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [messageInput, setMessageInput] = useState("")

  const chats: Chat[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      lastMessage: "Hey! How are you doing?",
      timestamp: "2m",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "/placeholder-user.jpg",
      lastMessage: "Thanks for the help with the project!",
      timestamp: "1h",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      avatar: "/placeholder-user.jpg",
      lastMessage: "See you tomorrow!",
      timestamp: "3h",
      unread: 1,
      online: false,
    },
    {
      id: "4",
      name: "React Developers",
      avatar: "/placeholder-user.jpg",
      lastMessage: "John: Anyone know about the new React 19 features?",
      timestamp: "5h",
      unread: 5,
      online: false,
    },
  ]

  const messages: Message[] = [
    {
      id: 1,
      senderId: "sarah",
      content: "Hey! How are you doing?",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: 2,
      senderId: "me",
      content: "I'm doing great! Just working on some new projects. How about you?",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: 3,
      senderId: "sarah",
      content: "That's awesome! I'd love to hear about them sometime.",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: 4,
      senderId: "me",
      content: "Definitely! Let's catch up soon.",
      timestamp: "10:36 AM",
      type: "text",
    },
  ]

  const selectedChatData = chats.find((chat) => chat.id === selectedChat)

  return (
    <div className="flex h-screen bg-white">
      {/* Chat List */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold mb-4">Chats</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search Messenger" className="pl-10 bg-gray-100 border-none" />
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="p-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedChat === chat.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                    <AvatarFallback>
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold truncate">{chat.name}</p>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Window */}
      {selectedChatData ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedChatData.avatar || "/placeholder.svg"} alt={selectedChatData.name} />
                <AvatarFallback>
                  {selectedChatData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-semibold">{selectedChatData.name}</p>
                <p className="text-sm text-gray-500">{selectedChatData.online ? "Active now" : "Active 2h ago"}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.senderId === "me" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  )
}
