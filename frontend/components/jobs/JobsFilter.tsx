
"use client"
 
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"

function JobsFilter(){
    const [date, setDate] = React.useState<Date>()

    return(
        <div className="w-full  lg:w-1/4 mt-3">
            <h1>Filter</h1>
            <form className="w-full">

                <Input type="number" className="w-full mb-2" placeholder="min-salary" />
                <Input type="number" className="w-full mb-2" placeholder="max-salary" />

                <Input type="text" className="w-full mb-2" placeholder="Enter keword" />


                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>From date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>To date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className=" mt-5">
                    <h5 className="font-medium">Job Type</h5>
                   <div className="flex flex-wrap gap-3 mt-3">
                    {['Internship', 'PartTime', 'FullTime', 'Contract'].map((type)=>(
                        <div className="flex items-center space-x-2" key={type}>
                        <Checkbox id={type} />
                        <label
                            htmlFor={type}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {type}
                        </label>
                    </div>
                    ))}
                        
                   </div>
                </div>

                <div className=" mt-5">
                    <h5 className="font-medium">Education Level</h5>
                   <div className="flex flex-wrap gap-3 mt-3">
                    {['PHD', 'Master', 'Bachelor'].map((level)=>(
                        <div className="flex items-center space-x-2" key={level}>
                        <Checkbox id={level} />
                        <label
                            htmlFor={level}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {level}
                        </label>
                    </div>
                    ))}
                        
                   </div>
                </div>

                <div className=" mt-5">
                    <h5 className="font-medium">Experience level</h5>
                   <div className="flex flex-wrap gap-3 mt-3">
                    {['NoExperience', 'Junior', 'MidLevel', 'Senior'].map((level)=>(
                        <div className="flex items-center space-x-2" key={level}>
                        <Checkbox id={level} />
                        <label
                            htmlFor={level}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {level}
                        </label>
                    </div>
                    ))}
                        
                   </div>
                </div>
                <Button className="mt-4 w-full">Apply Filter</Button>
                <Button className="mt-2 w-full" variant='outline'>Apply Filter</Button>

            </form>
            
        </div>
    )
}
export default JobsFilter

