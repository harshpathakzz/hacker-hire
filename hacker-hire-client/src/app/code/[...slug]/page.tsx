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
import { Footer } from "@/components/component/footer";

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
    <>
      <div className="hidden sm:block">
        <CopyURLButton className="m-2 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]" />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="flex w-1/6 h-[95vh] border p-2">
            <div className="overflow-y-scroll w-full">
              <h1 className="text-3xl mb-1 font-semibold tracking-tight">
                Debounce
              </h1>
              <div>
                <p>
                  Implement a React component called `DebouncedSearchBar` that
                  renders an input field and applies debouncing to the user
                  input. The component should have the following props:
                </p>
                <ul>
                  <li>
                    <code>debounceDelay</code> (optional, defaults to{" "}
                    <code>300</code>): The delay in milliseconds before
                    triggering the search.
                  </li>
                  <li>
                    <code>onSearch</code> (required): A function that will be
                    called with the user input after the debounce delay.
                  </li>
                </ul>
                <p>
                  The component should debounce the user input, meaning that it
                  should wait for a specified amount of time after the user
                  stops typing before triggering the <code>onSearch</code>{" "}
                  function with the current input value.
                </p>
                <p>Example usage:</p>
                <pre>{`import DebouncedSearchBar from './DebouncedSearchBar';

const handleSearch = (searchTerm) => {
 // Perform search with the searchTerm
 console.log('Searching for:', searchTerm);
};

const MyComponent = () => (
 <DebouncedSearchBar
   onSearch={handleSearch}
   debounceDelay={500} // Wait 500ms after user stops typing
 />
);`}</pre>
                <p>
                  Please implement the <code>DebouncedSearchBar</code> component
                  according to the requirements outlined above.
                </p>
              </div>
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
      <div className="sm:hidden min-h-screen flex items-center justify-center font-bold text-2xl">
        <div className="border h-auto flex items-center justify-center p-4 rounded-md shadow-light-blue m-4 text-center">
          Desktop mode recommended. Certain features may be limited or
          unavailable on mobile devices.
        </div>
      </div>
      <Footer />
    </>
  );
}
