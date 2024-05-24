"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import firebase from "firebase/app";
import "firebase/database";
import { fromMonaco } from "@hackerrank/firepad";
import firebaseConfig from "@/config/firebaseConfig";
import { getLanguageFromExtension } from "@/utils/getLanguageFromExtension";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IOtabs } from "@/components/input-output-tabs/input-output-tabs";
import { Button } from "@/components/ui/button";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function DsaEditor() {
  const roomId = "your-room-id";
  const fileExtension = "js";
  const defaultCode = `console.log("Hello")`;

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

    const sanitizedFileName = "hjvhjkas";

    const dbRef = firebase
      .database()
      .ref()
      .child(`${roomId}/${sanitizedFileName}`);

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
        .child(`${roomId}/${sanitizedFileName}/users/${userId}`);

      userRef.remove();
      firepad.dispose();
    };
  }, [editorLoaded, roomId, fileExtension, userName, editor]);

  const language = getLanguageFromExtension(fileExtension || "");

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl"
    >
      <ResizablePanel defaultSize={75}>
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
          <Editor
            width="100%"
            height="95vh"
            language={language}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            defaultValue={defaultCode}
            options={{ wordWrap: "on" }}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full ">
          <IOtabs />
          <Button className="m-3">Submit</Button>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
