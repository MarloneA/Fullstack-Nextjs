import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "@/components/tasks/modules/columns";
import { DataTable } from "@/components/tasks/modules/data-table";
import { taskSchema } from "@/components/tasks/data/schema";
import { NavigationComponent } from "@/components/navigation/nav-component";
import { CreateTaskDialog } from "@/components/createTask/create-task";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/tasks/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();
  return (
    <div className="md:flex flex-col flex-1 space-y-8 hidden p-8 h-full">
      <div className="flex justify-between bg-background w-full">
        <NavigationComponent />
        <div className="flex items-center space-x-2">
          <CreateTaskDialog />
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
