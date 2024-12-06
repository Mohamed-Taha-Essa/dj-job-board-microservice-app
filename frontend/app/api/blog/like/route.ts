//api for backend to update likes

import { NextResponse } from "next/server"
const BACKEND_URL = 'http://127.0.0.1:8003/api/posts'

export async function POST(request:Request) {

    const {post_id ,user_id} =await request.json()

    const response = await fetch(`${BACKEND_URL}/add-like` ,
        {
            method:'POST' ,
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({post:post_id , user_id :user_id})

        }
    )

    const data = await response.json()
    return NextResponse.json(data)
}