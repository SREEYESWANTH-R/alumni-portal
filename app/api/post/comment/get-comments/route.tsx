import Comment from "@/app/models/commnetModel";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const comments = await Comment.find().populate('userId','name');
        return NextResponse.json({comments},{status:201});
    } catch (error:unknown) {
        console.log((error as Error).message);
        return NextResponse.json({message:(error as Error).message},{status:500});
    }
}