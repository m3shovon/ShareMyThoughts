import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageIcon, Smile, MapPin } from "lucide-react"

export function CreatePost() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="Your avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              placeholder="What's on your mind, John?"
              className="border-none bg-gray-100 rounded-full px-4 py-2 text-lg"
            />
          </div>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between">
          <Button variant="ghost" className="flex-1 justify-center">
            <ImageIcon className="h-5 w-5 mr-2 text-green-600" />
            Photo/Video
          </Button>
          <Button variant="ghost" className="flex-1 justify-center">
            <Smile className="h-5 w-5 mr-2 text-yellow-600" />
            Feeling/Activity
          </Button>
          <Button variant="ghost" className="flex-1 justify-center">
            <MapPin className="h-5 w-5 mr-2 text-red-600" />
            Check In
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
