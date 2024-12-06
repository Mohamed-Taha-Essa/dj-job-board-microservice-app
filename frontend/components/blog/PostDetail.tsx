
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
  const {currentPost,fetchPostById ,addComment ,setPostLike} =usePostStore()
  const params = useParams(); // Get the post ID from the URL
  const id = params.slug.toString()

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [liked,setLiked]=useState(false);
  const [comment ,setComment] = useState('')
  const n = currentPost.comments_count
  const [commentCount ,setCommentCount] =useState(n)

  async function handleLike() {
    setPostLike(currentPost.id)
    setLiked(true)
  }

  async function handleComment(){
    addComment(currentPost.id,comment )
    setComment('')
    currentPost.comments_count = currentPost.comment_post.length
  }

  useEffect(() => {
    if (id) {
      fetchPostById(Number(id));
      setCommentCount(currentPost.comments_count)

    
    }
  }, [id]);


  if (error) return <div>{error}</div>;

  return (
   
     <div className="container mx-auto px-4 py-8" >
        {/* show post Section  */}
                <Card >
                    <CardHeader>

                        <CardTitle>{currentPost.title}</CardTitle>
                        <CardDescription> 
                            <div>
                                <span> 🖋️ {currentPost.author_id}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                📅   Published: {new Date(currentPost.publish_date).toLocaleDateString()}
                                </span>
                                <span className='ml-2'> ❤️  {currentPost.likes_count}</span>
                                <span className='ml-2'> 💬 {currentPost.comments_count}</span>
                            </div>
                            

                        </CardDescription>

                    </CardHeader>

                    <CardContent>
                       
                        <div><span> {currentPost.content}</span></div>
                        
                       
                    </CardContent>

                    <CardFooter className="flex ">
                        <Button variant='outline' onClick={handleLike}>
                        {(liked) ? '👎' : '👍'}

                        
                        </Button>
                    </CardFooter>
                </Card>

                {/* Add Comment Section */}
                <div className='mt-8'>
                    <Input type="text" placeholder="add your comment" 
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    />
                    <Button className='mt-2'
                    onClick={handleComment}
                    >Add Comment</Button>
                </div>

               {/* Comment Section */}
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
                        </CardFooter>
                    </Card>

                )) :(  <p>No comments yet. Be the first to comment!</p>)}

                

            </div>
        
  );
};

export default PostDetail;
