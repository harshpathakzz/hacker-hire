"use client";

import Image from "next/image";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import RealtimeEditor from "@/components/editor/RealTimeEditor";
export default function Home() {
  return (
    <div>
      <h1>HacKer Hire</h1>
      {/* <Editor /> */}
      <SandpackProvider>
        <RealtimeEditor roomId="pair0dfv0ffg1" />
      </SandpackProvider>
    </div>
  );
}
