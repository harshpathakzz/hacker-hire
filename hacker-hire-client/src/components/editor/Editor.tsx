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
  console.log("rerendered code editor");
  const { sandpack } = useSandpack();
  console.log(sandpack);

  return (
    <SandpackCodeEditor
      showTabs={true}
      showLineNumbers={true}
      wrapContent
      closableTabs={true}
    />
  );
};

export default Editor;
