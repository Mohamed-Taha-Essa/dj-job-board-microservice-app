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
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation"

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [email ,setEmail] = useState('')
  const [password ,setPassword] = useState('')

  const router = useRouter()
  const handleSubmit= async(e)=>{
    e.preventDefault()  //stop refresh 

    try {
      const response = await fetch('/api/accounts/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email ,password 
        }),

    });
    const {token , user} = await response.json()
    //store data in localstorage
    //work on ubuntu
    // localStorage.setItem('token',token)
    
    localStorage.setItem('Authorization',token)

    console.log('token: ' ,token)
    localStorage.setItem(user,JSON.stringify(user))
    
    //show notification 
    toast.success('successful login ')

    //redirect to job 
    router.push('/accounts/profile')
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
         
          <form  onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                <Input id="password" type="password" 
                 value={password}
                 onChange={(e)=>{setPassword(e.target.value)}}
                
                required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
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
      <ToastContainer/>
    </div>
  )
}
