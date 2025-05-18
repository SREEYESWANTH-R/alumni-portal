"use client";

import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

export default function PrivateRoute({children}:{children:ReactNode}){
    
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem("userToken");
        if(!token){
            router.replace("/login");
        }else{
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


