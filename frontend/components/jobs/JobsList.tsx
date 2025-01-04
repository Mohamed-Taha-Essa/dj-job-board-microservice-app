'use client'

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
import useJobStor from "@/store/jobsStore"
import Link from "next/link"
import { useState } from "react"
import useSWR from 'swr';

function JobsList(){
    //logic
    //internal api call external api 

    const {min_salary,max_salary,keyword,job_type,experience ,education ,fromDate ,toDate } = useJobStor()
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const [page ,setPage] = useState(1)

    //filter url from zustand 

    const buildUrl=() =>{

        const params = new URLSearchParams();

        
        if (keyword)    params.append('keyword', keyword);
        if (job_type)   params.append('job_type', job_type.join(','));
        if (education)  params.append('education', education.join(','));
        if (experience) params.append('experience', experience.join(','));
        if (min_salary) params.append('min_salary', min_salary);
        if (max_salary) params.append('max_salary', max_salary);
        
        
        if (fromDate && toDate) {
            const dateRange = `${new Date(fromDate).toISOString().split('T')[0]}-${new Date(toDate).toISOString().split('T')[0]}`;
            params.append('date', dateRange);
        }

         // Add the page number
        params.append("page", page);
        //call direct inside api without sotre 
        return `api/jobs/?${params.toString()}`;
    }

    const { data, error, isLoading } = useSWR(buildUrl, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const {results :jobs ,next ,previous ,count} =data

    const totalPages = Math.ceil(count / 10); // Assuming 10 jobs per page

    
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getVisiblePages = (currentPage, total) => {
    const visible = [];
    if (currentPage > 1) visible.push(currentPage - 1);
    visible.push(currentPage);
    if (currentPage < total) visible.push(currentPage + 1);
    return visible;
  };
    
  return (
    <div className="w-full px-4 lg:w-3/4 mt-3">
      <div className="grid grid-cols-3 gap-3">
        {jobs?.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                {job.company} | {job.job_type} | {job.experience} |{" "}
                {job.education} | {job.salary} |{" "}
                {new Date(job.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href={`/jobs/${job.id}`}>Read more</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="my-10 flex justify-center">
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
}
export default JobsList