// external api :server componeent to get one job detailexport async function GET(request: Request, { params }: { params: { id: string } }) {
    import { NextResponse } from 'next/server';

    export async function POST(request: Request) {
        try {
            // Parse the incoming JSON data
            const body = await request.json();
            const { jobId, coverLetter } = body;
            console.log('jobid =======' ,jobId)
            console.log('coverLetter' ,coverLetter)

    
            // Validate request body
            if (!jobId || !coverLetter) {
                return NextResponse.json(
                    { error: 'jobId and coverLetter are required' },
                    { status: 400 }
                );
            }
    
            // Send data to the Django backend
            const response = await fetch('http://127.0.0.1:8002/jobs/job-apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job: jobId,
                    cover_letter: coverLetter,
                    user: 1, // Hardcoded for now; replace with dynamic user ID if available
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                return NextResponse.json(data, { status: 201 }); // Success response
            } else {
                const error = await response.json();
                return NextResponse.json(
                    { error: 'Failed to apply', details: error },
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
    