"use client";

import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import firebase from "firebase/app";
import "firebase/database";
import { fromMonaco } from "@hackerrank/firepad";
import firebaseConfig from "@/config/firebaseConfig";
import {
  useSandpack,
  useActiveCode,
  FileTabs,
  SandpackStack,
} from "@codesandbox/sandpack-react";
interface RealtimeEditorProps {
  roomId: string;
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default function RealtimeEditor(params: RealtimeEditorProps) {
  console.log(params.roomId);
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setEditorLoaded(true);
  }

  useEffect(() => {
    if (editorLoaded) {
      const activeFilePath = sandpack.activeFile;
      const sanitizedActiveFile = sandpack.activeFile.replace(/[.#$\[\]]/g, "");
      const dbRef = firebase
        .database()
        .ref()
        .child(`${params.roomId}/${sanitizedActiveFile}`);
      const firepad = fromMonaco(dbRef, editorRef.current);
      const name = prompt("Enter your Name :");
      firepad.setUserName(name);
    }
  }, [editorLoaded]);

  return (
    <div>
      <SandpackStack style={{ height: "95vh", margin: 0 }}>
        <FileTabs closableTabs={true} />

        <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
          <Editor
            width="100%"
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            onMount={handleEditorDidMount}
            key={sandpack.activeFile}
            defaultValue={code}
            onChange={(value) => updateCode(value || "")}
          />
        </div>
      </SandpackStack>
    </div>
  );
}
