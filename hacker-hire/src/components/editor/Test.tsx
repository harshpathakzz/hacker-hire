import type { Extension } from "@codemirror/state";
import type { KeyBinding } from "@codemirror/view";
import { Socket } from "socket.io-client";
import { useRef, forwardRef, useEffect, use } from "react";

import {
  useActiveCode,
  useSandpack,
  CustomLanguage,
  SandpackInitMode,
  FileTabs,
  RunButton,
  SandpackStack,
  CodeEditor,
  CodeEditorRef,
} from "@codesandbox/sandpack-react";

import { useClassNames } from "./classname";

import { editorClassName } from "./styles";

export interface CodeEditorProps {
  style?: React.CSSProperties;
  className?: string;
  showTabs?: boolean;
  showLineNumbers?: boolean;
  showInlineErrors?: boolean;
  showRunButton?: boolean;
  wrapContent?: boolean;
  closableTabs?: boolean;

  /**
   * This provides a way to control how some components are going to
   * be initialized on the page. The CodeEditor and the Preview components
   * are quite expensive and might overload the memory usage, so this gives
   * a certain control of when to initialize them.
   */
  initMode?: SandpackInitMode;
  /**
   * CodeMirror extensions for the editor state, which can
   * provide extra features and functionalities to the editor component.
   */
  extensions?: Extension[];
  /**
   * Property to register CodeMirror extension keymap.
   */
  extensionsKeymap?: KeyBinding[];
  /**
   * This disables editing of the editor content by the user.
   */
  readOnly?: boolean;
  /**
   * Controls the visibility of Read-only label, which will only
   * appears when `readOnly` is `true`
   */
  showReadOnly?: boolean;
  /**
   * Provides a way to add custom language modes by supplying a language
   * type, applicable file extensions, and a LanguageSupport instance
   * for that syntax mode
   */
  additionalLanguages?: CustomLanguage[];
  roomId?: string;
  socketRef?: React.MutableRefObject<Socket | null>;
}

export const SandpackCodeEditor = forwardRef<CodeEditorRef, CodeEditorProps>(
  (
    {
      showTabs,
      showLineNumbers = false,
      showInlineErrors = false,
      showRunButton = true,
      wrapContent = false,
      closableTabs = true,
      initMode,
      extensions,
      extensionsKeymap,
      readOnly,
      showReadOnly,
      additionalLanguages,
      className,
      roomId,
      socketRef,
      ...props
    },
    ref
  ) => {
    const { sandpack } = useSandpack();
    const files = sandpack.files;
    const { code, updateCode, readOnly: readOnlyFile } = useActiveCode();
    const { activeFile, status, editorState } = sandpack;
    const shouldShowTabs = true;
    const joinedRoomRef: boolean = useRef(false);
    useEffect(() => {
      if (socketRef.current && !joinedRoomRef.current) {
        socketRef.current.emit("join-room", roomId, files);
        joinedRoomRef.current = true;
        console.log("Joined room", roomId);
      }
    }, [roomId, socketRef, files]);

    useEffect(() => {
      if (socketRef.current) {
        socketRef.current.on("receive-code-update", (newFiles) => {
          console.log("Received code update", newFiles);
          sandpack.updateFile(newFiles);
        });
      }
    }, [socketRef]);

    useEffect(() => {
      if (socketRef.current) {
        socketRef.current.on("initial-code-update", (newFiles) => {
          console.log("Initial code update", newFiles);
          sandpack.updateFile(newFiles);
        });
      }
    }, [socketRef]);

    const classNames = useClassNames();

    const handleCodeUpdate = (
      newCode: string,
      shouldUpdatePreview = true
    ): void => {
      updateCode(newCode, shouldUpdatePreview);
      console.log("Emitting code update", newCode, files);
    };

    useEffect(() => {
      socketRef.current?.emit("code-update", roomId, files);
      console.log("Emitting code update", files);
    }, [files]);

    return (
      <SandpackStack className={classNames("editor", [className])} {...props}>
        {shouldShowTabs && <FileTabs closableTabs={closableTabs} />}
        <div className={classNames("code-editor", [editorClassName])}>
          <CodeEditor
            key={activeFile}
            ref={ref}
            additionalLanguages={additionalLanguages}
            code={code}
            editorState={editorState}
            extensions={extensions}
            extensionsKeymap={extensionsKeymap}
            filePath={activeFile}
            initMode={initMode || sandpack.initMode}
            onCodeUpdate={(newCode: string) => {
              return handleCodeUpdate(newCode, sandpack.autoReload ?? true);
            }}
            readOnly={readOnly || readOnlyFile}
            showInlineErrors={showInlineErrors}
            showLineNumbers={showLineNumbers}
            showReadOnly={showReadOnly}
            wrapContent={wrapContent}
          />

          {showRunButton && (!sandpack.autoReload || status === "idle") ? (
            <RunButton />
          ) : null}
        </div>
      </SandpackStack>
    );
  }
);
