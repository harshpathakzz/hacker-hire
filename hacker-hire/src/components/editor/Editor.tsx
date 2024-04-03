"use client";

import React from "react";
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

import CustomSandpackFileExplorer from "../CustomSandpackFileExplorer/CustomSandpackFileExplorer";

const Editor: React.FC = () => {
  const files = {
    "/App.js": `export default function App() {
  return <h1>Hello Sandpack</h1>;
}`,
  };

  return (
    <SandpackProvider theme={sandpackDark} files={files} template="react">
      <SandpackLayout>
        <CustomSandpackFileExplorer />
        <SandpackCodeEditor
          showTabs={true}
          showLineNumbers={true}
          wrapContent
          closableTabs={true}
        />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default Editor;
