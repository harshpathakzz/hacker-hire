// "use client";

// import { useSandpack } from "@codesandbox/sandpack-react";
// import React, { useEffect } from "react";
// import { io } from "socket.io-client";
// import { Button } from "@/components/ui/button";

// interface CodeCollabProps {
//   roomId: string;
// }

// const CodeCollab: React.FC<CodeCollabProps> = (props) => {
//   const { roomId } = props;

//   const { sandpack } = useSandpack();
//   const files = sandpack.files;
//   const socket = io("http://localhost:4000", {});
//   sandpack.files = {
//     "/App.js": {
//       code: "export default function App() {\n  return <h1>Hello from code  Sandpack</h1>;\n}",
//     },
//   };
//   return (
//     <div>
//       <Button
//         onClick={() => {
//           sandpack.deleteFile("/App.js");
//         }}
//       >
//         Update code
//       </Button>
//     </div>
//   );
// };

// export default CodeCollab;
