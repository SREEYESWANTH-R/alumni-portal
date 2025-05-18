import { connectDB } from "@/app/lib/db";
import { verifytoken } from "@/app/middleware/verifyToken";
import jobs from "@/app/models/jobModel";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest ){
    const form = await req.formData();
    const title = form.get("title")?.toString() || "";
    const company = form.get("company")?.toString() || "";
    const CTC = form.get("CTC")?.toString() || "";
    const Link = form.get("Link")?.toString() || "";

    try {
        
        const decoded = await verifytoken(req) as JwtPayload;

        if(!decoded?.id){
            return NextResponse.json({message:"UnAuthorized"},{status:401});
        }

        await connectDB();

        const newJob = await jobs.create({
            title,
            company,
            CTC,
            Link,
        })
        return NextResponse.json({ message: "Job created successfully",newJob}, { status: 201 });


        
    } catch (error:unknown) {
        console.log((error as Error).message);
        return NextResponse.json({message:(error as Error).message},{status:500})
    }

}