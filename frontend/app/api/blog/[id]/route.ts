// external api :server componeent  to get one post by id

// import { NextApiResponse } from "next";
// import { NextResponse } from "next/server";
// const API_BASE_URL = 'http://localhost:8003/api/posts/';

// export async function GET(request:Request ,postId) {
    
    
//     try {

//     const response = await fetch(`${API_BASE_URL}/${postId}`);
   
//     if (!response.ok) {
//         return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
//     }

//     const data = await response.json();
//     console.log(data)
//     return NextResponse.json(data);
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }

// } 
import { NextResponse } from 'next/server';

const API_BASE_URL = 'http://localhost:8003/api/posts/';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await fetch(`${API_BASE_URL}${id}`);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
    }

    const data = await response.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

