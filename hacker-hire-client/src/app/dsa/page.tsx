import { FC } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CopyURLButton } from "@/components/copy-url-button/copy-url-button";
import { Footer } from "@/components/component/footer";

const DsaPlayground: FC = () => {
  return (
    <div className="min-h-screen">
      <CopyURLButton />
      <ResizablePanelGroup direction="horizontal" className="w-full  border ">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-screen items-center justify-center p-6">
            <span className="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DsaPlayground;
