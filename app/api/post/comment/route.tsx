import { verifytoken } from "@/app/middleware/verifyToken";
import Comment from "@/app/models/commnetModel";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const { comment,postId }:{ comment: string; postId: string } = await req.json();
        const decoded = await verifytoken(req) as JwtPayload;

        if (!decoded?.id) {
            NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const newComment =await Comment.create({
            comment,
            postId,
            userId:decoded?.id
        })

        return NextResponse.json({ message: "Comment created", comment: newComment }, { status: 201 });

    } catch (error:unknown) {
        console.log((error as Error).message)
        return NextResponse.json({message:(error as Error).message},{status:500});
        
    }
}


