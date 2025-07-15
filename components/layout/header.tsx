"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Waves, LogOut, User, Settings, Edit } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleProfileClick = () => {
    if (user) {
      router.push(`/profile/${user.id}`)
    }
  }

  const handleEditProfileClick = () => {
    router.push("/profile/edit")
  }

  return (
    <header className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/events")}>
            <Waves className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SocialVibe
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => router.push("/events")}
            >
              Events
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={handleProfileClick}
            >
              Profile
            </Button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-blue-500">
                    <AvatarImage src="/placeholder-user.jpg" alt={user?.username} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                      {user?.first_name?.[0]}
                      {user?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-white">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="w-[200px] truncate text-sm text-gray-400">@{user?.username}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={handleProfileClick}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={handleEditProfileClick}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-gray-700" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
