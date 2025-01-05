"use client";
import Link from "next/link"
import { ModeToggle } from "./DarkMode"
import { Button } from "./ui/button"
import { Shell } from "lucide-react"
import { CircleUser } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
  

function Navbar(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // Check localStorage/sessionStorage for auth token
      const token = localStorage.getItem("Authontication"); // or sessionStorage
      setIsLoggedIn(!!token); // Set true if token exists
    }, []);

    return(

        
        <div>
            <div className="flex items-center justify-between border-b-2 py-5 px-5 bg-transparent ">
               <div className="flex items-center">
             
                    <Link  href='/'  className="flex gap-2 items-center" >
                            <Shell className="w-8 h-8"/>
                            <span>jobBoard</span>
                    </Link>
                    <Link className='mx-3 pl-3'href='/jobs'>jobs </Link> 
                    <Link className='mx-3' href='/blog'>blog  </Link> 
               </div>
                <div className="flex">
                    <ModeToggle ></ModeToggle>
                    {!isLoggedIn ? (
                        <>
                        <Button className="mr-2 ml-2" variant="outline">
                            <Link href="/accounts/signup">SignUp</Link>
                        </Button>
                        <Button className="mr-2">
                            <Link href="/accounts/login">Login</Link>
                        </Button>
                        </>
                    ) : (
                        <Button className="mr-2 ml-2" variant="outline">
                        <Link href="/accounts/logout">Logout</Link>
                        </Button>)}
                    <div className="ml-2">  
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size='icon' className="rounded-full"> 
                                < CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>  
                            </Button>
                        </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Link href='/accounts/profile'>Profile </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                <Link href='/accounts/profile/edit'>Edit Setting </Link>

                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                 <Link href='/accounts/change-password'>Chang Password </Link>

                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href='/accounts/logout'>Logout </Link>

                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div>
                </div>
            </div>
            
        </div>
       
    )


}

export default Navbar