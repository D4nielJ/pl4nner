import { taskStatus } from "@prisma/client";
import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import Container from "~/components/Container";
import {
  getProjects,
  addProject,
  archiveProject,
} from "~/lib/resources/projects";

export const route = {
  preload() {
    getProjects();
  },
} satisfies RouteDefinition;

export default function Home(props: RouteSectionProps) {
  const projects = createAsync(() => getProjects(), {
    initialValue: [],
    deferStream: true,
  });

  const [isModelShown, setIsModelShown] = createSignal(false);
  const [name, setName] = createSignal("");

  let inputRef!: HTMLInputElement;
  return (
    <Container className="pt-12 pb-12">
      <h2 class="text-4xl font-bold mb-6">Projects</h2>
      <div class="mb-6 flex">
        <input
          type="text"
          class="flex-grow px-3 py-1.5 rounded-md mr-6 text-zinc-800 placeholder:text-zinc-500"
          placeholder="Search"
        />
        <button
          class="border-2 border-zinc-800 px-3 py-1.5 rounded-md"
          onClick={() => setIsModelShown(true)}
        >
          New project
        </button>
      </div>
      <ul class="grid grid-cols-3 gap-6">
        <For each={projects()}>
          {(p) => (
            <form
              method="post"
              class="relative p-6 rounded-xl bg-zinc-900 mb-6 h-full"
            >
              <li>
                <h3 class="text-xl -ml-1 font-bold text-zinc-300 mb-3">
                  {p.name}
                </h3>
                <span>Pending tasks: </span>
                <For each={p.tasks}>
                  {(t) => {
                    if (t.status === taskStatus.TODO) {
                      return <div> - {t.name}</div>;
                    }
                  }}
                </For>
                <button
                  formAction={archiveProject.with({
                    id: p.id,
                  })}
                  class="absolute text-xs top-3 right-3 border-2 border-zinc-800 px-2 py-1 rounded-md"
                >
                  X
                </button>
              </li>
            </form>
          )}
        </For>
      </ul>

      <Show when={isModelShown()}>
        <div
          class="absolute top-0 bottom-0 left-0 right-0 bg-zinc-950 opacity-80"
          onClick={() => setIsModelShown(false)}
        />
        <form
          method="post"
          action={addProject}
          class="absolute top-0 bottom-0 right-0 bg-zinc-900 flex flex-col pt-40 px-10 opacity-100"
          onSubmit={(e) => {
            if (!name().trim()) e.preventDefault();
            setIsModelShown(false);
            setName("");
          }}
        >
          <h2 class="text-2xl font-bold mb-6">Create new project</h2>
          <input
            name="name"
            class="px-3 py-1.5 rounded-md text-zinc-800 placeholder:text-zinc-500 mb-6 w-96 w-"
            placeholder="Name"
            autofocus
            value={name()}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <button
            type="submit"
            class="w-min border-2 border-zinc-800 px-3 py-1.5 rounded-md self-end"
          >
            Ready!
          </button>
        </form>
        <button
          class="absolute top-6 right-6 border-2 border-zinc-800 px-3 py-1.5 rounded-md"
          onClick={() => setIsModelShown(false)}
        >
          X
        </button>
      </Show>
    </Container>
  );
}
