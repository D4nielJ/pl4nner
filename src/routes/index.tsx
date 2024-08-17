import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import Container from "~/components/Container";
import H2 from "~/components/elements/H2";
import ProjectCard from "~/components/ProjectCard";
import { getProjects, addProject } from "~/lib/resources/projects";
import SearchBar from "~/components/elements/SearchBar";
import Button from "~/components/elements/Button";

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
      <H2>Projects</H2>
      <div class="flex mb-6">
        <SearchBar className="flex-grow" />
        <Button onClick={() => setIsModelShown(true)}>New project</Button>
      </div>
      <ul class="grid grid-cols-3 gap-6">
        <For each={projects()}>
          {(p) => <ProjectCard id={p.id} name={p.name} tasks={p.tasks} />}
        </For>
      </ul>

      <Show when={isModelShown()}>
        <div
          class="absolute top-0 right-0 bottom-0 left-0 bg-zinc-950 opacity-80"
          onClick={() => setIsModelShown(false)}
        />
        <form
          method="post"
          action={addProject}
          class="absolute top-0 right-0 bottom-0 flex flex-col px-10 pt-40 bg-zinc-900 opacity-100"
          onSubmit={(e) => {
            if (!name().trim()) e.preventDefault();
            setIsModelShown(false);
            setName("");
          }}
        >
          <h2 class="mb-6 text-2xl font-bold">Create new project</h2>
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
