import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  useProject,
  useRenameProject,
} from "@/features/projects/hooks/use-projects";
import { CloudCheckIcon, LoaderIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  const project = useProject(projectId);
  const renameProject = useRenameProject(projectId);
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState("");

  const handleStartName = () => {
    if (!project) {
      return;
    }
    setName(project.name);
    setIsRenaming(true);
  };

  const handleSubmit = () => {
    if (!project) return;
    setIsRenaming(false);
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === project.name) return;

    renameProject({ id: projectId, name: trimmedName });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
    }
  };

  return (
    <nav className="flex justify-between items-center gap-x-2 p-2 bg-sidebar border-b">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-0!">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-1.5" asChild>
                <Button variant="ghost" className="w-fit! p-1.5! h-7!" asChild>
                  <Link href="/">
                    <Image
                      width={20}
                      height={20}
                      src="/vercel.svg"
                      alt="logo"
                    />
                    <span className={cn("text-sm font-medium", font.className)}>
                      Web IDE
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-0! mr-1" />
            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  className="focus:ring-ring font-medium max-w-40 truncate outline-none focus:ring-1 focus:ring-inset text-sm bg-transparent text-foreground"
                  autoFocus
                  value={name}
                  onFocus={(e) => e.currentTarget.select()}
                  onBlur={handleSubmit}
                  // @ts-ignore
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              ) : (
                <BreadcrumbPage
                  onDoubleClick={handleStartName}
                  className=" text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate"
                >
                  {project?.name ?? "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {project?.importStatus === "importing" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <LoaderIcon className="size-4 text-muted-foreground animate-spin" />
            </TooltipTrigger>
            <TooltipContent>Importing...</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <CloudCheckIcon className="size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              Saved{" "}
              {project?.updatedAt
                ? formatDistanceToNow(project.updatedAt, { addSuffix: true })
                : "unknown"}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </nav>
  );
};
