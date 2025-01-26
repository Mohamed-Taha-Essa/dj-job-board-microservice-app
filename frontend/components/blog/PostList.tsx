//components to show all posts
"use client"
import { useEffect ,useState } from 'react';
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import Link from 'next/link';


const PostList = () => {
  const { posts, fetchPosts,totalPages } = usePostStore();

  const [page ,setPage] = useState(1)

  useEffect(() => {
    fetchPosts(page); // Fetch the first page of posts on component mount
  }, [fetchPosts,page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }
  // Helper to calculate the range of pages to display
  const getVisiblePages = (currentPage, total) => {
    const pages = [];
    if (currentPage > 1) pages.push(currentPage - 1); // Previous page
    pages.push(currentPage); // Current page
    if (currentPage < total) pages.push(currentPage + 1); // Next page
    return pages;
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  {/* Show User Image if available */}
                  {post.user.image && (
                    <img 
                      src={`${post.user.image}?${new Date().getTime()}`}
                      alt={post.user.username} 
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                  )}
                  <span className="text-sm text-gray-600">
                    <span className="font-bold text-blue-600">{post.user.username}</span>
                  </span>
                </div>
                 <span className="text-sm text-gray-500">
                    Published: {new Date(post.publish_date).toLocaleDateString()}
                  </span>
                  
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span>❤️ {post.likes_count}</span>
                <span className="ml-2">💬 {post.comments_count}</span>
                <div>
                  <span>{post.content.split(" ").slice(0, 5).join(" ")}...</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Link href={`/blog/${post.id}`}>Read more</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="my-10">
        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page - 1);
                }}
              />
            </PaginationItem>

            {/* Ellipsis for pages before the visible range */}
            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Page Numbers */}
            {getVisiblePages(page, totalPages).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  isActive={pageNum === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNum);
                  }}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Ellipsis for pages after the visible range */}
            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PostList;
