"use client";
import React from "react";
import Editor from "@/components/editor/Editor";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackConsole,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";

import CustomSandpackFileExplorer from "@/components/CustomSandpackFileExplorer/CustomSandpackFileExplorer";
// import CodeCollab from "@/components/CodeCollab/CodeCollab";
import { SandpackCodeEditor } from "@/components/editor/Test";

interface Params {
  roomId: string;
}
export default function Page(params: Params) {
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
          {/* <CodeCollab roomId={params.roomId} /> */}
        </div>
        {/* <CodeCollab roomId={params.roomId} /> */}
        <SandpackLayout>
          <CustomSandpackFileExplorer />
          <SandpackCodeEditor />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
}
