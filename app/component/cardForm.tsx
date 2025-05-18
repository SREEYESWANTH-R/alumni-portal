"use client"

import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CardForm = () => {

    const router = useRouter();
    const [previews, setPreviews] = useState<string[]>([]);

    const [formdata, setFormData] = useState({
        title: "",
        shortDesc: "",
        desc: "",
        doc: [] as string[],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleMultipleImageUpload = async (files: FileList) => {
        const data = new FormData();
        const tempPreviews: string[] = [];

        for (const file of Array.from(files)) {
            data.append("file", file);
            tempPreviews.push(URL.createObjectURL(file))
        }

        setPreviews((prev) => [...prev, ...tempPreviews]);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: data,
        });

        const result = await res.json();
        if (result.urls) {
            setFormData((prev) => ({
                ...prev,
                doc: [...prev.doc, ...result.urls],
            }));
        }
        console.log(formdata)

    }

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formdata)
        try {
            const token = localStorage.getItem("userToken") || "";
            const res = await axios.post("/api/post/create-post",formdata,{
                headers:{'authorization':`Bearer ${token}`}
            })
            if (res.status === 201){
                toast(res.data.message);
                router.push("/home/feed");
            }else{
                toast("Something went wrong....");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(error.response?.data?.message || error.message);
              } else {
                toast("An unexpected error occurred");
              }

        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create A Techie Post
            </h2>
            <form onSubmit={handleAddPost} className="space-y-5">
                <div>
                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </Label>
                    <Input name="title" type="text" onChange={handleInputChange} value={formdata.title} placeholder="Enter Title" className="w-full" />
                </div>

                <div>
                    <Label htmlFor="short-desc" className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description
                    </Label>
                    <Input name="shortDesc" type="text" onChange={handleInputChange} value={formdata.shortDesc} placeholder="Short Description" className="w-full" />
                </div>

                <div>
                    <Label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </Label>
                    <Textarea name="desc" onChange={handleInputChange} value={formdata.desc} placeholder="Write your full content here..." rows={6} className="w-full" />
                </div>

                <div>
                    <Label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Image
                    </Label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    aria-hidden="true"
                                    className="w-10 h-10 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16V4m0 0L3 8m4-4l4 4M7 4h10a1 1 0 011 1v11m-4 4H5a1 1 0 01-1-1v-4m16 0l-4-4m4 4l-4 4"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                            </div>
                        </label>
                        <input
                            id="image"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    handleMultipleImageUpload(e.target.files);
                                }
                            }}
                        />
                    </div>
                </div>

                {previews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                        {previews.map((src, index) => (
                            <Image
                                key={index}
                                src={src}
                                alt={`preview-${index}`}
                                width={62}
                                height={62}
                                className="w-full h-40 object-cover rounded-lg border"
                            />
                        ))}
                    </div>
                )}

                <div className="pt-4">
                    <Button type="submit" className="w-full">
                        Submit Post
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CardForm;
