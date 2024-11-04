// external api :server componeent 

//http://localhost:8002/jobs/?keyword=&job_type=&education=PHD&experience=&min_salary=&max_salary=&date=

import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request:Request ) {
    
    try {
        const {searchParams} = new URL(request.url)

        const page = searchParams.get('page')||1

        //get all filter
        const min_salary = searchParams.get('min_salary')||'';
        const max_salary = searchParams.get('max_salary')||'';
        const keyword = searchParams.get('keyword')||'';
        const from_date = searchParams.get('from_date')||'';
        const to_date = searchParams.get('to_date')||'';
        const job_type = searchParams.get('job_type')||'';
        const experience = searchParams.get('experience')||'';
        const education = searchParams.get('education')||'';

        const params = new URLSearchParams({

            min_salary  ,
            max_salary ,
            keyword   , 
            job_type ,
            experience  ,
            education  ,
            from_date   ,
            to_date  ,
        })
        console.log('-----------------------------------------------------------------')
        const response = await fetch(`http://localhost:8002/jobs/?${params.toString()}`)
        console.log(`http://localhost:8002/jobs/?${params.toString()}`)

        const data = await response.json()
        console.log(data)
        return NextResponse.json(data)

    } catch (error) {
        console.log(error)
    }

} 