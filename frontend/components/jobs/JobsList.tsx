'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useJobStor from "@/store/jobsStore"
import { useState } from "react"
import useSWR from 'swr';

function JobsList(){
    //logic
    //internal api call external api 

    const {min_salary,max_salary,keyword,job_type,experience ,education ,fromDate ,toDate } = useJobStor()
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const [page ,setPage] = useState(1)

    const { data, error, isLoading } = useSWR('/api/jobs/', fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return(
        <div className="w-full px-4 lg:w-3/4 mt-3">
            <div className="grid grid-cols-3 gap-3">
                <Card >
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                    </CardFooter>
                </Card>
                <Card >
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                    </CardFooter>
                </Card> <Card >
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                    </CardFooter>
                </Card> <Card >
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                    </CardFooter>
                </Card>
            </div>
           
        </div>
    )
}
export default JobsList