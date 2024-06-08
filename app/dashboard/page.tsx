import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "../../components/app-components/tasks/modules/columns";
import { DataTable } from "../../components/app-components/tasks/modules/data-table";
import { UserNav } from "../../components/app-components/tasks/modules/user-nav";
import { taskSchema } from "../../components/app-components/tasks/data/schema";
import { NavigationComponent } from "../../components/app-components/navigation/nav-component";
import { ModeToggle } from "../../components/app-components/themetoggle/mode-toggle";
import { AvatarDemo } from "../../components/app-components/profile-avatar/profile-avatar";
import { CreateTaskDialog } from "../../components/app-components/create-task/create-task";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "components/app-components/tasks/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

async function getData() {
  const res = await fetch("http://localhost:8080/api/tasks");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="w-full flex justify-between p-10 fixed z-10 bg-background">
        <p className="text-xl leading-none">RALL-Y</p>
        <NavigationComponent />
        <div className="flex space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
      <div className="container relative top-40">
        <section>
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
            <div className="md:hidden">
              <Image
                src="/examples/tasks-light.png"
                width={1280}
                height={998}
                alt="Playground"
                className="block dark:hidden"
              />
              <Image
                src="/examples/tasks-dark.png"
                width={1280}
                height={998}
                alt="Playground"
                className="hidden dark:block"
              />
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Welcome back!
                  </h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of your tasks for this month!
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <CreateTaskDialog />
                </div>
              </div>
              <DataTable data={tasks} columns={columns} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
