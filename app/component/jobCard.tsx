"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"


const JobCard = () => {

  const [jobs, setJobs] = useState({
    title: '',
    company: '',
    CTC: '',
    Link: '',

  })

  // const [file, setFile] = useState<File | null>(null);

  const handleIputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobs((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //   }
  // }

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!file) {
    //   toast("Please upload a file.");
    //   return;
    // }

    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("title", jobs.title);
    formData.append("company", jobs.company);
    formData.append("CTC", jobs.CTC);
    formData.append("Link", jobs.Link);
    // formData.append("file", file);

    try {

      const res = await axios.post("/api/jobs/upload-jobs",formData,{
        headers:{'authorization':`Bearer ${token}`}
      })


      if(res.status === 201){
        toast(res.data.message);
      }else{
        toast(res.data.message);
      }


    } catch (error: unknown) {
      console.log((error as Error).message);
    }
  }

  return (
    // Create job card
    <div className="flex flex-col gap-5 bg-gray-50 border-2 rounded-xl shadow-xl p-6" >
      <h1 className="font-medium text-center">POST YOUR JOB</h1>
      <form onSubmit={handleJobSubmit} className="space-y-3">

        <div className="space-y-2">
          <Label htmlFor="title">Job-Title</Label>
          <Input onChange={handleIputChange} value={jobs.title} name="title" type="text" placeholder="Enter Job Title"></Input>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input onChange={handleIputChange} value={jobs.company} name="company" type="text" placeholder="Enter Company Name"></Input>
        </div>
        <div className="space-y-2">
          <Label htmlFor="CTC">CTC</Label>
          <Input onChange={handleIputChange} value={jobs.CTC} name="CTC" type="text" placeholder="Enter your CTC"></Input>
        </div>
        <div className="space-y-2">
          <Label htmlFor="Link">Link</Label>
          <Input onChange={handleIputChange} value={jobs.Link} name="Link" type="text" placeholder="Past Link Here...."></Input>
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="file">Upload file</Label>
          <Input onChange={handleFileChange} name="file" type="file" accept="application/pdf" placeholder="Files"></Input>
        </div> */}

        <Button type="submit">POST JOB</Button>
      </form>
    </div>

  )
}

export default JobCard
