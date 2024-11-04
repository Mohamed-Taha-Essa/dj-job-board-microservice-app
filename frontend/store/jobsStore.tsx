
import {create} from 'zustand'
//http://localhost:8002/jobs/?keyword=&job_type=&education=PHD&experience=&min_salary=&max_salary=&date=
const useJobStor= create((set)=>({
    min_salary :'',
    max_salary : '',
    keyword :'' ,
    fromDate :'' ,
    toDate :'',
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
