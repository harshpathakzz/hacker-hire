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
import { CopyURLButton } from "@/components/copy-url-button/copy-url-button";

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
      <CopyURLButton className="m-2" />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="flex w-1/6 h-[95vh] border">
          <div className=" overflow-y-scroll w-full">
            <h1 className="text-3xl">Questions</h1>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt,
            saepe. Quos facilis praesentium ut, nisi veritatis quisquam ab,
            dolorum, magnam reiciendis perferendis quam. Repellendus
            voluptatibus placeat dolorem ut delectus exercitationem numquam,
            tenetur qui saepe ratione deleniti dolor molestias ipsum doloremque
            inventore! Repudiandae quos aliquid, porro placeat, dolorem rerum
            cum laboriosam voluptas assumenda officia maxime quas ducimus
            voluptatibus alias explicabo commodi eligendi! Eligendi odio,
            delectus ullam non maiores fugit. Voluptate mollitia quisquam ullam
            animi saepe molestias, culpa maxime odit consequatur vitae error
            incidunt deleniti veniam iure eaque ipsa dolorum? Commodi tenetur
            asperiores repellendus aliquam. Voluptatum repellat rerum et culpa
            eum quis?
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
