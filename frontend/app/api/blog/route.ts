// external api :server componeent to get all posts

import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
const API_BASE_URL = 'http://localhost:8003/api/posts/';

export async function GET(request:Request ) {
    
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1'; // Default to page 1 if not provided
    try {

    const response = await fetch(`${API_BASE_URL}?page=${page}`);
   
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

} 



