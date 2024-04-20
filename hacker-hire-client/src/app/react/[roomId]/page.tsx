"use client";
import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";

import CustomSandpackFileExplorer from "@/components/CustomSandpackFileExplorer/CustomSandpackFileExplorer";
import Editor from "@/components/editor/Editor";
export default function Page({ params }: { params: { roomId: string } }) {
  console.log("Rendered Room Page");
  console.log("Room id", params.roomId);
  const socketRef = useRef<Socket | null>(null);
  // useEffect(() => {
  //   socketRef.current = io("http://localhost:4000");
  // }, []);

  const fileToStart = {
    "/App.js": `export default function App() {
      return <h1>Hello Sandpack</h1>;
    }`,
  };

  return (
    <>
      <h1>{params.roomId}</h1>
      <SandpackProvider
        theme={sandpackDark}
        files={fileToStart}
        template="react"
      >
        <div>
          <h1 className="text-white">Update</h1>
        </div>
        <SandpackLayout>
          <CustomSandpackFileExplorer />
          <Editor />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
}
