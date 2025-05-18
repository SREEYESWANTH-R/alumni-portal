import { connectDB } from "@/app/lib/db";
import User from "@/app/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { generateToken } from "@/app/lib/generateToken";

export async function POST(req:NextRequest){
    try {
        await connectDB();
        const {email,password} = await req.json();

        const isExist = await User.findOne({email});
        
        if(!isExist){
            return NextResponse.json({message:"User Already Exists"})
        }

        const isPassword = await bcrypt.compare(password, isExist.password);
        if(!isPassword){
            return NextResponse.json({message: "Invalid credentials"},{status: 401});
        }

        const token = generateToken(isExist);

        return NextResponse.json({message:"Login Successfull",token},{status:201});

    } catch (error : unknown) {
        console.log((error as Error).message);
        return NextResponse.json({message:(error as Error).message},{status:500})
    }
}