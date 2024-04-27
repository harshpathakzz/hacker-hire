"use client";
import {
  SandpackProvider,
  SandpackLayout,
  FileTabs,
  SandpackStack,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole,
  Sandpack,
} from "@codesandbox/sandpack-react";
import RealtimeEditor from "@/components/editor/RealTimeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { SANDBOX_TEMPLATES } from "@codesandbox/sandpack-react";

interface MachineCodingPlaygroundProps {
  params: {
    slug: [TemplateType, string];
  };
}

type TemplateType = keyof typeof SANDBOX_TEMPLATES;

export default function MachineCodingPlayground({
  params,
}: MachineCodingPlaygroundProps) {
  const template: TemplateType = params.slug[0];
  const roomId = params.slug[1];
  return (
    <div>
      <h1>Code Playground</h1>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="flex w-1/6 bg-blue-50 h-[95vh]">
          <div className="bg-red-500 overflow-y-scroll w-full">
            <h1 className="text-3xl">Question</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernat
            corporis atque?
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div>
            <SandpackProvider
              template={template}
              theme="dark"
              style={{ height: "80vh", margin: 0 }}
            >
              <SandpackLayout>
                <SandpackFileExplorer
                  style={{ height: "95vh", margin: 0, padding: 5 }}
                />
                <SandpackStack style={{ height: "95vh", margin: 0 }}>
                  <RealtimeEditor roomId={roomId} />
                </SandpackStack>
                <SandpackStack style={{ height: "95vh", margin: 0 }}>
                  <SandpackPreview style={{ height: "65vh", margin: 0 }} />
                  <SandpackConsole style={{ height: "30vh", margin: 0 }} />
                </SandpackStack>
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
