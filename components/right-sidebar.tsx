import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RightSidebar() {
  const suggestions = [
    { name: "Alex Thompson", mutualFriends: 12, avatar: "/placeholder-user.jpg" },
    { name: "Maria Garcia", mutualFriends: 8, avatar: "/placeholder-user.jpg" },
    { name: "David Kim", mutualFriends: 15, avatar: "/placeholder-user.jpg" },
  ]

  const onlineFriends = [
    { name: "Emma Wilson", avatar: "/placeholder-user.jpg" },
    { name: "James Brown", avatar: "/placeholder-user.jpg" },
    { name: "Lisa Davis", avatar: "/placeholder-user.jpg" },
    { name: "Tom Miller", avatar: "/placeholder-user.jpg" },
  ]

  return (
    <aside className="hidden xl:block w-80 p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">People you may know</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((person, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.mutualFriends} mutual friends</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Add
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {onlineFriends.map((friend, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                  <AvatarFallback>
                    {friend.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <p className="text-sm font-medium">{friend.name}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  )
}
