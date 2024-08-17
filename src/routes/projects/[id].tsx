import { createAsync, type RouteSectionProps } from "@solidjs/router"
import Container from "~/components/Container"
import SearchBar from "~/components/elements/SearchBar"
import H2 from "~/components/elements/H2"
import { getProject } from "~/lib/resources/projects"
import Button from "~/components/elements/Button"
import { For } from "solid-js"
import Column from "~/components/Column"
import { getColumns } from "~/lib/resources/columns"

export default function projectPage(props: RouteSectionProps) {
  const project = createAsync(() => getProject(props.params.id), {})
  const columns = createAsync(() => getColumns(props.params.id), {})

  return (
    <Container className="py-12">
      <div class="flex justify-between items-start">
        <H2>{project()?.name}</H2>
        <Button className="">New task</Button>
      </div>
      <div>
        <SearchBar className="mb-6" />
        {/* 
          Search bar
          Settings?
        */}
      </div>
      <div class="grid grid-flow-col gap-6">
        <For each={columns()}>
          {(col) => <Column column={col} tasks={col.tasks} />}
        </For>
        {/* 
          Render columns with tasks
        */}
      </div>
    </Container>
  )
}
