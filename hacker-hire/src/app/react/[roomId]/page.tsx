"use client";
import React from "react";
import Editor from "@/components/editor/Editor";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";

import CustomSandpackFileExplorer from "@/components/CustomSandpackFileExplorer/CustomSandpackFileExplorer";

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
        <SandpackLayout>
          <CustomSandpackFileExplorer />
          <Editor />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
}
