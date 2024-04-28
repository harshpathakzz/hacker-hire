"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
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
import { getLanguageFromExtension } from "@/utils/getLanguageFromExtension";

interface RealtimeEditorProps {
  roomId: string;
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function RealtimeEditor(params: RealtimeEditorProps) {
  console.log(params.roomId);

  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [userName, setUserName] = useState<string>("");

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    setEditor(editor);
    console.log("Editor ref changes");
    setEditorLoaded(true);
  }

  useEffect(() => {
    if (!editorLoaded || !editor) {
      return;
    }

    const activeFilePath = sandpack.activeFile;
    const sanitizedActiveFile = sandpack.activeFile.replace(
      /[\\.#$\\[\\\]]/g,
      ""
    );

    const dbRef = firebase
      .database()
      .ref()
      .child(`${params.roomId}/${sanitizedActiveFile}`);

    let name = userName;
    if (!userName) {
      const name = prompt("Enter your Name:") ?? "";
      setUserName(name);
    }

    console.log(editor);

    const firepad = fromMonaco(dbRef, editor);
    firepad.setUserName(name);

    return () => {
      const userId = firepad.getConfiguration("userId");
      const userRef = firebase
        .database()
        .ref()
        .child(`${params.roomId}/${sanitizedActiveFile}/users/${userId}`);
      userRef.remove();
      firepad.dispose();
    };
  }, [editorLoaded, params.roomId, sandpack.activeFile, userName, editor]);

  const fileExtension = sandpack.activeFile.split(".").pop();
  const language = getLanguageFromExtension(fileExtension || "");

  return (
    <div>
      <SandpackStack style={{ height: "95vh", margin: 0 }}>
        <FileTabs closableTabs={true} />
        <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
          <Editor
            width="100%"
            height="100%"
            language={language}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            key={sandpack.activeFile}
            defaultValue={code}
            onChange={(value) => updateCode(value || "")}
            options={{ wordWrap: "on" }}
          />
        </div>
      </SandpackStack>
    </div>
  );
}
