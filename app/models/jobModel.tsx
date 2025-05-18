import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:String,
    company:String,
    CTC:Number,
    Link:String,
    Applied:[String],
    
},{
    timestamps:true
}
)

const jobs = mongoose.models.jobs || mongoose.model("jobs",jobSchema);
export default jobs;

