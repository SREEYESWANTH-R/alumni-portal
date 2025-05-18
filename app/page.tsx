"use client";
import Image from "next/image";
import hero from "@/public/hero.png";

export default function Home() {

  return (
  
      <div className="flex flex-col mt-5 text-center md:flex-row md:items-center md:text-start md:mt-2">
        <div className="flex-1 p-4">
          <h1 className="font-bold text-2xl font-serif md:text-4xl">
            Join Hands to grow into a strong community
          </h1>
          <p className="mt-2 md:text-[20px] text-justify">
            <span className="font-bold font-serif">Welcome to the Alumni Portal</span> – a vibrant space to reconnect,
            share memories, and stay updated with your alma mater. Whether you&rsquo;re looking to catch up with old friends,
            explore networking opportunities, or give back to the community, this portal is your bridge to the past and
            pathway to the future.
          </p>
        </div>
        <Image src={hero} className="w-full md:w-3xl" alt="img" />
      </div>
  );
}
