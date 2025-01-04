'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, CodeSandboxLogoIcon, EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons"

interface UserProfile {
  username: string;
  email: string;
  date_joined: string;
  bio: string;
  image_url: string|File;
  cv:null|File;

}

export default function EditProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    email: "",
    date_joined: "",
    bio: "",
    image_url: "" ,
    cv:null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        if (!token) {
          throw new Error("you must login first");
        }
        const getResponse= await fetch("/api/accounts/profile",{
          method: 'GET' ,
          headers: { 'Authorization': `token ${token}`},    
      } );
        if (!getResponse.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await getResponse.json();
        console.log(data)
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile);
    // You can add logic here to show a success message or redirect
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.image_url} alt="User's avatar" />
              <AvatarFallback>{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input 
                    id="username" 
                    name="username"
                    value={profile.username} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    name="username"
                    value={profile.username} 
                    onChange={handleInputChange}
                  />
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
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={profile.email} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_joined">Join Date</Label>
                  <div className="flex">
                    <CalendarIcon className="w-4 h-4 mr-2 mt-3" />
                    <Input 
                      id="date_joined" 
                      name="date_joined"
                      value={profile.date_joined} 
                      readOnly 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bio</h3>
              <Textarea 
                name="bio"
                placeholder="Tell us about yourself" 
                value={profile.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Picture</h3>

              <div className="flex items-center flex-col ">
               <div className='grid grid-cols-8 w-full'>
                    <div className='col-span-1 flex items-center'>
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={profile.avatarUrl} alt="Current avatar" />
                        <AvatarFallback>{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='col-span-7 flex items-center'>
                    
                    <Input
                    type="file"
                    id="image"
                    name="image"
                    className="w-full px-3 py-2 border rounded"
                    onChange={handleInputChange}
                    accept="image/*"
                    />
                </div>
               </div>
             
                <div className=" w-full">
                    <label
                    htmlFor="cv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Upload CV
                    </label>
                    <Input
                    type="file"
                    id="cv"
                    name="cv"
                    className="w-full px-3 py-2 border rounded"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx"
                    />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

