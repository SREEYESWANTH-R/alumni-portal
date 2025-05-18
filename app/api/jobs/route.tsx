import { verifytoken } from "@/app/middleware/verifyToken";
import jobs from "@/app/models/jobModel";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){
    try {
        
        const decoded = await verifytoken(req) as JwtPayload;
        if(!decoded?.id){
            return NextResponse.json({message:'Unauthorized'},{status:401});
        }

        const Jobs = await jobs.find();
        console.log(Jobs);
        return NextResponse.json({message:"Job Fetched successfully",Jobs},{status:201});

    } catch (error:unknown) {
        console.log((error as Error).message);
        return NextResponse.json({message:(error as Error).message},{status:500})
    }
}