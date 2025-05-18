"use client";

import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Post {
  _id: string;
  title: string;
  shortDesc: string;
  desc: string;
  img: string[];
  createdAt: string;
  userId: {
    _id: string;
    name: string;
  }
}

interface Comment {
  _id: string,
  comment: string,
  postId: string,
  userId: {
    _id: string,
    name: string,
  },
}

const PostCard = () => {
  const [feedPost, setFeedPost] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [commentOn, setCommentOn] = useState<{ [key: string]: boolean }>({});
  const [comment, setComment] = useState<string>("");
  const [showComment, setShowComment] = useState<Comment[]>([]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("userToken") || null;
      const res = await axios.get("/api/post", {
        headers: { authorization: `Bearer ${token}` },
      });

      if (res.status === 201) {
        const posts = res.data.posts;
        const initialIndices: { [key: string]: number } = {};
        posts.forEach((post: Post) => {
          initialIndices[post._id] = 0;
        });
        setCurrentImageIndex(initialIndices);
        setFeedPost(posts);
      } else {
        toast("Failed To Fetch..");
      }
    } catch (error) {
      toast((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch comment
  const fetchComment = async () => {
    try {
      const res = await axios.get("/api/post/comment/get-comments");
      if (res.status === 201) {
        const comments = res.data.comments;
        setShowComment(comments);
      }
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  useEffect(() => {
    fetchProduct();
    fetchComment();
  }, []);

  // function to store comment for the post
  const handleCommentSubmit = async (postId: string) => {
    try {
      const token = localStorage.getItem("userToken") || null;
      await axios.post("/api/post/comment", { comment, postId }, {
        headers: { 'authorization': `Bearer ${token}` }
      });
      await fetchComment();
      setComment("");
    } catch (error: unknown) {
      console.log((error as Error).message);
    }
  }

  // Function for working carousel
  const handleNext = (postId: string, imgCount: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] ?? 0) + 1) % imgCount,
    }));
  };

  const handlePrev = (postId: string, imgCount: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] ?? 0) - 1 + imgCount) % imgCount,
    }));
  };



  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      {loading ? (

        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 space-y-4"
          >
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-64 w-full rounded-md" />
          </div>
        ))
      ) : (
        feedPost.map((post) => {
          const imgIndex = currentImageIndex[post._id] ?? 0;
          const hasMultipleImages = Array.isArray(post.img) && post.img.length > 1;

          return (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{post.userId?.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                <p className="text-gray-700">{post.shortDesc}</p>
                <p className="text-gray-800 text-sm">{post.desc}</p>
              </div>

              {/* Image Carousel */}
              {Array.isArray(post.img) && post.img.length > 0 && (
                <div className="relative w-full flex justify-center items-center mt-2">
                  <Image
                    src={post.img?.[imgIndex] || ""}
                    alt={`post-img-${imgIndex}`}
                    width={600}
                    height={400}
                    className="rounded-md object-cover"
                  />
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={() => handlePrev(post._id, post.img.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 px-2 rounded-full shadow hover:bg-gray-200"
                      >
                        <ArrowLeft />
                      </button>
                      <button
                        onClick={() => handleNext(post._id, post.img.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 px-2 rounded-full shadow hover:bg-gray-200"
                      >
                        <ArrowRight />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-start space-x-8 pt-4 border-t text-sm text-gray-600">
                <button className="hover:text-blue-500">👍 Like</button>
                <button
                  onClick={() => setCommentOn((prev) => ({ [post._id]: !prev[post._id] }))}
                  className="hover:text-blue-500"
                >
                  💬 Comment
                </button>
              </div>
              {commentOn[post._id] && (
                <div className="mt-2">
                  {/* Enter your comment */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                      👤
                    </div>
                    <p className="font-semibold text-gray-800">{post.userId?.name}</p>
                  </div>
                  <div className="space-y-1.5">
                    <Textarea placeholder="Write a comment..." onChange={(e) => { setComment(e.target.value) }} className="w-full" />
                    <Button onClick={() => handleCommentSubmit(post._id)} className="">Comment</Button>
                  </div>

                  {/* Display comments */}
                  {showComment.filter((cmt) => cmt.postId === post._id)
                    .map((cmt) => (

                      <div key={cmt._id} className='flex flex-col gap-1 mt-3'>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                            👤
                          </div>
                          <p className="font-semibold text-gray-800">{cmt.userId?.name}</p>
                        </div>
                        <p className="pl-15 text-[18px]">{cmt.comment}</p>
                      </div>
                    ))
                  }

                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default PostCard;
