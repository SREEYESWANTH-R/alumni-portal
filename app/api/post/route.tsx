import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { verifytoken } from "@/app/middleware/verifyToken";
import Post from "@/app/models/postModel";
import { JwtPayload } from "jsonwebtoken";



export async function GET(req:NextRequest){
    try {
        const decoded = await verifytoken(req) as JwtPayload;
       
        if(!decoded?.id){
            NextResponse.json({message:"Unauthorized"},{status:401});
        }

        await connectDB();

        const posts = await Post.find().populate('userId', 'name'); 

        return NextResponse.json({ message: "Post fetched successfully",posts }, { status: 201 });
        
    } catch (error:unknown) {
        console.log((error as Error).message)
        return NextResponse.json({message:(error as Error).message},{status:500})
    }
}