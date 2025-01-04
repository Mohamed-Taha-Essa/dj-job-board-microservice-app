import JobsFilter from "@/components/jobs/JobsFilter"
import JobsList from "@/components/jobs/JobsList"
import { Button } from "@/components/ui/button"

import Link from 'next/link';

function JobListPage(){
    return(
        <div className="container ">
            <div className="flex justify-between mt-5 ">
               
                <h1 className="text-3xl font-bold mb-6 ">Latest Jobs</h1>
                
                
                            
                <Button > <Link href="/jobs/add-job">Add New Job</Link> </Button>
           
            </div>
           <div className="flex">
                <JobsFilter/>
                
                <JobsList/>
           </div>
        </div>
    )
}

export default JobListPage