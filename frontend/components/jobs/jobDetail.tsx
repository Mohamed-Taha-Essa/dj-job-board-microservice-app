
"use client"

import usePostStore from '@/store/blogStore';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import useJobStor from '@/store/jobsStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const JobDetail = () => {

    const {fetchJobById ,currentJob} = useJobStor()

    const params = useParams(); // Get the post ID from the URL
    console.log(params)
    const id = params.id.toString()
    console.log(id)
    
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(id){
            fetchJobById(Number(id))
        }
   
    },[id,fetchJobById])

    if (error) return <div> {error} </div>
    if (!currentJob) return <div>Loading...</div>; // Show loading state if `currentJob` is null

  return (
   
     <div className="container mx-auto px-4 py-8" >
        {/* show post Section  */}
                <Card >
                    <CardHeader>

                        <CardTitle>{currentJob.title}</CardTitle>
                        <CardDescription> 
                            <div>
                                <span> 🖋️ {currentJob.education}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                📅   Published: {new Date(currentJob.created_at).toLocaleDateString()}
                                </span>
                                <span className='ml-2'> ❤️  {currentJob.job_type}</span>
                                <span className='ml-2'> 💬 {currentJob.experience}</span>
                                <span className='ml-2'> 💬 {currentJob.salary}</span>
                                <span className='ml-2'> 💬 {currentJob.position}</span>
                                <span className='ml-2'> 💬 {currentJob.company}</span>
                            </div>
                            

                        </CardDescription>

                    </CardHeader>

                    <CardContent>
                       
                        <div><span> {currentJob.description}</span></div>
                        
                       
                    </CardContent>

                    <CardFooter className="flex ">
                        <Button variant='outline' >
                       

                        
                        </Button>
                    </CardFooter>
                </Card>

              

             
               

                

            </div>
        
  );
};

export default JobDetail;
