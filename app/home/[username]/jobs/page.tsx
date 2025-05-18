import JobCard from "@/app/component/jobCard"
import JobDisplayForm from "@/app/component/jobDisplayForm"


const Jobpage = () => {
  return (
    <div className="flex pl-10 pr-10 pt-10 space-x-4">
      {/* Display the jobs */}
      <JobDisplayForm/>
      {/* Job Creation Card */}
      <JobCard/>
    </div>
  )
}

export default Jobpage
