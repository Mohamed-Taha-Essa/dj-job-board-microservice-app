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
  

function Navbar(){

   

    return(

        
        <div>
            <div className="flex items-center justify-between border-b-2 py-5 px-5 bg-transparent ">
               <div className="flex items-center">
                    <Link  href='/'  className="flex gap-2 items-center" >
                            <Shell className="w-8 h-8"/>
                            <span>jobBoard</span>
                    </Link>

                    <Link className='mx-3 pl-3'   href='/jobs'>jobs </Link> 
                    
                    <Link className='mx-3' href='/blog'>blog  </Link> 
               </div>
                
                <Link href='/'>
                    <span>About</span>
                </Link>

                <div className="flex">
                    <Button className="mr-2">
                        <Link href='/'>
                            Login
                        </Link>
                    </Button>
                
                    <ModeToggle></ModeToggle>
                  
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

                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                                
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div>
                </div>
            </div>
            
        </div>
       
    )


}

export default Navbar