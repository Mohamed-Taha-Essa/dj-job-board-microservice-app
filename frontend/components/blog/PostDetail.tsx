
"use client"

import usePostStore from '@/store/blogStore';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const PostDetail = () => {
  const {currentPost,fetchPostById} =usePostStore()
  const params = useParams(); // Get the post ID from the URL
  const id = params.slug.toString()
  const [post, setPost] = useState(null);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPostById(Number(id));
    }
  }, [id]);


  if (error) return <div>{error}</div>;

  return (
   
     <div className="container mx-auto px-4 py-8" >
                <Card >
                    <CardHeader>

                        <CardTitle>{currentPost.title}</CardTitle>
                        <CardDescription> <span className="text-sm text-gray-500">
                                    Published: {new Date(currentPost.publish_date).toLocaleDateString()}
                                        </span>
                        </CardDescription>

                    </CardHeader>

                    <CardContent>
                       
                        <div><span> {currentPost.content}</span></div>
                        
                       
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <span> ❤️  {currentPost.likes_count}</span>
                        <span className='ml-2'> 💬 {currentPost.comments_count}</span>
                    </CardFooter>
                </Card>

            </div>
        
  );
};

export default PostDetail;
