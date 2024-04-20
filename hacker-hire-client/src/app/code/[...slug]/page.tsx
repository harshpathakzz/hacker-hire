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

interface MachineCodingPlaygroundProps {
  params: {
    slug: [string, string];
  };
}
export default function MachineCodingPlayground({
  params,
}: MachineCodingPlaygroundProps) {
  const template = params.slug[0];
  const roomId = params.slug[1];
  return (
    <div>
      <h1>Code Playground</h1>

      <SandpackProvider
        template="react"
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
            <SandpackPreview style={{ height: "75vh", margin: 0 }} />
            <SandpackConsole style={{ height: "20vh", margin: 0 }} />
          </SandpackStack>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
