import { Search, Home, Users, MessageCircle, Bell, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-600">facebook</div>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search Facebook" className="pl-10 w-64 bg-gray-100 border-none" />
            </div>
          </div>

          {/* Center navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="lg" className="text-blue-600">
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="lg">
              <Users className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="lg">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="lg">
              <Bell className="h-6 w-6" />
            </Button>
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  John Doe
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings & Privacy</DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
                <DropdownMenuItem>Display & Accessibility</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
