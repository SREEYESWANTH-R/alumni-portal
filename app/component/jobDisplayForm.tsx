"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Link2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface jobs {
  _id: string,
  title: string,
  company: string,
  CTC: number,
  Link: string
}

const JobDisplayForm = () => {

  const [jobs, setJobs] = useState<jobs[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("/api/jobs", {
        headers: { 'authorization': `Bearer ${token}` }
      });
      if (res.status === 201) {
        setJobs(res.data.Jobs);

      }
    } catch (error: unknown) {
      console.log((error as Error).message)
    }
  }

  useEffect(() => {
    fetchJobs();
  }, [])

  const handleApplyJob = async (Job:jobs) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.post("/api/jobs/export-excel",Job,{
      headers:{'authorization':`Bearer ${token}`}
    })
    toast("Applied Successfully");
   
    setAppliedJobs(res.data.uptJob.Applied); 

  } catch (error:unknown) {
    console.log((error as Error).message);
  }
  }

  console.log(appliedJobs);

  return (
    <div className="w-9/12 rounded-xl p-1">
      <h1 className="font-medium text-2xl text-center mb-4">TECHIE JOBS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {jobs.map((job) => (
          <div key={job._id} className="p-2 border-2 shadow-xl rounded-lg space-y-1.5">
            <h1>Role: {job.title}</h1>
            <h1>Company: {job.company}</h1>
            <h1>CTC: {job.CTC}</h1>
            <Link href={job.Link} className="flex items-center gap-1 text-blue-600">
              Apply Link <Link2 />
            </Link>
            <Button
              onClick={() => handleApplyJob(job)}
              disabled={appliedJobs.includes(job._id)}
              variant="ghost" 
              className={appliedJobs.includes(job._id) ? "text-green-600" : ""}>
              {appliedJobs.includes(job._id) ? "Applied" : "Apply"}
            </Button>
          </div>
        )
        )
        }
      </div>
    </div>
  )
}

export default JobDisplayForm

