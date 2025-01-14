'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, CodeSandboxLogoIcon, EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons"
import { error } from 'console'


export default function EditProfilePage() {
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [date_joined, setdate_joined] = useState("")
  const [image, setimage] = useState("")
  const [bio, setbio] = useState("")
  const [cv, setcv] = useState("")
  const [updated, setUpdated] = useState(false);

  
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
        const {first_name , last_name ,username,email,  image } = data
        setfirst_name(first_name)
        setlast_name(last_name)
        setemail(email)
        setusername(username)
        setimage(image)
      } catch (err) {
        console.log(err)
      } finally {
      console.log(error)
      }
    };

    fetchProfileData();
  }, [updated]);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        throw new Error("You must log in first.");
      }
      console.log('token: ' ,token)
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("username", username);
     // Add image as file if it is an instance of File, else add the URL
      if (image instanceof File) {
        formData.append("image", image);
      } else if (typeof image === "string") {
        formData.append("image", image ); // Send URL if it's a string
      }
     

      const response = await axios.put("http://127.0.0.1:8001/accounts/profile/edit-profile/", formData, {
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("Profile updated successfully");
        setUpdated(!updated);
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error in API handler:", error);
    }}
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={image} alt="User's avatar" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold">{username}</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">

            <div className="space-y-4">
              <h3 className="text-lg font-semibold"></h3>
              <div className="space-y-4">
             
              <div className="space-y-4">
                  
                  <Label htmlFor="username">User Name</Label>
                  <Input 
                    id="username" 
                    name="username"
                    value={username} 
                    onChange={e=>setusername(e.target.value)}
                  />
                
            </div>
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">First Name</Label>
                  <Input 
                    id="firstname" 
                    name="first_name"
                    value={first_name} 
                    onChange={e=>setfirst_name(e.target.value)}

                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Lst Name</Label>
                  <Input 
                    id="last_name" 
                    name="last_name"
                    value={last_name} 
                    onChange={e=>setlast_name(e.target.value)}

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
                      value={email} 
                      onChange={e=>setemail(e.target.value)}

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
                      value={date_joined} 
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
                value={bio}
                onChange={e=>setbio(e.target.value)}

              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Picture</h3>

              <div className="flex items-center flex-col ">
               <div className='grid grid-cols-8 w-full'>
                    <div className='col-span-1 flex items-center'>
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={image} alt="Current avatar" />
                        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='col-span-7 flex items-center'>
                    
                    <Input
                      type="file"
                      id="image"
                      name="image"
                      className="w-full px-3 py-2 border rounded"
                      onChange={e=>setimage(e.target.files[0])}
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
                    onChange={e=>setcv(e.target.files[0])}
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

