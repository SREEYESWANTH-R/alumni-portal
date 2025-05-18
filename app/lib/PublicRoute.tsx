"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function PublicRoute({children}: {children:React.ReactNode}){
    const router = useRouter();
    const [checking , setChecking] = useState(true);
    
    useEffect(()=>{
        const token = localStorage.getItem("userToken");
        if (token) {
        router.replace("/home/feed");
        } else {
        setChecking(false);
        }
    },[])

    if (checking){
        return null;
    }

  return (
    <>
     {children} 
    </>
  )
}

