import JobsFilter from "@/components/jobs/JobsFilter"
import JobsList from "@/components/jobs/JobsList"



function JobListPage(){
    return(
        <div className="container ">
           <div className="flex">
                <JobsFilter/>
                
                <JobsList/>
           </div>
        </div>
    )
}

export default JobListPage