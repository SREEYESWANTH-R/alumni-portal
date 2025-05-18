"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonCard from "./SkeletonCard";

interface Article {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

const ArticleCardForm = () => {

    const [articleInfo, setArticleInfo] = useState<Article[]>([]);
    const [searchArticle, setSearchArt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const relatedTagsIds = async () => {
        try {

            const res = await axios.get("/api/article", {
                params: { query: searchArticle }
            });
            if (res.status === 200) {
                setArticleInfo(res.data.articles);
                setSearchArt("");
            } else {
                toast("Something went wrong!!!");
            }
        } catch (error: unknown) {
            toast((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        relatedTagsIds();
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 w-1/3 border-2 px-2 rounded-sm">
                <input onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchArt(e.target.value)} className="border-none outline-0 p-3 w-full" value={searchArticle} type="text" placeholder="Search Here..." />

                <Button onClick={() => relatedTagsIds()}>
                    <Search></Search>
                </Button>
            </div>
            <h1 className="p-3 font-bold text-3xl mb-4">Latest Tech Articles from the Web</h1>
            <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    articleInfo && articleInfo.length > 0 ? (
                        articleInfo.slice(0,16).map((article, index) => (
                            <Card key={index} className="pt-4 gap-3 shadow-sm">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <h1>{article.author}</h1>
                                        <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
                                    </div>
                                    <CardTitle>{article.title.slice(0, 40) + "...."}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Link href={article.url} target="_blank">
                                        <img className="w-80 h-52" src={article.urlToImage} alt={article.title} />
                                    </Link>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="flex font-bold text-2xl justify-center items-center h-screen w-full">No Article Found....</p>
                    )
                )}

            </div>
        </div>
    )
}

export default ArticleCardForm
