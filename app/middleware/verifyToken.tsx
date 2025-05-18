import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET_KEY = process.env.JWT_SECRET;

export async function verifytoken(req: NextRequest) {

    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return NextResponse.json({ message: "unauthorized" }, { status: 401 });
        }

        const token: string = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET_KEY!);
        
        return decoded;
    } catch (error:unknown) {
        return NextResponse.json({message:(error as Error).message}, {status:404});
    }
}