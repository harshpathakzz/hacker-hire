"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20 ">
        Hacker Hire
      </h1>

      <Link href={"/machine-coding"} className="z-50">
        <Button
          className="hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] scale-90 m-2"
          variant="secondary"
        >
          Get started
        </Button>
      </Link>
    </div>
  );
}
