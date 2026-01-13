import { ReactNode } from "react";
import { ProjectIdLayout } from "@/features/projects/components/project-id-layout";

async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <ProjectIdLayout projectId={projectId}>{children}</ProjectIdLayout>;
}

export default Layout;
