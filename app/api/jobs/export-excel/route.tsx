import { verifytoken } from "@/app/middleware/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import User from "@/app/models/userModel";
import jobs from "@/app/models/jobModel";


export async function POST(req: NextRequest) {
    const Job = await req.json();
    try {
        const decoded = await verifytoken(req) as JwtPayload;

        if (!decoded?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userDetails = await User.findById(decoded.id);
        const uptJob = await jobs.findByIdAndUpdate({ _id: Job._id },
            { $addToSet: { Applied: decoded.id } }
        );

        // Excel Creation

        const workbook = new ExcelJS.Workbook();
        // const buffer = await workbook.xlsx.writeBuffer();


        const sheet = workbook.addWorksheet(`${Job.company} - ${Job.title}`, { views: [{ state: 'frozen', xSplit: 1 }] });

        sheet.columns = [
            { header: "Name", key: "name" },
            { header: "Email", key: "email" },
            { header: "Phone Number", key: "phoneNumber" },
        ]

        sheet.addRow({
            name: userDetails.name,
            email: userDetails.email,
            phoneNumber: userDetails.mobile,
        });

        // Save Excel file on the server
        const filePath = path.join(
            process.cwd(),
            "public",
            "applied",
            `${Job.company}-${Job.title}.xlsx`
        );

        // Ensure directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        await workbook.xlsx.writeFile(filePath);

        return NextResponse.json({ message: "Applied successfully",uptJob});
    } catch (error: unknown) {
        console.error((error as Error).message);
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        );
    }
}