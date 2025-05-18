import { connectDB } from "@/app/lib/db";
import { generateToken } from "@/app/lib/generateToken";
import User from "@/app/models/userModel";
import bcrypt from "bcrypt";
import { NextRequest,NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        await connectDB();
        const {name, email, mobile, address, city, state, pincode, password} = await req.json();

        const isExists = await User.findOne({email});
        if(isExists){
            return NextResponse.json({message:"User Already Exists"},{status:409 });
        }

        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name,
            email,
            mobile,
            address,
            city,
            state,
            pincode,
            password: hashPassword,
        });

        const token = generateToken(newUser);

        return NextResponse.json({ message: "User Registered Successfully", token }, { status: 201 }); 
    } catch (error:unknown) {
        console.log((error as Error).message)
        return NextResponse.json({message:(error as Error).message},{status : 500});

    }
}