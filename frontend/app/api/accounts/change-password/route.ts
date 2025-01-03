// external api :to login
import { NextResponse } from 'next/server';
const BACKEN_URL = 'http://127.0.0.1:8001/accounts'
export async function PUT(request: Request) {
    try {
        // Parse the incoming JSON data
        const body = await request.json();
        const { old_password,new_password } = body;

        const token = request.headers.get('Authorization')
        if(!token){
            return NextResponse.json({error :'you must login first'})
        }
        // Validate request body
        if (!old_password || !new_password  ) {
            return NextResponse.json(
                { error: 'old_password and new_password are required' },
                { status: 400 }
            );
        }

        // Send data to the Django backend
        const response = await fetch(`${BACKEN_URL}/change-password/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify({
                old_password,new_password
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data, { status: 200 }); // Success response
        } else {
            const error = await response.json();
            return NextResponse.json(
                { error: 'Failed to login', details: error },
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
