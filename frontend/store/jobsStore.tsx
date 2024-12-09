
import axios from 'axios';
import {create} from 'zustand'


// Define the job model interface
interface Job {
    id: number;
    title: string;
    description: string;
    job_type: 'Internship' | 'PartTime' | 'FullTime' | 'Contract';
    education: 'PHD' | 'Master' | 'Bachelor';
    experience: 'NoExperience' | 'Junior' | 'MidLevel' | 'Senior';
    salary?: number;
    position: string;
    due_date: string; // Use string if dates are serialized as strings from the API
    created_at: string;
    slug?: string;
    user: number;
    company: string;
  }
  
  // Define the Zustand store state and actions
  interface JobStoreState {
    currentJob: Job | null;
    min_salary: string;
    max_salary: string;
    keyword: string;
    from_date: string;
    to_date: string;
    job_type: Job['job_type'][];
    experience: Job['experience'][];
    education: Job['education'][];
    setFilters: (filtername: keyof JobStoreState, value: string) => void;
    resetFilter: () => void;
    fetchJobById: (jobId: Number) => Promise<void>;
  }


const useJobStor= create<JobStoreState>((set)=>({
    currentJob:null,
    min_salary :'',
    max_salary : '',
    keyword :'' ,
    from_date :'' ,
    to_date :'',
    job_type:[],
    experience :[],
    education :[],
    setFilters:(filtername,value)=> 
        set((state)=> ({...state ,[filtername]:value })),
    resetFilter:()=>set({
        min_salary :'',
        max_salary : '',
        keyword :'' ,
        from_date :'' ,
        to_date :'',
        job_type:[],
        experience :[],
        education :[],
    }),
    fetchJobById: async (jobId)=>{
        try {
          
          const response = await axios.get(`/api/jobs/${jobId}` );
          console.log(response.data)
          set({ currentJob:  response.data});
    
          
        } catch (error) {
          console.error('Failed to fetch comments:', error);
        }
      },



}))

export default useJobStor;
