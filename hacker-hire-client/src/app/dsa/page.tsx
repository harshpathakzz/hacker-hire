"use client";

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("@monaco-editor/react"),
  { ssr: false }
);

// Dynamically import WhiteBoard to avoid SSR issues
const WhiteBoard = dynamic(
  () => import("@/components/white-board/white-board"),
  { ssr: false }
);

// Shadcn/ui components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Resizable layout components
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";

// Firebase config
import firebaseConfig from "@/config/firebaseConfig";

// Types for monaco editor - import but don't use directly during SSR
import type * as monacoTypes from "monaco-editor";

const DsaPlayground: React.FC = () => {
  // Editor and realtime collaboration state
  const [editor, setEditor] = useState<monacoTypes.editor.IStandaloneCodeEditor | null>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [userName, setUserName] = useState<string>("");
  // Default code uses JavaScript
  const [code, setCode] = useState<string>(
    "// Write your solution here\nconsole.log('harsha');"
  );
  // Default language is set to javascript
  const [language, setLanguage] = useState<string>("javascript");
  // Track firepad instance
  const [firepad, setFirepad] = useState<any>(null);
  // Track firebase instance
  const [firebaseInstance, setFirebaseInstance] = useState<any>(null);

  // Judge0 integration: Input and output state
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  // Room id for collaboration
  const roomId = "dsa-room-1234";
  
  // Whiteboard modal state
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);

  // Updated onMount function with proper typing
  function handleEditorDidMount(editorInstance: monacoTypes.editor.IStandaloneCodeEditor) {
    // Make sure the editor is not read-only
    editorInstance.updateOptions({ readOnly: false });
    setEditor(editorInstance);
    setEditorLoaded(true);
    console.log("Editor mounted successfully");
  }

  // Initialize Firebase
  useEffect(() => {
    const initFirebase = async () => {
      try {
        // Dynamically import firebase only on client side
        const firebase = (await import('firebase/app')).default;
        await import('firebase/database');
        
        // Initialize Firebase if not already initialized
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        
        setFirebaseInstance(firebase);
        console.log("Firebase initialized successfully");
      } catch (error) {
        console.error("Error initializing Firebase:", error);
      }
    };
    
    initFirebase();
  }, []);

  // Get user name if not already set
  useEffect(() => {
    if (!userName) {
      const name = prompt("Enter your Name:") || "Anonymous";
      setUserName(name);
    }
  }, [userName]);

  // Function to initialize Firepad - only called when both editor and firebase are ready
  const initializeFirepad = async () => {
    if (!editor || !firebaseInstance) return;
    
    try {
      // Dynamically import firepad
      const { fromMonaco } = await import('@hackerrank/firepad');
      
      // Use a sanitized key for the file reference
      const sanitizedKey = "dsa-code".replace(/[\\.#$\\[\\\]]/g, "");
      const dbRef = firebaseInstance.database().ref(`${roomId}/${sanitizedKey}`);

      // Use the username already set
      let name = userName;
      if (!name) {
        name = "Anonymous";
        setUserName(name);
      }

      console.log("Initializing Firepad with editor and DB reference");
      
      // Make sure editor is not read-only before initializing Firepad
      editor.updateOptions({ readOnly: false });
      
      // Initialize Firepad with the editor and DB reference
      const newFirepad = fromMonaco(dbRef, editor);
      newFirepad.setUserName(name);
      
      // Store firepad instance
      setFirepad(newFirepad);
      
      // Set text if editor is empty
      if (editor.getValue().trim() === "") {
        editor.setValue(code);
      }
    } catch (error) {
      console.error("Error initializing Firepad:", error);
    }
  };

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    
    // If firepad exists, we need to dispose of it and recreate
    if (firepad && firebaseInstance) {
      const userId = firepad.getConfiguration("userId");
      const sanitizedKey = "dsa-code".replace(/[\\.#$\\[\\\]]/g, "");
      const userRef = firebaseInstance.database().ref(`${roomId}/${sanitizedKey}/users/${userId}`);
      userRef.remove();
      firepad.dispose();
      setFirepad(null);
      
      // Reconnect with the new language
      if (editor) {
        editor.updateOptions({ readOnly: false });
        initializeFirepad();
      }
    }
  };

  // useEffect for Firepad integration, runs when editor is loaded and firebase is ready
  useEffect(() => {
    if (!editorLoaded || !editor || !firebaseInstance) {
      console.log("Editor or Firebase not loaded yet");
      return;
    }

    // Initialize Firepad
    initializeFirepad();

    // Cleanup function
    return () => {
      if (firepad && firebaseInstance) {
        try {
          const userId = firepad.getConfiguration("userId");
          const sanitizedKey = "dsa-code".replace(/[\\.#$\\[\\\]]/g, "");
          const userRef = firebaseInstance.database().ref(`${roomId}/${sanitizedKey}/users/${userId}`);
          userRef.remove();
          firepad.dispose();
        } catch (error) {
          console.error("Error cleaning up Firepad:", error);
        }
      }
    };
  }, [editorLoaded, editor, firebaseInstance]);

  // Handle code changes
  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
  };

  // Run code using Judge0 via Rapid API
  async function runCode() {
    // Get code directly from editor to ensure we have the latest
    const currentCode = editor ? editor.getValue() : code;
    
    // Map language to Judge0 language id
    const languageMapping: { [key: string]: number } = {
      javascript: 63,
      cpp: 52,
      python: 71,
      java: 62,
    };

    const languageId = languageMapping[language] || 63;

    // Base64 encode source code and input
    const encodedSourceCode = btoa(currentCode);
    const encodedInput = btoa(input);

    // Build the request payload
    const body = {
      source_code: encodedSourceCode,
      language_id: languageId,
      stdin: encodedInput,
    };

    try {
      setOutput("Running code...");
      
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              process.env.NEXT_PUBLIC_JUDGE0_API_KEY || "", // Replace with your Rapid API key
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      
      // Handle different types of output
      if (data.stdout) {
        setOutput(atob(data.stdout));
      } else if (data.compile_output) {
        setOutput(data.compile_output ? atob(data.compile_output) : "Compilation error");
      } else if (data.stderr) {
        setOutput(data.stderr ? atob(data.stderr) : "Error");
      } else {
        setOutput("No output");
      }
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error running code: " + (error instanceof Error ? error.message : String(error)));
    }
  };

  // Toggle whiteboard modal
  const toggleWhiteboard = () => {
    setWhiteboardOpen(!whiteboardOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Horizontal resizable layout */}
      <ResizablePanelGroup direction="horizontal" className="flex h-full w-full">
        {/* Left Panel: Problem Statement */}
        <ResizablePanel className="w-1/4 border p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
          <p>
            Given an array of integers, implement a function that returns the maximum subarray sum.
            For example, for the input [−2,1,−3,4,−1,2,1,−5,4], the output should be 6.
          </p>
          <p className="mt-2">
            <strong>Note:</strong> This is a hardcoded description. You can update it to include additional details such as constraints and examples.
          </p>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel: Editor and I/O */}
        <ResizablePanel className="flex-1">
          <ResizablePanelGroup direction="vertical" className="flex h-full">
            {/* Top: Code Editor with Language Selection */}
            <ResizablePanel className="flex-1 border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <label htmlFor="language-select" className="font-medium">
                    Language:
                  </label>
                  <Select
                    onValueChange={handleLanguageChange}
                    defaultValue="javascript"
                  >
                    <SelectTrigger id="language-select">
                      {language.toUpperCase()}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleWhiteboard}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                  >
                    Whiteboard
                  </button>
                  <button
                    onClick={runCode}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Run Code
                  </button>
                </div>
              </div>
              {/* Dynamic import of Editor to ensure it only renders on client */}
              <div style={{ height: "calc(100% - 40px)" }}>
                {typeof window !== "undefined" && (
                  <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    options={{
                      wordWrap: "on",
                      readOnly: false,
                      minimap: { enabled: false }
                    }}
                  />
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Bottom: Input/Output Tabs */}
            <ResizablePanel className="h-1/3 border p-4">
              <Tabs defaultValue="input">
                <TabsList>
                  <TabsTrigger value="input">Input</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>
                <TabsContent value="input">
                  <textarea
                    className="w-full h-32 p-2 border rounded"
                    placeholder="Enter test case input here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="output">
                  <pre className="bg-gray-800 text-white p-2 h-32 overflow-auto rounded">
                    {output}
                  </pre>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Whiteboard Modal - Fixed CSS */}
      <Dialog open={whiteboardOpen} onOpenChange={setWhiteboardOpen}>
        <DialogContent className="max-w-[95vw] w-3/4 max-h-[90vh] h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Collaborative Whiteboard</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[calc(90vh-60px)] overflow-hidden">
            {whiteboardOpen && (
              <WhiteBoard roomId={roomId} username={userName} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DsaPlayground;