
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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import useJobStor from '@/store/jobsStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';



const JobDetail = () => {

    const {fetchJobById ,currentJob} = useJobStor()

    const params = useParams(); // Get the post ID from the URL
    const id = params.id.toString()

    const [error, setError] = useState(null);
    const [isApply, setIsApply] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');

    useEffect(()=>{
        if(id){
            fetchJobById(Number(id))
        }
   
    },[id,fetchJobById])

    const handleAplly = async() =>
    {
        if (!currentJob?.id || !coverLetter.trim()) {
            // Show notification: "Job and cover letter are required."
            return;
        }
    
        setIsApply(true);
    
        try {
            const response = await fetch('/api/jobs/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobId: currentJob?.id,
                    coverLetter,
                }),
            });
    
            if (response.ok) {
                setCoverLetter(''); // Clear input
                // Show success notification
            } else {
                const error = await response.json();
                // Show error notification with error.message
            }
            
             // const response = await axios.post('/api/jobs/apply-job', {
            //     jobId: currentJob?.id,
            //     coverLetter,
            // }, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
    
            // if (response.status === 200 || response.status === 201) {
            //     // Success notification
            //     setCoverLetter('');
            // } else {
            //     // Handle unexpected status codes
            //     console.error('Unexpected status code:', response.status);
            //     // Show notification
            // }
        } catch (error) {
            console.log('Error applying for job:', error);
            // Show error notification
        } finally {
            setIsApply(false); // Reset loading state
        }
    }


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
                                <span> 🎓 {currentJob.education}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                📅   Published: {new Date(currentJob.created_at).toLocaleDateString()}
                                </span>
                                <span className='ml-2'> ⏱{currentJob.job_type}</span>
                                <span className='ml-2'> 📝{currentJob.experience}</span>
                                <span className='ml-2'>  {currentJob.salary}💲</span>
                                <span className='ml-2'> 💻  {currentJob.position}</span>
                                <span className='ml-2'> 🏢 {currentJob.company}</span>
                            </div>
                            

                        </CardDescription>

                    </CardHeader>

                    <CardContent>
                       
                        <div><span> {currentJob.description}</span></div>
                        
                       
                    </CardContent>
                    <CardFooter className="flex ">
                  
                    </CardFooter>
                    </Card>

                    <div className='mt-8'>
                    <Textarea 
                    placeholder="Type your cover letter here." 
                    value={coverLetter}
                    onChange={(e)=>setCoverLetter(e.target.value)}
                    />
                        
                        <Button className='mt-2' onClick={handleAplly} disabled={isApply}>
                            {(isApply) ?"Applying..." : "Apply"}
                            
                        </Button>
                </div>

                    
               

              

             
               

                

            </div>
        
  );
};

export default JobDetail;
