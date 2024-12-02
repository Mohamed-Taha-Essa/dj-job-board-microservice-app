//components to show all posts
"use client"
import { useEffect } from 'react';
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
import Link from 'next/link';
const PostList = () => {
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts(1); // Fetch the first page of posts on component mount
  }, [fetchPosts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div >
                <Card key={post.id} >
                    <CardHeader>

                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription> <span className="text-sm text-gray-500">
                                    Published: {new Date(post.publish_date).toLocaleDateString()}
                                        </span>
                        </CardDescription>

                    </CardHeader>

                    <CardContent>
                        <span> ❤️  {post.likes_count}</span>
                        <span className='ml-2'> 💬 {post.comments_count}</span>
                        <div><span> {post.content.split(' ').slice(0, 5).join(' ')}...</span></div>
                        
                       
                    </CardContent>

                    <CardFooter className="flex justify-between">
                            <Button variant="outline">  <Link href={`/blog/${post.id}`}>Read more </Link></Button>
                    </CardFooter>
                </Card>

            </div>
        
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
