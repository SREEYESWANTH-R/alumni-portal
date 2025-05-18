import mongoose, { models } from "mongoose";


const productSchema = new mongoose.Schema({
    title:String,
    shortDesc:String,
    desc:String,
    img:[String],
    likes:{
        type:Number,
        default:0
    },
    userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:true}
},{ timestamps: true }
);

const Post = models.posts || mongoose.model('posts',productSchema);
export default Post;


