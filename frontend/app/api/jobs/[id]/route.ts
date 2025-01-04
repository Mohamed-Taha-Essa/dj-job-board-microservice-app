// external api :server componeent to get one job detailexport async function GET(request: Request, { params }: { params: { id: string } }) {
    import { NextResponse } from 'next/server';
    import axios from 'axios';
    
    const API_BASE_URL = 'http://localhost:8002/jobs';
    // call outside api from drf to get the determind post by id 
    export async function GET(request: Request, { params }: { params: { id: string } }) {
      const { id } = params;
      console.log("id: is",id)
    
      try {
        console.log('iside try ')
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
          return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
        }
    
        const data = await response.json();
        console.log(data)
        return NextResponse.json(data);
      } catch (error) {
        console.error('Failed to fetch Job:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }
    