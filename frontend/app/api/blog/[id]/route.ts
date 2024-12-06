
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8003/api/posts/';
// call outside api from drf to get the determind post by id 
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

// call outside api to add comment and return newcomment 
export async function POST(request: Request) {
  try {
    // Extract the request body
    const { postId, content} = await request.json();

    // Make a POST request using axios
    const response = await axios.post(API_BASE_URL, {
      post: postId,
      content: content,
      
    });

    // Return the response from the external API
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);

    // Handle axios error properly
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data || 'Failed to add comment' },
        { status: error.response.status }
      );
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
