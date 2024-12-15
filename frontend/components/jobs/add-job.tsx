"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    job_type: "",
    education: "",
    experience: "",
    salary: "",
    position: "",
    due_date: null,
    user: "",
    company: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, due_date: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are validated here before submitting to the backend
    try {
      const response = await fetch("/api/jobs/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Job added successfully!");
        setFormData({
          title: "",
          description: "",
          job_type: "",
          education: "",
          experience: "",
          salary: "",
          position: "",
          due_date: null,
          user: "",
          company: "",
        });
      } else {
        alert("Failed to add job. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  return (
  <div className="container ">
  <form className="max-w-2xl mx-auto p-4  shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add New Job</h1>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Job Title</label>
        <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter job title" required />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter job description"
          required
        />
      </div>

      {/* Job Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Job Type</label>
        <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, job_type: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="PartTime">Part-Time</SelectItem>
            <SelectItem value="FullTime">Full-Time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Education */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Education</label>
        <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, education: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PHD">PhD</SelectItem>
            <SelectItem value="Master">Master's</SelectItem>
            <SelectItem value="Bachelor">Bachelor's</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Experience</label>
        <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NoExperience">No Experience</SelectItem>
            <SelectItem value="Junior">Junior</SelectItem>
            <SelectItem value="MidLevel">Mid-Level</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Salary */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Salary</label>
        <Input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          placeholder="Enter salary"
        />
      </div>

      {/* Position */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Position</label>
        <Input
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          placeholder="Enter position"
          required
        />
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Due Date</label>
        <Calendar
          mode="single"
          selected={formData.due_date}
          onSelect={handleDateChange}
          className="w-full"
        />
        {formData.due_date && (
          <p className="text-sm mt-2">Selected Date: {format(new Date(formData.due_date), "yyyy-MM-dd")}</p>
        )}
      </div>

      {/* User */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">User</label>
        <Input
          type="number"
          name="user"
          value={formData.user}
          onChange={handleInputChange}
          placeholder="Enter user ID"
          required
        />
      </div>

      {/* Company */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Company</label>
        <Input
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Enter company name"
          required
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Add Job
      </Button>
    </form>

  </div>
  );
};

export default AddJobForm;
