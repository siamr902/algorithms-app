import React from "react";
import { projectPages } from "../data/projectPages";
import Project from "./Project";

const ProjectContainer = () => {
  return (
    <main className="pt-20 min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#0c111d] p-5">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 place-items-center px-10">
        {projectPages.map((projectPage) => (
            <div key={projectPage.path}>
              <Project {...projectPage}/>
            </div>
        ))}
      </div>
    </main>
  );
};

export default ProjectContainer;
