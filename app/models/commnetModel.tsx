import mongoose, { models } from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:String,
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
});

const Comment = models.comments || mongoose.model('comments',commentSchema);
export default Comment; 