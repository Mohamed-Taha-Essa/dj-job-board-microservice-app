import JobsFilter from "@/components/jobs/JobsFilter"
import JobsList from "@/components/jobs/JobsList"
import { Button } from "@/components/ui/button"

import { Link } from "lucide-react"

function JobListPage(){
    return(
        <div className="container ">
            <div className="flex justif-between ">
            <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>
            <Link href="/jobs/add-job">
                <Button >Add New Job </Button>
            </Link>
            
            </div>
           <div className="flex">
                <JobsFilter/>
                
                <JobsList/>
           </div>
        </div>
    )
}

export default JobListPage