"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

function X() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
  return (
    <>
      <Button onClick={() => createProject({ name: "new project123123" })}>
        Add new
      </Button>
      <ul className="flex flex-col gap-2 p-4">
        {projects?.map((project) => (
          <li className="border rounded p-2 flex flex-col" key={project._id}>
            <p>{project.name}</p>
            <p>Owner ID: {`${project.ownerId}`}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default X;
