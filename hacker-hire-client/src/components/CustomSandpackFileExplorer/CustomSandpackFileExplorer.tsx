"use client";
import React, { useState } from "react";
import {
  useSandpack,
  SandpackFileExplorer,
  useActiveCode,
} from "@codesandbox/sandpack-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CustomSandpackFileExplorer: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");

  const { sandpack } = useSandpack();
  // console.log(sandpack);
  console.log("rerendered sidebar");

  return (
    <div className="custom-sandpack-file-explorer">
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (!fileName) return;
          sandpack.addFile(fileName, "");
          setFileName("");
        }}
      >
        <Label className="leading-7 [&:not(:first-child)]:mt-6 text-primary">
          File
          <Input
            value={fileName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFileName(event.currentTarget.value)
            }
          />
        </Label>
        <Button>Add File</Button>
      </form>
      <SandpackFileExplorer />
    </div>
  );
};

export default CustomSandpackFileExplorer;
