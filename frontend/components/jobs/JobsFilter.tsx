
"use client"
 

import { Input } from "@/components/ui/input"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import useJobStor from "@/store/jobsStore"
import { useEffect, useState } from "react"

function JobsFilter(){

    const {min_salary,max_salary,keyword,job_type,experience ,education ,fromDate ,toDate,setFilters,resetFilter } = useJobStor()
    const [jobs,setJobs] =useState([])

    useEffect(()=>{
        applyFilter();
    },[min_salary,max_salary,keyword,job_type,experience ,education ,fromDate ,toDate ])
    
    const fetchJobs = async(url) =>{
        const response = await fetch(url)
        const data =response.json()
        return data
    }
    const applyFilter= async () =>{
        const params = new URLSearchParams(); 
        // params.append('keyword', keyword);
        // if (job_type)   params.append('job_type', job_type.join(','));
        // if (education)  params.append('education', education.join(','));
        // if (experience) params.append('experience', experience.join(','));
        // params.append('min_salary', min_salary);
        // params.append('max_salary', max_salary);
        if (keyword)    params.append('keyword', keyword);
        if (job_type)   params.append('job_type', job_type.join(','));
        if (education)  params.append('education', education.join(','));
        if (experience) params.append('experience', experience.join(','));
        if (min_salary) params.append('min_salary', min_salary);
        if (max_salary) params.append('max_salary', max_salary);
           
        if (fromDate || toDate) {
            const startDate = fromDate ? new Date(fromDate).toISOString().split('T')[0] : '';
            const endDate = toDate ? new Date(toDate).toISOString().split('T')[0] : '';
            
            if (startDate || endDate) {
                const dateRange = `${startDate},${endDate}`;
             
                params.append('date', dateRange);
            }
        }
        const url =  `api/jobs/?${params.toString()}`;

        const fetched_data = await fetchJobs(url)
        setJobs(fetchJobs)
    }
    const [date, setDate] = useState<Date>()

    return(
        <div className="w-full  lg:w-1/4 mt-3">
            <h1>Filter</h1>
            <form onSubmit={(e)=>e.preventDefault()} className="w-full">

                <Input type="number" 
                className="w-full mb-2" 
                placeholder="min-salary" 
                name="min_salary"
                value={min_salary}
                onChange={(e)=> setFilters('min_salary' ,e.target.value)}  
                 />
                <Input type="number"
                 className="w-full mb-2" 
                 placeholder="max-salary" 
                 name="max_salary"
                value={max_salary}
                onChange={(e)=> setFilters('max_salary' ,e.target.value)}
                 />

                <Input type="text" 
                className="w-full mb-2" 
                placeholder="Enter keword" 
                name="keyword"
                value={keyword}
                onChange={(e)=> setFilters('keyword' ,e.target.value)}
                
                />


                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !fromDate && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                       
                        {fromDate ? format(fromDate, "PPP") : <span>From date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={fromDate}
                            onSelect={(date)=>setFilters("fromDate" ,date)}
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
                            {toDate ? format(toDate, "PPP") : <span>To date</span>}

                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={toDate}
                            onSelect={(date)=>setFilters("toDate" ,date)}
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
                        <Checkbox id={type} 
                        checked={job_type.includes(type)}
                        onCheckedChange={(checked)=>{      
                             setFilters('job_type' ,
                                checked ? [...job_type ,type] : job_type.filter((t)=> t != type)
                                
                              )
                        }
                        }
                        />
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
                        <Checkbox id={level} 
                        
                        checked={education.includes(level)}
                        onCheckedChange={(checked)=>{      
                             setFilters('education' ,
                                checked ? [...education ,level] : education.filter((t)=> t != level)
                                
                              )
                        }
                        }
                        />
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
                        <Checkbox id={level}
                        checked={experience.includes(level)}
                        onCheckedChange={(checked)=>{      
                             setFilters('experience' ,
                                checked ? [...experience ,level] : experience.filter((t)=> t != level)
                                
                              )
                        }
                        }
                        />
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
                <Button onClick={applyFilter} className="mt-4 w-full">Apply Filter</Button>
                <Button  onClick={resetFilter} className="mt-2 w-full" variant='outline'>Reset Filter</Button>

            </form>
            
        </div>
    )
}
export default JobsFilter

