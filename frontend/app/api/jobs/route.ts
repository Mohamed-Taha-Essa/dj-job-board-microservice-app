// external api :server componeent 

//http://localhost:8002/jobs/?keyword=&job_type=&education=PHD&experience=&min_salary=&max_salary=&date=

import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request:Request ) {
    
    try {
       
    const params = new URL(request.url).searchParams;


    const response = await fetch(`http://localhost:8002/jobs/?${params}`);
    console.log(response)
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
    } catch (error) {
        console.log(error)
    }

} 