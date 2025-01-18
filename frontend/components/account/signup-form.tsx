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
import { ToastContainer, toast } from 'react-toastify';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [username ,setUsername] = useState('')
  const [email ,setEmail] = useState('')
  const [password ,setPassword] = useState('')
  const [password2 ,setPassword2] = useState('')
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  const handleSubmit= async(e)=>{
    e.preventDefault()  //stop refresh 

      if (password !== password2) {
        setError("Passwords do not match");
        return;
      }
    try {
    
        
        setLoading(true); // Show loading state
        setError("");
        const response = await fetch('/api/accounts/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username , email, password ,password2
        }),

    });
    if (response.ok) {
      toast.success("Signup successful! Check your email for activation.");
      router.push("/accounts/login");
    } else {
      const errorData = await response.json();
      toast.error(errorData.detail || "Signup failed. Please try again.");
    }
  } catch (err) {
    toast.error("An error occurred. Please try again.");
    console.error(err);
  } finally {
    setLoading(false); // Hide loading state
  }

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">SignUp </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="user-name">User name</Label>
                  <Input
                    id="user name"
                    type="text"
                    placeholder="your name "
                    required
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}

                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}

                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password2</Label>
                  
                    
                  </div>
                  <Input id="password2" 
                  type="password" 
                  required 
          
                  value={password2}
                  onChange={(e)=>{
                    setPassword2(e.target.value);
                    if (e.target.value !== password) {
                      setError("Passwords do not match");
                    } else {
                      setError("");
                    }
                  }}

                  />
                </div>
                <Button type="submit" className="w-full"> Sign Up </Button>
                <Button variant="outline" className="w-full">Login with Google</Button>
              </div>
            
          </form>
        </CardContent>
      </Card>
      <ToastContainer/>
    </div>
  )
}
