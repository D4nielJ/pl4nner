import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { For } from "solid-js";
import {
  getProjects,
  addProject,
  deleteProject,
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

  let inputRef!: HTMLInputElement;
  return (
    <main>
      <h2>My projects</h2>

      <ul>
        <For each={projects()} fallback={<div>cargando...</div>}>
          {(p) => (
            <form method="post">
              <li>
                <div>
                  {p.name}&nbsp;&nbsp;&nbsp;
                  <button formAction={deleteProject.with(p.id)}>X</button>
                </div>
              </li>
            </form>
          )}
        </For>
      </ul>

      <form
        action={addProject}
        method="post"
        onSubmit={(e) => {
          if (!inputRef.value.trim()) e.preventDefault();
          setTimeout(() => (inputRef.value = ""));
        }}
      >
        <input
          name="name"
          class=""
          placeholder="What needs to be done?"
          ref={inputRef}
          autofocus
        />
        <button type="submit">Add project</button>
      </form>
    </main>
  );
}
