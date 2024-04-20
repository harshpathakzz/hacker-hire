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
    <div>
      <h1>Code Playground</h1>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="flex w-1/6 bg-blue-50 h-[95vh]">
          <div className="bg-red-500 overflow-y-scroll w-full">
            <h1 className="text-3xl">Question</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
            sequi? Earum nobis voluptate in numquam dolore inventore sapiente
            quia, vitae laboriosam, delectus eveniet, architecto odio ipsa
            soluta error accusamus deleniti consequatur obcaecati non iusto
            quidem optio similique. Autem illum temporibus voluptas qui sed
            velit vero ut tempore? Consequuntur officia veritatis culpa veniam
            esse tempora? Deserunt, harum consectetur. Officiis deleniti sint
            culpa exercitationem error nesciunt quae assumenda debitis velit
            unde eos magnam doloribus quod, itaque sapiente ex distinctio, enim
            non quis. Nesciunt, doloribus. Nesciunt sint doloribus, labore cum
            non ut mollitia animi tempore numquam nostrum nihil neque tenetur?
            Sequi quaerat, dicta veritatis explicabo ea ad nostrum dolor, minima
            iusto ipsum natus cum sed labore optio nobis accusamus reprehenderit
            adipisci quisquam dignissimos excepturi dolorum non saepe?
            Consectetur quidem, commodi pariatur, nulla consequatur dolores
            voluptatem facilis maxime saepe debitis magni qui neque laborum
            iusto, necessitatibus labore cum minus dolor tempora soluta!
            Obcaecati dolores ab totam recusandae at dolorem quos, ipsam animi
            est. Neque et aut quos pariatur iure, minus voluptatibus eveniet
            commodi optio, inventore doloribus! Incidunt magni atque eveniet
            nulla! Dolore, necessitatibus quae in ad obcaecati deserunt numquam
            pariatur cupiditate iste totam soluta libero ipsum aut quisquam
            officiis facere quia sequi dignissimos neque! Nihil delectus
            consequuntur, tempora a doloremque vitae ad quam esse enim culpa,
            magnam animi iusto voluptatum in cum molestiae minus eaque ducimus
            nam voluptas repellendus quasi voluptates libero? Aperiam distinctio
            ullam dolores. Nostrum voluptate illum quidem numquam molestiae
            aspernatur culpa quam! Velit rem adipisci ducimus sit tempore minima
            corporis non soluta architecto? Deserunt possimus quod sunt iure ab
            voluptatum. Nostrum adipisci possimus repellat sed nemo quidem saepe
            quos reiciendis deserunt. Nisi adipisci in totam deserunt atque
            consectetur repellendus, dignissimos quasi cum, unde voluptas culpa
            doloribus voluptatum pariatur ut cumque fugit. Quae doloremque dolor
            mollitia, fuga dolorem alias, facilis architecto inventore esse, hic
            sint? Quibusdam harum possimus porro omnis culpa laboriosam
            temporibus veniam nam sit corrupti quaerat cum, tempore autem esse
            numquam dolor iusto et excepturi ex? Odio deserunt praesentium,
            eligendi laborum in delectus vero assumenda inventore beatae alias
            adipisci saepe, vitae sunt perferendis aliquam sint maiores nostrum
            quaerat officia omnis veniam cupiditate neque exercitationem!
            Numquam, vitae quidem architecto odit vero ipsam fugiat dolore quos
            porro tempora nulla doloribus ratione omnis dignissimos reiciendis
            hic officia, voluptatem non debitis facilis sapiente? Consequatur,
            aut sapiente. Tenetur, maiores? Inventore, accusamus harum. Esse hic
            rem magni at eius iusto iste excepturi fugit? Amet natus recusandae
            ea quas maxime possimus debitis iste nemo minima ducimus neque
            adipisci vel fugit asperiores vero unde animi, quae laudantium
            mollitia cupiditate doloremque molestiae consectetur accusamus
            ipsam. Aliquam voluptate iste ad rerum quisquam? Nobis quas nostrum
            totam nihil distinctio nesciunt quae maxime obcaecati laudantium.
            Doloribus aut similique atque commodi eum blanditiis. Tempore
            officiis dolor odio eaque, libero nisi perspiciatis quod cupiditate.
            Suscipit, totam neque inventore labore quis eaque unde a veniam
            architecto sint dolores odio iusto ullam non accusantium quia vero
            dolorum ipsam dolor odit repellat laborum est ea quaerat. Debitis
            minima molestiae eum sed. Reprehenderit nisi distinctio incidunt
            corporis atque?
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
                  <SandpackPreview style={{ height: "75vh", margin: 0 }} />
                  <SandpackConsole style={{ height: "20vh", margin: 0 }} />
                </SandpackStack>
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
