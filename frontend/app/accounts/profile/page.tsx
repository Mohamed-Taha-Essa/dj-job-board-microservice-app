import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6 my-12">
      <Card className="max- mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-48 h-48">
            <AvatarImage src="https://github.com/shadcn.png" alt="User's avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold">John Doe</CardTitle>
            <CardDescription>Software Developer</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value="John Doe" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value="johndoe123" readOnly />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex">
                  <EnvelopeClosedIcon className="w-4 h-4 mr-2 mt-3" />
                  <Input id="email" type="email" value="john.doe@example.com" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <div className="flex">
                  <CalendarIcon className="w-4 h-4 mr-2 mt-3" />
                  <Input id="joinDate" value="January 15, 2023" readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bio</h3>
            <Textarea 
              placeholder="Tell us about yourself" 
              value="Passionate software developer with 5 years of experience in web technologies. Love to create user-friendly and efficient applications."
              readOnly
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">

          <Button>
            <Link href='/accounts/profile/edit'> Edit Profile</Link>
           </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

