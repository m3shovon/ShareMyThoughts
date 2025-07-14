import { Home, Users, Bookmark, Clock, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-80 p-4 h-screen sticky top-14 overflow-y-auto">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start h-12 px-3">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          John Doe
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12 px-3">
          <Home className="h-6 w-6 mr-3 text-blue-600" />
          Home
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12 px-3">
          <Users className="h-6 w-6 mr-3 text-blue-600" />
          Friends
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12 px-3">
          <Bookmark className="h-6 w-6 mr-3 text-purple-600" />
          Saved
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12 px-3">
          <Clock className="h-6 w-6 mr-3 text-blue-600" />
          Memories
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12 px-3">
          <ChevronDown className="h-5 w-5 mr-3" />
          See more
        </Button>
      </nav>

      <hr className="my-4" />

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-600 px-3">Your shortcuts</h3>
        <Button variant="ghost" className="w-full justify-start h-10 px-3">
          <div className="w-6 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
            R
          </div>
          React Developers
        </Button>
        <Button variant="ghost" className="w-full justify-start h-10 px-3">
          <div className="w-6 h-6 bg-green-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
            N
          </div>
          Next.js Community
        </Button>
      </div>
    </aside>
  )
}
