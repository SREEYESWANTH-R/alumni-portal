import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { verifytoken } from "@/app/middleware/verifyToken";
import Post from "@/app/models/postModel";
import { JwtPayload } from "jsonwebtoken";


export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        const { title, shortDesc, desc, doc } = body;
        const decoded = await verifytoken(req) as JwtPayload;
        
        if(!decoded?.id){
            NextResponse.json({message:"Unauthorized"},{status:401});
        }

        await connectDB();

        const newPost = new Post({
            userId: decoded.id,
            title,
            shortDesc,
            desc,
            img:doc,
        });

        await newPost.save();

        return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
        
    } catch (error:unknown) {
        console.log((error as Error).message)
        return NextResponse.json({message:(error as Error).message},{status:500})
    }
}