import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export const IOtabs: FC = () => {
  return (
    <div className="w-full p-3">
      <Tabs defaultValue="input" className="">
        <TabsList className="">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="console">Output</TabsTrigger>
        </TabsList>
        <TabsContent value="input">
          <Textarea placeholder="Type your input here." className="" />
        </TabsContent>
        <TabsContent value="console">Display your output here.</TabsContent>
      </Tabs>
    </div>
  );
};
