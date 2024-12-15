// call api that make new job in db 
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const formData = await request.json();
    console.log("Form Data Received:", formData);

    // Validate required fields
    const {title,description,job_type,education,experience,salary,position,due_date,user,company,} = formData;

    if (
      !title ||
      !description ||
      !job_type ||
      !education ||
      !experience ||
      !position ||
      !user ||
      !company
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }
    // Format due_date correctly as "YYYY-MM-DD" if it's provided
    const formattedDueDate = due_date
      ? new Date(due_date).toISOString().split("T")[0] // Format as "YYYY-MM-DD"
      : null;
    console.log("=========",due_date)
    // Send data to the Django backend
    const response = await fetch("http://127.0.0.1:8002/jobs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        job_type,
        education,
        experience,
        salary: salary || null, // Salary is optional
        position,
        due_date:formattedDueDate ,
        user,
        company,
      }),
      
 
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 201 });
    } else {
      const error = await response.json();
      return NextResponse.json(
        { error: "Failed to add job", details: error },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in route handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
