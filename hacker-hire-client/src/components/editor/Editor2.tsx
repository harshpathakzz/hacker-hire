"use client";

import React from "react";

import { SandpackCodeEditor } from "./Test"


import CustomSandpackFileExplorer from "../CustomSandpackFileExplorer/CustomSandpackFileExplorer";

const Editor: React.FC = () => {

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
