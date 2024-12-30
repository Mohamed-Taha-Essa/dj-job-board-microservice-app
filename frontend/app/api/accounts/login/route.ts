// external api :to login
import { NextResponse } from 'next/server';
const BACKEN_URL = 'http://127.0.0.1:8001/accounts/login'
export async function POST(request: Request) {
    try {
        // Parse the incoming JSON data
        const body = await request.json();
        const { email, password } = body;

        // Validate request body
        if (!email || !password) {
            return NextResponse.json(
                { error: 'email and password are required' },
                { status: 400 }
            );
        }

        // Send data to the Django backend
        const response = await fetch(`${BACKEN_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email ,password
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
