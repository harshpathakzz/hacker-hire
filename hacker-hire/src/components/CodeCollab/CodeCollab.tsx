import { useSandpack } from "@codesandbox/sandpack-react";
import React from "react";
import { io } from "socket.io-client";

interface CodeCollabProps {
  roomId: string;
}

const CodeCollab: React.FC<CodeCollabProps> = (props) => {
  const { roomId } = props;

  const { sandpack } = useSandpack();
  const files = sandpack.files;
  const socket = io("http://localhost:4000");

  return <div></div>;
};

export default CodeCollab;
