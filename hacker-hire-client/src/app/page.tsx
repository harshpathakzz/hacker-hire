"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/component/footer";

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

      <Link href="/machine-coding" className="z-50">
        <Button
          className="hover:shadow-light-blue scale-90 mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold transition-all duration-300 hover:scale-105"
          variant="secondary"
        >
          <span className="relative z-10">Get started</span>
          <div className="absolute inset-0 rounded-full blur-sm opacity-75 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        </Button>
      </Link>
      <Link href="/machine-coding" className="z-50">
        <Button className="relative overflow-hidden group  scale-90 mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold transition-all duration-500 hover:scale-105">
          <span className="relative z-10">Get started</span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-500 transform translate-x-full group-hover:translate-x-0 ease"></div>
        </Button>
      </Link>

      <Footer />
    </div>
  );
}
