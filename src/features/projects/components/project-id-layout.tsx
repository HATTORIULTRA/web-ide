"use client";

import { Allotment } from "allotment";
import { ReactNode } from "react";
import { Navbar } from "@/features/projects/components/navbar";
import { Id } from "../../../../convex/_generated/dataModel";
import "allotment/dist/style.css";

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 600;
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 400;
const DEFAULT_MAIN_SIZE = 1000;

export const ProjectIdLayout = ({
  children,
  projectId,
}: {
  children: ReactNode;
  projectId: Id<"projects">;
}) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar projectId={projectId} />
      <div className="flex-1 flex overflow-hidden">
        <Allotment
          className="flex-1"
          defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
        >
          <Allotment.Pane
            snap
            maxSize={MAX_SIDEBAR_WIDTH}
            minSize={MIN_SIDEBAR_WIDTH}
            preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
          >
            <div>Conversation sidebar</div>
          </Allotment.Pane>
          <Allotment.Pane>{children}</Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
};
