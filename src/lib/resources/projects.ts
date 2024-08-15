import { action, cache, redirect, reload } from "@solidjs/router";
import { db } from "../db";
import { Column, taskStatus, taskStatus as type } from "@prisma/client";

export const getProjects = cache(async () => {
  "use server";
  try {
    const projects = await db.project.findMany({
      include: { columns: true, tasks: true },
    });
    return projects;
  } catch {
    console.log("500 error getting projects");
  }
}, "projects");

export const addProject = action(async (formData: FormData) => {
  "use server";
  const name = String(formData.get("name"));

  try {
    const project = await db.project.create({
      data: {
        name,
        columns: {
          createMany: {
            data: [
              { name: "Backlog", order: 0, status: taskStatus.TODO },
              { name: "To Do", order: 1, status: taskStatus.TODO },
              { name: "In Progress", order: 2, status: taskStatus.IN_PROGRESS },
              { name: "Blocked", order: 3, status: taskStatus.BLOCKED },
              { name: "Done", order: 4, status: taskStatus.DONE },
            ],
          },
        },
      },
    });

    const backlogColumn = await db.column.findFirst({
      where: { name: "Backlog", projectId: project.id },
    });

    if (backlogColumn) {
      await db.task.create({
        data: {
          name: "First To Do",
          order: 0,
          description: "First task in the backlog",
          status: backlogColumn.status,
          column: { connect: { id: backlogColumn.id } },
          project: { connect: { id: project.id } },
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw redirect("/error");
  }
});

export const updateProject = action(async (id: string, name: string) => {
  "use server";
  try {
    await db.project.update({ where: { id }, data: { name } });
  } catch (err) {
    console.log(err);
    throw redirect("/error");
  }
});

export const deleteProject = action(async (id: string) => {
  "use server";
  try {
    await db.task.deleteMany({ where: { projectId: id } });
    await db.column.deleteMany({ where: { projectId: id } });
    await db.project.delete({ where: { id } });
  } catch (err) {
    console.log(err);
    throw redirect("/error");
  }

  reload();
});
