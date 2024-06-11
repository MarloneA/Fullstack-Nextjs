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
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-10">
        <NavigationComponent />
        <CreateTaskDialog />
      </header>
      <main className="p-10">
        <DataTable data={tasks} columns={columns} />
      </main>
    </div>
  );
}
