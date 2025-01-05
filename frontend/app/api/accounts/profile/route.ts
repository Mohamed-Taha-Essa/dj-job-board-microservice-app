// external api :to login
import { NextResponse } from 'next/server';
const BACKEN_URL = 'http://127.0.0.1:8001/accounts'
export async function GET(request: Request) {
    try {
       
        const tokenHeader = request.headers.get('Authorization');
        let token = null;
        
        if (tokenHeader && tokenHeader.startsWith('token ')) {
            token = tokenHeader.split(' ')[1]; // Extract the actual token
        } else {
            console.error('Authorization header is missing or malformed');
        }

        if(!token){
            return NextResponse.json({error :'you must login first'})
        }
        // Send data to the Django backend
        const response = await fetch(`${BACKEN_URL}/profile/` ,{
          
            headers: {
                'Authorization': `Token ${token}`, // Ensure `Token` is included
            },
        }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            
            return NextResponse.json(data, { status: 200 }); // Success response
        } else {
            const error = await response.json();
            return NextResponse.json(
                { error: 'Failed to get data', details: error },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('Error in API handler:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}


export async function PUT(request: Request) {
    try {
        const body = await request.json();
        console.log("==========================================",first_name , last_name ,username )
        const tokenHeader = request.headers.get('Authorization');
        
        let token = null;
        
        if (tokenHeader && tokenHeader.startsWith('token ')) {
            token = tokenHeader.split(' ')[1]; // Extract the actual token
            console.log(token); 
        } else {
            console.error('Authorization header is missing or malformed');
        }

        console.log("==========================================",token)
        if (!token) {
            return NextResponse.json({ error: 'You must log in first' }, { status: 401 });
        }
        if (!body || typeof body !== 'object') {
            return NextResponse.json(
                { error: 'Request body must contain user data to update' },
                { status: 400 }
            );
        }

        // Send data to the Django backend
        const response = await fetch(`${BACKEN_URL}/profile/edit-profile/`, {
            method: 'PUT',
            headers: {      
                'Accept': 'application/json',  
                'Content-Type': "multipart/form-data",
                'Authorization': `token ${token}`,
            },
            body:body 
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return NextResponse.json(data, { status: 200 }); // Success response
        } else {
            const error = await response.json();
            return NextResponse.json(
                { error: 'Failed to update profile', details: error },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('Error in API handler:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
