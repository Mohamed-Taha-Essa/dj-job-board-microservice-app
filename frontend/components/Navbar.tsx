import Link from "next/link"
import { ModeToggle } from "./DarkMode"

function Navbar(){


    return(
        <div>
            <div className="flex items-center justify-between border my-5 p-5 bg-red-300">
                <Link href='/' className="border">
                    <span>job board</span>
                </Link>
                <Link href='/'>
                    <span>Home</span>
                </Link> <Link href='/'>
                    <span>Dashoboard</span>
                </Link> <Link href='/'>
                    <span>About</span>
                </Link>
                <ModeToggle></ModeToggle>
            </div>
            
        </div>
       
    )



}

export default Navbar