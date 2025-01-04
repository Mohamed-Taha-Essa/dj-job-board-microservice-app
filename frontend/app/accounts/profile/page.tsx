"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        console.log(localStorage)
        console.log(token)
        // if (!token) {
        //   throw new Error("you must login first");
        // }
        const response = await fetch("/api/accounts/profile",{
          headers: {
           
              'Authorization': `token ${token}`
          },
          
      } );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6 my-12">
      <Card className="max-w-4xlg mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-48 h-48">
            <AvatarImage src={profileData.image_url || "https://github.com/shadcn.png"} alt="User's avatar" />
            <AvatarFallback>{profileData.username|| "?"}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold">{profileData.username || "N/A"}</CardTitle>
            <CardDescription>{profileData.bio || "No bio available"}</CardDescription>
          </div>
        </CardHeader>
        <CardContent   className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={profileData.username || "N/A"} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={profileData.username || "N/A"} readOnly />
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
                  <Input id="email" type="email" value={profileData.email || "N/A"} readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <div className="flex">
                  <CalendarIcon className="w-4 h-4 mr-2 mt-3" />
                  <Input id="joinDate" value={profileData.date_joined || "N/A"} readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bio</h3>
            <Textarea 
              placeholder="Tell us about yourself" 
              value={profileData.bio || "N/A"}
              readOnly
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <Link href="/accounts/profile/edit">Edit Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
