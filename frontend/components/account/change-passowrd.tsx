"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function ChangePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [old_password ,setOldpassword] = useState('')
  const [new_password ,setNewpassword] = useState('')

  const router = useRouter()
  const handleSubmit= async(e)=>{
    e.preventDefault()  //stop refresh 

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("You must be logged in to change your password.");
        return;
      }
      const response = await fetch('/api/accounts/change-password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        body: JSON.stringify({
          old_password ,new_password 
        }),

    });
  

    //show notification 
    if (response.ok) {
      toast.success("Password changed successfully!");
      router.push("/jobs");
    } else {
      const error = await response.json();
      toast.error(error.error || "Failed to change password.");
    }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Change passowrd </CardTitle>
          <CardDescription>
            
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
            <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Old Password</Label>
                  
                </div>
                <Input id="old_password" type="password" 
                value={old_password}
                onChange={(e)=>setOldpassword(e.target.value)}
                required />
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">New Password</Label>
                  
                </div>
                <Input id="password" type="password" 
                value={new_password}
                onChange={(e)=>setNewpassword(e.target.value)}
                required />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
             
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
