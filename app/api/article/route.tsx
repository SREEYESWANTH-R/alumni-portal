import axios from "axios";
import {NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {

    try {
        const query = req.nextUrl.searchParams.get("query") || "programming";
        const response = await axios.get(`https://newsapi.org/v2/everything`,{
             params: {
                q: query,
                apiKey: process.env.NEWS_API_KEY,
                language:"en",
            }
        });
        return NextResponse.json(response.data);

    } catch (error: unknown) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
} 