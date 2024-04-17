"use client";

import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import firebase from "firebase/app";
import "firebase/database";
import { fromMonaco } from "@hackerrank/firepad";
import firebaseConfig from "@/config/firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function Page({ params }: { params: { slug: string[] } }) {
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setEditorLoaded(true);
  }

  useEffect(() => {
    if (editorLoaded) {
      const dbRef = firebase.database().ref().child(`pair001`);
      const firepad = fromMonaco(dbRef, editorRef.current);
      const name = prompt("Enter your Name :");
      firepad.setUserName(name);
    }
  }, [editorLoaded]);

  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue="// Welcome to My Editor"
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
