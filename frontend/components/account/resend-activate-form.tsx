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

import { useState } from "react"
export default function ResendActivateForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email ,setEmail] = useState('')

  const handleSubmit= async(e)=>{
    e.preventDefault()  //stop refresh 

    try {
      const response = await fetch('/api/accounts/resend-activate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email 
        }),

    });
   

    //show notification 
    toast.success('your activation send to your mail  ')

    //redirect to job 
    } catch (error) {
      console.log(error)
    }

  }
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl"> Resend Activate  </CardTitle>
          <CardDescription>
            Activate Your Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
              
              <Button type="submit" className="w-full">
                send
              </Button>
            
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/accounts/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
