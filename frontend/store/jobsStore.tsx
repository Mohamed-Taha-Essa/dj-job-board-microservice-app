
import {create} from 'zustand'
const useJobStor= create((set)=>({
    min_salary :'',
    max_salary : '',
    keyword :'' ,
    from_date :'' ,
    to_date :'',
    job_type:[],
    experience :[],
    education :[],
    setFilters:(filtername,value)=> set((state)=> ({...state ,[filtername]:value })),
    resetFilter:()=>set({
        min_salary :'',
        max_salary : '',
        keyword :'' ,
        fromDate :'' ,
        toDate :'',
        job_type:[],
        experience :[],
        education :[],
    })

}))

export default useJobStor;
