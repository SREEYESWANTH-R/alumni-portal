import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary,UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const POST = async(req: NextRequest)=>{

    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
  
    const urls: string[] = [];
  
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
  
      try {
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "techie-posts" },
            (error, result) => {
              if (error || !result) {
                reject(error || new Error("Upload failed"));
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(buffer);
        });
  
        urls.push(result.secure_url);
        
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  
    return NextResponse.json({ urls });


}