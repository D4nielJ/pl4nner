import { Task, taskStatus } from "@prisma/client";
import { ArchiveBoxArrowDown } from "./icons/HeroIcons";
import { archiveProject } from "~/lib/resources/projects";
import { A, redirect } from "@solidjs/router";

export default function ProjectCard(props: {
  id: string;
  name: string;
  tasks: Task[];
}) {
  const randomizeColor = {
    0: "bg-green-800",
    1: "bg-teal-800",
    2: "bg-cyan-800",
  }[Math.floor(Math.random() * 3)];
  const percentageDone =
    props.tasks.filter((t) => t.status === taskStatus.DONE).length /
    props.tasks.length;
  return (
    <A
      href={`/projects/${props.id}`}
      class="h-full relative mb-6 bg-zinc-900 rounded-xl"
    >
      <div class={`${randomizeColor} flex p-6 pb-3 rounded-t-xl`}>
        <span class="flex-grow mr-4 text-lg font-bold truncate">
          {props.name}
        </span>
        <form method="post" onClick={(e) => e.stopImmediatePropagation()}>
          <button
            formAction={archiveProject.with({ id: props.id })}
            class="flex items-center justify-items-center p-1.5 rounded z-10 hover:shadow hover:bg-zinc-950 hover:bg-opacity-35"
          >
            <ArchiveBoxArrowDown />
          </button>
        </form>
      </div>
      <div class="p-6 pb-1">
        <div class="flex justify-between mb-2">
          <span>
            <i class="w-2 h-2 inline-block mr-2 bg-cyan-800 rounded-full" />
            To Do:{" "}
          </span>
          <span>
            {props.tasks.filter((t) => t.status === taskStatus.TODO).length}
          </span>
        </div>
        <div class="flex justify-between mb-2">
          <span>
            <i class="w-2 h-2 inline-block mr-2 bg-green-800 rounded-full" />
            In Progress:{" "}
          </span>
          <span>
            {
              props.tasks.filter((t) => t.status === taskStatus.IN_PROGRESS)
                .length
            }
          </span>
        </div>
        <div class="flex justify-between mb-2">
          <span>
            <i class="w-2 h-2 inline-block mr-2 bg-red-800 rounded-full" />
            Blocked:{" "}
          </span>
          <span>
            {props.tasks.filter((t) => t.status === taskStatus.BLOCKED).length}
          </span>
        </div>
        <div class="flex justify-between mb-2">
          <span>{(percentageDone * 100).toFixed(0)}% Completed</span>
          <span>
            {props.tasks.filter((t) => t.status === taskStatus.DONE).length}/
            {props.tasks.length} Done
          </span>
        </div>
        <div
          class="w-full h-2 relative rounded-full"
          meta-data={percentageDone}
        >
          <span
            class={`absolute top-0 bottom-0 left-0 w-[28%] inline-block rounded-full bg-green-800`}
          />
          <span class="absolute top-0 right-0 bottom-0 left-0 rounded-full border" />
        </div>
      </div>
      <div class="absolute inset-0 bg-white rounded-xl opacity-0 hover:opacity-5" />
    </A>
  );
}
