
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

import { Input } from "@/components/ui/input"

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

                    <CardFooter className="flex ">
                        <span> ❤️  {currentPost.likes_count}</span>
                        <span className='ml-2'> 💬 {currentPost.comments_count}</span>
                    </CardFooter>
                </Card>

                <div className='mt-8'>
                    <Input type="text" placeholder="add your comment" />
                    <Button className='mt-2'>Add Comment</Button>
                </div>

               
                {currentPost.comment_post.length > 0 ? currentPost.comment_post.map((comment)=>(
                      <Card key={comment.id} className='mt-2'>
                      <CardHeader>

                          <CardTitle>{comment.user_id}</CardTitle>
                          <CardDescription>
                             <span className="text-sm text-gray-500">
                                      Published: {new Date(comment.comment_date).toLocaleDateString()}
                              </span>
                          </CardDescription>

                      </CardHeader>

                      <CardContent>
                          
                          <div><span> {comment.content}</span></div>
                          
                          
                      </CardContent>

                      <CardFooter className="flex ">
                          {/* <span> ❤️  {currentPost.likes_count}</span>
                          <span className='ml-2'> 💬 {currentPost.comments_count}</span> */}
                      </CardFooter>
                      </Card>

                )) :(  <p>No comments yet. Be the first to comment!</p>)}

                

            </div>
        
  );
};

export default PostDetail;
